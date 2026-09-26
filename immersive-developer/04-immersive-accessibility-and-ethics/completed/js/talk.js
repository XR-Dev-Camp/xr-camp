// talk.js: the narration and its captions. Uses the browser's own Web Speech
// API (window.speechSynthesis) - a free, built-in tool that needs no
// account, no API key, and no file to download - as an enhancement over a
// transcript that is always there anyway.
//
// Fix for TODO 3: the starter drew each caption onto a plane fixed in
// *world* space next to the presenter, so turning away lost it, and it
// cleared itself on a timer too short to read. This version anchors the
// caption plane to the *camera* instead (a child of `camera`, not `scene`),
// the standard way an XR "HUD" element stays in view - the same technique
// menu.js used in 4.2 for its in-world menu, just parented differently - and
// mirrors it in a DOM element (#captions) for the non-XR view, since a
// headset never renders ordinary page DOM. Each caption stays up until the
// next line starts, not on a fixed timer. See XAUR User Need 19
// ("customise captions, subtitles and other text in XR environments") and
// User Need 10 (captions matter as much as signing for many deaf and
// hard-of-hearing users). Fix for TODO 1: `describeScene` and the
// transcript list give the same information as speech, in text, all the
// time - not only when WebGL or speech synthesis happen to be available.

import * as THREE from 'three';

export const TALK_SCRIPT = [
  { id: 'intro', text: "Welcome. I'm Ana, and today I'll tell you about three objects from our collection." },
  { id: 'clay-pot', text: 'This is a clay pot, hand-shaped from unglazed terracotta and fired in a kiln.' },
  { id: 'basket-ring', text: 'This is a woven basket ring, coiled from dried grass or reed.' },
  { id: 'jade-stone', text: 'And this is a jade stone, carved and polished until it catches the light.' },
  { id: 'outro', text: "That's the whole talk. Press “Ask a question” if you would like to know more." },
];

export function describeScene({ presenting, idleAnimating }) {
  const parts = [
    'Ana, the presenter, stands facing you, with three small objects in front of her: a clay pot, a woven basket ring, and a jade stone.',
    idleAnimating ? 'She sways very slightly as she speaks.' : 'Animation is paused: she is holding still.',
  ];
  parts.push(presenting
    ? 'You are viewing this in VR. Captions appear low in your view wherever you look.'
    : 'Drag the view, or focus it and use the arrow keys, to look around. Captions appear at the bottom of the scene while the talk plays; the full transcript is always below.');
  return parts.join(' ');
}

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

export function initTalk({ camera, captionsOn, domCaptions, onLine, onEnd }) {
  // A HUD caption plane, parented to the camera so it stays in the lower
  // part of the view no matter which way the learner looks - the in-VR
  // equivalent of the #captions overlay in the non-XR view.
  const captionPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 0.25),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, toneMapped: false, depthTest: false }),
  );
  captionPlane.position.set(0, -0.32, -1);
  captionPlane.renderOrder = 999;
  camera.add(captionPlane);

  function showCaption(text) {
    if (!captionsOn()) { captionPlane.material.opacity = 0; if (domCaptions) domCaptions.textContent = ''; return; }
    captionPlane.material.map = drawCaptionTexture(text);
    captionPlane.material.opacity = 1;
    captionPlane.material.needsUpdate = true;
    if (domCaptions) domCaptions.textContent = text;
  }

  function clearCaption() {
    captionPlane.material.opacity = 0;
    if (domCaptions) domCaptions.textContent = '';
  }

  function speak(index) {
    if (index >= TALK_SCRIPT.length) { clearCaption(); onEnd?.(); return; }
    const line = TALK_SCRIPT[index];
    onLine?.(line, index);
    showCaption(line.text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.onend = () => speak(index + 1);
      utterance.onerror = () => speak(index + 1);
      window.speechSynthesis.speak(utterance);
    } else {
      // Speech synthesis is only an enhancement here: the transcript (built
      // by main.js from TALK_SCRIPT) already gave the learner every line
      // before playback even started, so nothing is lost by moving on.
      setTimeout(() => speak(index + 1), 1800);
    }
  }

  function start() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    speak(0);
  }

  return { start, clearCaption };
}
