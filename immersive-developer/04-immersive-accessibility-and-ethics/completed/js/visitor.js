// visitor.js: a second, simulated visitor sharing the space with you. XR
// Camp has no live multiplayer server (see the free-tools rule in
// docs/en/README.md), so this is a stand-in for a real remote participant:
// close enough to teach the safety pattern, without needing an account, a
// server, or a paid service.
//
// Fix for TODO 9: the starter let the visitor walk straight into the
// camera's position with no limit. This version stops it at
// PERSONAL_SPACE_RADIUS, the way a real person pauses before standing nose
// to nose with a stranger. XAUR does not number a personal-space or
// multi-user-safety user need (its 19 user needs are scoped to disability
// access, not social safety), so this and TODO 10 are documented in
// completed/audit.md as a general immersive-ethics requirement instead,
// following XR Access's guidance on personal space in shared XR.
//
// Fix for TODO 10: `mute` stops the chatter without removing the visitor;
// `block` hides it and stops it moving entirely. Both are exposed here so
// main.js can wire them to real buttons with keyboard access, like every
// other control on this page.

import * as THREE from 'three';

const CHATTER = ["That's a nice talk.", 'I love the jade stone.', "Have you seen this before?"];
const PERSONAL_SPACE_RADIUS = 1.2; // metres

export function initVisitor({ visitor, camera, status }) {
  let chatterIndex = 0;
  let chatterTimer = null;
  let muted = false;
  let blocked = false;
  let announcedStop = false;

  function announce(text) {
    if (status) status.textContent = text;
  }

  function startChatter() {
    chatterTimer = setInterval(() => {
      if (muted || blocked) return;
      announce(`Visitor: "${CHATTER[chatterIndex % CHATTER.length]}"`);
      chatterIndex += 1;
    }, 4000);
  }

  function update() {
    if (blocked) return;
    const direction = new THREE.Vector3().subVectors(camera.position, visitor.position);
    direction.y = 0;
    const distance = direction.length();
    if (distance > PERSONAL_SPACE_RADIUS) {
      direction.normalize();
      const step = Math.min(0.01, distance - PERSONAL_SPACE_RADIUS);
      visitor.position.addScaledVector(direction, step);
      announcedStop = false;
    } else if (!announcedStop) {
      announce(`The visitor has stopped a comfortable distance away, about ${PERSONAL_SPACE_RADIUS} metres.`);
      announcedStop = true;
    }
  }

  function setMuted(value) {
    muted = value;
    announce(value ? 'The visitor is muted. You will not hear or see their chatter.' : 'The visitor is unmuted.');
  }

  function setBlocked(value) {
    blocked = value;
    visitor.visible = !value;
    announce(value
      ? 'You have blocked this visitor. They no longer appear or move in your view.'
      : 'The visitor is no longer blocked.');
  }

  startChatter();
  announce('A visitor has joined and is walking over to see the talk.');

  return {
    update,
    setMuted,
    setBlocked,
    isMuted: () => muted,
    isBlocked: () => blocked,
    stop: () => clearInterval(chatterTimer),
  };
}
