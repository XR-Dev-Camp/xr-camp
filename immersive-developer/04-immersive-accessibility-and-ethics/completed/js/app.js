// app.js: the three.js engine for the gallery talk scene. Adapted from
// immersive-developer/02-xr-input-and-interaction/completed/js/app.js (the
// renderer setup, comfort-minded camera limits, and the frame-rate-
// independent timer are the same idea). This file also builds the three
// simple meshes the talk points at, and the presenter figure.
//
// Fix for TODO 2: the starter moved the camera by itself, every frame,
// forever - the single most common cause of VR motion sickness (see
// docs/en/xr-accessibility.md, "comfort"). There is no forced-camera-path
// code here at all: OrbitControls, set up below, is the only thing that ever
// moves the camera, and only in response to the learner dragging, using the
// arrow keys, or (in VR) moving their own head.

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

  const visitor = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.22, 0.8, 4, 8),
    new THREE.MeshStandardMaterial({ color: '#d62f6b', roughness: 0.8 }),
  );
  visitor.position.set(0, 0.85, 5);
  scene.add(visitor);

  // Comfort limits (docs/en/xr-accessibility.md): a sensible viewing
  // distance, and stop the camera climbing over the talk or dipping below
  // the floor. These only shape where the learner's own dragging or key
  // presses can take the camera; nothing here ever moves it by itself.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.1, -0.5);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1.5;
  controls.maxDistance = 6;
  controls.minPolarAngle = THREE.MathUtils.degToRad(30);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);

  // Fix for TODO 4: the presenter's small idle bob is real motion, so it
  // follows the same rule every animated 3D lesson in this course does -
  // start paused when the system asks for reduced motion, and offer a
  // visible Pause control regardless (main.js wires the button; this file
  // only exposes the on/off switch).
  let idleAnimating = !window.__reducedMotion;

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
    controls.update(); // required every frame: damping relies on it

    if (idleAnimating) {
      presenter.position.y = 0.95 + Math.sin(timer.elapsed * 1.5) * 0.03;
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
  };
}
