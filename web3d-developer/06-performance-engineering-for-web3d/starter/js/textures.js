// textures.js: a procedural colour texture, drawn on a <canvas> and used as
// a material's colour map. No image files: everything here is generated in
// code, so this lesson can create as much texture data as it likes without
// ever touching the image-file budget in docs/en/3d-assets-and-versions.md.
// That freedom is also the trap: nothing stops the hall below from asking
// for far more texture data than it needs.

import * as THREE from 'three';

// TODO 5: this is why every object in the hall looks the same but costs so
// much. Every mesh gets its own brand-new canvas at this size, even the
// three hundred that repeat only three or four colours. A 1024x1024 RGBA
// canvas is 4 MB of pixel data, generated AND uploaded to the GPU once per
// mesh. Two problems live in this one number: it is bigger than any of
// these flat colour swatches need (see "Performance considerations" in the
// README for a rule of thumb), and it is never shared between meshes that
// look identical. Fixing the sharing (a cache, keyed by colour) matters more
// than shrinking the number alone.
const TEXTURE_SIZE = 1024;

export function makeSwatchTexture(color, label) {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.font = `${Math.round(TEXTURE_SIZE / 9)}px sans-serif`;
  ctx.fillText(label, TEXTURE_SIZE * 0.08, TEXTURE_SIZE * 0.5);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
