// main.js: wires the page's buttons and text to the engine (app.js), the
// exhibit's data (exhibit.js, describe.js), and now WebXR (xr.js). No
// three.js API and no WebXR API appears directly in this file: it only
// reads and writes the DOM, and calls what the other modules export.

import { createApp } from './app.js';
import { describeExhibit } from './describe.js';
import { ITEMS } from './exhibit.js';
import { supportsImmersiveVR, initXR, describeUnsupported } from './xr.js';

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
  $('scene-description').textContent = 'This browser cannot show the 3D exhibit: WebGL 2 is unavailable. The list above has the same information.';
  $('xr-status').textContent = 'VR needs the 3D exhibit above, which this browser cannot show.';
} else {
  const app = createApp(container);

  function updateDescription() {
    $('scene-description').textContent = describeExhibit({
      items: app.items,
      animating: app.isAnimating(),
      presenting: app.isPresenting(),
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

  // TODO 6: show the Enter VR button only once WebXR is confirmed to work,
  // and a clear, reassuring message otherwise. Checking this once, on load,
  // rather than only when the button is clicked, means a learner without a
  // headset never sees a button that would do nothing.
  const xrButton = $('xr-button');
  const xrStatus = $('xr-status');
  supportsImmersiveVR().then((supported) => {
    if (supported) {
      xrButton.hidden = false;
      xrStatus.textContent = 'VR is available. The exhibit still works fully without it.';
      initXR({ renderer: app.renderer, app, button: xrButton, status: xrStatus });
      xrButton.addEventListener('click', updateDescription);
      app.renderer.xr.addEventListener('sessionstart', updateDescription);
      app.renderer.xr.addEventListener('sessionend', updateDescription);
    } else {
      xrButton.hidden = true;
      xrStatus.textContent = describeUnsupported();
    }
  });

  updateDescription();
  updateStats();
}
