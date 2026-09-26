// main.js: the account panel, the settings panel, and the curator's note.
// No three.js API appears in this file — scene.js owns that — and no
// fetch() appears in scene.js. Each file has one job, the same rule
// Course 5.1 (and Course 3.4 before it) used.
//
// Every fetch() below sends `credentials: 'include'`, so the browser
// attaches the session cookie the server set at login; every request that
// changes something (a PUT, a POST past login, or a DELETE) also sends the
// CSRF token the server handed back at login or on GET /api/auth/me, in an
// X-CSRF-Token header — see the README's "Key code explained" for why a
// cookie alone cannot prove that.

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

// --- Account view state -------------------------------------------------

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

// --- Form <-> settings object --------------------------------------------

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

// --- The always-present 2D description ------------------------------------
// Built from the same EXHIBITS list the scene is built from (WCAG 1.3.1):
// the words and the picture can never disagree about which objects exist.

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
    // The dashboard is a curator convenience, not core functionality: fail
    // quietly and leave the section as it was.
  }
}

// --- Loading what the page needs on open ----------------------------------

async function loadMe() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.status === 401) return { signedIn: false, offline: false };
    if (!res.ok) throw new Error(`GET /api/auth/me returned ${res.status}`);
    const body = await res.json();
    return { signedIn: true, offline: false, account: body.account, csrfToken: body.csrfToken };
  } catch {
    // No server at all, a network error, or (as in this repository's own
    // accessibility checks) a plain static file server that answers every
    // /api/... path with its own 404 page instead of JSON.
    return { signedIn: false, offline: true };
  }
}

async function fetchSettings() {
  try {
    const res = await fetch('/api/settings', { credentials: 'include' });
    if (!res.ok) throw new Error('failed');
    return await res.json();
  } catch {
    return structuredClone(DEFAULT_SETTINGS);
  }
}

async function fetchCuratorNote() {
  try {
    const res = await fetch('/api/curator/note', { credentials: 'include' });
    if (!res.ok) throw new Error('failed');
    return await res.json();
  } catch {
    return null;
  }
}

