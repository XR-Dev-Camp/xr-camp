// app.js: the three.js engine. Carried over from 4.1 (WebXR Foundations)
// unchanged in almost all of its shape; this lesson adds only what spatial
// audio and the story screen need: an AudioListener attached to the camera
// (TODO 3), so every THREE.PositionalAudio in the scene has somewhere to
// report its position and orientation relative to, and a small onFrame()
// hook so audio.js and video.js can run their own per-frame work without
// either of them needing to know how the render loop itself is built.

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

  // Reference space and WebXR support, unchanged from 4.1. See that
  // lesson's README for why local-floor and this call order matter.
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');

  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The 3D exhibit, its audio guide screen, and three quiet pedestal sounds. Its description follows below.');
  container.append(renderer.domElement);

  // --- Scene and camera ---------------------------------------------------
  const scene = new THREE.Scene();
  scene.name = 'Scene';
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
  camera.position.set(0, 1.6, 4.2);

  // TODO 3: an AudioListener represents the "ears" in the scene: the point
  // every THREE.PositionalAudio measures its distance and direction from.
  // Adding it to the camera (an Object3D, like any mesh) means it always
  // sits exactly where the viewer is looking from, on the desktop view and
  // inside a WebXR headset alike, with no extra code needed for either.
  // Three.js reads the listener's world position and orientation from the
  // camera's own matrixWorld every frame, the same mechanism that already
  // gives every PositionalAudio its position (see audio.js).
  const listener = new THREE.AudioListener();
  camera.add(listener);

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
  controls.minDistance = 2;
  controls.maxDistance = 7;
  controls.minPolarAngle = THREE.MathUtils.degToRad(20);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);

  const startCamera = { position: camera.position.clone(), target: controls.target.clone() };

  const timer = new THREE.Timer();
  timer.connect(document);

  let animating = true; // the jade stone's spin, and the story screen's own animation (see main.js)
  let presenting = false;
  const frameCallbacks = []; // audio.js and video.js each register one, via onFrame() below

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

    const elapsed = timer.getElapsed();
    for (const callback of frameCallbacks) callback({ elapsed, animating, presenting });

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

  function setPresenting(value) {
    presenting = value;
    controls.enabled = !value;
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
    listener,
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
    // Registers a function to run once per rendered frame (desktop or XR),
    // after the exhibit's own animation and before the frame is drawn, so
    // whatever it draws (e.g. video.js's canvas) appears in that same frame.
    onFrame: (callback) => { frameCallbacks.push(callback); },
  };
}
