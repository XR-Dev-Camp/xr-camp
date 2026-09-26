// labels.js: 3D labels drawn on a canvas, not with A-Frame or three.js's own
// text geometries.
//
// Why: A-Frame's built-in text component, and three.js's TextGeometry, both
// render from a bitmap or signed-distance-field (MSDF) font atlas — a fixed
// image of glyphs baked in advance. The default fonts XR Camp has used so
// far ship only Latin glyphs with no accents, so 'á' and 'ñ' come out
// blank, and Chinese (tens of thousands of possible characters) cannot be
// baked into one atlas at all. A custom MSDF atlas that includes the needed
// CJK characters is possible but heavy (see "3D and XR accessibility" in
// the README) and still needs the right characters chosen in advance.
//
// A <canvas> has none of that limit: the browser's own text renderer draws
// it, using whatever font covers the current character, exactly as it would
// draw any other text on the page. Painting that canvas onto a plane or
// sprite gives a 3D label that can say anything the browser can render.

import * as THREE from 'three';

const CANVAS_HEIGHT = 128; // px; width is chosen to fit the text
const PADDING = 24; // px on each side

export function createLabelSprite(text, { worldHeight = 0.22, fontFamily = 'sans-serif', color = '#1b1b1f' } = {}) {
  const font = `600 56px ${fontFamily}`;

  // A throwaway 1x1 context, only used to measure the text at the font size
  // above, so the real canvas can be made exactly as wide as it needs to be.
  const measurer = document.createElement('canvas').getContext('2d');
  measurer.font = font;
  const textWidth = measurer.measureText(text).width;

  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(textWidth) + PADDING * 2;
  canvas.height = CANVAS_HEIGHT;

  // Resizing a canvas clears its context state, so font, fill style, and
  // alignment are all set again after width/height are assigned.
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // A white rounded card behind the text keeps it readable against any
  // background colour the scene might use.
  ctx.fillStyle = '#ffffffee';
  const r = 16;
  ctx.beginPath();
  ctx.roundRect(0, 0, canvas.width, canvas.height, r);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
  sprite.scale.set(worldHeight * (canvas.width / canvas.height), worldHeight, 1);
  return sprite;
}

// Replaces a label sprite already in `group` (if any) with a freshly drawn
// one for the current language, disposing the old canvas texture so it does
// not leak GPU memory every time the language changes.
export function setLabel(group, item, text, options) {
  if (item.label) {
    group.remove(item.label);
    item.label.material.map?.dispose();
    item.label.material.dispose();
  }
  const label = createLabelSprite(text, options);
  label.position.set(item.data.x, options.pedestalTopY + 0.32, 0);
  label.userData.itemId = item.data.id;
  group.add(label);
  item.label = label;
}
