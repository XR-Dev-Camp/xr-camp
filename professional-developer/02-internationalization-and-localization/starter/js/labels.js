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

// Draws `text` onto a canvas and returns a THREE.Sprite showing it, sized so
// its height in world units is `worldHeight`. `lang` is set on nothing here
// (canvas 2D has no lang attribute) but is accepted so callers can log or
// branch on it; the real per-language font work happens in the CSS
// (".zh-label" etc. — see styles.css) for HTML text, and in `fontFamily`
// below for canvas text, which the DOM's lang-based font selection cannot
// reach because a canvas is just pixels.
export function createLabelSprite(text, { worldHeight = 0.22, fontFamily, color = '#1b1b1f' } = {}) {
  // TODO 7: draw the label.
  //   1. Create an offscreen canvas (`document.createElement('canvas')`).
  //      Use a temporary 2D context with `ctx.font` set to measure the text
  //      first (e.g. `bold 64px ${fontFamily}`), so the canvas can be made
  //      just wide enough — a fixed width either clips long Chinese
  //      sentences or wastes texture memory on short English ones.
  //   2. Set canvas.width to the measured text width plus some padding, and
  //      canvas.height to CANVAS_HEIGHT.
  //   3. Re-set `ctx.font` (a canvas resize clears its context state), plus
  //      ctx.fillStyle = color, ctx.textAlign = 'center', and
  //      ctx.textBaseline = 'middle'. Fill a white rounded rectangle behind
  //      the text first for contrast against any background, then
  //      ctx.fillText(text, canvas.width / 2, canvas.height / 2).
  //   4. Build `new THREE.CanvasTexture(canvas)`, set its `colorSpace` to
  //      THREE.SRGBColorSpace (canvas 2D draws in sRGB, like an image), and
  //      wrap it in a `new THREE.Sprite(new THREE.SpriteMaterial({ map,
  //      transparent: true }))`.
  //   5. Scale the sprite so it is `worldHeight` tall and keeps the
  //      canvas's aspect ratio: `sprite.scale.set(worldHeight * (canvas.width
  //      / canvas.height), worldHeight, 1)`.
  //   6. Return the sprite.
  return new THREE.Sprite(new THREE.SpriteMaterial({ color }));
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
