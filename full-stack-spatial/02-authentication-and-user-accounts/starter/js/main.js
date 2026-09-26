// main.js: the account panel, the settings panel, and the curator's note.
// No three.js API appears in this file — scene.js owns that — and no
// fetch() appears in scene.js. Each file has one job, the same rule
// Course 5.1 (and Course 3.4 before it) used.
//
// Every fetch() you write below should send `credentials: 'include'`, so
// the browser attaches the session cookie the server sets at login; every
// request that changes something (a PUT, a POST past login, or a DELETE)
// should also send the CSRF token the server hands back at login or on GET
// /api/auth/me, in an X-CSRF-Token header.

import { createScene, EXHIBITS } from './scene.js';

const $ = (id) => document.getElementById(id);

const DEFAULT_SETTINGS = {
  visibleExhibits: ['clay-pot', 'basket-ring', 'jade-stone'],
  cameraStart: 'front',
  language: 'en',
  reducedMotion: false,
};
const LANGUAGE_LABELS = { en: 'English', 'es-419': 'Español', 'zh-Hans': '简体中文' };

let scene = null;
let currentAccount = null; // the public account object, or null when signed out
let csrfToken = null;

// --- Finished: small display helpers ---------------------------------------

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
  $('account-role').textContent = account.role;
  $('settings-form').hidden = false;
  $('settings-locked-message').hidden = true;
  $('privacy-section').hidden = false;
  $('privacy-toggle').checked = account.privacySharesSettings;
  if (account.role === 'curator') {
    $('curator-note-form').hidden = false;
    $('curator-dashboard').hidden = false;
    loadCuratorDashboard();
  } else {
    $('curator-note-form').hidden = true;
    $('curator-dashboard').hidden = true;
  }
}

function showSignedOut() {
  $('signed-in-view').hidden = true;
  $('signed-out-view').hidden = false;
  $('settings-form').hidden = true;
  $('settings-locked-message').hidden = false;
  $('curator-note-form').hidden = true;
  $('curator-dashboard').hidden = true;
  $('privacy-section').hidden = true;
}

function applyToForm(settings) {
  for (const item of EXHIBITS) {
    $(`exhibit-${item.id}`).checked = settings.visibleExhibits.includes(item.id);
  }
  const cameraInput = document.querySelector(`input[name="cameraStart"][value="${settings.cameraStart}"]`);
  if (cameraInput) cameraInput.checked = true;
  $('language').value = settings.language;
  $('reduced-motion').checked = settings.reducedMotion;
}

function readSettingsForm() {
  return {
    visibleExhibits: EXHIBITS.filter((item) => $(`exhibit-${item.id}`).checked).map((item) => item.id),
    cameraStart: document.querySelector('input[name="cameraStart"]:checked')?.value ?? 'front',
    language: $('language').value,
    reducedMotion: $('reduced-motion').checked,
  };
}

function renderExhibitList(settings) {
  const list = $('exhibit-list');
  list.replaceChildren(...EXHIBITS.map((item) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = item.name;
    const shown = settings.visibleExhibits.includes(item.id);
    li.append(strong, document.createTextNode(` — ${item.made}. ${shown ? 'Shown in the exhibit.' : 'Hidden by these settings.'}`));
    return li;
  }));
}

function updateDescription(settings, animating) {
  const shown = EXHIBITS.filter((item) => settings.visibleExhibits.includes(item.id)).map((item) => item.name.toLowerCase());
  const parts = [];
  parts.push(shown.length > 0
    ? `The exhibit shows: ${shown.join(', ')}.`
    : 'No exhibits are shown: every exhibit is hidden in these settings.');
  parts.push(`The camera starts at the ${settings.cameraStart} view.`);
  parts.push(animating ? 'The jade stone turns slowly, when it is shown.' : 'Animation is paused: nothing is turning right now.');
  parts.push(`Language preference: ${LANGUAGE_LABELS[settings.language] ?? settings.language}.`);
  $('scene-description').textContent = parts.join(' ');
}

