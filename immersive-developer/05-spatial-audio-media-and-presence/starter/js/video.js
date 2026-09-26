// video.js: the exhibit's "story screen" -- a plane textured with a canvas
// that is redrawn every frame with THREE.CanvasTexture. This teaches the
// same underlying idea a video does (a texture whose pixels keep changing
// over time) without needing a video file at all. See the README's
// "Key code explained" for how you would swap this for a real <video>
// element and THREE.VideoTexture instead, as an optional exercise with a
// clip of your own.

import * as THREE from 'three';

const WIDTH = 512;
const HEIGHT = 288; // 16:9, the aspect ratio most video clips use

export function buildStoryScreen() {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.PlaneGeometry(1.6, 0.9);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'Story screen';
  mesh.position.set(0, 1.75, -1.3);
  mesh.rotation.y = Math.PI;

  return { mesh, canvas, ctx, texture };
}

// TODO 6: draw one frame, then flag the texture as changed.
// 1. Fill the canvas with something that changes over `time` (a moving
//    gradient is enough: `ctx.createLinearGradient(...)`, with a colour stop
//    based on `Math.sin(time * ...)`, then `ctx.fillRect(0, 0, canvas.width, canvas.height)`).
// 2. Draw `caption` as text on top of it, so the story screen shows the
//    current caption from captions.js (`ctx.fillText`, or the `wrapText`
//    helper below for longer lines).
// 3. Set `texture.needsUpdate = true` last, every time. CanvasTexture does
//    not watch its canvas for you: without this line, three.js keeps
//    uploading the very first frame to the GPU forever. A real
//    THREE.VideoTexture does not need this line: it checks the video
//    element's own readyState each frame instead (see r186's
//    src/textures/VideoTexture.js), which is the main practical difference
//    between the two.
export function drawFrame({ ctx, canvas, texture }, { time, caption }) {

}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((text_, i) => ctx.fillText(text_, x, startY + i * lineHeight));
}
