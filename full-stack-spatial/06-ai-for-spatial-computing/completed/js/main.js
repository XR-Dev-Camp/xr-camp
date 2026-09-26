// main.js: the scene manager, the search box, and the AI description tool.
// No three.js API appears in this file — scene.js (carried over unchanged
// from Course 5.3) owns that — and no fetch() appears in scene.js. Every
// value the AI tools show (a draft description, a search result, "data
// sent") is exactly what the server sent back; this file never invents or
// rewords any of it.

import { createScene, defaultObjects, EXHIBITS } from './scene.js';

const $ = (id) => document.getElementById(id);

let scene = null;
let currentSceneId = null; // id of the loaded scene, or null for an unsaved arrangement
let currentScene = null; // the full scene object last loaded from the server
let allScenes = [];

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

async function fetchJson(path, options) {
  const res = await fetch(path, options);
  return res;
}

// --- The always-present 2D description (not AI: built from the same data
// the 3D view renders, the same way every 3D lesson in this course does it,
// so the picture, the table, and this sentence can never disagree). -------

function renderObjectTable(objects) {
  const tbody = $('object-table-body');
  tbody.replaceChildren(...EXHIBITS.map((item) => {
    const object = objects.find((o) => o.exhibitId === item.id) ?? { position: { x: 0, y: 0, z: 0 }, rotationY: 0 };
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.scope = 'row';
    nameCell.textContent = item.name;
    row.append(nameCell, cellFor(object.position.x), cellFor(object.position.y), cellFor(object.position.z), cellFor(object.rotationY));
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
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Remove';
    button.setAttribute('aria-label', `Remove annotation: ${annotation.text}`);
    button.addEventListener('click', () => removeAnnotation(annotation.id));
    li.append(text, ' ', button);
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
    position: { x: Number($(`transform-${item.id}-x`).value) || 0, y: 0, z: Number($(`transform-${item.id}-z`).value) || 0 },
    rotationY: Number($(`transform-${item.id}-rotationY`).value) || 0,
  }));
}

function onTransformInputChange() {
  const objects = readObjectsFromForm();
  scene.applyObjects(objects);
  renderObjectTable(objects);
  updateDescription(objects, scene.isAnimating());
}

// --- AI description tool ----------------------------------------------------

function resetDraftBox() {
  $('ai-draft-box').hidden = true;
  $('ai-draft-textarea').value = '';
  $('ai-draft-provider').textContent = '';
  $('ai-draft-warnings').replaceChildren();
  $('ai-draft-data-sent').textContent = '';
  $('ai-draft-errors').replaceChildren();
}

function renderSavedDescription(scene) {
  $('saved-description').textContent = scene.description ? scene.description : 'None yet.';
}

async function generateDescription() {
  if (!currentSceneId) { setStatus('Save this arrangement as a scene first.', 'error'); return; }
  $('generate-description-button').disabled = true;
  try {
    const res = await fetchJson(`/api/scenes/${currentSceneId}/describe`, { method: 'POST' });
    const body = await res.json();
    if (!res.ok) { setStatus(body.error ?? 'Could not generate a description.', 'error'); return; }
    $('ai-draft-box').hidden = false;
    $('ai-draft-textarea').value = body.description;
    $('ai-draft-provider').textContent = `Drafted by the "${body.provider}" provider from this scene's own data.`;
    $('ai-draft-warnings').replaceChildren(...body.warnings.map((warning) => {
      const li = document.createElement('li');
      li.textContent = `Check this before saving: ${warning}`;
      return li;
    }));
    $('ai-draft-data-sent').textContent = JSON.stringify(body.dataSent, null, 2);
    setStatus('Draft ready. Read it, edit it if needed, then save or discard it.');
  } catch {
    setStatus('Server not running: the AI tools need the Node.js server.', 'offline');
  } finally {
    $('generate-description-button').disabled = false;
  }
}

