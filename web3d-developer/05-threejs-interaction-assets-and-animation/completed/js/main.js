// main.js: wires the page's buttons and text to the engine (app.js) and the
// exhibit's data (exhibit.js, describe.js). No three.js API appears in this
// file: it only reads and writes the DOM, and calls what the other modules
// export.

import { createApp } from './app.js';
import { describeExhibit } from './describe.js';
import { ITEMS } from './exhibit.js';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');
const reducedMotion = window.__reducedMotion === true;

function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

// --- The 2D fallback list ---------------------------------------------------
// Always present, not only a fallback (WCAG 1.3.1): every item's name and
// note, plus a loading/loaded/error word for the two models, which
// renderItemList() updates as their status changes.
function renderItemList(items) {
  const list = $('exhibit-list');
  list.replaceChildren(...ITEMS.map((data) => {
    const item = items?.find((i) => i.data.id === data.id);
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = data.name;
    let text = ` — ${data.note}`;
    if (data.kind === 'model' && item) {
      const label = item.status === 'loading' ? 'loading…' : item.status === 'error' ? `failed to load (${item.error})` : 'loaded';
      text = ` — ${label}. ${data.note}`;
    }
    li.append(strong, document.createTextNode(text));
    return li;
  }));
}
renderItemList();

// --- On-page attribution -----------------------------------------------------
// Populated once, from ITEMS, not written by hand in the HTML: the credit
// and licence text lives in exactly one place (exhibit.js), the same
// requirement this course applies to every other fact on a page.
function renderAttribution() {
  const list = $('attribution-list');
  list.replaceChildren(...ITEMS.filter((data) => data.kind === 'model').map((data) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = data.name;
    const credit = document.createElement('p');
    credit.textContent = data.credit;
    const license = document.createElement('p');
    const link = document.createElement('a');
    link.href = data.licenseUrl;
    link.textContent = data.licenseLabel;
    license.append('Licence: ', link);
    const source = document.createElement('p');
    const sourceLink = document.createElement('a');
    sourceLink.href = data.sourceUrl;
    sourceLink.textContent = 'Source (Khronos glTF-Sample-Assets)';
    source.append(sourceLink);
    li.append(strong, credit, license, source);
    return li;
  }));
}
renderAttribution();

if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
  $('no-webgl-message').hidden = false;
  $('scene-description').textContent = 'This browser cannot show the 3D exhibit: WebGL 2 is unavailable. The list above has the same information.';
} else {
  const loadingBar = $('loading-bar');
  const loadingStatus = $('loading-status');

  function onProgress({ loaded, total }) {
    if (!total) return;
    loadingBar.hidden = false;
    loadingBar.value = Math.round((loaded / total) * 100);
    loadingStatus.textContent = loaded < total
      ? `Loading models: ${Math.round((loaded / total) * 100)}%`
      : '';
    if (loaded >= total) loadingBar.hidden = true;
  }

  function onItemReady(item) {
    renderItemList(app.items);
    loadingStatus.textContent = `${item.data.name} loaded.`;
    updateDescription();
    updateStats();
  }

  function onItemError(item) {
    renderItemList(app.items);
    loadingStatus.textContent = `${item?.data.name ?? 'A model'} could not be loaded.`;
    updateDescription();
  }

  const app = createApp(container, { onProgress, onItemReady, onItemError });

  function updateDescription() {
    $('scene-description').textContent = describeExhibit({
      items: app.items,
      animating: app.isAnimating(),
      selectedId: app.getSelected()?.data.id ?? null,
    });
  }

  function updateStats() {
    const { render, memory } = app.renderer.info;
    $('stat-calls').textContent = render.calls;
    $('stat-triangles').textContent = Math.round(render.triangles);
    $('stat-geometries').textContent = memory.geometries;
    $('stat-textures').textContent = memory.textures;
  }
  const statsTimer = setInterval(updateStats, 500);
  window.addEventListener('pagehide', () => clearInterval(statsTimer));

  app.resize();
  app.start();

  // --- Select buttons: one per item, the keyboard-and-screen-reader route
  // into the same selection a click or tap on the canvas makes. Repeated
  // words ("Select") on every button, so each one's accessible name starts
  // with the visible word and then names its item (WCAG 2.5.3).
  const selectList = $('select-buttons');
  const selectButtons = new Map();
  selectList.replaceChildren(...ITEMS.map((data) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `Select: ${data.name}`;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => selectItem(data.id));
    selectButtons.set(data.id, button);
    li.append(button);
    return li;
  }));

  function selectItem(id) {
    app.setSelected(id);
    for (const [itemId, button] of selectButtons) {
      button.setAttribute('aria-pressed', String(itemId === id));
    }
    const item = app.getSelected();
    const info = $('selection-info');
    if (!item) {
      info.textContent = 'Nothing is selected yet.';
    } else if (item.data.kind === 'model' && item.status !== 'ready') {
      info.textContent = `${item.data.name}: still loading.`;
    } else {
      info.textContent = item.data.kind === 'model'
        ? `${item.data.name}: ${item.data.note} ${item.data.credit}`
        : `${item.data.name}: made of ${item.data.made}. ${item.data.note}`;
    }
    updateDescription();
  }

  // Clicking or tapping the canvas raycasts to find which item is under the
  // pointer, and selects it exactly as a Select button would. Not every
  // click hits an item (the background, or a pedestal, misses), so a miss
  // is simply ignored rather than clearing the current selection: a small
  // slip of the pointer should not undo a deliberate choice.
  app.renderer.domElement.addEventListener('click', (event) => {
    const id = app.pickItem(event.clientX, event.clientY);
    if (id) selectItem(id);
  });

  // --- Pause: stops the jade stone's own turn and every loaded model's
  // AnimationMixer. Reduced motion starts paused, and the button always
  // says what it will do next.
  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    app.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription();
  }
  setAnimating(!reducedMotion);
  pauseButton.addEventListener('click', () => setAnimating(!app.isAnimating()));

  // --- Turning the view without a mouse ---------------------------------
  $('turn-left').addEventListener('click', () => app.controls.rotateLeft(Math.PI / 8));
  $('turn-right').addEventListener('click', () => app.controls.rotateLeft(-Math.PI / 8));
  $('reset-view').addEventListener('click', () => { app.resetView(); updateDescription(); });

  // --- Reload: disposes everything and loads both models again. Proves
  // disposal works for real textures, not only for the primitives 3.4
  // already covered.
  $('reload').addEventListener('click', async () => {
    for (const [, button] of selectButtons) button.setAttribute('aria-pressed', 'false');
    $('selection-info').textContent = 'Nothing is selected yet.';
    await app.reload();
    renderItemList(app.items);
    updateDescription();
    updateStats();
  });

  // --- Stop drawing while the tab is hidden -------------------------------
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  updateDescription();
  updateStats();
}
