// scene.js: the three.js room and its avatars. No WebSocket API appears in
// this file, and no three.js API appears in net.js or main.js — each file
// has one job, the same rule Courses 3.4, 5.1-5.3 used.
//
// The interesting part is interpolateAvatars(): a position message arrives
// at most 10 times a second (server/realtime.js's POSITION_MIN_INTERVAL_MS),
// but this scene renders far more often than that (every animation frame,
// commonly 60 times a second). Moving another learner's avatar straight to
// each new position the instant it arrives would make it visibly jump —
// "teleport" — between updates. Instead, every remote avatar remembers where
// it *was* and where it is *going*, and the render loop below eases between
// the two over the time one update is expected to take, so the motion looks
// continuous even though the data behind it arrives in steps.

import * as THREE from 'three';

const ROOM_HALF_SIZE = 6;
const INTERPOLATION_MS = 120; // a little faster than the 100ms update interval, so motion never visibly lags behind
const IDLE_BOB_SPEED = 1.6;
const IDLE_BOB_HEIGHT = 0.06;

const AVATAR_COLORS = [0x5b2a86, 0xd62f6b, 0x1f8a70, 0xe08e0b, 0x2563eb, 0x9333ea];
function colorForUserId(userId) {
  let hash = 0;
  for (let i = 0; i < userId.length; i += 1) hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function createScene(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeef4ff);

  const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
  camera.position.set(0, 6.5, 9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3550, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 0.6);
  sun.position.set(4, 8, 5);
  scene.add(sun);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_HALF_SIZE * 2, ROOM_HALF_SIZE * 2),
    new THREE.MeshStandardMaterial({ color: 0xdfd7ee }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const grid = new THREE.GridHelper(ROOM_HALF_SIZE * 2, 12, 0x8a8398, 0xc9c4d4);
  scene.add(grid);

  const avatars = new Map(); // userId -> { mesh, from: {x,y,z,rotationY}, to: {...}, startTime }
  let selfMesh = null;
  let animating = true;

  function makeAvatarMesh(color) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.35, 0.7, 4, 8),
      new THREE.MeshStandardMaterial({ color }),
    );
    body.position.y = 0.7;
    const nose = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.3, 8),
      new THREE.MeshStandardMaterial({ color: 0xffffff }),
    );
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.7, 0.4);
    group.add(body, nose);
    return group;
  }

  // The learner's own avatar: a distinct outline (a thin ring at its feet)
  // makes it identifiable at a glance, since the always-present roster list
  // (built in main.js, not here) is the reliable, textual way to know who is
  // who — this ring is a helpful extra, not the only way to tell.
  function createSelfAvatar(userId) {
    selfMesh = makeAvatarMesh(colorForUserId(userId));
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.45, 0.55, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    selfMesh.add(ring);
    scene.add(selfMesh);
    return selfMesh;
  }

  function ensureRemoteAvatar(userId) {
    if (avatars.has(userId)) return avatars.get(userId);
    const mesh = makeAvatarMesh(colorForUserId(userId));
    scene.add(mesh);
    const entry = {
      mesh, from: { x: 0, y: 0, z: 0, rotationY: 0 }, to: { x: 0, y: 0, z: 0, rotationY: 0 }, startTime: performance.now(),
    };
    avatars.set(userId, entry);
    return entry;
  }

  function removeRemoteAvatar(userId) {
    const entry = avatars.get(userId);
    if (!entry) return;
    scene.remove(entry.mesh);
    avatars.delete(userId);
  }

  // Called once per incoming 'position' message (server/realtime.js and
  // net.js) — never once per rendered frame. This is the "step" data; the
  // render loop below is what turns it into smooth motion.
  function setRemoteTarget(userId, position) {
    const entry = ensureRemoteAvatar(userId);
    const now = performance.now();
    // The new "from" is wherever the avatar currently, visually, is — not
    // its previous target — so a fast update that arrives mid-interpolation
    // still starts its next tween from where the eye actually is, with no
    // visible snap.
    entry.from = currentInterpolated(entry, now);
    entry.to = { ...position };
    entry.startTime = now;
  }

  function currentInterpolated(entry, now) {
    const t = Math.min(1, (now - entry.startTime) / INTERPOLATION_MS);
    return {
      x: THREE.MathUtils.lerp(entry.from.x, entry.to.x, t),
      y: THREE.MathUtils.lerp(entry.from.y, entry.to.y, t),
      z: THREE.MathUtils.lerp(entry.from.z, entry.to.z, t),
      rotationY: THREE.MathUtils.lerp(entry.from.rotationY, entry.to.rotationY, t),
    };
  }

  function applyToMesh(mesh, position) {
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.y = THREE.MathUtils.degToRad(position.rotationY);
  }

  function setSelfPosition(position) {
    if (!selfMesh) return;
    applyToMesh(selfMesh, position);
  }

  const clock = new THREE.Clock();
  function render() {
    requestAnimationFrame(render);
    const elapsed = clock.getElapsedTime();
    const now = performance.now();

    for (const entry of avatars.values()) {
      const interpolated = currentInterpolated(entry, now);
      if (animating) interpolated.y += Math.sin(elapsed * IDLE_BOB_SPEED + entry.startTime) * IDLE_BOB_HEIGHT;
      applyToMesh(entry.mesh, interpolated);
    }
    // The learner's own avatar does not idle-bob: it always sits exactly
    // where the last keyboard move put it, so the position the learner
    // reads off the always-present 2D table (main.js) and the position
    // they see in 3D never disagree.

    renderer.render(scene, camera);
  }

  function resize() {
    const { clientWidth, clientHeight } = container;
    if (clientWidth === 0 || clientHeight === 0) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }
  new ResizeObserver(resize).observe(container);
  resize();
  render();

  return {
    createSelfAvatar,
    setSelfPosition,
    setRemoteTarget,
    removeRemoteAvatar,
    setAnimating(on) { animating = on; },
    isAnimating: () => animating,
    roomHalfSize: ROOM_HALF_SIZE,
  };
}
