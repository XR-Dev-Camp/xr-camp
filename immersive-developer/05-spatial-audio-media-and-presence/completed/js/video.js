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
  // The canvas is drawn in ordinary sRGB colour, the same colour space the
  // screen shows: this tells three.js not to re-interpret it as anything
  // else, the same reasoning as renderer.outputColorSpace in app.js.
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.PlaneGeometry(1.6, 0.9);
  // MeshBasicMaterial, not MeshStandardMaterial: a screen shows its own
  // light and should not visibly darken when the scene's own lights change.
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'Story screen';
  mesh.position.set(0, 1.75, -1.3);
  mesh.rotation.y = Math.PI; // faces the pedestals and the starting camera position

  return { mesh, canvas, ctx, texture };
}

// TODO 6: redraw the canvas and flag the texture as changed. CanvasTexture
// does not watch its canvas for you: without setting texture.needsUpdate to
// true after every draw, three.js keeps uploading the very first frame to
// the GPU forever. A real THREE.VideoTexture does not need this line: it
// checks the video element's own readyState each frame instead (see r186's
// src/textures/VideoTexture.js), which is the main practical difference
// between the two.
export function drawFrame({ ctx, canvas, texture }, { time, caption }) {
  const shift = (Math.sin(time * 0.4) + 1) / 2;
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `hsl(${258 + shift * 30}, 40%, 28%)`);
  gradient.addColorStop(1, `hsl(${200 + shift * 30}, 55%, 55%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = '600 22px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  wrapText(ctx, caption || 'Audio guide', canvas.width / 2, canvas.height / 2, canvas.width - 56, 28);

  texture.needsUpdate = true;
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
