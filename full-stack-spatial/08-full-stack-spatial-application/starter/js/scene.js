// scene.js: the one file that touches the A-Frame scene. A single box
// represents whichever scene is currently open -- green if it is public,
// amber if it is private and you can only see it because you own it --
// with a gentle idle rotation that respects prefers-reduced-motion and the
// Pause animation button, the same as every other 3D lesson in this
// course. main.js never sets an A-Frame attribute directly; it only calls
// the functions below.

const PUBLIC_COLOR = '#2f7d5b';
const PRIVATE_COLOR = '#a97a1f';
const IDLE_COLOR = '#8a8398';

function box() {
  return document.getElementById('scene-box');
}

function label() {
  return document.getElementById('scene-label');
}

let animating = true;

// Adds or removes the rotation animation component itself (not just a
// paused flag), so that "not animating" is also true the instant
// prefers-reduced-motion is read, before any scene has even loaded --
// exactly the guarantee the README's accessibility section describes.
function applyAnimationState() {
  const el = box();
  if (!el) return;
  if (animating) {
    el.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 9000; easing: linear');
  } else {
    el.removeAttribute('animation');
  }
}

export function setAnimating(value) {
  animating = value;
  applyAnimationState();
}

export function isAnimating() {
  return animating;
}

export function showScene({ name, isPublic, isOwner }) {
  const el = box();
  const lbl = label();
  if (el) el.setAttribute('material', 'color', isPublic ? PUBLIC_COLOR : PRIVATE_COLOR);
  if (lbl) lbl.setAttribute('text', 'value', isOwner ? name : `${name} (public)`);
  applyAnimationState();
}

export function clearScene() {
  const el = box();
  const lbl = label();
  if (el) el.setAttribute('material', 'color', IDLE_COLOR);
  if (lbl) lbl.setAttribute('text', 'value', 'No scene open yet');
}
