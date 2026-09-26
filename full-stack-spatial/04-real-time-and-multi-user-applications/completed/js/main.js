// main.js: the account panel, the room UI, and every WebSocket handler.
// No three.js API appears here (scene.js owns that) and no WebSocket API
// appears here either (net.js owns that) — this file only reacts to the
// events net.js re-emits and calls scene.js's small position API.
//
// Two client-side moderation ideas live entirely in this file, and nowhere
// on the server, on purpose:
//   - Muting hides someone's chat messages in *your* chat log. It takes
//     effect the instant you click it and needs no round trip, because
//     "stop showing me this" is a decision only your own browser has to act
//     on.
//   - Blocking is different: it asks the server (net.js's sendBlock) to
//     stop relaying that person's position and chat to you at all, so it
//     keeps working even if their client tries to ignore your preference.
//     See server/realtime.js's comment on the same distinction.

import { createScene } from './scene.js';
import { connectRoom } from './net.js';

const $ = (id) => document.getElementById(id);

const MOVE_STEP = 0.5;
const TURN_STEP_DEGREES = 15;
const ROOM_ID = 'main-hall';

let scene = null;
let net = null;
let currentAccount = null;
let csrfToken = null;
let roomHalfSize = 6;

const roomMembers = new Map(); // userId -> { username, x, y, z, rotationY }
const mutedUserIds = new Set(); // local-only: hides their chat in this browser
const blockedUserIds = new Set(); // server-enforced: see net.sendBlock
let reportTargetUserId = null;

let selfState = { x: 0, y: 0, z: 0, rotationY: 0 };

function setStatus(message, kind) {
  const banner = $('status');
  banner.textContent = message;
  banner.classList.toggle('is-offline', kind === 'offline');
  banner.classList.toggle('is-error', kind === 'error');
}

function showFieldErrors(list, body) {
  const messages = body?.details ?? [body?.error ?? 'Something went wrong.'];
  list.replaceChildren(...messages.filter(Boolean).map((message) => {
    const li = document.createElement('li');
    li.textContent = message;
    return li;
  }));
}

function showSignedIn(account) {
  $('signed-out-view').hidden = true;
  $('signed-in-view').hidden = false;
  $('account-username').textContent = account.username;
  $('room-section').hidden = false;
}

function showSignedOut() {
  $('signed-in-view').hidden = true;
  $('signed-out-view').hidden = false;
  $('room-section').hidden = true;
}

function clamp(value) {
  return Math.max(-roomHalfSize, Math.min(roomHalfSize, value));
}

// --- The always-present 2D roster (WCAG 1.3.1: the same data as the 3D view) ---

function cellFor(value) {
  const cell = document.createElement('td');
  cell.textContent = Number(value).toFixed(1);
  return cell;
}

function renderRosterTable() {
  const tbody = $('roster-table-body');
  const rows = [];

  const selfRow = document.createElement('tr');
  const selfName = document.createElement('th');
  selfName.scope = 'row';
  selfName.textContent = `${currentAccount?.username ?? 'You'} (you)`;
  selfRow.append(selfName, cellFor(selfState.x), cellFor(selfState.z), cellFor(selfState.rotationY));
  const selfActions = document.createElement('td');
  selfActions.textContent = '—';
  selfRow.append(selfActions);
  rows.push(selfRow);

  for (const [userId, member] of roomMembers) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.scope = 'row';
    nameCell.textContent = member.username + (blockedUserIds.has(userId) ? ' (blocked)' : '') + (mutedUserIds.has(userId) ? ' (muted)' : '');
    row.append(nameCell, cellFor(member.x), cellFor(member.z), cellFor(member.rotationY));

    const actions = document.createElement('td');
    actions.append(
      actionButton(mutedUserIds.has(userId) ? 'Unmute' : 'Mute', member.username, () => toggleMute(userId)),
      ' ',
      actionButton(blockedUserIds.has(userId) ? 'Unblock' : 'Block', member.username, () => toggleBlock(userId)),
      ' ',
      actionButton('Report', member.username, () => openReport(userId, member.username)),
    );
    row.append(actions);
    rows.push(row);
  }

  tbody.replaceChildren(...rows);
}

function actionButton(label, targetName, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.setAttribute('aria-label', `${label}: ${targetName}`);
  button.addEventListener('click', onClick);
  return button;
}

