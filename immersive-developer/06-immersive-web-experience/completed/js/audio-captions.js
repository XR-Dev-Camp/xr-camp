// Spatial audio and captions, reused from 4.5: each pedestal keeps its own
// short, looping, procedurally generated sound (see ATTRIBUTION.md — no
// recording equipment or sound library was used), played through
// THREE.PositionalAudio so its loudness changes with distance, exactly as
// 4.5 taught. The caption this file shows is always anchored to the
// viewer, not to a point in the world: a flat DOM bar outside the canvas
// while on a screen, and a small canvas-texture plane attached to the
// camera itself once inside VR, so the words never sit behind you.
import * as THREE from 'three';
import { EXHIBITS, findExhibit } from './exhibit.js';

export function setupAudio(app) {
  const listener = new THREE.AudioListener();
  app.camera.add(listener);
  const loader = new THREE.AudioLoader();
  const sounds = new Map();

  for (const data of EXHIBITS) {
    const sound = new THREE.PositionalAudio(listener);
    sound.setRefDistance(0.9);
    sound.setDistanceModel('inverse');
    sound.setLoop(false);
    loader.load(data.sound, (buffer) => sound.setBuffer(buffer));
    app.pedestals.get(data.id).item.add(sound);
    sounds.set(data.id, sound);
  }
  return sounds;
}

// Only ever called from a click (a Play narration button): nothing in this
// project starts a sound on its own.
export function playNarration(sounds, id) {
  const sound = sounds.get(id);
  if (sound?.buffer && !sound.isPlaying) sound.play();
  return findExhibit(id)?.caption ?? '';
}

// Builds the always-present transcript once, from the same EXHIBITS data
// the 3D scene and the caption bar both read from, so it is correct whether
// or not a single Play narration button has ever been pressed (WCAG 1.2.1).
export function transcriptLines() {
  return EXHIBITS.map((e) => `${e.name}: ${e.caption}`);
}

// A small viewer-locked caption plane for VR: a canvas redrawn with the
// current caption text, on a plane added as a child of the camera (not the
// scene), so it moves exactly as the headset does and stays readable no
// matter which way the visitor turns.
export function createCaptionHud() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 0.17),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
  );
  mesh.position.set(0, -0.35, -0.9);

  function setText(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(20, 16, 12, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f4efe6';
    ctx.font = '40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    wrapText(ctx, text || ' ', canvas.width / 2, canvas.height / 2, canvas.width - 60, 48);
    texture.needsUpdate = true;
  }

  return { mesh, setText };
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}
