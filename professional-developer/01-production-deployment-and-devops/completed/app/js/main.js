// main.js: wires the page's buttons and text to the engine (app.js) and the
// exhibit's data (exhibit.js, describe.js). No three.js API appears in this
// file: it only reads and writes the DOM, and calls what the other modules
// export. Carried over from 3.5, and extended with this capstone's own
// integration work: a real info panel (instead of one line of selection
// text), a performance budget check against the numbers this lesson's
// README documents, and a link out to the release notes and the standalone
// attribution page.

import { createApp } from './app.js';
import { describeExhibit } from './describe.js';
import { ITEMS } from './exhibit.js';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');
const reducedMotion = window.__reducedMotion === true;

// This capstone's own performance budget (see the README's "Performance
// considerations" table). Measured, not guessed: these numbers came from
// watching the Stats panel on the machine this lesson was written on, with
// a safety margin, exactly as 3.6 teaches. "On my machine" numbers will
// differ from a learner's; the budget is the ceiling, not a promise.
const BUDGET = { calls: 20, triangles: 25000 };

function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

// --- The 2D twin --------------------------------------------------------
// Always present, not only a fallback (WCAG 1.3.1): every item's name and
// note, plus a loading/loaded/error word for the two models, exactly as in
// 3.5. This is the "2D twin" the brief asks for: the same information as
// the 3D view, in words, so it never depends on WebGL.
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
// Populated once, from ITEMS, not written by hand in the HTML: the credit
// and licence text lives in exactly one place (exhibit.js). See also the
// standalone attribution page (attribution.html) linked from the header.
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

    // The performance budget check: compares the live numbers above against
    // this lesson's documented budget (see the README) and says, in words,
    // whether the exhibit is inside it. role="status" on the panel means a
    // screen-reader user hears the result change without hunting for it.
    const withinCalls = render.calls <= BUDGET.calls;
    const withinTriangles = render.triangles <= BUDGET.triangles;
    $('budget-calls').textContent = `${render.calls} / ${BUDGET.calls}`;
    $('budget-triangles').textContent = `${Math.round(render.triangles)} / ${BUDGET.triangles}`;
    const budgetPanel = $('budget-result');
    budgetPanel.textContent = (withinCalls && withinTriangles)
      ? 'Within budget: draw calls and triangles are both at or under the target above.'
      : 'Over budget: see the README\'s "Performance considerations" for what to trim.';
    budgetPanel.classList.toggle('over-budget', !(withinCalls && withinTriangles));
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

  // --- The info panel -------------------------------------------------
  // Replaces 3.5's single line of selection text with a real panel: a
  // heading naming the selected exhibit, what it is made of (or its
  // credit, for a loaded model), and — for a model — a link to its source
  // and licence. role="status" means the change is announced once, without
  // the learner needing to move focus to hear it.
  function renderInfoPanel(item) {
    const panel = $('info-panel');
    if (!item) {
      panel.replaceChildren(document.createTextNode('Nothing is selected yet. Choose an exhibit above to see its details here.'));
      return;
    }
    const heading = document.createElement('h3');
    heading.textContent = item.data.name;
    const body = document.createElement('p');
    if (item.data.kind === 'model' && item.status !== 'ready') {
      body.textContent = 'Still loading.';
      panel.replaceChildren(heading, body);
      return;
    }
    body.textContent = item.data.kind === 'model' ? item.data.note : `Made of ${item.data.made}. ${item.data.note}`;
    panel.replaceChildren(heading, body);
    if (item.data.kind === 'model') {
      const credit = document.createElement('p');
      credit.className = 'hint';
      credit.textContent = item.data.credit;
      const link = document.createElement('p');
      const a = document.createElement('a');
      a.href = item.data.sourceUrl;
      a.textContent = 'Source and full licence';
      link.append(a);
      panel.append(credit, link);
    }
  }

  function selectItem(id) {
    app.setSelected(id);
    for (const [itemId, button] of selectButtons) {
      button.setAttribute('aria-pressed', String(itemId === id));
    }
    renderInfoPanel(app.getSelected());
    updateDescription();
  }

  // Clicking or tapping the canvas raycasts to find which item is under the
  // pointer, and selects it exactly as a Select button would. A miss (the
  // background, or a pedestal) is ignored rather than clearing the current
  // selection: a small slip of the pointer should not undo a deliberate
  // choice.
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

  // --- Turning the view without a mouse: the keyboard route into orbiting,
  // alongside the arrow keys OrbitControls already listens for once the
  // canvas has focus.
  $('turn-left').addEventListener('click', () => app.controls.rotateLeft(Math.PI / 8));
  $('turn-right').addEventListener('click', () => app.controls.rotateLeft(-Math.PI / 8));
  $('reset-view').addEventListener('click', () => { app.resetView(); updateDescription(); });

  // --- Reload: disposes everything and loads both models again, proving
  // disposal still works once the capstone's own info panel and budget
  // check are wired in alongside it.
  $('reload').addEventListener('click', async () => {
    for (const [, button] of selectButtons) button.setAttribute('aria-pressed', 'false');
    renderInfoPanel(null);
    await app.reload();
    renderItemList(app.items);
    updateDescription();
    updateStats();
  });

  // --- Stop drawing while the tab is hidden --------------------------------
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  renderInfoPanel(null);
  updateDescription();
  updateStats();
}
