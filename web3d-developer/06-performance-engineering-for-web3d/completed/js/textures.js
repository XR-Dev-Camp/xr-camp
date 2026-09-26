// textures.js: a procedural colour texture, drawn on a <canvas> and used as
// a material's colour map. No image files: everything here is generated in
// code, so this lesson can create as much texture data as it likes without
// touching the image-file budget in docs/en/3d-assets-and-versions.md.

import * as THREE from 'three';

// 256px is plenty of resolution for a flat colour swatch seen from a few
// metres away: 1/16th the pixel count (and GPU upload cost) of the 1024px
// version this lesson started from.
const TEXTURE_SIZE = 256;

const cache = new Map();

// Every item of the same kind (every clay pot, every jade stone...) shares
// one texture instead of generating its own. Sharing a texture (and a
// material) across copies is what makes InstancedMesh possible in hall.js:
// instancing needs one geometry and one material for a whole batch.
export function getSwatchTexture(color, label) {
  const key = `${color}:${label}`;
  if (cache.has(key)) return cache.get(key);
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
  cache.set(key, texture);
  return texture;
}

export function disposeSwatchCache() {
  for (const texture of cache.values()) texture.dispose();
  cache.clear();
}

// --- KTX2 / Basis Universal: an optional next step -------------------------
// A generated canvas texture above is already small (256x256 is 256 KB of
// GPU memory). A photographed or hand-painted texture loaded from a file is
// a different story once it is a few megapixels: an ordinary .jpg or .png
// is small on disk but decompresses to full size once uploaded to the GPU.
// KTX2Loader (three/addons/loaders/KTX2Loader.js) loads a texture that is
// already GPU-compressed with Basis Universal, so it stays small in BOTH
// places. This lesson has no texture files to convert (everything above is
// generated in code), so this path is not exercised here, only shown:
//
//   import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
//   const ktx2Loader = new KTX2Loader()
//     .setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/libs/basis/')
//     .detectSupport(renderer);
//   ktx2Loader.load('exhibit-wall.ktx2', (texture) => { material.map = texture; });
//
// If a later project adds photographed textures, convert them first with
// the free KTX-Software command-line tool (basisu), which runs offline on
// Windows, macOS, and Linux.
