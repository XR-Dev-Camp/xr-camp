// app.js: the three.js engine for the gallery talk scene. Adapted from
// immersive-developer/02-xr-input-and-interaction/completed/js/app.js (the
// renderer setup, comfort-minded camera limits, and the frame-rate-
// independent timer are the same idea). This file also builds the three
// simple meshes the talk points at, and the presenter figure.
//
// TODO 2: this scene moves the camera by itself, every frame, forever (see
// `forcedCameraPath` below). Read docs/en/xr-accessibility.md before you fix
// it - a forced camera path like this is the single most common cause of VR
// motion sickness, and WCAG 2.3.3 exists because of exactly this kind of
// movement. The fix is not to gate it behind prefers-reduced-motion: the
// comfort rule is that the camera never moves unless the learner moves it,
// full stop. Delete the forced path; OrbitControls (below) already gives the
// learner a way to look around.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const ITEMS = [
  { id: 'clay-pot', name: 'Clay pot', made: 'unglazed terracotta clay', x: -0.9, color: '#b5562e' },
  { id: 'basket-ring', name: 'Woven basket ring', made: 'woven plant fibre', x: 0, color: '#c9a24b' },
  { id: 'jade-stone', name: 'Jade stone', made: 'polished jade', x: 0.9, color: '#2f7d5b' },
];

export function createApp(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The gallery talk scene. Its description follows below.');
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
  const startPosition = new THREE.Vector3(0, 1.6, 3);
  camera.position.copy(startPosition);

  scene.add(new THREE.AmbientLight('#ffffff', 0.8));
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.position.set(3, 5, 2);
  scene.add(sun);

  // The presenter: a simple capsule standing behind the three items.
  const presenter = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.25, 0.9, 4, 8),
    new THREE.MeshStandardMaterial({ color: '#5b2a86', roughness: 0.8 }),
  );
  presenter.position.set(0, 0.95, -1.2);
  scene.add(presenter);

  const items = ITEMS.map((data) => {
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.2, 0),
      new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.6 }),
    );
    mesh.position.set(data.x, 0.9, -0.4);
    mesh.name = data.name;
    scene.add(mesh);
    return { data, mesh };
  });

  // The visitor: a second capsule, a different colour so it always reads as
  // "someone else", not the presenter. visitor.js moves it every frame.
  const visitor = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.22, 0.8, 4, 8),
    new THREE.MeshStandardMaterial({ color: '#d62f6b', roughness: 0.8 }),
  );
  visitor.position.set(0, 0.85, 5);
  scene.add(visitor);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.1, -0.5);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1.5;
  controls.maxDistance = 6;
  controls.minPolarAngle = THREE.MathUtils.degToRad(30);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);

  // No learner action ever sets this to false, and nothing checks
  // prefers-reduced-motion. The camera orbits on its own from the moment the
  // page loads, overriding anything OrbitControls would otherwise do.
  let forcedCameraPath = true;

  // TODO 4: the presenter's gentle idle bob is a much smaller motion than
  // the camera path above, but it still needs to respect
  // prefers-reduced-motion and needs a visible Pause control - see main.js,
  // which currently starts it unconditionally and never offers one.
  let idleAnimating = true;
  const timer = new THREE.Timer();
  timer.connect(document);

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function tick(time) {
    timer.update(time);
    const t = timer.elapsed;

    if (forcedCameraPath) {
      const angle = t * 0.3;
      camera.position.set(Math.sin(angle) * 3, 1.6, Math.cos(angle) * 3);
      camera.lookAt(controls.target);
    }
    controls.update();

    if (idleAnimating) {
      presenter.position.y = 0.95 + Math.sin(t * 1.5) * 0.03;
    }

    renderer.render(scene, camera);
  }

  function start() { renderer.setAnimationLoop(tick); }
  function stop() { renderer.setAnimationLoop(null); }

  function resetView() {
    camera.position.copy(startPosition);
    controls.target.set(0, 1.1, -0.5);
    controls.update();
  }

  function setPresenting(value) {
    controls.enabled = !value;
  }

  new ResizeObserver(resize).observe(container);

  return {
    renderer, scene, camera, controls, items, presenter, visitor,
    resize, start, stop, resetView, setPresenting,
    setIdleAnimating: (v) => { idleAnimating = v; },
    isIdleAnimating: () => idleAnimating,
    setForcedCameraPath: (v) => { forcedCameraPath = v; },
  };
}
