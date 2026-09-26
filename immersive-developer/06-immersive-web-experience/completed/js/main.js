// Wires 4.1 (Enter VR), 4.2 (input, with a 2D/keyboard equal for every XR
// interaction), 4.4 (the accessibility and ethics fixes), and 4.5 (spatial
// audio and captions) into this capstone's one exhibit. Every subsystem
// below was already built by an earlier lesson; this file's job is only to
// connect them, and to keep the scene description, the caption bar, and the
// live-region announcements agreeing with whatever just happened.
import { createApp, selectExhibit, setGrabbed, setPaused } from './app.js';
import { setupControllers, placeMarker } from './interact.js';
import { addAvatar, requestPersonalize } from './presenter.js';
import { setupAudio, playNarration, transcriptLines, createCaptionHud } from './audio-captions.js';
import { buildSceneDescription } from './describe.js';
import { EXHIBITS } from './exhibit.js';
import { isVRSupported, enterVR } from './xr.js';

const el = (id) => document.getElementById(id);
const announce = (msg) => { el('status').textContent = msg; };

// --- The 2D twin and the transcript are always built, whether or not
// WebGL is available: the facts about the exhibit never live only inside
// the canvas (WCAG 1.3.1). ---
const list = el('exhibit-list');
for (const data of EXHIBITS) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${data.name}</strong> — ${data.material}
    <div class="button-row">
      <button type="button" data-select="${data.id}" aria-pressed="false">Select: ${data.name}</button>
      <button type="button" data-grab="${data.id}" aria-pressed="false">Grab: ${data.name}</button>
      <button type="button" data-play="${data.id}">Play narration: ${data.name}</button>
    </div>`;
  list.appendChild(li);
}
// --- Transcript: always present, whether or not narration has ever played
// (4.5, WCAG 1.2.1). ---
const transcript = el('transcript');
for (const line of transcriptLines()) {
  const li = document.createElement('li');
  li.textContent = line;
  transcript.appendChild(li);
}

// --- Personalize (4.4's fixed camera-consent flow): explain first, ask
// second, never store or show what the camera sees. This does not need the
// 3D scene, so it is wired up either way. ---
el('personalize-consent').addEventListener('click', async () => {
  const result = await requestPersonalize();
  const resultEl = el('personalize-result');
  if (result.ok) {
    resultEl.textContent = 'Camera access granted, then immediately stopped. Nothing was stored or shown.';
  } else if (result.reason === 'denied') {
    resultEl.textContent = 'Camera access was not granted. The exhibit works fully without it.';
  } else if (result.reason === 'not-supported') {
    resultEl.textContent = 'This browser does not support camera access. The exhibit works fully without it.';
  } else {
    resultEl.textContent = 'Camera access could not be started. The exhibit works fully without it.';
  }
});

// --- The 3D scene, the audio, and every button that depends on it. When
// WebGL 2 is unavailable, the 2D twin and transcript above still carry
// every fact (2D fallback); the 3D-only controls are hidden instead of
// left broken. ---
const hasWebGL = !!document.createElement('canvas').getContext('webgl2');
if (!hasWebGL) {
  el('no-webgl-message').hidden = false;
  el('scene-panel').hidden = true;
} else {
  const canvas = el('scene-canvas');
  const app = createApp(canvas);
  const sounds = setupAudio(app);
  setupControllers(app);
  addAvatar(app);

  const state = { xrActive: false, boundary: null };
  const captionHud = createCaptionHud();

  const setCaption = (text) => {
    el('caption-text').textContent = text || 'No narration is playing.';
    captionHud.setText(text);
  };
  const updateDescription = () => {
    el('scene-description').textContent = buildSceneDescription(app, state);
  };
  app.onChange = updateDescription;
  updateDescription();

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.dataset.select) {
      selectExhibit(app, btn.dataset.select);
      list.querySelectorAll('[data-select]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      announce(`${btn.textContent.replace('Select: ', '')} selected.`);
    } else if (btn.dataset.grab) {
      const grabbing = btn.getAttribute('aria-pressed') !== 'true';
      setGrabbed(app, btn.dataset.grab, grabbing);
      btn.setAttribute('aria-pressed', String(grabbing));
      announce(grabbing ? `${btn.textContent.replace('Grab: ', '')} picked up.` : `${btn.textContent.replace('Grab: ', '')} put down.`);
    } else if (btn.dataset.play) {
      const caption = playNarration(sounds, btn.dataset.play);
      setCaption(caption);
      announce(`Playing narration for ${btn.textContent.replace('Play narration: ', '')}.`);
    }
  });

  // --- Place marker: the 2D/keyboard equal of AR hit-test placement (4.2). ---
  el('place-marker').addEventListener('click', () => {
    placeMarker(app);
    announce('Marker placed on the floor in front of the entrance.');
  });

  // --- Pause: stops the held exhibit's turning; also the state
  // prefers-reduced-motion starts in (4.4, WCAG 2.2.2). ---
  const pauseButton = el('pause-toggle');
  pauseButton.setAttribute('aria-pressed', String(app.paused));
  pauseButton.textContent = app.paused ? 'Resume turning' : 'Pause turning';
  pauseButton.addEventListener('click', () => {
    const next = !app.paused;
    setPaused(app, next);
    pauseButton.setAttribute('aria-pressed', String(next));
    pauseButton.textContent = next ? 'Resume turning' : 'Pause turning';
    announce(next ? 'Turning paused.' : 'Turning resumed.');
  });

  // --- Reload: clears selection, grab, and the placed marker. ---
  el('reload').addEventListener('click', () => {
    app.selectedId = null;
    app.grabbedId = null;
    app.markerPlaced = false;
    const marker = app.scene.getObjectByName('placed-marker');
    if (marker) app.scene.remove(marker);
    list.querySelectorAll('button[aria-pressed]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    setCaption('');
    updateDescription();
    announce('Exhibit reset.');
  });

  // --- Enter VR (4.1): feature detection first, comfort and the boundary
  // report on start, and switching the caption from the DOM bar to the
  // camera-attached HUD plane while a session is active. ---
  const vrButton = el('enter-vr');
  isVRSupported().then((supported) => {
    vrButton.disabled = !supported;
    el('vr-support-note').textContent = supported
      ? 'This browser and device report WebXR support.'
      : 'This browser or device does not report WebXR support. Everything above still works without it.';
  });
  vrButton.addEventListener('click', async () => {
    try {
      await enterVR(app, {
        onStart: () => {
          state.xrActive = true;
          app.camera.add(captionHud.mesh);
          el('caption-bar').hidden = true;
          updateDescription();
          announce('VR session started.');
        },
        onEnd: () => {
          state.xrActive = false;
          app.camera.remove(captionHud.mesh);
          el('caption-bar').hidden = false;
          updateDescription();
          announce('VR session ended.');
        },
        onBoundary: (bounds) => {
          state.boundary = bounds ? bounds.length : null;
          el('boundary-status').textContent = bounds
            ? `Play-space boundary reported: ${bounds.length} points.`
            : 'No play-space boundary was reported by this device.';
        },
      });
    } catch (err) {
      announce(`Could not start VR: ${err.message}`);
    }
  });
}
