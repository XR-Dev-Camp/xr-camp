// locomotion.js: moving the learner between three fixed viewing spots at
// different distances from the progress kiosk, so the same panel can be
// compared "very close", "comfortable", and "far" without rebuilding it.
//
// Two ways to move, both learner-initiated (never automatic, which the
// accessibility rules in this repo call the "comfort" requirement):
//
//   teleport (the default) — an instant jump, hidden by a brief fade, with
//   nothing continuing to move afterwards. Meta Horizon OS's own comfort
//   guidance (developers.meta.com/horizon/design/comfort/) recommends
//   favouring teleporting over continuous movement for exactly this reason.
//
//   smooth — the viewpoint travels continuously instead of jumping. This is
//   more likely to cause discomfort for people prone to motion sickness, so
//   while it moves, a vignette narrows what is visible at the edges of the
//   view — a widely used comfort technique, though not one every headset or
//   guideline describes the same way. Treat the timing and strength used
//   here as a starting point to test with real people, not a fixed rule.

import * as THREE from 'three';

export const WAYPOINTS = [
  { id: 'close', label: 'Very close', distance: 0.6 },
  { id: 'comfortable', label: 'Comfortable', distance: 1.2 },
  { id: 'far', label: 'Far', distance: 2.5 },
];

const _ndc = new THREE.Vector2();
const _raycaster = new THREE.Raycaster();

// TODO 7: which waypoint marker, if any, is under a pointer event? Used for
// clicking or tapping a floor marker directly, as an alternative to the
// waypoint buttons. `canvas.getBoundingClientRect()` converts the pointer's
// page position into the canvas's own 0-1 space, and `setFromCamera` expects
// coordinates from -1 to 1 with +1 at the top (verified against three.js
// r186's Raycaster source), hence the two conversions below.
export function pickWaypoint(pointerEvent, canvas, camera, markers) {
  const rect = canvas.getBoundingClientRect();
  _ndc.set(
    ((pointerEvent.clientX - rect.left) / rect.width) * 2 - 1,
    -((pointerEvent.clientY - rect.top) / rect.height) * 2 + 1,
  );
  _raycaster.setFromCamera(_ndc, camera);
  const hit = _raycaster.intersectObjects(markers, false)[0];
  return hit ? hit.object.userData.waypointId : null;
}

// TODO 8: move from one floor position to another, either instantly
// (teleport) or continuously (smooth), and report the comfort vignette's
// strength as it happens. `onVignette(1)` turns it fully on, `onVignette(0)`
// turns it off; the caller (app.js) owns the actual DOM element.
//
// `presenting` decides which object actually moves: see app.js and
// "Key code explained" in the README for why a WebXR session ignores
// `camera.position` and needs its parent rig moved instead.
export function movePlayer({ mover, from, to, smooth, reducedMotion, onVignette, onDone }) {
  // Reduced motion overrides everything: an instant cut, no fade, because
  // even a brief screen flash is a motion effect some people asked to avoid.
  if (reducedMotion) {
    mover.set(to.x, to.z);
    onDone?.();
    return;
  }

  if (!smooth) {
    // Teleport: fade out, jump while hidden, fade back in. The learner never
    // sees the jump itself, and the camera never appears to glide anywhere.
    onVignette(1);
    window.setTimeout(() => {
      mover.set(to.x, to.z);
      window.setTimeout(() => { onVignette(0); onDone?.(); }, 130);
    }, 130);
    return;
  }

  // Smooth: the position is interpolated every frame for `duration`
  // milliseconds, with the vignette held on for the whole move.
  const duration = 700;
  const start = performance.now();
  onVignette(1);
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    mover.set(
      THREE.MathUtils.lerp(from.x, to.x, t),
      THREE.MathUtils.lerp(from.z, to.z, t),
    );
    if (t < 1) requestAnimationFrame(step);
    else { onVignette(0); onDone?.(); }
  }
  requestAnimationFrame(step);
}
