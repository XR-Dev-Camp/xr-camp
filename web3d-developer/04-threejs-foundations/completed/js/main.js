// main.js: wires the page's buttons and text to the engine (app.js) and the
// exhibit's data (exhibit.js, describe.js). No three.js API appears in this
// file: it only reads and writes the DOM, and calls what the other modules
// export. If a future lesson swaps the whole engine, only app.js changes.

import { createApp } from './app.js';
import { describeExhibit } from './describe.js';
import { ITEMS } from './exhibit.js';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');

// Checked once, early (see the inline script in the page head), so this
// file reads it rather than calling matchMedia itself everywhere.
const reducedMotion = window.__reducedMotion === true;

// --- WebGL 2 feature detection ---------------------------------------------
// three.js's WebGLRenderer requests a WebGL 2 context (the Khronos Group
// standard this lesson's "Standards spotlight" covers). Detecting it before
// creating the renderer means a browser without it sees a clear message
// instead of a silent failure or a console error.
function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

// --- The 2D fallback list ---------------------------------------------------
// The exhibit's information, as HTML, always present. This is not only a
// fallback shown when WebGL fails (WCAG 1.3.1): a screen-reader user, or
// anyone on a slow connection, can read it just as well either way.
function renderItemList() {
  const list = $('exhibit-list');
  list.replaceChildren(...ITEMS.map((item) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = item.name;
    li.append(strong, document.createTextNode(` — ${item.made}. ${item.note}`));
    return li;
  }));
}
renderItemList();

if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
  $('no-webgl-message').hidden = false;
  $('scene-description').textContent = 'This browser cannot show the 3D exhibit: WebGL 2 is unavailable. The list above has the same information.';
} else {
  const app = createApp(container);

  function updateDescription() {
    $('scene-description').textContent = describeExhibit({ items: app.items, animating: app.isAnimating() });
  }

  // The Stats panel is informative, not real-time-critical, so it refreshes
  // on a plain interval rather than inside the render loop.
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

  // --- Pause: stops the jade stone's own turn. Reduced motion starts
  // paused, and the button always says what it will do next.
  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    app.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription();
  }
  setAnimating(!reducedMotion);
  pauseButton.addEventListener('click', () => setAnimating(!app.isAnimating()));

  // --- Turning the view without a mouse: these buttons do exactly what
  // dragging the view does, so every pointer interaction has a keyboard
  // route too (the arrow keys, via controls.listenToKeyEvents in app.js,
  // are the other route).
  $('turn-left').addEventListener('click', () => app.controls.rotateLeft(Math.PI / 8));
  $('turn-right').addEventListener('click', () => app.controls.rotateLeft(-Math.PI / 8));
  $('reset-view').addEventListener('click', () => { app.resetView(); updateDescription(); });

  // --- Rebuild: disposes the exhibit and builds it again. Watch
  // "Geometries" and "Textures" in the Stats panel: they return to the same
  // numbers they started at, which is how you prove nothing leaked.
  $('rebuild').addEventListener('click', () => {
    app.rebuild();
    updateDescription();
    updateStats();
  });

  // --- Stop drawing while the tab is hidden: no wasted GPU work, and no
  // wasted battery, for a scene nobody can see. Resuming does not un-pause
  // the animation if the learner had paused it themselves.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  updateDescription();
  updateStats();
}
