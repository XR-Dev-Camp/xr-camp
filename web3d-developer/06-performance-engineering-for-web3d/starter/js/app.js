// app.js: the three.js engine for this lesson's slow hall. The renderer,
// camera, controls, lighting, and render loop live here; hall.js supplies
// the objects; main.js wires the page's buttons and text to what this file
// exports.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildHall, HEROES } from './hall.js';

export function createApp(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The exhibit hall. Its description follows below.');
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
  camera.position.set(0, 5, 9);

  const ambient = new THREE.AmbientLight('#ffffff', 0.7);
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.position.set(6, 10, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -22;
  sun.shadow.camera.right = 22;
  sun.shadow.camera.top = 22;
  sun.shadow.camera.bottom = -22;
  scene.add(ambient, sun);

  let hall = buildHall();
  scene.add(hall.group);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.8, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 3;
  controls.maxDistance = 26;
  controls.minPolarAngle = THREE.MathUtils.degToRad(15);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);

  const startCamera = { position: camera.position.clone(), target: controls.target.clone() };

  const timer = new THREE.Timer();
  timer.connect(document);

  let animating = true; // whether the hero showcases keep turning

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  // TODO 9: this render loop calls renderer.render() on every single frame,
  // sixty times a second, forever — even while the camera sits still and
  // (with animation paused) nothing in the scene is moving at all. Nothing
  // changed, but the GPU redraws the whole hall anyway. Compare the
  // "Renders per second" stat here with the completed version once you
  // stop moving the camera. "Render on demand" only calls renderer.render()
  // when something has actually changed: a camera drag, a resize, or a
  // frame where something animates.
  let renderCount = 0;
  function tick(time) {
    timer.update(time);
    controls.update();
    const delta = timer.getDelta();

    if (animating) {
      for (const child of hall.group.children) {
        if (HEROES.some((hero) => hero.name === child.name)) child.rotation.y += delta * 0.4;
      }
    }

    renderer.render(scene, camera);
    renderCount++;
  }

  function start() { renderer.setAnimationLoop(tick); }
  function stop() { renderer.setAnimationLoop(null); }

  function resetView() {
    camera.position.copy(startCamera.position);
    controls.target.copy(startCamera.target);
    controls.update();
  }

  // Rebuilds the hall in place. The old group is removed from the scene,
  // but see TODO 1 in hall.js: nothing here frees its GPU resources first.
  function rebuild() {
    scene.remove(hall.group);
    hall = buildHall();
    scene.add(hall.group);
  }

  function flyTo(position, target) {
    // No easing here: every camera move in this starter happens instantly,
    // on request. The "Go to..." buttons below are the only way the camera
    // moves besides the learner's own drag or arrow keys.
    camera.position.copy(position);
    controls.target.copy(target);
    controls.update();
  }

  function readStats() {
    return { render: renderer.info.render, memory: renderer.info.memory };
  }

  // Renders-per-second counter, sampled once a second so the number reads
  // as "how often is this actually drawing", not per-frame noise.
  let renderRate = 0;
  setInterval(() => { renderRate = renderCount; renderCount = 0; }, 1000);

  new ResizeObserver(resize).observe(container);

  return {
    renderer,
    camera,
    controls,
    hall: () => hall,
    resize,
    start,
    stop,
    resetView,
    rebuild,
    flyTo,
    readStats,
    getRenderRate: () => renderRate,
    setAnimating: (value) => { animating = value; },
    isAnimating: () => animating,
  };
}
