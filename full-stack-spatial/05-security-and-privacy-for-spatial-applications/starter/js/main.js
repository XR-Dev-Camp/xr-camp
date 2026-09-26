// DELIBERATELY VULNERABLE -- for learning on localhost only; never deploy.
//
// main.js: the account panel, the scenes panel, and the chat panel. Two of
// this lesson's seven TODOs live here.

import * as scene from './scene.js';
import { connectRoom } from './net.js';

const $ = (id) => document.getElementById(id);

let currentAccount = null;
let csrfToken = null;
let net = null;
let currentScene = null;

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
  $('app-section').hidden = false;
}

function showSignedOut() {
  $('signed-in-view').hidden = true;
  $('signed-out-view').hidden = false;
  $('app-section').hidden = true;
}

async function api(path, options = {}) {
  const res = await fetch(path, { credentials: 'include', ...options });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}

// --- Scenes ------------------------------------------------------------------

function renderMyScenes(scenes) {
  const list = $('my-scenes-list');
  list.replaceChildren(...scenes.map((s) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${s.name} (${s.isPublic ? 'public' : 'private'})`;
    button.setAttribute('aria-label', `Open scene: ${s.name}`);
    button.addEventListener('click', () => openScene(s.id));
    const idNote = document.createElement('span');
    idNote.className = 'hint';
    idNote.textContent = ` ID: ${s.id}`;
    li.append(button, idNote);
    return li;
  }));
}

async function loadMyScenes() {
  const { ok, body } = await api('/api/scenes');
  if (ok) renderMyScenes(body.scenes);
}

function renderSceneDetail(sceneData, annotations) {
  currentScene = sceneData;
  $('scene-detail-section').hidden = false;
  $('scene-detail-name').textContent = sceneData.name;

  const list = $('scene-detail-list');
  const rows = [
    `ID: ${sceneData.id}`,
    `Visibility: ${sceneData.isPublic ? 'public' : 'private'}`,
    sceneData.locationLat != null ? `Location: ${sceneData.locationLat}, ${sceneData.locationLng}` : 'Location: none saved',
  ];
  list.replaceChildren(...rows.map((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));

  const isOwner = sceneData.ownerId === currentAccount?.id;
  scene.showScene({ name: sceneData.name, isPublic: sceneData.isPublic, isOwner });
  $('scene-description').textContent = `Viewing "${sceneData.name}", a ${sceneData.isPublic ? 'public' : 'private'} scene${isOwner ? ' you own' : ''}. ${annotations.length} annotation(s). ${scene.isAnimating() ? 'The marker turns gently.' : 'Animation is paused.'}`;

  renderAnnotations(annotations);
}

// TODO 1: every annotation is inserted with innerHTML, so any HTML an
// annotation's text happens to contain becomes real markup in every later
// viewer's page -- including a <script> or an onerror handler on an <img>.
// Combined with routes.js's TODO 1 (annotation text is stored exactly as
// typed, unsanitised), a note left by any signed-in user runs as script in
// the browser of anyone who later opens this scene, including its owner.
// See MDN's Cross-Site Scripting article and the README's "What went
// wrong" table.
function renderAnnotations(annotations) {
  const list = $('annotation-list');
  list.innerHTML = annotations.map((a) => `<li>${a.text}</li>`).join('');
}

async function openScene(id) {
  const errors = $('open-scene-errors');
  errors.replaceChildren();
  const { ok, body } = await api(`/api/scenes/${encodeURIComponent(id)}`);
  if (!ok) {
    showFieldErrors(errors, body);
    return;
  }
  renderSceneDetail(body.scene, body.annotations);
}

// --- WebSocket chat ----------------------------------------------------------

// TODO 2: every chat line is inserted with innerHTML. Combined with
// realtime.js's TODO 2 (chat text is relayed exactly as typed, unsanitised),
// a message containing "<img src=x onerror=alert(document.cookie)>" runs
// as script the instant it arrives in every open tab -- see the README's
// "What went wrong" table.
function appendChatMessage(username, text, { system = false } = {}) {
  const list = $('chat-list');
  const li = document.createElement('li');
  if (system) {
    li.className = 'chat-system';
    li.textContent = text;
  } else {
    li.innerHTML = `<strong>${username}:</strong> ${text}`;
  }
  list.append(li);
  $('chat-log').scrollTop = $('chat-log').scrollHeight;
}

function joinChat() {
  net = connectRoom('review-room', {
    onChat: (message) => appendChatMessage(message.username, message.text),
    onPresence: (message) => appendChatMessage(null, `${message.username} ${message.event === 'join' ? 'joined' : 'left'} the room.`, { system: true }),
    onError: (message) => setStatus(message, 'error'),
    onStatus: (text) => setStatus(text, text.startsWith('Connected') ? undefined : 'offline'),
  });
}

function leaveChat() {
  net?.stop();
  net = null;
}

// --- Loading what the page needs on open ------------------------------------

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
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  scene.setAnimating(!reducedMotion);

  const session = await loadMe();
  if (session.offline) {
    setStatus('Server not running: sign-in and the app need the Node.js server (see completed/README.md).', 'offline');
  }
  currentAccount = session.account ?? null;
  csrfToken = session.csrfToken ?? null;

  if (currentAccount) {
    showSignedIn(currentAccount);
    await loadMyScenes();
    joinChat();
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
  });

  $('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('register-errors');
    errorsList.replaceChildren();
    const username = $('register-username').value.trim().toLowerCase();
    const password = $('register-password').value;
    const { ok, status, body } = await api('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (ok || status === 201) {
      $('register-form').reset();
      $('login-username').value = username;
      setStatus('Account created. Sign in below.');
      $('login-username').focus();
      return;
    }
    showFieldErrors(errorsList, body);
  });

  $('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('login-errors');
    errorsList.replaceChildren();
    const username = $('login-username').value.trim().toLowerCase();
    const password = $('login-password').value;
    const { ok, body } = await api('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!ok) {
      showFieldErrors(errorsList, body);
      return;
    }
    currentAccount = body.account;
    csrfToken = body.csrfToken;
    $('login-form').reset();
    showSignedIn(currentAccount);
    await loadMyScenes();
    joinChat();
    setStatus(`Signed in as ${currentAccount.username}.`);
  });

  $('logout-button').addEventListener('click', async () => {
    await api('/api/auth/logout', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfToken },
    }).catch(() => {});
    leaveChat();
    currentAccount = null;
    csrfToken = null;
    showSignedOut();
    setStatus('Signed out.');
  });

  $('create-scene-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('scene-errors');
    errorsList.replaceChildren();
    const name = $('scene-name').value.trim();
    const isPublic = $('scene-public').checked;
    const latValue = $('scene-lat').value;
    const lngValue = $('scene-lng').value;
    const payload = { name, isPublic };
    if (latValue !== '' && lngValue !== '') {
      payload.locationLat = Number(latValue);
      payload.locationLng = Number(lngValue);
    }
    const { ok, body } = await api('/api/scenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      body: JSON.stringify(payload),
    });
    if (!ok) {
      showFieldErrors(errorsList, body);
      return;
    }
    $('create-scene-form').reset();
    await loadMyScenes();
  });

  $('open-scene-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await openScene($('open-scene-id').value.trim());
  });

  $('annotation-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('annotation-errors');
    errorsList.replaceChildren();
    if (!currentScene) return;
    const text = $('annotation-text').value.trim();
    const { ok, body } = await api(`/api/scenes/${encodeURIComponent(currentScene.id)}/annotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      body: JSON.stringify({ text }),
    });
    if (!ok) {
      showFieldErrors(errorsList, body);
      return;
    }
    $('annotation-text').value = '';
    await openScene(currentScene.id);
  });

  $('chat-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('chat-input');
    const text = input.value.trim();
    if (text.length === 0 || !net) return;
    net.sendChat(text);
    input.value = '';
  });
}

init();
