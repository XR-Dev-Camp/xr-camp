// ar.js: a second, separate kind of WebXR session, immersive-ar, used here
// for one purpose: placing a virtual object onto a real surface with
// hit-test. It follows the same shape as xr.js (feature-detect, then wire a
// button to request/end a session), because entering any WebXR session
// works the same way regardless of mode; hit-test itself is the new API.

import * as THREE from 'three';

const SESSION_MODE = 'immersive-ar';
const REQUIRED_FEATURES = ['hit-test'];

// `isSessionSupported('immersive-ar')` only answers "can this device present
// an AR session at all?" - it says nothing about any particular feature.
// There is no way to feature-detect 'hit-test' itself in advance; you find
// out only by requesting a session with it as a required feature and seeing
// whether that request succeeds or rejects (handled in enterAR() below).
// Finished code, the same shape as supportsImmersiveVR() in xr.js.
export async function supportsImmersiveAR() {
  if (!('xr' in navigator)) return false;
  try {
    return await navigator.xr.isSessionSupported(SESSION_MODE);
  } catch {
    return false;
  }
}

// The reticle: a flat ring showing exactly where the jade stone would land
// if you selected right now. `matrixAutoUpdate = false` because its
// position comes from `pose.transform.matrix` directly (TODO 9), not from
// position/rotation/scale properties three.js would otherwise recompute.
// Finished code - nothing to do here.
function buildReticle() {
  const geometry = new THREE.RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({ color: '#5b2a86' });
  const reticle = new THREE.Mesh(geometry, material);
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  reticle.name = 'AR placement reticle';
  return reticle;
}

// A small stand-in for the exhibit's jade stone, recognisably the same
// object (same geometry and colour as exhibit.js's own), placed into the
// real room rather than onto a pedestal. Finished code.
function buildPlacedStone() {
  const geometry = new THREE.IcosahedronGeometry(0.12, 0);
  const material = new THREE.MeshStandardMaterial({ color: '#2f7d5b', roughness: 0.35, metalness: 0 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'Placed jade stone (AR)';
  return mesh;
}

// One placed object, shared between AR hit-test placement (below) and
// main.js's "Place object (2D)" button: both are the same idea, "put a jade
// stone at this exact spot", so they share one implementation and one
// object. Finished code - nothing to do here.
export function createPlacement(scene) {
  let placed = null;
  function placeAt(position, quaternion) {
    if (!placed) {
      placed = buildPlacedStone();
      scene.add(placed);
    }
    placed.position.copy(position);
    if (quaternion) placed.quaternion.copy(quaternion);
  }
  function remove() {
    if (!placed) return false;
    scene.remove(placed);
    placed.geometry.dispose();
    placed.material.dispose();
    placed = null;
    return true;
  }
  return { placeAt, remove, has: () => placed !== null };
}

export function initAR({ renderer, scene, app, button, status, placement, onSessionChange, onPlacedChange }) {
  const reticle = buildReticle();
  scene.add(reticle);

  let session = null;
  let hitTestSource = null;

  function announce(text) { if (status) status.textContent = text; }

  // TODO 8: request the AR session itself, with 'hit-test' as a *required*
  // feature: if the runtime cannot provide it, the whole request rejects
  // (caught below) rather than silently starting a session that can never
  // place anything. Like requestSession('immersive-vr', ...) in xr.js, this
  // must run synchronously inside the button's click handler.
  //
  // Store the result in `session`, then `await renderer.xr.setSession(session)`.
  // Then get a 'viewer' reference space with
  // `await session.requestReferenceSpace('viewer')` - rooted to wherever the
  // device itself is looking, so the hit test each frame reports "what is
  // directly ahead of the camera right now" - and request a hit-test source
  // from it: `await session.requestHitTestSource({ space: viewerSpace })`,
  // stored in `hitTestSource`. Add `onSelect` (below) as a 'select' listener
  // on the session. Wrap all of this in try/catch, announcing
  // `error.message` on failure, the same pattern as xr.js's enterVR().
  async function enterAR() {

  }

  renderer.xr.addEventListener('sessionstart', () => {
    if (!session) return; // belongs to xr.js's VR session, not this one
    button.textContent = 'Exit AR';
    onSessionChange?.(true);
  });

  renderer.xr.addEventListener('sessionend', () => {
    if (!session) return;
    session = null;
    hitTestSource = null;
    reticle.visible = false;
    button.textContent = 'Enter AR';
    announce('Back to the desktop view. Anything placed in AR is not part of the desktop scene; use "Place object (2D)" to try the same idea there.');
    onSessionChange?.(false);
  });

  button.addEventListener('click', () => {
    if (session) session.end();
    else enterAR();
  });

  // TODO 9: every XR frame, ask the hit-test source what real-world surface
  // the device is aimed at right now, and move the reticle there.
  //
  // Register a callback with `app.onXRFrame`. Inside it: if there is no
  // `frame` or no `hitTestSource`, return. Otherwise get the renderer's
  // current reference space with `renderer.xr.getReferenceSpace()`, call
  // `frame.getHitTestResults(hitTestSource)`, and check its length: if it
  // found at least one, get that first result's pose with
  // `hits[0].getPose(referenceSpace)`, set `reticle.visible = true`, and
  // copy the pose's `transform.matrix` into `reticle.matrix` with
  // `.fromArray()`. If there were no hits (nothing detected yet, or the
  // camera is pointed at the sky or an untracked surface), set
  // `reticle.visible = false` instead of showing a stale pose.
  app.onXRFrame((frame) => {

  });

  // TODO 10: on select, place (or, on a later select, move) the shared
  // placed object at the reticle's current pose. If `reticle.visible` is
  // false, return (there is nowhere to place it yet). Otherwise, decompose
  // `reticle.matrix` into a fresh `THREE.Vector3` (position), `THREE.Quaternion`
  // (rotation) and `THREE.Vector3` (scale) - a Matrix4 cannot be assigned to
  // an Object3D's position/quaternion directly - and call
  // `placement.placeAt(position, quaternion)`. Then call
  // `onPlacedChange?.(true)` and announce what happened.
  function onSelect() {

  }
}

export function describeUnsupportedAR() {
  if (!('xr' in navigator)) {
    return window.isSecureContext
      ? 'This browser does not support WebXR, so AR placement is unavailable. Try "Place object (2D)" below instead.'
      : 'WebXR needs a secure connection (HTTPS, or localhost while testing), so AR placement is unavailable here. Try "Place object (2D)" below instead.';
  }
  return 'This browser or device does not support immersive AR, or its "hit-test" feature. Support for both varies a great deal between phones, browsers and headsets. Try "Place object (2D)" below instead.';
}
