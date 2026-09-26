// layout.js: the three ways a spatial panel can be attached to the world.
//
//   world-locked — fixed at one point in the room, like a sign on a wall.
//   body-locked — follows the learner's position and left-right facing
//     (yaw) at a fixed offset, like a badge on their chest, but stays level
//     even if they tilt their head.
//   view-locked — fixed to the camera itself, in the same place on screen no
//     matter where the learner looks, like a heads-up display.
//
// See the README's "Key code explained" for why several platforms' comfort
// guidance (for example Meta Horizon OS's) is cautious about leaving content
// view-locked all the time.

import * as THREE from 'three';

// TODO 4: world-locked placement, called once whenever a panel enters this
// mode. Add `object` to `scene`, copy `position` into `object.position`, and
// set `object.rotation.y = rotationY` so it faces the right way.
export function applyWorldLock(object, { scene, position, rotationY = 0 }) {
  scene.add(object);
  object.position.copy(position);
}

// TODO 5: body-locked placement, called every frame while a panel is in this
// mode. Use `camera.getWorldDirection(vector)` to find which way the camera
// is facing, then `Math.atan2(direction.x, direction.z)` to get its
// left-right heading (yaw) alone, ignoring how far up or down it is
// pitched. Build a `THREE.Quaternion` that rotates only around the Y axis by
// that yaw, then set `object.position` to `localOffset` rotated by that
// quaternion and added to the camera's world position
// (`camera.getWorldPosition(vector)`), and set `object.quaternion` to match.
export function applyBodyLock(object, camera, localOffset) {
  object.position.copy(camera.position);
}

// TODO 6: switches a panel between the three modes, including re-parenting
// it. An Object3D can only have one parent in three.js, so detach it from
// its current parent first (`if (object.parent) object.parent.remove(object)`).
// Then: for `'view'`, `camera.add(object)` and set its position to
// `viewOffset` (a child of the camera moves and rotates with it for free,
// with no per-frame update needed); for `'world'`, call `applyWorldLock`
// with `worldPosition`/`worldRotationY`; otherwise (`'body'`), add it to
// `scene` and call `applyBodyLock` once to place it immediately.
export function setLockMode(object, mode, { scene, camera, worldPosition, worldRotationY, bodyOffset, viewOffset }) {
  scene.add(object);
}