async function saveDescription() {
  if (!currentSceneId) return;
  const errorsList = $('ai-draft-errors');
  errorsList.replaceChildren();
  try {
    const res = await fetchJson(`/api/scenes/${currentSceneId}/description`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: $('ai-draft-textarea').value }),
    });
    const body = await res.json();
    if (!res.ok) { showFieldErrors(errorsList, body); return; }
    currentScene = body;
    renderSavedDescription(currentScene);
    resetDraftBox();
    setStatus('Description saved.');
  } catch {
    setStatus('Server not running: the description could not be saved.', 'error');
  }
}

// --- Loading and saving scenes ------------------------------------------------

function loadSceneIntoView(fullScene) {
  currentSceneId = fullScene.id;
  currentScene = fullScene;
  scene.applyObjects(fullScene.objects);
  scene.setAnnotationMarkers(fullScene.annotations);
  applyObjectsToForm(fullScene.objects);
  renderObjectTable(fullScene.objects);
  renderAnnotationList(fullScene.annotations);
  updateDescription(fullScene.objects, scene.isAnimating());
  renderSavedDescription(fullScene);
  resetDraftBox();
  $('scene-name-input').value = fullScene.name;
  $('scene-public-input').checked = fullScene.isPublic;
  $('current-scene-heading').textContent = fullScene.name;
  $('delete-scene-button').hidden = false;
}

function loadDefaultView() {
  currentSceneId = null;
  currentScene = null;
  const objects = defaultObjects();
  scene.applyObjects(objects);
  scene.setAnnotationMarkers([]);
  applyObjectsToForm(objects);
  renderObjectTable(objects);
  renderAnnotationList([]);
  updateDescription(objects, scene.isAnimating());
  renderSavedDescription({ description: null });
  resetDraftBox();
  $('scene-name-input').value = '';
  $('scene-public-input').checked = true;
  $('current-scene-heading').textContent = 'Unsaved arrangement';
  $('delete-scene-button').hidden = true;
}

async function refreshScenesList() {
  try {
    const res = await fetchJson('/api/scenes');
    allScenes = res.ok ? await res.json() : [];
    renderScenesList(allScenes);
  } catch {
    setStatus('Server not running: scenes need the Node.js server (see completed/README.md). The exhibit below shows its default arrangement.', 'offline');
  }
}