function updateSceneDescription() {
  const others = [...roomMembers.values()].map((m) => m.username);
  const who = others.length === 0 ? 'no one else is here yet' : `also here: ${others.join(', ')}`;
  $('scene-description').textContent = `You are in the shared room at approximately x ${selfState.x.toFixed(1)}, z ${selfState.z.toFixed(1)}, facing ${selfState.rotationY.toFixed(0)} degrees; ${who}. ${scene?.isAnimating() ? 'Avatars bob gently.' : 'Animation is paused: nothing is moving on its own.'}`;
}

// --- Chat --------------------------------------------------------------------

function appendChatMessage(userId, username, text, { system = false } = {}) {
  if (!system && mutedUserIds.has(userId)) return; // local-only filter, see the file comment
  const list = $('chat-list');
  const li = document.createElement('li');
  if (system) {
    li.className = 'chat-system';
    li.textContent = text;
  } else {
    const name = document.createElement('strong');
    name.textContent = `${username}: `;
    li.append(name, document.createTextNode(text));
  }
  list.append(li);
  $('chat-log').scrollTop = $('chat-log').scrollHeight;
}

// --- Movement ------------------------------------------------------------

function sendSelfPosition() {
  scene.setSelfPosition(selfState);
  net?.sendPosition(selfState.x, selfState.y, selfState.z, selfState.rotationY);
  renderRosterTable();
  updateSceneDescription();
}

function move(axis) {
  const rad = (selfState.rotationY * Math.PI) / 180;
  const forward = { x: -Math.sin(rad), z: -Math.cos(rad) };
  const right = { x: Math.cos(rad), z: -Math.sin(rad) };
  if (axis === 'forward') { selfState.x = clamp(selfState.x + forward.x * MOVE_STEP); selfState.z = clamp(selfState.z + forward.z * MOVE_STEP); }
  if (axis === 'back') { selfState.x = clamp(selfState.x - forward.x * MOVE_STEP); selfState.z = clamp(selfState.z - forward.z * MOVE_STEP); }
  if (axis === 'left') { selfState.x = clamp(selfState.x - right.x * MOVE_STEP); selfState.z = clamp(selfState.z - right.z * MOVE_STEP); }
  if (axis === 'right') { selfState.x = clamp(selfState.x + right.x * MOVE_STEP); selfState.z = clamp(selfState.z + right.z * MOVE_STEP); }
  sendSelfPosition();
}

function turn(direction) {
  const delta = direction === 'left' ? -TURN_STEP_DEGREES : TURN_STEP_DEGREES;
  selfState.rotationY = ((selfState.rotationY + delta) % 360 + 360) % 360;
  sendSelfPosition();
}

// --- Block / mute / report -----------------------------------------------

function toggleMute(userId) {
  if (mutedUserIds.has(userId)) mutedUserIds.delete(userId); else mutedUserIds.add(userId);
  renderRosterTable();
}

function toggleBlock(userId) {
  const blocking = !blockedUserIds.has(userId);
  if (blocking) blockedUserIds.add(userId); else blockedUserIds.delete(userId);
  net?.sendBlock(userId, blocking);
  renderRosterTable();
}

function openReport(userId, username) {
  reportTargetUserId = userId;
  $('report-target-name').textContent = username;
  $('report-section').hidden = false;
  $('report-reason').focus();
}

function closeReport() {
  reportTargetUserId = null;
  $('report-section').hidden = true;
  $('report-form').reset();
}

// --- WebSocket event handlers ------------------------------------------

function onRoster(members) {
  roomMembers.clear();
  for (const member of members) {
    roomMembers.set(member.userId, member);
    scene.setRemoteTarget(member.userId, member);
  }
  renderRosterTable();
  updateSceneDescription();
}

function onPresence(message) {
  if (message.event === 'join') {
    roomMembers.set(message.userId, {
      username: message.username, x: 0, y: 0, z: 0, rotationY: 0,
    });
    appendChatMessage(message.userId, message.username, `${message.username} joined the room.`, { system: true });
  } else {
    roomMembers.delete(message.userId);
    scene.removeRemoteAvatar(message.userId);
    appendChatMessage(message.userId, message.username, `${message.username} left the room.`, { system: true });
  }
  renderRosterTable();
  updateSceneDescription();
}

function onPosition(message) {
  const member = roomMembers.get(message.userId);
  if (member) Object.assign(member, message);
  scene.setRemoteTarget(message.userId, message);
  renderRosterTable();
}

function onChat(message) {
  appendChatMessage(message.userId, message.username, message.text);
}

function onReportAck() {
  setStatus('Report sent. Thank you for helping keep the room safe.');
}

function onNetError(message) {
  setStatus(message, 'error');
}

// --- Joining the room --------------------------------------------------

