// main.js: wires the page's buttons to the engine (app.js) and the talk,
// visitor, and sensor modules. Adapted from
// immersive-developer/02-xr-input-and-interaction/completed/js/main.js. No
// three.js API and no WebXR API appears directly here except where a 3D
// mesh needs a click; everything else only reads and writes the DOM.

import { createApp } from './app.js';
import { initTalk, describeScene, TALK_SCRIPT } from './talk.js';
import { initVisitor } from './visitor.js';
import { requestCamera, stopCamera, PRIVACY_NOTICE } from './sensors.js';
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

// Fix for TODO 1: the transcript and answer text below are ordinary page
// content, built once, so they work identically whether or not WebGL,
// speech synthesis, or a headset is available.
function renderTranscript() {
  const list = $('transcript-list');
  list.replaceChildren(...TALK_SCRIPT.map((line) => {
    const li = document.createElement('li');
    li.textContent = line.text;
    return li;
  }));
}
renderTranscript();

$('privacy-notice-text').textContent = PRIVACY_NOTICE;

// Fix for TODO 6: the transcript, the "Ask a question" answer, and the
// camera-personalization panel are all ordinary DOM content outside the
// canvas, so every one of them still works with WebGL turned off - only the
// 3D view and captions-in-scene are lost.
if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
  $('no-webgl-message').hidden = false;
  $('xr-status').textContent = 'VR needs the 3D scene above, which this browser cannot show. The transcript and "Ask a question" still work.';
} else {
  const app = createApp(container);
  app.resize();
  app.start();

  let captionsOn = true;
  const domCaptions = $('captions');

  function updateSceneDescription() {
    $('scene-description').textContent = describeScene({
      presenting: false,
      idleAnimating: app.isIdleAnimating(),
    });
  }
  updateSceneDescription();

  const talk = initTalk({
    camera: app.camera,
    captionsOn: () => captionsOn,
    domCaptions,
    onLine: () => {},
    onEnd: () => { $('answer').hidden = false; },
  });

  $('start-talk').addEventListener('click', () => talk.start());

  $('captions-toggle').addEventListener('click', () => {
    captionsOn = !captionsOn;
    $('captions-toggle').setAttribute('aria-pressed', String(captionsOn));
    $('captions-toggle').textContent = captionsOn ? 'Turn off captions' : 'Turn on captions';
    if (!captionsOn) talk.clearCaption();
  });

  // Fix for TODO 4: paused by default under prefers-reduced-motion, and a
  // visible, labelled Pause control either way - not only when reduced
  // motion is on.
  const pauseButton = $('pause-toggle');
  function setIdleAnimating(on) {
    app.setIdleAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause presenter animation' : 'Resume presenter animation';
    updateSceneDescription();
  }
  setIdleAnimating(!reducedMotion);
  pauseButton.addEventListener('click', () => setIdleAnimating(!app.isIdleAnimating()));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  // Fix for TODO 5: the starter's "Ask a question" existed only as a 3D
  // mesh, high and to one side - reachable in a headset only by raising an
  // arm above shoulder height, and with no keyboard route at all. This
  // version is an ordinary <button> in the page's normal control panel,
  // reachable by Tab and activated with Enter or Space like every other
  // control here, and sized at least 44 by 44 CSS pixels (WCAG 2.5.8). It
  // needs no seated-reach position at all, because it is not a 3D object a
  // learner has to point at or lean towards - which is the more robust fix
  // than merely moving the mesh lower.
  const askButton = $('ask-question');
  askButton.addEventListener('click', () => {
    $('answer').hidden = false;
    $('answer').focus();
  });

  // --- Camera personalization: consent first, always optional ------------
  let cameraStream = null;
  const enableCameraButton = $('enable-camera');
  const disableCameraButton = $('disable-camera');
  const cameraStatus = $('camera-status');

  enableCameraButton.addEventListener('click', () => {
    requestCamera(
      (stream) => {
        cameraStream = stream;
        cameraStatus.textContent = 'Camera personalization is on.';
        enableCameraButton.hidden = true;
        disableCameraButton.hidden = false;
      },
      (reason) => { cameraStatus.textContent = `Camera personalization is off (${reason}). The talk works fully without it.`; },
    );
  });
  disableCameraButton.addEventListener('click', () => {
    stopCamera(cameraStream);
    cameraStream = null;
    cameraStatus.textContent = 'Camera personalization is off.';
    disableCameraButton.hidden = true;
    enableCameraButton.hidden = false;
  });
  window.addEventListener('pagehide', () => stopCamera(cameraStream));

  // --- The visitor: personal space, mute, and block -----------------------
  const visitor = initVisitor({ visitor: app.visitor, camera: app.camera, status: $('visitor-status') });

  $('mute-visitor').addEventListener('click', () => {
    visitor.setMuted(!visitor.isMuted());
    $('mute-visitor').setAttribute('aria-pressed', String(visitor.isMuted()));
    $('mute-visitor').textContent = visitor.isMuted() ? 'Unmute visitor' : 'Mute visitor';
  });
  $('block-visitor').addEventListener('click', () => {
    visitor.setBlocked(!visitor.isBlocked());
    $('block-visitor').setAttribute('aria-pressed', String(visitor.isBlocked()));
    $('block-visitor').textContent = visitor.isBlocked() ? 'Unblock visitor' : 'Block visitor';
  });

  const visitorTimer = setInterval(() => visitor.update(), 32);
  window.addEventListener('pagehide', () => { clearInterval(visitorTimer); visitor.stop(); });

  const xrButton = $('xr-button');
  const xrStatus = $('xr-status');
  supportsImmersiveVR().then((supported) => {
    if (supported) {
      xrButton.hidden = false;
      xrStatus.textContent = 'VR is available. The talk still works fully without it.';
      initXR({ renderer: app.renderer, app, button: xrButton, status: xrStatus });
      app.renderer.xr.addEventListener('sessionstart', updateSceneDescription);
      app.renderer.xr.addEventListener('sessionend', updateSceneDescription);
    } else {
      xrButton.hidden = true;
      xrStatus.textContent = describeUnsupported();
    }
  });
}
