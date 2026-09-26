// visitor.js: a second, simulated visitor sharing the space with you. XR
// Camp has no live multiplayer server (see the free-tools rule in
// docs/en/README.md), so this is a stand-in for a real remote participant:
// close enough to teach the safety pattern, without needing an account,
// a server, or a paid service.
//
// TODO 9: the visitor walks straight at the camera every frame and never
// stops (see `update` below), so it can end up exactly where your head is.
// Give it a personal-space radius - stop it a comfortable distance away,
// the way a real person would stop before standing nose to nose with a
// stranger - and say so in the status region.
//
// TODO 10: there is also no way to mute or block this visitor. Add both: a
// "Mute visitor" button that stops its chatter, and a "Block visitor" button
// that hides it and stops it moving. A real other person in a shared XR
// space can be far more uncomfortable to have around than this capsule is,
// and needs at least this much control. Like consent, XAUR does not number
// a multi-user-safety need; see completed/audit.md.

import * as THREE from 'three';

const CHATTER = ["That's a nice talk.", 'I love the jade stone.', "Have you seen this before?"];

export function initVisitor({ visitor, camera, status }) {
  let chatterIndex = 0;
  let chatterTimer = null;

  function announce(text) {
    if (status) status.textContent = text;
  }

  function startChatter() {
    chatterTimer = setInterval(() => {
      announce(`Visitor: "${CHATTER[chatterIndex % CHATTER.length]}"`);
      chatterIndex += 1;
    }, 4000);
  }

  function update() {
    const target = camera.position;
    const direction = new THREE.Vector3().subVectors(target, visitor.position);
    direction.y = 0;
    const distance = direction.length();
    if (distance > 0.05) {
      direction.normalize();
      // No minimum distance: this keeps closing the gap all the way to zero.
      visitor.position.addScaledVector(direction, Math.min(0.01, distance));
    }
  }

  startChatter();
  announce('A visitor has joined and is walking over to see the talk.');

  return {
    update,
    stop: () => clearInterval(chatterTimer),
  };
}
