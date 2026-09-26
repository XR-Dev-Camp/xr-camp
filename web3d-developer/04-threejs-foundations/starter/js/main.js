// main.js: wires the page's buttons and text to the engine (app.js) and the
// exhibit's data (exhibit.js, describe.js). TODOs 17-19 are in this file. No
// three.js API should appear in this file: it only reads and writes the
// DOM, and calls what the other modules export.

import { createApp } from './app.js';
import { describeExhibit } from './describe.js';
import { ITEMS } from './exhibit.js';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');

// Checked once, early (see the inline script in the page head), so this
// file reads it rather than calling matchMedia itself everywhere.
const reducedMotion = window.__reducedMotion === true;

// TODO 17: WEBGL 2 FEATURE DETECTION. three.js's WebGLRenderer requests a
// WebGL 2 context (the Khronos Group standard this lesson's "Standards
// spotlight" covers). Write supportsWebGL2(): in a try/catch, return
// whether document.createElement('canvas').getContext('webgl2') is truthy.
// Detecting this before creating the renderer means a browser without it
// sees a clear message instead of a silent failure.
function supportsWebGL2() {
  return true;
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
  // TODO 17, continued: when there is no WebGL 2, hide #canvas-box, show
  // #no-webgl-message, and set #scene-description to a short sentence
  // saying the list above has the same information. (Leave this branch
  // alone until supportsWebGL2() can actually return false.)
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

  // TODO 18: PAUSE, AND REDUCED MOTION. Write setAnimating(on): call
  // app.setAnimating(on), set #pause-toggle's aria-pressed to the opposite
  // of `on` (aria-pressed="true" means "animation is paused"), set its
  // visible text to "Pause animation" or "Resume animation" to match, and
  // call updateDescription(). Call setAnimating(!reducedMotion) once, so a
  // learner with reduced motion switched on sees the exhibit already
  // paused. Then wire #pause-toggle's click event to toggle it.
  const pauseButton = $('pause-toggle');

  // TODO 19: THE REMAINING BUTTONS, AND THE HIDDEN-TAB CHECK.
  //  - #turn-left and #turn-right: call app.controls.rotateLeft(...) with a
  //    positive angle (try Math.PI / 8) for left, and a negative one for
  //    right. Check the r186 OrbitControls source: which sign actually
  //    turns the view left?
  //  - #reset-view: call app.resetView(), then updateDescription().
  //  - #rebuild: call app.rebuild(), then updateDescription() and
  //    updateStats(). Afterwards, compare the Geometries and Textures
  //    numbers in the Stats panel to what they were before: they should
  //    match, which is how you prove disposal worked.
  //  - document's visibilitychange event: call app.stop() when
  //    document.hidden is true, and app.start() when it becomes false
  //    again. This stops the GPU drawing a scene nobody can see.

  updateDescription();
  updateStats();
}