function renderScenesList(scenes) {
  const list = $('scenes-list');
  if (scenes.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No saved scenes yet.';
    list.replaceChildren(li);
    return;
  }
  list.replaceChildren(...scenes.map((summary) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${summary.name}${summary.isPublic ? '' : ' — private'}`;
    button.addEventListener('click', () => openScene(summary.id));
    li.append(button);
    return li;
  }));
}

async function openScene(id) {
  try {
    const res = await fetchJson(`/api/scenes/${id}`);
    if (!res.ok) throw new Error('failed');
    loadSceneIntoView(await res.json());
    setStatus(`Loaded "${currentScene.name}".`);
  } catch {
    setStatus('Could not load that scene.', 'error');
  }
}

async function saveScene({ asNew }) {
  const errorsList = $('scene-form-errors');
  errorsList.replaceChildren();
  const body = { name: $('scene-name-input').value.trim(), isPublic: $('scene-public-input').checked, objects: readObjectsFromForm() };
  try {
    const useUpdate = !asNew && currentSceneId;
    const res = await fetchJson(useUpdate ? `/api/scenes/${currentSceneId}` : '/api/scenes', {
      method: useUpdate ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const responseBody = await res.json().catch(() => ({}));
    if (!res.ok) { showFieldErrors(errorsList, responseBody); return; }
    loadSceneIntoView(responseBody);
    await refreshScenesList();
    setStatus(`Saved "${responseBody.name}".`);
  } catch {
    setStatus('Server not running: your scene could not be saved.', 'error');
  }
}

async function deleteCurrentScene() {
  if (!currentSceneId) return;
  try {
    const res = await fetchJson(`/api/scenes/${currentSceneId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('failed');
    loadDefaultView();
    await refreshScenesList();
    setStatus('Scene deleted.');
  } catch {
    setStatus('Server not running: the scene could not be deleted.', 'error');
  }
}

async function addAnnotation(event) {
  event.preventDefault();
  const errorsList = $('annotation-errors');
  errorsList.replaceChildren();
  if (!currentSceneId) { setStatus('Save this arrangement as a scene first.', 'error'); return; }
  const exhibitId = $('annotation-exhibit').value;
  const text = $('annotation-text').value.trim();
  try {
    const res = await fetchJson(`/api/scenes/${currentSceneId}/annotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exhibitId, text }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) { showFieldErrors(errorsList, body); return; }
    $('annotation-text').value = '';
    await openScene(currentSceneId);
    setStatus('Annotation added.');
  } catch {
    setStatus('Server not running: the annotation could not be saved.', 'error');
  }
}

async function removeAnnotation(annotationId) {
  if (!currentSceneId) return;
  try {
    const res = await fetchJson(`/api/scenes/${currentSceneId}/annotations/${annotationId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('failed');
    await openScene(currentSceneId);
    setStatus('Annotation removed.');
  } catch {
    setStatus('Server not running: the annotation could not be removed.', 'error');
  }
}

// --- Natural-language search ---------------------------------------------

async function searchScenes() {
  const errorsList = $('search-errors');
  errorsList.replaceChildren();
  const query = $('search-query').value.trim();
  if (query.length === 0) { showFieldErrors(errorsList, { error: 'Type something to search for.' }); return; }

  $('search-button').disabled = true;
  try {
    const res = await fetchJson('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const body = await res.json();
    if (!res.ok) { showFieldErrors(errorsList, body); return; }
    $('search-explanation').textContent = body.explanation
      + (body.dropped.length > 0 ? ` (The AI provider named ${body.dropped.length} scene id(s) that do not exist; they were dropped.)` : '');
    renderSearchResults(body.matches);
  } catch {
    setStatus('Server not running: search needs the Node.js server.', 'offline');
  } finally {
    $('search-button').disabled = false;
  }
}

function renderSearchResults(matches) {
  const list = $('search-results');
  if (matches.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No matching scenes.';
    list.replaceChildren(li);
    return;
  }
  list.replaceChildren(...matches.map(({ scene: matchScene, reason }) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = matchScene.name;
    button.addEventListener('click', () => openScene(matchScene.id));
    const explanation = document.createElement('p');
    explanation.className = 'hint';
    explanation.textContent = reason;
    li.append(button, explanation);
    return li;
  }));
}

// --- Wiring ----------------------------------------------------------------

async function loadAiStatus() {
  try {
    const res = await fetch('/api/ai/status');
    const body = await res.json();
    $('ai-provider-status').textContent = `AI provider: "${body.provider}"${body.model ? ` (model: ${body.model})` : ''}. ${body.disclosure}`;
  } catch {
    $('ai-provider-status').textContent = 'Server not running: AI provider status is unavailable.';
  }
}

async function init() {
  scene = createScene($('canvas-box'));
  buildTransformForm();
  loadDefaultView();

  await loadAiStatus();
  await refreshScenesList();

  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    scene.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription(readObjectsFromForm(), on);
  }
  setAnimating(window.__reducedMotion !== true);
  pauseButton.addEventListener('click', () => setAnimating(!scene.isAnimating()));

  $('save-scene-button').addEventListener('click', () => saveScene({ asNew: false }));
  $('save-as-new-button').addEventListener('click', () => saveScene({ asNew: true }));
  $('delete-scene-button').addEventListener('click', deleteCurrentScene);
  $('new-scene-button').addEventListener('click', loadDefaultView);
  $('annotation-form').addEventListener('submit', addAnnotation);

  $('generate-description-button').addEventListener('click', generateDescription);
  $('save-description-button').addEventListener('click', saveDescription);
  $('discard-description-button').addEventListener('click', resetDraftBox);

  $('search-button').addEventListener('click', searchScenes);
  $('search-query').addEventListener('keydown', (event) => { if (event.key === 'Enter') searchScenes(); });
}

init();
