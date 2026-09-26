// main.js: wires the page's buttons and text to the engine (app.js) and the
// exhibit's data (exhibit.js, describe.js). No three.js API appears in this
// file: it only reads and writes the DOM, and calls what the other modules
// export. Everything below is carried over working from 3.5 except the four
// numbered TODOs, which are this capstone's own integration work: an info
// panel, and a performance budget check.

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

// --- The 2D twin --------------------------------------------------------
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

// --- On-page attribution -------------------------------------------------
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

    // TODO 5: this capstone's performance budget check. Add a BUDGET
    // constant near the top of this file (outside any function), matching
    // the numbers in the README's "Performance considerations" table:
    //   const BUDGET = { calls: 20, triangles: 25000 };
    // Then, here, compare render.calls and render.triangles against it, and
    // write the result into the two elements TODO 2 added in index.html:
    // #budget-calls and #budget-triangles (as "live / budget" text), and
    // #budget-result (a sentence saying whether the exhibit is within
    // budget). Toggle an "over-budget" class on #budget-result when it is
    // not, so the CSS in styles.css can colour it differently.
  }
  const statsTimer = setInterval(updateStats, 500);
  window.addEventListener('pagehide', () => clearInterval(statsTimer));

  app.resize();
  app.start();

  // --- Select buttons: one per item, the keyboard-and-screen-reader route
  // into the same selection a click or tap on the canvas makes.
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

  // TODO 3: write renderInfoPanel(item), and call it here (function
  // declarations are hoisted, so this comment can sit above where you write
  // it). Given the currently selected item (or null, when nothing is
  // selected), fill the #info-panel element TODO 1 added in index.html:
  //   - null: a line saying nothing is selected yet.
  //   - a model still loading: its name, and "Still loading."
  //   - a primitive (clay pot, basket ring, jade stone): a heading with its
  //     name, and a paragraph: "Made of <made>. <note>"
  //   - a loaded model: a heading with its name, a paragraph with its
  //     note, a paragraph with its credit (item.data.credit), and a link to
  //     item.data.sourceUrl labelled "Source and full licence".
  // Use element.replaceChildren(...), as renderItemList() above does, not
  // innerHTML: it is safer, and it is this project's own convention.

  function selectItem(id) {
    app.setSelected(id);
    for (const [itemId, button] of selectButtons) {
      button.setAttribute('aria-pressed', String(itemId === id));
    }
    // TODO 4: call your renderInfoPanel() from TODO 3 here, passing
    // app.getSelected(). Until you do, selecting an exhibit updates the
    // scene description below but the info panel above stays empty — that
    // is the expected, not broken, state before this TODO.
    updateDescription();
  }

  app.renderer.domElement.addEventListener('click', (event) => {
    const id = app.pickItem(event.clientX, event.clientY);
    if (id) selectItem(id);
  });

  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    app.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription();
  }
  setAnimating(!reducedMotion);
  pauseButton.addEventListener('click', () => setAnimating(!app.isAnimating()));

  $('turn-left').addEventListener('click', () => app.controls.rotateLeft(Math.PI / 8));
  $('turn-right').addEventListener('click', () => app.controls.rotateLeft(-Math.PI / 8));
  $('reset-view').addEventListener('click', () => { app.resetView(); updateDescription(); });

  $('reload').addEventListener('click', async () => {
    for (const [, button] of selectButtons) button.setAttribute('aria-pressed', 'false');
    // TODO 6: clear the info panel here too (call renderInfoPanel(null)),
    // so a reload does not leave the previous exhibit's details showing
    // next to an exhibit that no longer has anything selected.
    await app.reload();
    renderItemList(app.items);
    updateDescription();
    updateStats();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  updateDescription();
  updateStats();
}