function renderCuratorNote(note) {
  if (!note) {
    $('curator-note-text').textContent = 'The curator note is unavailable: the server is not running.';
    $('curator-note-meta').textContent = '';
    return;
  }
  $('curator-note-text').textContent = note.text;
  $('curator-note-meta').textContent = note.updatedBy
    ? `Last updated by ${note.updatedBy}.`
    : 'No curator has written a note yet.';
  $('curator-note-input').value = note.text;
}

async function loadCuratorDashboard() {
  try {
    const res = await fetch('/api/curator/accounts', { credentials: 'include' });
    if (!res.ok) throw new Error('failed');
    const accounts = await res.json();
    const list = $('curator-dashboard-list');
    if (accounts.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No account has chosen to share its settings yet.';
      list.replaceChildren(li);
      return;
    }
    list.replaceChildren(...accounts.map((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.username}: ${entry.settings.visibleExhibits.join(', ')} (${entry.settings.cameraStart} view)`;
      return li;
    }));
  } catch {
    // The dashboard is a curator convenience, not core functionality.
  }
}

// --- TODO 17: loading what the page needs on open --------------------------
//
// loadMe() should:
//   1. try { const res = await fetch('/api/auth/me', { credentials:
//      'include' }); }.
//   2. If res.status === 401, return { signedIn: false, offline: false }
//      (the server is running, but nobody is signed in).
//   3. If !res.ok for any other reason, throw (so the catch below runs).
//   4. On success, return { signedIn: true, offline: false, account:
//      body.account, csrfToken: body.csrfToken } from the parsed JSON body.
//   5. In the catch block (a network error, or a plain static server that
//      answers every /api/... path with its own 404 page), return
//      { signedIn: false, offline: true } — this function must never
//      reject, the same rule Course 5.1's loadSettings() followed.
//
// fetchSettings() should fetch('/api/settings', { credentials: 'include' }),
// return its parsed JSON on success, or structuredClone(DEFAULT_SETTINGS)
// if the request fails for any reason.
//
// fetchCuratorNote() should fetch('/api/curator/note', { credentials:
// 'include' }), return its parsed JSON on success, or null if it fails.
async function loadMe() {
  return { signedIn: false, offline: true }; // replace with the real logic above
}

async function fetchSettings() {
  return structuredClone(DEFAULT_SETTINGS); // replace with the real logic above
}

async function fetchCuratorNote() {
  return null; // replace with the real logic above
}

// --- Wiring ------------------------------------------------------------------

async function init() {
  scene = createScene($('canvas-box'));

  const session = await loadMe();
  if (session.offline) {
    setStatus('Server not running: signing in and saving settings need the Node.js server (see completed/README.md). The exhibit below shows its defaults.', 'offline');
  }

  currentAccount = session.account ?? null;
  csrfToken = session.csrfToken ?? null;

  let settings;
  if (currentAccount) {
    showSignedIn(currentAccount);
    settings = await fetchSettings();
    applyToForm(settings);
  } else {
    showSignedOut();
    settings = { ...structuredClone(DEFAULT_SETTINGS), reducedMotion: window.__reducedMotion === true };
  }
  scene.applySettings(settings);
  renderExhibitList(settings);

  const note = await fetchCuratorNote();
  renderCuratorNote(note);

  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    scene.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription(currentAccount ? readSettingsForm() : settings, on);
  }
  setAnimating(scene.isAnimating());
  pauseButton.addEventListener('click', () => setAnimating(!scene.isAnimating()));

  // --- TODO 18: the account forms (register, login, logout, recovery) ---
  //
  // register-form's submit handler should: event.preventDefault(); POST
  // { username, password } (read from #register-username/#register-password)
  // as JSON to /api/auth/register with credentials: 'include'. On status
  // 201, show the returned recoveryCode in #recovery-code-output and
  // un-hide #recovery-code-box, reset the form, copy the username into
  // #login-username, and setStatus(...). On any other response, call
  // showFieldErrors($('register-errors'), await res.json()). Wrap the fetch
  // in try/catch for the offline case (setStatus with kind 'offline').
  //
  // login-form's submit handler should POST to /api/auth/login the same
  // way; on success, set currentAccount and csrfToken from the response
  // body, call showSignedIn(currentAccount), reload settings with
  // fetchSettings()/applyToForm()/scene.applySettings()/renderExhibitList(),
  // and setAnimating(scene.isAnimating()) so the description stays correct.
  //
  // logout-button's click handler should POST to /api/auth/logout with the
  // X-CSRF-Token header set to csrfToken, then (whether or not that request
  // succeeds) clear currentAccount and csrfToken, call showSignedOut(), and
  // reset the exhibit to DEFAULT_SETTINGS.
  //
  // recovery-toggle's click handler should flip #recovery-form's `hidden`
  // and its own aria-expanded, the same disclosure-button pattern you may
  // have seen elsewhere in this course.
  //
  // recovery-form's submit handler should POST { username, recoveryCode,
  // newPassword } to /api/auth/recover; on success, show the new recovery
  // code in #new-recovery-code-output, reset the form, and copy the
  // username into #login-username; otherwise showFieldErrors.
  $('register-form').addEventListener('submit', (event) => {
    event.preventDefault(); // TODO 18: replace with the real handler above
  });

  $('login-form').addEventListener('submit', (event) => {
    event.preventDefault(); // TODO 18: replace with the real handler above
  });

  $('logout-button').addEventListener('click', () => {
    // TODO 18: replace with the real handler above
  });

  $('recovery-toggle').addEventListener('click', () => {
    // TODO 18: replace with the real handler above
  });

  $('recovery-form').addEventListener('submit', (event) => {
    event.preventDefault(); // TODO 18: replace with the real handler above
  });

  // --- TODO 19: the settings form and the curator's note ---
  //
  // settings-form's submit handler should: event.preventDefault(); read
  // next = readSettingsForm(); if next.visibleExhibits.length === 0, show
  // an error next to the form and focus #exhibit-clay-pot, then return.
  // Otherwise PUT `next` as JSON to /api/settings, with credentials:
  // 'include' and an X-CSRF-Token header set to csrfToken. On a 400,
  // showFieldErrors. On success, update `settings` to the response body,
  // and call scene.applySettings(settings), renderExhibitList(settings),
  // setAnimating(scene.isAnimating()), and setStatus('Settings saved.').
  //
  // reset-button's click handler should DELETE /api/settings the same way
  // (with the CSRF header), then reload with fetchSettings(), applyToForm,
  // scene.applySettings, renderExhibitList, and setAnimating.
  //
  // curator-note-form's submit handler should PUT { text:
  // $('curator-note-input').value.trim() } to /api/curator/note (with the
  // CSRF header); on success, call renderCuratorNote(await res.json());
  // otherwise showFieldErrors.
  $('settings-form').addEventListener('submit', (event) => {
    event.preventDefault(); // TODO 19: replace with the real handler above
  });

  $('reset-button').addEventListener('click', () => {
    // TODO 19: replace with the real handler above
  });

  $('curator-note-form').addEventListener('submit', (event) => {
    event.preventDefault(); // TODO 19: replace with the real handler above
  });

  // --- TODO 20: privacy, export, and account deletion ---
  //
  // privacy-toggle's change handler should PUT { privacySharesSettings:
  // $('privacy-toggle').checked } to /api/account/privacy (with the CSRF
  // header); on success, update currentAccount to the response body and
  // setStatus(...); on failure, flip the checkbox back and setStatus with
  // kind 'error'.
  //
  // export-button's click handler should GET /api/account/export, build a
  // Blob from JSON.stringify(data, null, 2) with type 'application/json',
  // create an object URL with URL.createObjectURL, and trigger a download
  // with a temporary <a download> element (append it, click it, remove it,
  // then URL.revokeObjectURL the url).
  //
  // delete-form's submit handler should: event.preventDefault(); DELETE
  // /api/account with { password: $('delete-password').value } as the JSON
  // body (and the CSRF header). On a non-ok response, showFieldErrors with
  // the parsed body. On success, clear currentAccount and csrfToken, reset
  // the form, call showSignedOut(), and reset the exhibit to
  // DEFAULT_SETTINGS.
  $('privacy-toggle').addEventListener('change', () => {
    // TODO 20: replace with the real handler above
  });

  $('export-button').addEventListener('click', () => {
    // TODO 20: replace with the real handler above
  });

  $('delete-form').addEventListener('submit', (event) => {
    event.preventDefault(); // TODO 20: replace with the real handler above
  });
}

init();
