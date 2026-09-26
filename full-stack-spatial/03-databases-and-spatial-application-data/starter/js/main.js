// main.js: the account panel and the scene manager. No three.js API appears
// in this file — scene.js owns that — and no fetch() appears in scene.js.
// Each file has one job, the same rule Courses 3.4, 5.1, and 5.2 used.
//
// The account panel (forms, showSignedIn/showSignedOut, and their event
// listeners in init()) and every pure-rendering helper below are carried
// over from Course 5.2's pattern and finished for you. TODO 12 is the six
// functions that actually talk to /api/scenes* — loading, saving, deleting,
// and annotating a scene — this lesson's actual subject.
//
// Every fetch() below sends `credentials: 'include'`, so the browser
// attaches the session cookie the server set at login; every request that
// changes something also sends the CSRF token the server handed back at
// login, in an X-CSRF-Token header.

import { createScene, defaultObjects, EXHIBITS } from './scene.js';

const $ = (id) => document.getElementById(id);

let scene = null;
let currentAccount = null; // the public account object, or null when signed out
let csrfToken = null;
let currentScene = null; // the full scene (with objects + annotations) now shown, or null

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

function isOwner() {
  return Boolean(currentAccount && currentScene && currentScene.ownerId === currentAccount.id);
}

// --- Account view state (carried over from Course 5.2) --------------------

function showSignedIn(account) {
  $('signed-out-view').hidden = true;
  $('signed-in-view').hidden = false;
  $('account-username').textContent = account.username;
  $('scene-manager').hidden = false;
}

function showSignedOut() {
  $('signed-in-view').hidden = true;
  $('signed-out-view').hidden = false;
  $('scene-manager').hidden = true;
}

// --- The always-present 2D description (finished for you) ------------------
// Built from the same objects array the 3D view is built from (WCAG 1.3.1):
// the words, the table, and the picture can never disagree about where
// anything is.

function renderObjectTable(objects) {
  const tbody = $('object-table-body');
  tbody.replaceChildren(...EXHIBITS.map((item) => {
    const object = objects.find((o) => o.exhibitId === item.id) ?? { position: { x: 0, y: 0, z: 0 }, rotationY: 0 };
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.scope = 'row';
    nameCell.textContent = item.name;
    row.append(
      nameCell,
      cellFor(object.position.x), cellFor(object.position.y), cellFor(object.position.z), cellFor(object.rotationY),
    );
    return row;
  }));
}
function cellFor(value) {
  const cell = document.createElement('td');
  cell.textContent = Number(value).toFixed(1);
  return cell;
}

function updateDescription(objects, animating) {
  const parts = [`This scene places: ${objects.map((o) => EXHIBITS.find((e) => e.id === o.exhibitId)?.name.toLowerCase()).join(', ')}.`];
  parts.push(animating ? 'The jade stone turns slowly, when it is shown.' : 'Animation is paused: nothing is turning right now.');
  $('scene-description').textContent = parts.join(' ');
}

function renderAnnotationList(annotations) {
  const list = $('annotation-list');
  if (annotations.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No annotations on this scene yet.';
    list.replaceChildren(li);
    return;
  }
  list.replaceChildren(...annotations.map((annotation) => {
    const exhibitName = EXHIBITS.find((e) => e.id === annotation.exhibitId)?.name ?? annotation.exhibitId;
    const li = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = `${exhibitName}: ${annotation.text}`;
    li.append(text);
    if (isOwner()) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Remove';
      button.setAttribute('aria-label', `Remove annotation: ${annotation.text}`);
      button.addEventListener('click', () => removeAnnotation(annotation.id));
      li.append(' ', button);
    }
    return li;
  }));
}

// --- Transform form (finished for you): position x/z, rotation, keyboard
// only, no drag.

function buildTransformForm() {
  const container = $('transform-controls');
  container.replaceChildren(...EXHIBITS.map((item) => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = item.name;
    fieldset.append(legend);
    for (const [axis, label, step] of [['x', 'Left / right (x)', '0.1'], ['z', 'Forward / back (z)', '0.1'], ['rotationY', 'Turn (degrees)', '15']]) {
      const p = document.createElement('p');
      const inputId = `transform-${item.id}-${axis}`;
      const labelEl = document.createElement('label');
      labelEl.htmlFor = inputId;
      labelEl.textContent = label;
      const input = document.createElement('input');
      input.type = 'number';
      input.id = inputId;
      input.step = step;
      input.dataset.exhibit = item.id;
      input.dataset.axis = axis;
      input.disabled = true;
      input.addEventListener('change', onTransformInputChange);
      p.append(labelEl, document.createElement('br'), input);
      fieldset.append(p);
    }
    return fieldset;
  }));
}

