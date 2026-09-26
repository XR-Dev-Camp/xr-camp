// main.js: wires the page's buttons and text to the engine (app.js) and the
// exhibit's data (exhibit.js, describe.js). TODOs 9-13 are in this file. No
// three.js API should appear in this file: it only reads and writes the
// DOM, and calls what the other modules export.

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
// note, plus a loading/loaded/error word for the two models. Given,
// unchanged from how 3.4 built this list, extended for the two model items.
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

// TODO 9: ON-PAGE ATTRIBUTION. Write renderAttribution(): for every entry in
// ITEMS where `data.kind === 'model'`, build one `<li>` for #attribution-list
// with: a `<strong>` holding `data.name`; a `<p>` holding `data.credit`; a
// `<p>` containing the word "Licence: " followed by an `<a>` whose `href` is
// `data.licenseUrl` and whose text is `data.licenseLabel`; and a `<p>`
// containing an `<a>` whose `href` is `data.sourceUrl` and whose text is
// "Source (Khronos glTF-Sample-Assets)". Append all four elements to the
// `<li>`, collect the `<li>`s, and use `list.replaceChildren(...)`. This
// panel is not conditional on loading having finished: the licence and
// credit are facts about the file, known before it has even started to
// load, so show them immediately.
function renderAttribution() {

}
renderAttribution();

if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
  $('no-webgl-message').hidden = false;
  $('scene-description').textContent = 'This browser cannot show the 3D exhibit: WebGL 2 is unavailable. The list above has the same information.';
} else {
  const loadingBar = $('loading-bar');
  const loadingStatus = $('loading-status');

  // TODO 10: THE LOADING BAR. Write onProgress({ loaded, total }): if
  // `total` is falsy, return early (a request that has not reported its
  // size yet). Otherwise, unhide `loadingBar`, set its `.value` to
  // `Math.round((loaded / total) * 100)`, set `loadingStatus.textContent`
  // to a sentence naming that percentage while `loaded < total`, or to an
  // empty string once loading is complete, at which point also hide
  // `loadingBar` again.
  function onProgress({ loaded, total }) {

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
  // into the same selection a click or tap on the canvas makes. Given: the
  // buttons themselves are built for you; TODO 11 is selectItem() and the
  // canvas click handler, below.
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

  // TODO 11: SELECT AN ITEM, AND PICK ONE ON THE CANVAS. Write
  // selectItem(id):
  //  - Call `app.setSelected(id)`.
  //  - Update every button in `selectButtons`: its `aria-pressed` should be
  //    `"true"` only for the button whose key equals `id`.
  //  - Read `const item = app.getSelected()`, and set `#selection-info`'s
  //    text: "Nothing is selected yet." if there is none; a "still
  //    loading" sentence if it is a model item not yet `status === 'ready'`;
  //    otherwise, a sentence with its name plus (for a model) `data.note`
  //    and `data.credit`, or (for a primitive) `data.made` and `data.note`.
  //  - Call `updateDescription()`.
  // Then add a `'click'` listener on `app.renderer.domElement` that calls
  // `app.pickItem(event.clientX, event.clientY)` and, if it returns an id
  // (not null), calls `selectItem(id)`. A miss should do nothing — do not
  // clear the current selection just because a click landed on empty space.
  function selectItem(id) {

  }

  // --- Pause: stops the jade stone's own turn and every loaded model's
  // AnimationMixer. Given, unchanged from 3.4's pattern.
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

  // TODO 12: RELOAD. Wire #reload's click event to an async handler that:
  // sets every Select button's `aria-pressed` back to `"false"`, sets
  // `#selection-info`'s text back to "Nothing is selected yet.", awaits
  // `app.reload()`, then calls `renderItemList(app.items)`,
  // `updateDescription()`, and `updateStats()`. Afterwards, compare the
  // Geometries count in the Stats panel to what it was before: it should
  // match exactly, which is how you prove the primitives' and models'
  // geometries all disposed correctly.

  // --- Stop drawing while the tab is hidden -------------------------------
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  updateDescription();
  updateStats();
}
