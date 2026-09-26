// panels.js: builds one spatial "panel" — a flat plane in the 3D room whose
// surface is a <canvas> turned into a texture, so it can show live text (the
// dashboard's numbers) instead of a fixed image. Nothing here knows whether a
// panel is world-locked, body-locked, or view-locked: that placement logic
// lives in layout.js. This file only knows how to draw and resize legible text.

import * as THREE from 'three';

// TODO 1: build the mesh, its canvas, and the CanvasTexture that connects them.
// A canvas is 2D pixels; a three.js material needs a Texture object wrapping
// an image source. CanvasTexture (unlike the base Texture class) sets
// needsUpdate to true immediately, because a canvas can be redrawn and
// re-uploaded to the GPU at any time, unlike a static image file.
export function createPanel({ widthMeters, heightMeters, pixelsPerMeter = 700 }) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(widthMeters * pixelsPerMeter);
  canvas.height = Math.round(heightMeters * pixelsPerMeter);
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  // Canvas drawing (fillStyle, fillText) happens in ordinary sRGB colour, the
  // same space a screen expects, so this texture must say so explicitly —
  // otherwise the renderer's lighting pipeline would treat it as linear data
  // and wash it out. Verified against three.js r186's Texture source, which
  // defaults colorSpace to NoColorSpace unless a texture sets it.
  texture.colorSpace = THREE.SRGBColorSpace;

  // MeshBasicMaterial, not MeshStandardMaterial: this plane is meant to read
  // like a printed sign, lit evenly regardless of the room's lighting, not to
  // react to it. side: DoubleSide so the panel is still legible from behind
  // (useful while testing distances and lock modes from odd angles).
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
  const geometry = new THREE.PlaneGeometry(widthMeters, heightMeters);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'panel-face';

  // A slightly larger, solid backing plane just behind the text, so the
  // panel reads clearly against the room instead of looking like floating
  // letters. It is a child of the text mesh, so it moves and locks with it
  // automatically wherever layout.js places the panel.
  const backing = new THREE.Mesh(
    new THREE.PlaneGeometry(widthMeters + 0.04, heightMeters + 0.04),
    new THREE.MeshBasicMaterial({ color: '#221733', side: THREE.DoubleSide }),
  );
  backing.position.z = -0.002;
  backing.name = 'panel-backing';
  mesh.add(backing);

  return { mesh, canvas, ctx, texture, widthMeters, heightMeters, pixelsPerMeter };
}

// TODO 2: draw legible text onto the panel's canvas.
// There is no single, universally correct font size for a VR panel: it
// depends on viewing distance, headset resolution, and the person reading
// it. The sizes below are a starting point drawn loosely from Meta Horizon
// OS's own guidance (developers.meta.com/horizon/design/styles_typography/
// and .../panels/), which suggests 18px or larger, at roughly conversational
// distance, for comfortable reading — test this yourself at your own
// headset's distance, with the angular-size readout from TODO 3, and adjust.
const TITLE_SIZE_RATIO = 0.078; // of canvas width
const BODY_SIZE_RATIO = 0.056;
const PADDING_RATIO = 0.06;

export function drawPanelText(panel, { title, lines }) {
  const { ctx, canvas } = panel;
  const pad = canvas.width * PADDING_RATIO;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#efe9f7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textBaseline = 'top';
  ctx.fillStyle = '#3f1d5e';
  const titleSize = Math.round(canvas.width * TITLE_SIZE_RATIO);
  ctx.font = `bold ${titleSize}px system-ui, sans-serif`;
  ctx.fillText(title, pad, pad);

  ctx.fillStyle = '#1b1b1f';
  const bodySize = Math.round(canvas.width * BODY_SIZE_RATIO);
  ctx.font = `${bodySize}px system-ui, sans-serif`;
  const lineHeight = bodySize * 1.35;
  let y = pad + titleSize * 1.7;
  for (const line of lines) {
    ctx.fillText(line, pad, y);
    y += lineHeight;
  }

  // Tells three.js to re-upload this canvas to the GPU on the next render.
  // Without this, a redraw() call would change the pixels but the panel
  // would keep showing whatever it looked like the first time.
  panel.texture.needsUpdate = true;
}

// TODO 3: how big does this panel's text actually look from here?
// Angular size is the real measure of "can a person read this", because the
// same physical panel looks smaller the further away it is. This returns the
// visual angle, in degrees, that a physical height subtends at a given
// distance — the maths behind why the same "Far" waypoint makes the same
// panel harder to read without changing a single pixel of it.
export function angularSizeDegrees(physicalHeightMeters, distanceMeters) {
  return THREE.MathUtils.radToDeg(2 * Math.atan(physicalHeightMeters / 2 / distanceMeters));
}
