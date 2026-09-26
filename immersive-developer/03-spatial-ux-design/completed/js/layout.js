// layout.js: the three ways a spatial panel can be attached to the world.
//
//   world-locked — fixed at one point in the room, like a sign on a wall.
//     The panel does not move when the learner does; walking or teleporting
//     away from it makes it smaller and harder to read, exactly like a real
//     poster. Best for content everyone in the room shares.
//
//   body-locked — follows the learner's position and left-right facing
//     (yaw), at a fixed offset, like a badge on their chest. It stays level
//     even if they tilt their head, so it never swings or tips as they look
//     up or down: only turning around moves it. Good for personal,
//     always-available information such as a goals list.
//
//   view-locked — fixed to the camera itself, in the same place on screen no
//     matter where the learner looks, like a heads-up display. It is the
//     easiest to read on demand, but several platforms' comfort guidance
//     (for example Meta Horizon OS's design guidelines) warns that content
//     glued to the view can feel intrusive and cause eye strain if left on
//     permanently — this lesson's demo panel defaults to body-locked and
//     lets the learner switch to view-locked to feel the difference.
//
// None of these functions know what a panel contains; they only move an
// Object3D that panels.js already built.

import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const _forward = new THREE.Vector3();
const _worldPos = new THREE.Vector3();

// TODO 4: world-locked placement. Called once, whenever a panel enters this
// mode: after this, nothing needs to update it every frame, because it is
// not supposed to move.
export function applyWorldLock(object, { scene, position, rotationY = 0 }) {
  scene.add(object);
  object.position.copy(position);
  object.rotation.set(0, rotationY, 0);
}

// TODO 5: body-locked placement. Called every frame while a panel is in this
// mode. `camera.getWorldDirection` and `camera.position` both already
// include any WebXR head tracking or dolly offset three.js applies, so this
// keeps working the same whether the learner is on a screen or in a headset.
export function applyBodyLock(object, camera, localOffset) {
  camera.getWorldPosition(_worldPos);
  camera.getWorldDirection(_forward);
  // atan2(x, z) reads only the horizontal heading of "forward", ignoring how
  // far up or down the camera is pitched — so looking up or down does not
  // tip this panel over, only turning left or right moves it.
  const yaw = Math.atan2(_forward.x, _forward.z);
  const facing = new THREE.Quaternion().setFromAxisAngle(UP, yaw);
  object.position.copy(localOffset).applyQuaternion(facing).add(_worldPos);
  object.quaternion.copy(facing);
}

// TODO 6: switches a panel between the three modes, including re-parenting
// it. An Object3D can only have one parent in three.js, so leaving the old
// parent is not optional — attaching to a new parent without detaching first
// would silently do nothing.
export function setLockMode(object, mode, { scene, camera, worldPosition, worldRotationY, bodyOffset, viewOffset }) {
  if (object.parent) object.parent.remove(object);

  if (mode === 'view') {
    // A child of the camera moves and rotates with it automatically, every
    // frame, for free: no per-frame update function is needed for this mode.
    camera.add(object);
    object.position.copy(viewOffset);
    object.quaternion.identity();
  } else if (mode === 'world') {
    applyWorldLock(object, { scene, position: worldPosition, rotationY: worldRotationY });
  } else {
    scene.add(object);
    applyBodyLock(object, camera, bodyOffset);
  }
}
