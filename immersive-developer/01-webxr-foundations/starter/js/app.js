// app.js: the three.js engine. Carried over from 3.4 (Three.js Foundations)
// unchanged in most of its shape; this lesson adds only what WebXR needs.
// Nothing about the exhibit's objects or its render loop needs to change:
// renderer.setAnimationLoop already runs three.js's XR frame loop
// automatically once a session is set (see xr.js).

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildExhibit, disposeExhibit } from './exhibit.js';

export function createApp(container) {
  // --- Renderer ---------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // TODO 2: turn on WebXR support, and choose a reference space.
  // Set `renderer.xr.enabled = true` (it defaults to false: without it,
  // handing renderer.xr.setSession(session) a session in xr.js would not
  // draw anything into the headset). Then call
  // `renderer.xr.setReferenceSpaceType('local-floor')`, which places the
  // origin at the floor under wherever the camera is when a session starts
  // (see docs/en/xr-accessibility.md on seated comfort). Do this before any
  // session can start: three.js only warns and ignores the call once
  // presenting has begun.

  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The 3D exhibit. Its description follows below.');
  container.append(renderer.domElement);

  // --- Scene and camera ---------------------------------------------------
  const scene = new THREE.Scene();
  scene.name = 'Scene';
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
  camera.position.set(0, 1.6, 4.2);

  const ambient = new THREE.AmbientLight('#ffffff', 0.7);
  ambient.name = 'Ambient light';
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.name = 'Sunlight';
  sun.position.set(3, 5, 2);
  scene.add(ambient, sun);

  const exhibit = buildExhibit();
  scene.add(exhibit.group);
  const items = exhibit.items;

  // --- Controls: OrbitControls from three/addons -------------------------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.9, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  // Comfort limits also serve as this exhibit's seated-VR origin: 1.6 m up
  // is an ordinary adult eye height, and 4.2 m back keeps the whole exhibit
  // in easy view without leaning or turning around (TODO 4, xr.js).
  controls.minDistance = 2;
  controls.maxDistance = 7;
  controls.minPolarAngle = THREE.MathUtils.degToRad(20);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);

  controls.listenToKeyEvents(renderer.domElement);

  const startCamera = { position: camera.position.clone(), target: controls.target.clone() };

  const timer = new THREE.Timer();
  timer.connect(document);

  let animating = true;
  let presenting = false; // whether a headset currently owns the camera (set by xr.js)

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function tick(time) {
    timer.update(time);
    controls.update();

    if (animating) {
      const jade = items.find((item) => item.data.id === 'jade-stone');
      if (jade) jade.mesh.rotation.y += timer.getDelta() * 0.6;
    }

    render();
  }

  function start() {
    renderer.setAnimationLoop(tick);
  }
  function stop() {
    renderer.setAnimationLoop(null);
  }

  function resetView() {
    camera.position.copy(startCamera.position);
    controls.target.copy(startCamera.target);
    controls.update();
  }

  // TODO 3: called by xr.js when a VR session starts or ends (value is true
  // or false). OrbitControls does not know about a headset: if it kept
  // listening for drags and arrow keys while a headset owns the camera, the
  // two would fight over where the camera points. Store `value` in the
  // `presenting` variable above, and set `controls.enabled` to the opposite
  // of it, so exactly one thing drives the camera at a time.
  function setPresenting(value) {

  }

  function rebuild() {
    disposeExhibit(exhibit.group);
    scene.remove(exhibit.group);
    const next = buildExhibit();
    exhibit.group = next.group;
    scene.add(exhibit.group);
    items.splice(0, items.length, ...next.items);
    render();
  }

  new ResizeObserver(resize).observe(container);

  return {
    renderer,
    scene,
    camera,
    controls,
    items,
    resize,
    render,
    start,
    stop,
    resetView,
    rebuild,
    setAnimating: (value) => { animating = value; },
    isAnimating: () => animating,
    setPresenting,
    isPresenting: () => presenting,
  };
}
