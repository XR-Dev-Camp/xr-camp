// main.js: wires the page's buttons, text, and media elements to the engine
// (app.js), the exhibit's data (exhibit.js, describe.js), WebXR (xr.js,
// carried over from 4.1), and this lesson's new spatial audio and media
// modules (audio.js, video.js, captions.js). No three.js API and no Web
// Audio API appears directly in this file: it only reads and writes the
// DOM, and calls what the other modules export.

import { createApp } from './app.js';
import { describeExhibit } from './describe.js';
import { ITEMS } from './exhibit.js';
import { supportsImmersiveVR, initXR, describeUnsupported } from './xr.js';
import { attachPedestalSounds, setDistanceModel, playAll, pauseAll, isAnyPlaying } from './audio.js';
import { buildStoryScreen, drawFrame } from './video.js';
import { watchCaptions, buildTranscript } from './captions.js';

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

const guideAudio = $('guide-audio');
const guideTrack = $('guide-track');
let currentCaption = '';

if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
  $('no-webgl-message').hidden = false;
  $('scene-description').textContent = 'This browser cannot show the 3D exhibit: WebGL 2 is unavailable. The list above has the same information. The audio guide, its captions, and its transcript below still work fully without the 3D view.';
  $('xr-status').textContent = 'VR needs the 3D exhibit above, which this browser cannot show.';
  $('sound-toggle').disabled = true;
  $('sound-toggle').textContent = 'Pedestal sounds need the 3D exhibit';
} else {
  const app = createApp(container);

  // --- Spatial audio: three pedestal sounds ------------------------------
  const pedestalAudio = attachPedestalSounds(app.listener, app.items);
  const soundToggle = $('sound-toggle');
  const distanceModelSelect = $('distance-model');
  soundToggle.disabled = true;
  soundToggle.textContent = 'Loading pedestal sounds…';
  pedestalAudio.ready.then(() => {
    soundToggle.disabled = false;
    soundToggle.textContent = 'Start pedestal sounds';
  }).catch(() => {
    soundToggle.textContent = 'Pedestal sounds could not load';
  });

  // --- Story screen: canvas-driven "video" -------------------------------
  const storyScreen = buildStoryScreen();
  app.scene.add(storyScreen.mesh);
  drawFrame(storyScreen, { time: 0, caption: currentCaption }); // paint one frame immediately, so the screen is never blank
  app.onFrame(({ elapsed, animating }) => {
    if (animating) drawFrame(storyScreen, { time: elapsed, caption: currentCaption });
  });

  // --- Captions and transcript, read from the same <track> ---------------
  watchCaptions(guideAudio, (text) => {
    currentCaption = text;
    $('caption-text').textContent = text || 'The audio guide is not playing right now.';
    updateDescription();
  });
  buildTranscript(guideAudio, guideTrack, $('transcript'));

  function updateDescription() {
    $('scene-description').textContent = describeExhibit({
      items: app.items,
      animating: app.isAnimating(),
      presenting: app.isPresenting(),
      soundsOn: isAnyPlaying(pedestalAudio),
      distanceModel: distanceModelSelect.value,
      caption: currentCaption,
    });
  }

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

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  // TODO 4: start audio only from a real, direct click, and only once.
  // Two separate things need a user gesture here for two different reasons:
  // browsers start every AudioContext 'suspended' until a real user gesture
  // resumes it (three.js's own source does not call resume() for you,
  // verified in r186's src/audio/Audio.js), and this lesson's own rule is
  // that nothing plays sound before the learner asks for it. Calling
  // app.listener.context.resume() here, then play() on each sound and on
  // guideAudio, keeps both inside the same click.
  soundToggle.addEventListener('click', () => {
    if (isAnyPlaying(pedestalAudio)) {
      pauseAll(pedestalAudio);
      guideAudio.pause();
      soundToggle.setAttribute('aria-pressed', 'false');
      soundToggle.textContent = 'Start pedestal sounds';
    } else {
      app.listener.context.resume();
      playAll(pedestalAudio);
      guideAudio.play();
      soundToggle.setAttribute('aria-pressed', 'true');
      soundToggle.textContent = 'Pause pedestal sounds';
    }
    updateDescription();
  });

  // The native audio element's own controls can also start or stop
  // guideAudio directly; keep the button's label honest either way.
  guideAudio.addEventListener('pause', () => {
    if (!isAnyPlaying(pedestalAudio)) {
      soundToggle.setAttribute('aria-pressed', 'false');
      soundToggle.textContent = 'Start pedestal sounds';
    }
  });

  // TODO 5: switch every pedestal's distance model live, so you can compare
  // 'inverse' (the Web Audio API's own default), 'linear', and
  // 'exponential' without restarting anything.
  distanceModelSelect.addEventListener('change', () => {
    setDistanceModel(pedestalAudio, distanceModelSelect.value);
    updateDescription();
  });

  const xrButton = $('xr-button');
  const xrStatus = $('xr-status');
  supportsImmersiveVR().then((supported) => {
    if (supported) {
      xrButton.hidden = false;
      xrStatus.textContent = 'VR is available. The exhibit, its pedestal sounds, and its audio guide all still work fully without it.';
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
}