function applyObjectsToForm(objects) {
  for (const object of objects) {
    $(`transform-${object.exhibitId}-x`).value = object.position.x;
    $(`transform-${object.exhibitId}-z`).value = object.position.z;
    $(`transform-${object.exhibitId}-rotationY`).value = object.rotationY;
  }
}

function readObjectsFromForm() {
  return EXHIBITS.map((item) => ({
    exhibitId: item.id,
    position: {
      x: Number($(`transform-${item.id}-x`).value) || 0,
      y: 0,
      z: Number($(`transform-${item.id}-z`).value) || 0,
    },
    rotationY: Number($(`transform-${item.id}-rotationY`).value) || 0,
  }));
}

function setTransformFormEnabled(enabled) {
  for (const input of document.querySelectorAll('#transform-controls input')) input.disabled = !enabled;
  $('save-scene-button').hidden = !enabled;
  $('save-as-new-button').hidden = !enabled;
  $('scene-name-input').disabled = !enabled;
  $('scene-public-input').disabled = !enabled;
}

function onTransformInputChange() {
  scene.applyObjects(readObjectsFromForm());
  renderObjectTable(readObjectsFromForm());
  updateDescription(readObjectsFromForm(), scene.isAnimating());
}

async function fetchJson(path, options) {
  return fetch(path, { credentials: 'include', ...options });
}

// --- Showing a scene (finished for you): pure rendering, no fetch() -------

function loadSceneIntoView(fullScene) {
  currentScene = fullScene;
  scene.applyObjects(fullScene.objects);
  scene.setAnnotationMarkers(fullScene.annotations);
  applyObjectsToForm(fullScene.objects);
  renderObjectTable(fullScene.objects);
  renderAnnotationList(fullScene.annotations);
  updateDescription(fullScene.objects, scene.isAnimating());
  $('scene-name-input').value = fullScene.name;
  $('scene-public-input').checked = fullScene.isPublic;
  $('current-scene-heading').textContent = fullScene.name;
  $('current-scene-owner').textContent = isOwner() ? 'You own this scene.' : `Owned by ${fullScene.ownerUsername}. You can view it, but only its owner can change it.`;
  setTransformFormEnabled(isOwner());
  $('annotation-form').hidden = !isOwner();
  $('delete-scene-button').hidden = !isOwner();
}

function loadDefaultView() {
  currentScene = null;
  const objects = defaultObjects();
  scene.applyObjects(objects);
  scene.setAnnotationMarkers([]);
  applyObjectsToForm(objects);
  renderObjectTable(objects);
  renderAnnotationList([]);
  updateDescription(objects, scene.isAnimating());
  $('scene-name-input').value = '';
  $('scene-public-input').checked = false;
  $('current-scene-heading').textContent = 'Unsaved arrangement';
  $('current-scene-owner').textContent = currentAccount
    ? 'Not saved yet: arrange the exhibit, then use "Save as a new scene" below.'
    : 'Sign in to save your own arrangement.';
  setTransformFormEnabled(Boolean(currentAccount));
  $('annotation-form').hidden = true;
  $('delete-scene-button').hidden = true;
}

