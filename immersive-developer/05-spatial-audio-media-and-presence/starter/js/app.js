// app.js: the three.js engine. Carried over from 4.1 (WebXR Foundations)
// unchanged in almost all of its shape; this lesson adds only what spatial
// audio and the story screen need: an AudioListener attached to the camera
// (TODO 3), and a small onFrame() hook so audio.js and video.js can run
// their own per-frame work without either of them needing to know how the
// render loop itself is built (TODO 9).

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

  // The listener itself is already created for you. An AudioListener
  // represents the "ears" in the scene: the point every THREE.PositionalAudio
  // (see audio.js) measures its distance and direction from.
  const listener = new THREE.AudioListener();

  // TODO 3: add the listener to the camera with `camera.add(listener)`.
  // The camera is an Object3D, like any mesh: adding the listener to it
  // means it always sits exactly where the viewer is looking from, on the
  // desktop view and inside a WebXR headset alike, with no extra code
  // needed for either. Until this line is added, every PositionalAudio
  // still works, but measures its distance from the world's origin (0, 0, 0)
  // instead of from wherever the camera actually is.

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

  let animating = true;
  let presenting = false;
  const frameCallbacks = []; // TODO 9 fills this in: audio.js and video.js each register one, via onFrame() below

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

    // TODO 9: call every function in frameCallbacks, once per frame, with
    // one object argument: `{ elapsed: timer.getElapsed(), animating, presenting }`.
    // This is what lets video.js redraw the story screen's canvas in the
    // same frame three.js is about to render, without video.js needing its
    // own render loop or any reference to the renderer itself.

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
    // TODO 9: return `(callback) => { frameCallbacks.push(callback); }` here
    // instead of the placeholder below.
    onFrame: () => {},
  };
}
