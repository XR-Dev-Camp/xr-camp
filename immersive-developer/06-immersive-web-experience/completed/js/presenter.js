// The presenter, the visiting avatar, and the "Personalize" feature, all
// carried over from 4.4's accessibility and ethics audit. 4.4's starter
// asked for a camera-based "personalization" feature that took a photo
// without asking; the fix kept there, and repeated here, is to explain
// first, ask second, and never store or send anything the camera sees.
import * as THREE from 'three';

export function addAvatar(app) {
  // A static, clearly labelled stand-in for another visitor: not driven by
  // any real person's camera, microphone, or position, so it carries none
  // of the privacy questions a real multi-user avatar would (that is
  // full-stack-spatial/04's subject, not this capstone's).
  const avatar = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.22, 0.9, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x6b5b95, roughness: 0.8 }),
  );
  avatar.position.set(-1.1, 0.75, 1.4);
  avatar.name = 'visiting-avatar';
  app.scene.add(avatar);
}

// Only called after the learner has read the explanation in the page and
// clicked the explicit consent button — never on page load, and never
// silently. The stream is stopped immediately after the permission prompt
// resolves: this demo shows whether access was granted, not the camera's
// picture, so nothing captured is stored, displayed, or sent anywhere.
export async function requestPersonalize() {
  if (!navigator.mediaDevices?.getUserMedia) {
    return { ok: false, reason: 'not-supported' };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.name === 'NotAllowedError' ? 'denied' : 'error' };
  }
}
