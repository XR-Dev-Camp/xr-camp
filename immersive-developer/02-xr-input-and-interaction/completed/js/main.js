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

  // --- Interaction state, kept here so describe.js always has the full
  // picture: which kind of input is connected, whether the jade stone is
  // currently held, and whether a jade stone has been placed with AR or its
  // 2D equivalent. controllers.js and ar.js only report changes; main.js is
  // the one place that remembers the current state.
  let inputKind = null;
  let grabbing = false;

  // Created here, early, because setAnimating() below already calls
  // updateDescription(), which reads placement.has(): every reference to
  // `placement` in this file must come after this line.
  const placement = createPlacement(app.scene);

  function updateDescription() {
    $('scene-description').textContent = describeExhibit({
      items: app.items,
      animating: app.isAnimating(),
      presenting: app.isPresenting(),
      inputKind,
      grabbing,
      placed: placement.has(),
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

  // --- The in-world menu: built once, added to the scene once, wired to the
  // exact same three actions the 2D buttons above already call. Its three
  // buttons are the objects controllers.js raycasts against.
  const { group: menuGroup, buttons: menuButtons } = buildMenu();
  app.scene.add(menuGroup);

  function onMenuAction(action) {
    if (action === 'pause') setAnimating(!app.isAnimating());
    else if (action === 'rebuild') { app.rebuild(); updateStats(); }
    else if (action === 'reset') app.resetView();
    updateDescription();
  }

  // --- Controllers and hands: set up once, whatever WebXR support this
  // browser has, since the groups it returns stay empty and harmless until
  // a session actually supplies an input source (see controllers.js).
  initInteraction({
    renderer: app.renderer,
    scene: app.scene,
    menuButtons,
    getGrabTarget: () => app.items.find((item) => item.data.id === 'jade-stone'),
    onMenuAction,
    onInputChange: (kind) => { inputKind = kind; updateDescription(); },
    onGrabChange: (value) => { grabbing = value; updateDescription(); },
    status: $('input-status'),
  });

  // --- The shared placed object (created above): one implementation, used
  // by both AR hit-test placement and its 2D keyboard-and-mouse equivalent.
  const removeButton = $('remove-stone');

  function onPlacedChange(value) {
    removeButton.disabled = !value;
    updateDescription();
  }

  // --- TODO 11: showing the Enter VR and Enter AR buttons only once each is
  // confirmed to work, and a clear, reassuring message otherwise; disabling
  // whichever of the two is not active, since a device can only run one
  // WebXR session at a time (see xr.js and ar.js).
  const xrButton = $('xr-button');
  const xrStatus = $('xr-status');
  const arButton = $('ar-button');
  const arStatus = $('ar-status');

  supportsImmersiveVR().then((supported) => {
    if (supported) {
      xrButton.hidden = false;
      xrStatus.textContent = 'VR is available. The lab still works fully without it.';
      initXR({
        renderer: app.renderer,
        app,
        button: xrButton,
        status: xrStatus,
        onSessionChange: (active) => { arButton.disabled = active; },
      });
      xrButton.addEventListener('click', updateDescription);
      app.renderer.xr.addEventListener('sessionstart', updateDescription);
      app.renderer.xr.addEventListener('sessionend', updateDescription);
    } else {
      xrButton.hidden = true;
      xrStatus.textContent = describeUnsupported();
    }
  });

  supportsImmersiveAR().then((supported) => {
    if (supported) {
      arButton.hidden = false;
      arStatus.textContent = 'AR is available on this device, though its "hit-test" feature (needed to place an object) is confirmed only once you enter AR.';
      initAR({
        renderer: app.renderer,
        scene: app.scene,
        app,
        button: arButton,
        status: arStatus,
        placement,
        onSessionChange: (active) => { xrButton.disabled = active; },
        onPlacedChange,
      });
    } else {
      arButton.hidden = true;
      arStatus.textContent = describeUnsupportedAR();
    }
  });

  // --- 2D and keyboard alternatives: the same two ideas as the in-VR grab
  // and the in-AR placement, needing no headset, controller, or hand.
  $('lift-stone').addEventListener('click', () => {
    const jade = app.items.find((item) => item.data.id === 'jade-stone');
    if (!jade) return;
    const original = jade.mesh.position.clone();
    jade.mesh.position.y += 0.4; // lifted, as if held
    grabbing = true;
    updateDescription();
    // No headset or controller is releasing this, so there is no gesture to
    // wait for: put it down again shortly afterwards, instantly (not
    // animated), the same as controllers.js's own release().
    setTimeout(() => {
      jade.mesh.position.copy(original);
      grabbing = false;
      updateDescription();
    }, 900);
  });

  $('place-stone').addEventListener('click', () => {
    // A fixed spot a short distance in front of the camera's own starting
    // position: the same idea as an AR hit-test placement, minus a real
    // surface to detect, since the desktop view has no camera passthrough.
    // A plain {x, y, z} object works here: THREE.Vector3.copy() only reads
    // those three properties, so this file never needs to import three.js.
    placement.placeAt({ x: 1.6, y: 0.15, z: 1.4 });
    onPlacedChange(true);
  });

  $('remove-stone').addEventListener('click', () => {
    if (placement.remove()) onPlacedChange(false);
  });

  updateDescription();
  updateStats();
}
