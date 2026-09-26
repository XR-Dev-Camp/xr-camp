// talk.js: the narration and its captions. Uses the browser's own Web Speech
// API (window.speechSynthesis) for the spoken part - a free, built-in tool
// that needs no account, no API key, and no file to download.
//
// TODO 3: the caption for each line is drawn onto a texture on a flat plane
// that sits in a fixed *world* position next to the presenter (see
// `captionPlane` below). Turn the camera away, or walk past it in VR, and
// the caption is gone. It also clears itself on a fixed timer that is too
// short to read. Fix it by anchoring the captions to the *camera* instead of
// the scene (so they stay in view the way a HUD does), mirroring them in an
// ordinary HTML element positioned over the canvas for the non-XR view, and
// keeping each caption up until the next line is ready rather than on a
// fixed timer. See XAUR User Need 19 (customising captions) and User Need 10
// (a deaf or hard-of-hearing person may prefer text to always be available).
//
// TODO 1: there is also no text version of the talk anywhere else on the
// page. Add a `<p id="scene-description">` and an always-visible transcript
// list built from TALK_SCRIPT, the same information whether or not speech
// synthesis is available (WCAG 1.1.1, 1.3.1).

import * as THREE from 'three';

export const TALK_SCRIPT = [
  { id: 'intro', text: "Welcome. I'm Ana, and today I'll tell you about three objects from our collection." },
  { id: 'clay-pot', text: 'This is a clay pot, hand-shaped from unglazed terracotta and fired in a kiln.' },
  { id: 'basket-ring', text: 'This is a woven basket ring, coiled from dried grass or reed.' },
  { id: 'jade-stone', text: 'And this is a jade stone, carved and polished until it catches the light.' },
  { id: 'outro', text: "That's the whole talk. Press “Ask a question” if you would like to know more." },
];

function drawCaptionTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(20, 20, 25, 0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.font = '48px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  wrapText(ctx, text, canvas.width / 2, canvas.height / 2, canvas.width - 80, 56);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
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

export function initTalk({ scene, presenter, onLine, onEnd }) {
  // The caption plane: a child of `scene`, at a fixed spot beside the
  // presenter. It never moves to follow the camera.
  const captionPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.4),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, toneMapped: false }),
  );
  captionPlane.position.set(-1.4, 1.6, -1.2);
  scene.add(captionPlane);

  function showCaption(text) {
    captionPlane.material.map = drawCaptionTexture(text);
    captionPlane.material.opacity = 1;
    captionPlane.material.needsUpdate = true;
    // The caption is gone again well before an average reader, let alone a
    // second-language reader, would finish it.
    setTimeout(() => { captionPlane.material.opacity = 0; }, 1200);
  }

  function speak(index) {
    if (index >= TALK_SCRIPT.length) { onEnd?.(); return; }
    const line = TALK_SCRIPT[index];
    onLine?.(line, index);
    showCaption(line.text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.onend = () => speak(index + 1);
      utterance.onerror = () => speak(index + 1);
      window.speechSynthesis.speak(utterance);
    } else {
      // No speech synthesis, no captions worth reading, and no transcript:
      // this learner gets nothing from the talk at all.
      setTimeout(() => speak(index + 1), 1500);
    }
  }

  function start() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    speak(0);
  }

  return { start };
}
