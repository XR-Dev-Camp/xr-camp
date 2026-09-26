// XR Camp · A-Frame Foundations · starter
//
// This file does five jobs. Each one starts as a small placeholder below, so
// the page runs while you work: when you reach a TODO, replace its
// placeholder with the real version.
//   1. Describe the room as data (exhibitData), once, so the 2D list, the
//      "Look at" buttons, and the scene description can never disagree.
//   2. Draw the Chinese label onto a <canvas> texture, because A-Frame's
//      default text component cannot show it (see the README).
//   3. Build the 2D list and the "Look at" buttons from exhibitData.
//   4. Wire "Look at" (instant when reduced motion is set, a short turn
//      otherwise) and the sound button (never autoplaying).
//   5. Detect WebGL and show the no-WebGL message when it is missing.

// --- 1. The room, as data -----------------------------------------------

// TODO 10: fill this array with one object per exhibit stop. Each needs an
// "id" that matches an entity id you wrote in index.html, a short "label",
// and a one- or two-sentence "description". You need five: the
// woven-pattern pedestal, the three welcome panels, and the sound marker.
// (Look at completed/main.js only after you have tried this yourself.)
const exhibitData = [];

// --- 2. The Chinese label: a canvas-drawn text texture -------------------

// TODO 11: write drawLabelTexture(text), which:
//   - creates a <canvas> (try 512 by 256),
//   - fills it with a background colour,
//   - sets ctx.font to something that includes a Chinese-capable font name
//     (for example '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif'),
//   - draws `text` centred on the canvas,
//   - returns the canvas.
// Then write applyLabelTexture(entityId, text), which finds the entity,
// calls drawLabelTexture, wraps the canvas in `new AFRAME.THREE.CanvasTexture(canvas)`,
// and sets it as that entity's mesh material map:
//   const mesh = el.getObject3D('mesh');
//   mesh.material.map = texture;
//   mesh.material.needsUpdate = true;
function applyLabelTexture(entityId, text) {
  // placeholder: does nothing yet
}

// --- 3. Build the 2D list and the "Look at" buttons -----------------------

// TODO 12: write buildExhibitList(), which reads #exhibit-list, clears it,
// and appends one <li> per item in exhibitData (label in <strong>, then the
// description). Then write buildLookAtButtons(), which does the same for
// #look-at-buttons: one <li><button> pair per item, with the button's id set
// to `look-${item.id}`, its text "Look at: " + the label, and
// aria-pressed="false" to start. Each button's click should call
// lookAt(item) (TODO 13).
function buildExhibitList() {
  // placeholder: does nothing yet
}

function buildLookAtButtons() {
  // placeholder: does nothing yet
}

// --- 4. "Look at" (keyboard route) and the sound button -------------------

// TODO 13: write lookAt(item). This is the trickiest step: read "Look at an
// exhibit stop" in the README first. In short:
//   - get the camera: document.querySelector('#camera')
//   - get its look-controls component: camEl.components['look-controls']
//   - get the target's world position: document.querySelector('#' + item.id)
//     .object3D.getWorldPosition(new AFRAME.THREE.Vector3())
//   - get the camera's world position the same way
//   - build a look-at matrix and pull yaw/pitch out of it with
//     new AFRAME.THREE.Matrix4().lookAt(camPos, target, new AFRAME.THREE.Vector3(0,1,0))
//     and new AFRAME.THREE.Euler().setFromRotationMatrix(matrix, 'YXZ')
//   - if window.__reducedMotion, set lookControls.yawObject.rotation.y and
//     .pitchObject.rotation.x straight to the target values
//   - otherwise, animate both from their current values to the target values
//     over a short time (a few hundred milliseconds) with requestAnimationFrame
// Also: mark the clicked button aria-pressed="true" and the rest "false",
// and update #scene-description to say what the learner is now looking at.
function lookAt(item) {
  // placeholder: does nothing yet
}

// TODO 14: write wireSoundToggle(). Find #sound-toggle and #sound-marker.
// The sound component is not ready the instant the page loads, so wait for
// it: if marker.components.sound already exists, use it now; otherwise wait
// for the marker's "loaded" event. On click, toggle between
// marker.components.sound.playSound() and .stopSound(), and update the
// button's aria-pressed and its text (for example "▶ Play calm sound" /
// "⏸ Pause calm sound").
function wireSoundToggle() {
  // placeholder: does nothing yet
}

// --- 5. No WebGL: the room still has to work ------------------------------

// TODO 15: write hasWebGL(), returning true or false, by trying to create a
// canvas and call canvas.getContext('webgl') (fall back to
// 'experimental-webgl'), inside a try/catch. Then write checkWebGL(), which
// calls hasWebGL() and, if it is false, hides #canvas-box (set its `hidden`
// property to true) and un-hides #no-webgl-message (`hidden = false`).
function hasWebGL() {
  return true; // placeholder: always says WebGL is available
}

function checkWebGL() {
  // placeholder: does nothing yet
}

// --- Start -----------------------------------------------------------------

function init() {
  buildExhibitList();
  buildLookAtButtons();
  wireSoundToggle();
  checkWebGL();

  const scene = document.querySelector('#exhibit-scene');
  function drawZhLabel() {
    applyLabelTexture('#label-zh', '欢迎光临');
  }
  if (scene.hasLoaded) drawZhLabel();
  else scene.addEventListener('loaded', drawZhLabel);
}

init();
