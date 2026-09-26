// app.js: the three.js engine for the spatial dashboard. Given finished, the
// same way 4.1's app.js carried over the exhibit engine from 3.4: WebXR
// itself was already taught in 4.1, so this file reuses that plumbing and
// spends its new code on the room this lesson is actually about (panels.js,
// layout.js, locomotion.js hold the TODOs).
//
// One WebXR detail is new here and worth reading closely: TODO 8's teleport
// needs to move the learner, not just look around. Reading three.js r186's
// WebXRManager source (renderers/webxr/WebXRManager.js) shows that while a
// session is active, `camera.position` is overwritten every frame from the
// headset's own tracked pose combined with `camera.parent.matrixWorld` — so
// setting `camera.position` directly, which works perfectly before a session
// starts, has no visible effect once one is running. Moving `camera.parent`
// instead (a small "rig" Group holding the camera, sometimes called a dolly)
// does work, because that parent transform is exactly what gets multiplied
// in. This file creates that rig once; TODO 8 (locomotion.js) never needs to
// know it exists, because the choice of what to move is made here.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPanel, drawPanelText, angularSizeDegrees } from './panels.js';
import { setLockMode, applyBodyLock } from './layout.js';
import { WAYPOINTS, pickWaypoint, movePlayer } from './locomotion.js';

const EYE_HEIGHT = 1.6;
const KIOSK_POSITION = new THREE.Vector3(0, 1.5, -2);
const GOALS_WORLD_POSITION = new THREE.Vector3(1.1, 1.3, -1.1);
const GOALS_WORLD_ROTATION_Y = -Math.PI / 2;
const BODY_OFFSET = new THREE.Vector3(0.32, -0.35, -0.55);
const VIEW_OFFSET = new THREE.Vector3(0, 0.22, -0.6);
const RING_RADIUS = 0.6;

const WAYPOINT_POSITIONS = WAYPOINTS.map((w) => ({ ...w, x: 0, z: KIOSK_POSITION.z + w.distance }));
const MARKER_COLORS = { close: '#d62f6b', comfortable: '#2f7d5b', far: '#c9a24b' };

