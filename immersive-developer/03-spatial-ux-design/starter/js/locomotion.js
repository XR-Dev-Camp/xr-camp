// locomotion.js: moving the learner between three fixed viewing spots at
// different distances from the progress kiosk.
//
// Two ways to move, both learner-initiated, never automatic:
//   teleport (the default) — an instant jump, hidden by a brief fade.
//   smooth — the viewpoint travels continuously, with a comfort vignette
//     shown at the edges of the view while it moves.
// See the README for why Meta Horizon OS's own comfort guidance
// (developers.meta.com/horizon/design/comfort/) recommends favouring
// teleporting over continuous movement.

import * as THREE from 'three';

export const WAYPOINTS = [
  { id: 'close', label: 'Very close', distance: 0.6 },
  { id: 'comfortable', label: 'Comfortable', distance: 1.2 },
  { id: 'far', label: 'Far', distance: 2.5 },
];

// TODO 7: which waypoint marker, if any, is under a pointer event? Convert
// `pointerEvent.clientX/clientY` into normalized device coordinates (-1 to
// 1, with +1 at the top) using `canvas.getBoundingClientRect()`, call
// `raycaster.setFromCamera(ndc, camera)`, then
// `raycaster.intersectObjects(markers, false)` and return
// `hit.object.userData.waypointId`, or `null` if nothing was hit.
export function pickWaypoint(pointerEvent, canvas, camera, markers) {
  return null;
}

// TODO 8: move from `from` to `to` (each `{ x, z }`), either instantly
// (teleport, when `smooth` is false) or continuously over about 700ms (when
// `smooth` is true), calling `onVignette(1)` when the vignette should show
// and `onVignette(0)` when it should hide. If `reducedMotion` is true, skip
// straight to the end with no fade and no vignette at all — even a brief
// screen flash is a motion effect some people asked to avoid. Call
// `mover.set(x, z)` to move the learner, and `onDone()` once the move is
// finished. For now this only jumps instantly, with no fade and no smooth
// option, so the room is usable while you build the real version.
export function movePlayer({ mover, from, to, smooth, reducedMotion, onVignette, onDone }) {
  mover.set(to.x, to.z);
  onDone?.();
}