// --- Wiring ----------------------------------------------------------------

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
    // Nobody is signed in yet: the shared default view still respects this
    // device's reduced-motion request, the same first-run courtesy Course
    // 5.1's local fallback gave every visitor.
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
    updateDescription(readAppliedSettings(), on);
  }
  function readAppliedSettings() {
    return currentAccount ? readSettingsForm() : settings;
  }
  setAnimating(scene.isAnimating());
  pauseButton.addEventListener('click', () => setAnimating(!scene.isAnimating()));

  // --- Account forms ---

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
        $('recovery-code-output').textContent = body.recoveryCode;
        $('recovery-code-box').hidden = false;
        $('register-form').reset();
        $('login-username').value = username;
        setStatus('Account created. Save your recovery code, then sign in below.');
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
      settings = await fetchSettings();
      applyToForm(settings);
      scene.applySettings(settings);
      renderExhibitList(settings);
      setAnimating(scene.isAnimating());
      setStatus(`Signed in as ${currentAccount.username}.`);
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
      // Signing out client-side still happens below even if the request to
      // tell the server failed — there is nothing more useful to try.
    }
    currentAccount = null;
    csrfToken = null;
    showSignedOut();
    settings = { ...structuredClone(DEFAULT_SETTINGS), reducedMotion: window.__reducedMotion === true };
    scene.applySettings(settings);
    renderExhibitList(settings);
    setAnimating(scene.isAnimating());
    setStatus('Signed out.');
  });

  $('recovery-toggle').addEventListener('click', () => {
    const expanded = $('recovery-toggle').getAttribute('aria-expanded') === 'true';
    $('recovery-form').hidden = expanded;
    $('recovery-toggle').setAttribute('aria-expanded', String(!expanded));
  });

  $('recovery-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('recover-errors');
    errorsList.replaceChildren();
    const username = $('recover-username').value.trim().toLowerCase();
    const recoveryCode = $('recover-code').value.trim();
    const newPassword = $('recover-password').value;
    try {
      const res = await fetch('/api/auth/recover', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, recoveryCode, newPassword }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        showFieldErrors(errorsList, body);
        return;
      }
      $('new-recovery-code-output').textContent = body.recoveryCode;
      $('new-recovery-code-box').hidden = false;
      $('recovery-form').reset();
      $('login-username').value = username;
      setStatus('Password changed. Save your new recovery code, then sign in.');
    } catch {
      setStatus('Server not running: resetting a password needs the Node.js server.', 'offline');
    }
  });

  // --- Settings form ---

  $('settings-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('settings-errors');
    errorsList.replaceChildren();
    const next = readSettingsForm();
    if (next.visibleExhibits.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Show at least one exhibit.';
      errorsList.append(li);
      $('exhibit-clay-pot').focus();
      return;
    }
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify(next),
      });
      if (res.status === 400) {
        showFieldErrors(errorsList, await res.json());
        return;
      }
      if (!res.ok) throw new Error('save failed');
      settings = await res.json();
      scene.applySettings(settings);
      renderExhibitList(settings);
      setAnimating(scene.isAnimating());
      setStatus('Settings saved.');
    } catch {
      setStatus('Server not running: your settings could not be saved.', 'error');
    }
  });

  $('reset-button').addEventListener('click', async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'X-CSRF-Token': csrfToken },
      });
      if (!res.ok) throw new Error('reset failed');
      settings = await fetchSettings();
      applyToForm(settings);
      scene.applySettings(settings);
      renderExhibitList(settings);
      setAnimating(scene.isAnimating());
      $('settings-errors').replaceChildren();
      setStatus('Settings reset to defaults.');
    } catch {
      setStatus('Server not running: your settings could not be reset.', 'error');
    }
  });

  // --- Curator note ---

  $('curator-note-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('curator-note-errors');
    errorsList.replaceChildren();
    const text = $('curator-note-input').value.trim();
    try {
      const res = await fetch('/api/curator/note', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify({ text }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        showFieldErrors(errorsList, body);
        return;
      }
      renderCuratorNote(body);
      setStatus('Note saved.');
    } catch {
      setStatus('Server not running: the note could not be saved.', 'error');
    }
  });

  // --- Privacy, export, deletion ---

  $('privacy-toggle').addEventListener('change', async () => {
    const checked = $('privacy-toggle').checked;
    try {
      const res = await fetch('/api/account/privacy', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify({ privacySharesSettings: checked }),
      });
      if (!res.ok) throw new Error('failed');
      currentAccount = await res.json();
      setStatus(checked ? 'Your settings are now shared with curators.' : 'Your settings are private again.');
    } catch {
      $('privacy-toggle').checked = !checked;
      setStatus('Server not running: could not change your privacy setting.', 'error');
    }
  });

  $('export-button').addEventListener('click', async () => {
    try {
      const res = await fetch('/api/account/export', { credentials: 'include' });
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.username || 'my'}-xrcamp-account.json`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus('Your data was downloaded.');
    } catch {
      setStatus('Server not running: could not export your data.', 'error');
    }
  });

  $('delete-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorsList = $('delete-errors');
    errorsList.replaceChildren();
    const password = $('delete-password').value;
    try {
      const res = await fetch('/api/account', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        showFieldErrors(errorsList, await res.json().catch(() => ({})));
        return;
      }
      currentAccount = null;
      csrfToken = null;
      $('delete-form').reset();
      showSignedOut();
      settings = { ...structuredClone(DEFAULT_SETTINGS), reducedMotion: window.__reducedMotion === true };
      scene.applySettings(settings);
      renderExhibitList(settings);
      setAnimating(scene.isAnimating());
      setStatus('Your account was deleted.');
    } catch {
      setStatus('Server not running: could not delete your account.', 'error');
    }
  });
}

init();