export function createApp(container, { onWaypointChange, onLockModeChange } = {}) {
  // --- Renderer, carried over from 4.1 -----------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The spatial dashboard. Its description follows below.');
  container.append(renderer.domElement);

  // The comfort vignette: a plain DOM overlay, not a three.js post-processing
  // pass. A CSS radial-gradient toggled by one class is simpler to reason
  // about and to turn off completely for reduced motion than adding an
  // EffectComposer render target for one effect.
  const vignette = document.createElement('div');
  vignette.className = 'vignette';
  vignette.setAttribute('aria-hidden', 'true');
  container.append(vignette);

  // --- Scene, camera, and the movement rig --------------------------------
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.05, 100);
  const rig = new THREE.Group();
  rig.name = 'Player rig';
  rig.add(camera);
  scene.add(rig);

  const ambient = new THREE.AmbientLight('#ffffff', 0.8);
  const sun = new THREE.DirectionalLight('#fff4e0', 1.6);
  sun.position.set(2, 4, 2);
  scene.add(ambient, sun);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshStandardMaterial({ color: '#efe9f7', roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // --- The progress kiosk: always world-locked ----------------------------
  const kiosk = createPanel({ widthMeters: 0.9, heightMeters: 0.6 });
  kiosk.mesh.position.copy(KIOSK_POSITION); // faces +Z: the waypoints are all in front of it
  scene.add(kiosk.mesh);

  // --- The goals panel: switches lock mode -------------------------------
  const goals = createPanel({ widthMeters: 0.34, heightMeters: 0.26 });
  let lockMode = 'body';
  setLockMode(goals.mesh, lockMode, {
    scene, camera,
    worldPosition: GOALS_WORLD_POSITION, worldRotationY: GOALS_WORLD_ROTATION_Y,
    bodyOffset: BODY_OFFSET, viewOffset: VIEW_OFFSET,
  });

  // --- Waypoint markers and the personal-space ring -----------------------
  const markers = WAYPOINT_POSITIONS.map((w) => {
    const marker = new THREE.Mesh(
      new THREE.CircleGeometry(0.18, 32),
      new THREE.MeshBasicMaterial({ color: MARKER_COLORS[w.id] }),
    );
    marker.rotation.x = -Math.PI / 2;
    marker.position.set(w.x, 0.011, w.z);
    marker.userData.waypointId = w.id;
    scene.add(marker);
    return marker;
  });

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(RING_RADIUS, 0.015, 8, 48),
    new THREE.MeshBasicMaterial({ color: '#5b2a86' }),
  );
  ring.rotation.x = -Math.PI / 2;
  scene.add(ring);

  // --- Starting position: the "Comfortable" waypoint ----------------------
  let currentWaypoint = WAYPOINT_POSITIONS.find((w) => w.id === 'comfortable');
  let presenting = false;
  let smoothMode = false;
  camera.position.set(0, EYE_HEIGHT, currentWaypoint.z);
  ring.position.set(currentWaypoint.x, 0.02, currentWaypoint.z);

  // --- Controls: OrbitControls, always looking at the kiosk ---------------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(KIOSK_POSITION);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.4;
  controls.maxDistance = 3.2;
  controls.minPolarAngle = THREE.MathUtils.degToRad(20);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);
  controls.update();

  function getPlayerXZ() {
    return presenting ? { x: rig.position.x, z: rig.position.z } : { x: camera.position.x, z: camera.position.z };
  }

  function teleportTo(waypointId, { smooth = smoothMode, onDone } = {}) {
    const waypoint = WAYPOINT_POSITIONS.find((w) => w.id === waypointId);
    if (!waypoint || waypoint.id === currentWaypoint.id) return;
    const from = getPlayerXZ();
    const to = { x: waypoint.x, z: waypoint.z };
    const mover = presenting
      ? { set: (x, z) => { rig.position.x = x; rig.position.z = z; } }
      : { set: (x, z) => { camera.position.x = x; camera.position.z = z; } };
    movePlayer({
      mover, from, to, smooth,
      reducedMotion: window.__reducedMotion === true,
      onVignette: (amount) => vignette.classList.toggle('on', amount > 0),
      onDone: () => {
        currentWaypoint = waypoint;
        ring.position.set(to.x, 0.02, to.z);
        if (!presenting) controls.update();
        onDone?.();
        onWaypointChange?.();
      },
    });
  }

  renderer.domElement.addEventListener('pointerdown', (event) => {
    const id = pickWaypoint(event, renderer.domElement, camera, markers);
    if (id) teleportTo(id);
  });

  function setPresenting(value) {
    if (value === presenting) return;
    if (value) {
      rig.position.set(camera.position.x, 0, camera.position.z);
      controls.enabled = false;
    } else {
      camera.position.set(rig.position.x, EYE_HEIGHT, rig.position.z);
      rig.position.set(0, 0, 0);
      controls.enabled = true;
      controls.update();
    }
    presenting = value;
  }

  function setGoalsLockMode(mode) {
    lockMode = mode;
    setLockMode(goals.mesh, mode, {
      scene, camera,
      worldPosition: GOALS_WORLD_POSITION, worldRotationY: GOALS_WORLD_ROTATION_Y,
      bodyOffset: BODY_OFFSET, viewOffset: VIEW_OFFSET,
    });
    onLockModeChange?.();
  }

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function tick() {
    if (lockMode === 'body') applyBodyLock(goals.mesh, camera, BODY_OFFSET);
    controls.update();
    renderer.render(scene, camera);
  }

  function start() { renderer.setAnimationLoop(tick); }
  function stop() { renderer.setAnimationLoop(null); }

  new ResizeObserver(resize).observe(container);

  return {
    renderer, scene, camera, controls,
    resize, start, stop,
    setPresenting, isPresenting: () => presenting,
    teleportTo,
    setSmooth: (value) => { smoothMode = value; },
    getGoalsLockMode: () => lockMode,
    setGoalsLockMode,
    setKioskText: (title, lines) => drawPanelText(kiosk, { title, lines }),
    setGoalsText: (title, lines) => drawPanelText(goals, { title, lines }),
    getStatus: () => ({
      waypoint: currentWaypoint,
      distanceMeters: currentWaypoint.distance,
      angularSizeDegrees: angularSizeDegrees(kiosk.heightMeters, currentWaypoint.distance),
      lockMode,
      presenting,
    }),
    waypoints: WAYPOINT_POSITIONS,
  };
}
