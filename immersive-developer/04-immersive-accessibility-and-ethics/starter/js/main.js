// main.js: wires the page's buttons to the engine (app.js) and the talk,
// visitor, and sensor modules. Adapted from
// immersive-developer/02-xr-input-and-interaction/completed/js/main.js.
//
// This file carries several of the lesson's bugs directly, marked below.
// Work through docs/en/xr-accessibility.md, then completed/audit.md's
// counterpart once you are done, and fix each one in place.

import { createApp } from './app.js';
import { initTalk } from './talk.js';
import { initVisitor } from './visitor.js';
import { initSensors } from './sensors.js';
import { supportsImmersiveVR, initXR, describeUnsupported } from './xr.js';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');

function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

// TODO 6: when WebGL 2 is unavailable, the canvas box is hidden and nothing
// takes its place - no transcript, no "Ask a question", nothing. Compare
// this to 02's `no-webgl-message` pattern and 03's fallback: this whole
// page's content should still work with WebGL turned off, not only the
// message saying so.
if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
} else {
  const app = createApp(container);
  app.resize();
  app.start();

  // TODO 1: nothing ever fills in a scene description or a text version of
  // the talk. describe.js from 4.1/4.2 built its description from the same
  // data the scene renders; do the same here with talk.js's TALK_SCRIPT.

  initSensors(); // TODO 7 / TODO 8 live in sensors.js

  const talk = initTalk({
    scene: app.scene,
    presenter: app.presenter,
    onLine: () => {},
    onEnd: () => {},
  });

  const visitor = initVisitor({
    visitor: app.visitor,
    camera: app.camera,
    status: $('visitor-status'),
  });

  $('start-talk').addEventListener('click', () => talk.start());

  // The idle animation runs unconditionally: no prefers-reduced-motion
  // check, and no Pause button anywhere on the page (TODO 4).
  app.setIdleAnimating(true);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  // TODO 5: this button is a 3D mesh, high and to one side, reachable only
  // by clicking exactly on it with a mouse. It has no on-screen twin and no
  // keyboard route - Tab never reaches it. In a headset, a button this high
  // and this far to the side would need the learner to raise an arm above
  // shoulder height and reach sideways. Move it into a relaxed, seated reach
  // (see the "Ask a question" fieldset's hint text), and give it a real
  // <button> alternative that does the same thing.
  container.addEventListener('click', () => {
    // No raycasting is implemented here on purpose: this is a stand-in for
    // a mesh-only control. The point for the audit is where it is, and what
    // reaching it would take, not the exact interaction code.
  });

  const xrButton = $('xr-button');
  const xrStatus = $('xr-status');
  supportsImmersiveVR().then((supported) => {
    if (supported) {
      xrButton.hidden = false;
      xrStatus.textContent = 'VR is available. The talk still works fully without it.';
      initXR({ renderer: app.renderer, app, button: xrButton, status: xrStatus });
    } else {
      xrButton.hidden = true;
      xrStatus.textContent = describeUnsupported();
    }
  });

  window.addEventListener('pagehide', () => visitor.stop());
}
