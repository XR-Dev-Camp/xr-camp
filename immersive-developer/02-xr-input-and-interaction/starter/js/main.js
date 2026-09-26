// main.js: wires the page's buttons and text to the engine (app.js), the
// exhibit's data (exhibit.js, describe.js), and this lesson's new input
// modules: xr.js (VR sessions, carried over from 4.1), controllers.js
// (controllers, hands, the menu, and grabbing), and ar.js (AR sessions and
// hit-test placement). No three.js API and no WebXR API appears directly in
// this file: it only reads and writes the DOM, and calls what the other
// modules export.

import { createApp } from './app.js';
import { describeExhibit } from './describe.js';
import { ITEMS } from './exhibit.js';
import { buildMenu } from './menu.js';
import { supportsImmersiveVR, initXR, describeUnsupported } from './xr.js';
import { initInteraction } from './controllers.js';
import { supportsImmersiveAR, initAR, createPlacement, describeUnsupportedAR } from './ar.js';

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
  $('scene-description').textContent = 'This browser cannot show the 3D lab: WebGL 2 is unavailable. The list above has the same information.';
  $('xr-status').textContent = 'VR needs the 3D lab above, which this browser cannot show.';
  $('ar-status').textContent = 'AR needs the 3D lab above, which this browser cannot show.';
} else {
  const app = createApp(container);

  // Interaction state, kept here so describe.js always has the full
  // picture: which kind of input is connected, whether the jade stone is
  // currently held, and whether a jade stone has been placed with AR or its
  // 2D equivalent. controllers.js and ar.js only report changes; main.js is
  // the one place that remembers the current state.
  let inputKind = null;
  let grabbing = false;

  // TODO 11, part 1: create the shared placed object here, early, with
  // `createPlacement(app.scene)`, and use it below instead of `null`.
  const placement = null;

  function updateDescription() {
    $('scene-description').textContent = describeExhibit({
      items: app.items,
      animating: app.isAnimating(),
      presenting: app.isPresenting(),
      inputKind,
      grabbing,
      placed: placement?.has() ?? false, // placement is null until TODO 11, part 1 is done
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

  $('rebuild').addEventListener('click', () => {
    app.rebuild();
    updateDescription();
    updateStats();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  // TODO 11, part 2: the in-world menu. Call `buildMenu()`, add its `group`
  // to `app.scene`, and keep its `buttons` array for controllers.js to
  // raycast against. Then write `onMenuAction(action)`: when `action` is
  // 'pause', call `setAnimating(!app.isAnimating())`; when 'rebuild', call
  // `app.rebuild()` and `updateStats()`; when 'reset', call `app.resetView()`.
  // Finish by calling `updateDescription()`.

  // TODO 11, part 3: controllers and hands. Call `initInteraction`, passing
  // `renderer: app.renderer`, `scene: app.scene`, the menu buttons from
  // above, `getGrabTarget: () => app.items.find((item) => item.data.id === 'jade-stone')`,
  // `onMenuAction`, `onInputChange` (set `inputKind` and call
  // `updateDescription()`), `onGrabChange` (set `grabbing` and call
  // `updateDescription()`), and `status: $('input-status')`.

  const removeButton = $('remove-stone');
  function onPlacedChange(value) {
    removeButton.disabled = !value;
    updateDescription();
  }

  // TODO 11, part 4: showing the Enter VR and Enter AR buttons only once
  // each is confirmed to work, and a clear, reassuring message otherwise;
  // disabling whichever of the two is not active, since a device can only
  // run one WebXR session at a time.
  //
  // Following the same shape 4.1 used for VR alone: call
  // `supportsImmersiveVR().then((supported) => { ... })`. If supported, show
  // `xrButton`, set `xrStatus.textContent`, and call `initXR` with
  // `onSessionChange: (active) => { arButton.disabled = active; }` added to
  // the options 4.1 already used. If not supported, hide the button and use
  // `describeUnsupported()`.
  //
  // Do the same for AR with `supportsImmersiveAR()` and `initAR`, passing
  // `placement` and `onPlacedChange` in along with
  // `onSessionChange: (active) => { xrButton.disabled = active; }`, and
  // `describeUnsupportedAR()` for the unsupported case.
  const xrButton = $('xr-button');
  const xrStatus = $('xr-status');
  const arButton = $('ar-button');
  const arStatus = $('ar-status');

  // TODO 11, part 5: the 2D and keyboard alternatives, needing no headset,
  // controller, or hand.
  //
  // `#lift-stone`: find the jade stone the same way `getGrabTarget` above
  // does. Clone its current position, move it up (e.g. `+= 0.4`), set
  // `grabbing = true`, call `updateDescription()`, then after a short
  // `setTimeout` (under a second), copy its original position back, set
  // `grabbing = false`, and call `updateDescription()` again. Nothing here
  // is animated (position changes instantly at each end), so there is no
  // motion for prefers-reduced-motion to reduce.
  //
  // `#place-stone`: call `placement.placeAt({ x: 1.6, y: 0.15, z: 1.4 })` (a
  // plain object works: THREE.Vector3.copy() only reads x/y/z, so this file
  // never needs to import three.js), then `onPlacedChange(true)`.
  //
  // `#remove-stone`: call `placement.remove()`; if it returned true, call
  // `onPlacedChange(false)`.

  updateDescription();
  updateStats();
}
