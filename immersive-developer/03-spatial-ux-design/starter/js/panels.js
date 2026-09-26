// panels.js: builds one spatial "panel" — a flat plane in the 3D room whose
// surface is a <canvas> turned into a texture, so it can show live text (the
// dashboard's numbers) instead of a fixed image. Nothing here knows whether a
// panel is world-locked, body-locked, or view-locked: that placement logic
// lives in layout.js. This file only knows how to draw and resize legible text.

import * as THREE from 'three';

// TODO 1: build the mesh, its canvas, and the CanvasTexture that connects
// them. A canvas is 2D pixels; a three.js material needs a Texture object
// wrapping an image source: create a <canvas>, size it to
// `widthMeters * pixelsPerMeter` by `heightMeters * pixelsPerMeter` pixels,
// wrap it in a `new THREE.CanvasTexture(canvas)`, set
// `texture.colorSpace = THREE.SRGBColorSpace` (canvas drawing is ordinary
// sRGB colour, and three.js needs to be told that explicitly), then build a
// `THREE.PlaneGeometry(widthMeters, heightMeters)` and a
// `THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })`.
// For now, this placeholder returns a plain, textless coloured plane, so the
// room already looks roughly right while you build the real panel.
export function createPanel({ widthMeters, heightMeters, pixelsPerMeter = 700 }) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(widthMeters, heightMeters),
    new THREE.MeshBasicMaterial({ color: '#c9c4d4', side: THREE.DoubleSide }),
  );
  return { mesh, canvas: null, ctx: null, texture: null, widthMeters, heightMeters, pixelsPerMeter };
}

// TODO 2: draw legible text onto `panel.canvas`. There is no single,
// universally correct font size for a VR panel — it depends on viewing
// distance, headset resolution, and the person reading it. Meta Horizon
// OS's own typography guidance (developers.meta.com/horizon/design/styles_typography/)
// suggests 18px or larger, at roughly conversational distance, for
// comfortable reading: use that as a starting point, drawing a bold title
// then each line of `lines` beneath it, and call
// `panel.texture.needsUpdate = true` at the end so three.js re-uploads the
// canvas — without that line, the pixels change but the panel does not.
export function drawPanelText(panel, { title, lines }) {
  // No canvas yet in this placeholder: nothing to draw.
}

// TODO 3: how big does this panel's text actually look from here? Angular
// size is the real measure of "can a person read this", because the same
// physical panel looks smaller the further away it is. Return the visual
// angle, in degrees, that `physicalHeightMeters` subtends at `distanceMeters`:
// `2 * atan((physicalHeightMeters / 2) / distanceMeters)`, converted from
// radians to degrees (`THREE.MathUtils.radToDeg`).
export function angularSizeDegrees(physicalHeightMeters, distanceMeters) {
  return 0;
}