function joinRoom() {
  scene.createSelfAvatar(currentAccount.id);
  // A small, deterministic starting offset (from the account id) so two
  // learners who join at nearly the same moment do not start stacked on
  // top of each other.
  let hash = 0;
  for (const ch of currentAccount.id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  selfState = {
    x: clamp(((hash % 40) - 20) / 10), y: 0, z: clamp((((hash >> 8) % 40) - 20) / 10), rotationY: 0,
  };

  net = connectRoom(ROOM_ID, {
    onOpen: sendSelfPosition,
    onRoster,
    onPresence,
    onPosition,
    onChat,
    onReportAck,
    onError: onNetError,
    onStatus: (text) => setStatus(text, text.startsWith('Connected') ? undefined : 'offline'),
  });
  sendSelfPosition();
}

function leaveRoom() {
  net?.stop();
  net = null;
  roomMembers.clear();
  mutedUserIds.clear();
  blockedUserIds.clear();
}

// --- Loading what the page needs on open ----------------------------------

async function loadMe() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.status === 401) return { signedIn: false, offline: false };
    if (!res.ok) throw new Error(`GET /api/auth/me returned ${res.status}`);
    const body = await res.json();
    return {
      signedIn: true, offline: false, account: body.account, csrfToken: body.csrfToken,
    };
  } catch {
    return { signedIn: false, offline: true };
  }
}

async function init() {
  scene = createScene($('canvas-box'));
  roomHalfSize = scene.roomHalfSize;
  scene.setAnimating(window.__reducedMotion !== true);

  const session = await loadMe();
  if (session.offline) {
    setStatus('Server not running: signing in and the shared room need the Node.js server (see completed/README.md).', 'offline');
  }
  currentAccount = session.account ?? null;
  csrfToken = session.csrfToken ?? null;

  if (currentAccount) {
    showSignedIn(currentAccount);
    joinRoom();
  } else {
    showSignedOut();
  }

  const pauseButton = $('pause-toggle');
  pauseButton.setAttribute('aria-pressed', String(!scene.isAnimating()));
  pauseButton.textContent = scene.isAnimating() ? 'Pause animation' : 'Resume animation';
  pauseButton.addEventListener('click', () => {
    const on = !scene.isAnimating();
    scene.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateSceneDescription();
  });

  for (const [id, axis] of [['move-forward', 'forward'], ['move-back', 'back'], ['move-left', 'left'], ['move-right', 'right']]) {
    $(id).addEventListener('click', () => move(axis));
  }
  $('turn-left').addEventListener('click', () => turn('left'));
  $('turn-right').addEventListener('click', () => turn('right'));

  $('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('register-errors');
    errorsList.replaceChildren();
    const username = $('register-username').value.trim().toLowerCase();
    const password = $('register-password').value;
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 201) {
        $('register-form').reset();
        $('login-username').value = username;
        setStatus('Account created. Sign in below to join the room.');
        $('login-username').focus();
        return;
      }
      showFieldErrors(errorsList, body);
    } catch {
      setStatus('Server not running: creating an account needs the Node.js server.', 'offline');
    }
  });

  $('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('login-errors');
    errorsList.replaceChildren();
    const username = $('login-username').value.trim().toLowerCase();
    const password = $('login-password').value;
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        showFieldErrors(errorsList, body);
        return;
      }
      currentAccount = body.account;
      csrfToken = body.csrfToken;
      $('login-form').reset();
      showSignedIn(currentAccount);
      joinRoom();
      setStatus(`Signed in as ${currentAccount.username}. Joining the room...`);
    } catch {
      setStatus('Server not running: signing in needs the Node.js server.', 'offline');
    }
  });

  $('logout-button').addEventListener('click', async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRF-Token': csrfToken },
      });
    } catch {
      // Signing out client-side still happens below even if telling the
      // server failed — there is nothing more useful to try.
    }
    leaveRoom();
    currentAccount = null;
    csrfToken = null;
    showSignedOut();
    setStatus('Signed out.');
  });

  $('chat-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const errorsList = $('chat-errors');
    errorsList.replaceChildren();
    const input = $('chat-input');
    const text = input.value.trim();
    if (text.length === 0) return;
    if (!net) {
      showFieldErrors(errorsList, { error: 'Not connected to the room yet.' });
      return;
    }
    net.sendChat(text);
    input.value = '';
  });

  $('report-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const reason = $('report-reason').value;
    const detail = $('report-detail').value.trim();
    if (!reason || !reportTargetUserId) return;
    net?.sendReport(reportTargetUserId, reason, detail);
    closeReport();
  });
  $('report-cancel').addEventListener('click', closeReport);
}

init();