function renderSceneList(list, scenes, emptyMessage) {
  if (scenes.length === 0) {
    const li = document.createElement('li');
    li.textContent = emptyMessage;
    list.replaceChildren(li);
    return;
  }
  list.replaceChildren(...scenes.map((summary) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${summary.name}${summary.ownerUsername ? ` (by ${summary.ownerUsername})` : ''}${summary.isPublic ? ' — public' : ' — private'}`;
    button.addEventListener('click', () => openScene(summary.id));
    li.append(button);
    return li;
  }));
}

// --- TODO 12: loading, saving, deleting, and annotating a scene ------------
// Every function below is a safe no-op for now — nothing here throws, so
// the rest of the page (the account panel, the default arrangement above)
// keeps working while you build these up one at a time. Replace each body
// with the real fetch() call the comment above it describes.

// refreshSceneLists() should GET /api/scenes (only if currentAccount is
// set) and GET /api/scenes/public with fetchJson, then hand each parsed
// array to renderSceneList(listElement, scenes, emptyMessage) — see
// renderSceneList above for its signature. Wrap both requests in a
// try/catch that calls setStatus(..., 'offline') on failure, the same rule
// every network call in this project follows.
async function refreshSceneLists() {
  // TODO 12: replace this with the real implementation described above.
}

// openScene(sceneId) should GET /api/scenes/<sceneId> with fetchJson, and
// call loadSceneIntoView with the parsed JSON on success.
async function openScene(sceneId) {
  // TODO 12: replace this with the real implementation described above.
}

// saveScene({ asNew }) should read #scene-name-input, #scene-public-input,
// and readObjectsFromForm() into a body object { name, isPublic, objects },
// then PUT /api/scenes/<currentScene.id> (when !asNew && currentScene) or
// POST /api/scenes (otherwise) with fetchJson, the Content-Type and
// X-CSRF-Token headers, and that body as JSON. On a non-ok response, show
// the field errors (see showFieldErrors) and return. On success,
// loadSceneIntoView(the response JSON), then await refreshSceneLists().
async function saveScene({ asNew }) {
  // TODO 12: replace this with the real implementation described above.
}

// deleteCurrentScene() should DELETE /api/scenes/<currentScene.id> (with the
// CSRF header) if currentScene is set, then loadDefaultView() and await
// refreshSceneLists() on success.
async function deleteCurrentScene() {
  // TODO 12: replace this with the real implementation described above.
}

// addAnnotation(event) should event.preventDefault(), read
// #annotation-exhibit and #annotation-text, POST
// /api/scenes/<currentScene.id>/annotations with those two fields as the
// body, then (on success) clear #annotation-text and reload the scene with
// await openScene(currentScene.id) so the new annotation appears.
async function addAnnotation(event) {
  event.preventDefault(); // keep this line — it stops the form reloading the page
  // TODO 12: replace the rest of this function with the implementation above.
}

// removeAnnotation(annotationId) should DELETE
// /api/scenes/<currentScene.id>/annotations/<annotationId> (with the CSRF
// header), then await openScene(currentScene.id) on success to refresh the
// list.
async function removeAnnotation(annotationId) {
  // TODO 12: replace this with the real implementation described above.
}

// --- Loading what the page needs on open (carried over from Course 5.2) ---

async function loadMe() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.status === 401) return { signedIn: false, offline: false };
    if (!res.ok) throw new Error(`GET /api/auth/me returned ${res.status}`);
    const body = await res.json();
    return { signedIn: true, offline: false, account: body.account, csrfToken: body.csrfToken };
  } catch {
    return { signedIn: false, offline: true };
  }
}

// --- Wiring ----------------------------------------------------------------

async function init() {
  scene = createScene($('canvas-box'));
  buildTransformForm();

  const session = await loadMe();
  if (session.offline) {
    setStatus('Server not running: signing in and saving scenes need the Node.js server (see completed/README.md). The exhibit below shows its default arrangement.', 'offline');
  }
  currentAccount = session.account ?? null;
  csrfToken = session.csrfToken ?? null;

  if (currentAccount) showSignedIn(currentAccount); else showSignedOut();
  loadDefaultView();
  if (!session.offline) await refreshSceneLists();

  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    scene.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription(readObjectsFromForm(), on);
  }
  setAnimating(window.__reducedMotion !== true);
  pauseButton.addEventListener('click', () => setAnimating(!scene.isAnimating()));

  // --- Account forms (carried over from Course 5.2) ---

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
      loadDefaultView();
      await refreshSceneLists();
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
      // Signing out client-side still happens below even if telling the
      // server failed — there is nothing more useful to try.
    }
    currentAccount = null;
    csrfToken = null;
    showSignedOut();
    loadDefaultView();
    await refreshSceneLists();
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
      loadDefaultView();
      await refreshSceneLists();
      setStatus('Your account, and every scene it owned, was deleted.');
    } catch {
      setStatus('Server not running: could not delete your account.', 'error');
    }
  });

  // --- Scene forms (TODO 12's functions, wired up here for you) ---

  $('save-scene-button').addEventListener('click', () => saveScene({ asNew: false }));
  $('save-as-new-button').addEventListener('click', () => saveScene({ asNew: true }));
  $('delete-scene-button').addEventListener('click', deleteCurrentScene);
  $('new-scene-button').addEventListener('click', loadDefaultView);
  $('annotation-form').addEventListener('submit', addAnnotation);
}

init();
