// XR Camp · A-Frame Foundations · reference solution
//
// This file does five jobs, in this order:
//   1. Describe the room as data (exhibitData), once, so the 2D list, the
//      "Look at" buttons, and the scene description can never disagree.
//   2. Draw the Chinese label onto a <canvas> texture, because A-Frame's
//      default text component cannot show it (see the README).
//   3. Build the 2D list and the "Look at" buttons from exhibitData.
//   4. Wire "Look at" (instant when reduced motion is set, a short turn
//      otherwise) and the sound button (never autoplaying).
//   5. Detect WebGL and show the no-WebGL message when it is missing.

// --- 1. The room, as data -----------------------------------------------

const exhibitData = [
  {
    id: 'woven-panel',
    label: 'Woven-pattern pedestal',
    description: 'A pedestal and floor covered in a woven pattern: a small SVG made for XR Camp, turned into a texture.',
  },
  {
    id: 'label-en',
    label: 'Welcome panel (English)',
    description: 'A text panel reading "Welcome to the exhibit," drawn with A-Frame’s built-in text component.',
  },
  {
    id: 'label-es',
    label: 'Welcome panel (Spanish)',
    description: 'A text panel reading "Bienvenida a la sala." It uses plain letters on purpose: A-Frame’s default font drops accented vowels and ñ (see the README).',
  },
  {
    id: 'label-zh',
    label: 'Welcome panel (Chinese)',
    description: 'A text panel reading "欢迎光临" (welcome). It is drawn onto a canvas texture, because the default font cannot show Chinese characters at all.',
  },
  {
    id: 'sound-marker',
    label: 'Calm sound marker',
    description: 'A small sphere marking where a calm background loop can play. It never plays on its own; use "Play calm sound" below.',
  },
];

// --- 2. The Chinese label: a canvas-drawn text texture -------------------

// A-Frame's text component uses one MSDF font atlas (Roboto, loaded at
// runtime from cdn.aframe.io) with a fixed, small set of glyphs. It covers
// plain Latin letters, digits, and basic punctuation, but not accented
// Spanish vowels, not "ñ", and not CJK characters: they are silently
// dropped, with no visible placeholder. A <canvas> has no such limit: the
// browser's own font engine draws whatever the operating system can render.
function drawLabelTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#efe9f7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#3f1d5e';
  ctx.font = '600 72px "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas;
}

function applyLabelTexture(entityId, text) {
  const el = document.querySelector(entityId);
  const canvas = drawLabelTexture(text);
  const texture = new AFRAME.THREE.CanvasTexture(canvas);
  const mesh = el.getObject3D('mesh');
  if (mesh) {
    mesh.material.map = texture;
    mesh.material.needsUpdate = true;
  }
}

// --- 3. Build the 2D list and the "Look at" buttons -----------------------

function buildExhibitList() {
  const list = document.querySelector('#exhibit-list');
  list.innerHTML = '';
  for (const item of exhibitData) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.label}.</strong> ${item.description}`;
    list.append(li);
  }
}

function buildLookAtButtons() {
  const container = document.querySelector('#look-at-buttons');
  container.innerHTML = '';
  for (const item of exhibitData) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `look-${item.id}`;
    button.textContent = `Look at: ${item.label}`;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => lookAt(item));
    li.append(button);
    container.append(li);
  }
}

// --- 4. "Look at" (keyboard route) and the sound button -------------------

function setLookAtPressedState(activeId) {
  for (const item of exhibitData) {
    const button = document.querySelector(`#look-${item.id}`);
    button.setAttribute('aria-pressed', String(item.id === activeId));
  }
}

// Turns the camera rig to face a target, using the look-controls component's
// own yaw and pitch objects. Setting an entity's "rotation" attribute
// directly would be undone on the very next frame, because look-controls
// recalculates rotation from these two objects every frame (that is how it
// tracks the mouse, a finger drag, or a headset). Reduced motion snaps
// there in one frame; otherwise it turns over a third of a second.
function lookAt(item) {
  const camEl = document.querySelector('#camera');
  const lookControls = camEl.components['look-controls'];
  if (!lookControls) return;

  const target = document.querySelector(`#${item.id}`).object3D.getWorldPosition(new AFRAME.THREE.Vector3());
  const camPos = camEl.object3D.getWorldPosition(new AFRAME.THREE.Vector3());

  const lookMatrix = new AFRAME.THREE.Matrix4().lookAt(camPos, target, new AFRAME.THREE.Vector3(0, 1, 0));
  const targetEuler = new AFRAME.THREE.Euler().setFromRotationMatrix(lookMatrix, 'YXZ');

  const from = { yaw: lookControls.yawObject.rotation.y, pitch: lookControls.pitchObject.rotation.x };
  const to = { yaw: targetEuler.y, pitch: targetEuler.x };

  setLookAtPressedState(item.id);
  document.querySelector('#scene-description').textContent =
    `You are looking at: ${item.label}. ${item.description}`;

  if (window.__reducedMotion) {
    lookControls.yawObject.rotation.y = to.yaw;
    lookControls.pitchObject.rotation.x = to.pitch;
    return;
  }

  const durationMs = 350;
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / durationMs);
    const eased = 1 - Math.pow(1 - t, 2); // ease-out: gentle, not abrupt
    lookControls.yawObject.rotation.y = from.yaw + (to.yaw - from.yaw) * eased;
    lookControls.pitchObject.rotation.x = from.pitch + (to.pitch - from.pitch) * eased;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function wireSoundToggle() {
  const button = document.querySelector('#sound-toggle');
  const marker = document.querySelector('#sound-marker');

  function ready(fn) {
    if (marker.components.sound) fn();
    else marker.addEventListener('loaded', fn, { once: true });
  }

  button.addEventListener('click', () => {
    ready(() => {
      const playing = button.getAttribute('aria-pressed') === 'true';
      if (playing) {
        marker.components.sound.stopSound();
        button.setAttribute('aria-pressed', 'false');
        button.textContent = '▶ Play calm sound';
      } else {
        marker.components.sound.playSound();
        button.setAttribute('aria-pressed', 'true');
        button.textContent = '⏸ Pause calm sound';
      }
    });
  });
}

// --- 5. No WebGL: the room still has to work ------------------------------

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function checkWebGL() {
  if (hasWebGL()) return;
  document.querySelector('#canvas-box').hidden = true;
  document.querySelector('#no-webgl-message').hidden = false;
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
