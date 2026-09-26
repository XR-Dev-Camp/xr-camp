// Wires 4.1 (Enter VR), 4.2 (input, with a 2D/keyboard equal for every XR
// interaction), 4.4 (the accessibility and ethics fixes), and 4.5 (spatial
// audio and captions) into this capstone's one exhibit. Every subsystem
// below was already built by an earlier lesson (js/app.js, js/exhibit.js,
// js/describe.js, js/xr.js, js/interact.js, js/presenter.js,
// js/audio-captions.js all already work); your eight numbered TODOs, four
// here and four in index.html, connect them.
import { createApp, selectExhibit, setGrabbed, setPaused } from './app.js';
import { setupControllers, placeMarker } from './interact.js';
import { addAvatar, requestPersonalize } from './presenter.js';
import { setupAudio, playNarration, transcriptLines, createCaptionHud } from './audio-captions.js';
import { buildSceneDescription } from './describe.js';
import { EXHIBITS } from './exhibit.js';
import { isVRSupported, enterVR } from './xr.js';

const el = (id) => document.getElementById(id);
const announce = (msg) => { el('status').textContent = msg; };

// --- The 2D twin: always built, whether or not WebGL is available, so the
// facts about the exhibit never live only inside the canvas (WCAG 1.3.1). ---
const list = el('exhibit-list');
for (const data of EXHIBITS) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${data.name}</strong> — ${data.material}
    <div class="button-row">
      <button type="button" data-select="${data.id}" aria-pressed="false">Select: ${data.name}</button>
      <!-- TODO 4: add two more buttons here, matching data-select's pattern:
           one with data-grab="${data.id}" and aria-pressed="false" (labelled
           "Grab: <name>"), and one with data-play="${data.id}" (labelled
           "Play narration: <name>"). See 4.2's direct-grab interaction and
           4.5's per-exhibit sound; the click handler below already has a
           branch waiting for each dataset key. -->
    </div>`;
  list.appendChild(li);
}

// --- Personalize (4.4's fixed camera-consent flow): explain first, ask
// second, never store or show what the camera sees. This does not need the
// 3D scene, so it is wired up either way, once TODO 5 adds its markup. ---
// TODO 6: add a click listener on the button from TODO 5 (id
// "personalize-consent") that calls `await requestPersonalize()` and writes
// a plain-language result into the paragraph from TODO 5 (id
// "personalize-result"): one message for `result.ok`, one for
// `result.reason === 'denied'`, one for `'not-supported'`, and a last one
// for anything else. Never call requestPersonalize() except from this
// click — it must never run on page load.

// --- The 3D scene, the audio, and every button that depends on it. When
// WebGL 2 is unavailable, the 2D twin above still carries every fact (2D
// fallback); the 3D-only controls are hidden instead of left broken. ---
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
    }
    // TODO 4 (continued): add an `else if (btn.dataset.grab)` branch that
    // toggles `setGrabbed(app, btn.dataset.grab, ...)` and flips the
    // button's aria-pressed, and an `else if (btn.dataset.play)` branch
    // that calls `playNarration(sounds, btn.dataset.play)` and passes its
    // returned caption text to the function TODO 8 asks you to write.
  });

  // TODO 8: this project has no caption bar or transcript yet (add their
  // markup in index.html first). Once it exists: (a) loop over
  // `transcriptLines()` and append one <li> per line to the transcript
  // list, so it is complete before any narration ever plays; (b) write a
  // `setCaption(text)` helper that sets #caption-text and also calls
  // `captionHud.setText(text)`, and call it from the `data-play` branch
  // above; (c) inside the VR onStart/onEnd callbacks below, add
  // `app.camera.add(captionHud.mesh)` / `.remove(...)` and hide/show
  // #caption-bar, so the caption moves from the page to the headset's view
  // and back.

  // TODO 4 (continued): wire the Place marker button from index.html's
  // TODO 3 — `el('place-marker').addEventListener('click', () => { ... })`
  // calling `placeMarker(app)` and announcing what happened.

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
    updateDescription();
    announce('Exhibit reset.');
  });

  // TODO 2: this project cannot enter VR yet (add the Enter VR section's
  // missing boundary-status paragraph in index.html first, TODO 1). Once it
  // exists: check `await isVRSupported()` on load to enable or explain why
  // the button (id "enter-vr") is disabled, then on click call
  // `enterVR(app, { onStart, onEnd, onBoundary })`, updating `state.xrActive`
  // and `#boundary-status` exactly as `xr.js`'s comments describe. Wrap the
  // click handler's body in try/catch and announce any error.
}
