// main.js: the account panel and the scene manager. No three.js API appears
// in this file — scene.js owns that — and no fetch() appears in scene.js.
// Each file has one job, the same rule Courses 3.4, 5.1, and 5.2 used.
//
// Every fetch() below sends `credentials: 'include'`, so the browser
// attaches the session cookie the server set at login; every request that
// changes something also sends the CSRF token the server handed back at
// login, in an X-CSRF-Token header — see Course 5.2's README for why a
// cookie alone cannot prove that.

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

// --- Account view state -------------------------------------------------

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

// --- The always-present 2D description ------------------------------------
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

// --- Transform form (position x/y/z, rotation), keyboard-only, no drag -----

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

// --- Loading scenes ----------------------------------------------------------

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

async function fetchJson(path, options) {
  const res = await fetch(path, { credentials: 'include', ...options });
  return res;
}

async function refreshSceneLists() {
  try {
    const [mineRes, publicRes] = await Promise.all([
      currentAccount ? fetchJson('/api/scenes') : Promise.resolve(null),
      fetchJson('/api/scenes/public'),
    ]);
    const mine = mineRes && mineRes.ok ? await mineRes.json() : [];
    const publicScenes = publicRes.ok ? await publicRes.json() : [];

    renderSceneList($('my-scenes-list'), mine, 'No saved scenes yet.');
    renderSceneList($('public-scenes-list'), publicScenes, 'No public scenes yet.');
  } catch {
    setStatus('Server not running: scene lists need the Node.js server.', 'offline');
  }
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

async function openScene(sceneId) {
  try {
    const res = await fetchJson(`/api/scenes/${sceneId}`);
    if (!res.ok) throw new Error('failed');
    loadSceneIntoView(await res.json());
    setStatus(`Loaded "${currentScene.name}".`);
  } catch {
    setStatus('Could not load that scene.', 'error');
  }
}

// --- Saving, deleting, annotating --------------------------------------------

async function saveScene({ asNew }) {
  const errorsList = $('scene-form-errors');
  errorsList.replaceChildren();
  const body = {
    name: $('scene-name-input').value.trim(),
    isPublic: $('scene-public-input').checked,
    objects: readObjectsFromForm(),
  };
  try {
    const useUpdate = !asNew && currentScene;
    const res = await fetchJson(useUpdate ? `/api/scenes/${currentScene.id}` : '/api/scenes', {
      method: useUpdate ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      body: JSON.stringify(body),
    });
    const responseBody = await res.json().catch(() => ({}));
    if (!res.ok) {
      showFieldErrors(errorsList, responseBody);
      return;
    }
    loadSceneIntoView(responseBody);
    await refreshSceneLists();
    setStatus(`Saved "${responseBody.name}".`);
  } catch {
    setStatus('Server not running: your scene could not be saved.', 'error');
  }
}

async function deleteCurrentScene() {
  if (!currentScene) return;
  try {
    const res = await fetchJson(`/api/scenes/${currentScene.id}`, {
      method: 'DELETE',
      headers: { 'X-CSRF-Token': csrfToken },
    });
    if (!res.ok) throw new Error('failed');
    loadDefaultView();
    await refreshSceneLists();
    setStatus('Scene deleted.');
  } catch {
    setStatus('Server not running: the scene could not be deleted.', 'error');
  }
}

async function addAnnotation(event) {
  event.preventDefault();
  const errorsList = $('annotation-errors');
  errorsList.replaceChildren();
  if (!currentScene) return;
  const exhibitId = $('annotation-exhibit').value;
  const text = $('annotation-text').value.trim();
  try {
    const res = await fetchJson(`/api/scenes/${currentScene.id}/annotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      body: JSON.stringify({ exhibitId, text }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      showFieldErrors(errorsList, body);
      return;
    }
    $('annotation-text').value = '';
    await openScene(currentScene.id);
    setStatus('Annotation added.');
  } catch {
    setStatus('Server not running: the annotation could not be saved.', 'error');
  }
}

async function removeAnnotation(annotationId) {
  if (!currentScene) return;
  try {
    const res = await fetchJson(`/api/scenes/${currentScene.id}/annotations/${annotationId}`, {
      method: 'DELETE',
      headers: { 'X-CSRF-Token': csrfToken },
    });
    if (!res.ok) throw new Error('failed');
    await openScene(currentScene.id);
    setStatus('Annotation removed.');
  } catch {
    setStatus('Server not running: the annotation could not be removed.', 'error');
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

  // --- Scene forms ---

  $('save-scene-button').addEventListener('click', () => saveScene({ asNew: false }));
  $('save-as-new-button').addEventListener('click', () => saveScene({ asNew: true }));
  $('delete-scene-button').addEventListener('click', deleteCurrentScene);
  $('new-scene-button').addEventListener('click', loadDefaultView);
  $('annotation-form').addEventListener('submit', addAnnotation);
}

init();
