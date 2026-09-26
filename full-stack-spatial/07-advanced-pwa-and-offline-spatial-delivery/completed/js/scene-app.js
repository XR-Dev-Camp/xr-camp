// scene-app.js: the three.js engine for this lesson's scene, trimmed from
// Course 3.5's (web3d-developer/05) app.js. Selection (raycasting,
// highlighting), Reload, and the Stats panel are Course 3.5's own subject
// and are not repeated here — this lesson is about how the models arrive
// (from an offline bundle or the network), not about interacting with them
// once they have.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildExhibit, disposeExhibit } from './scene-exhibit.js';

export function createApp(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The history exhibit scene. Its description follows below.');
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
  camera.position.set(1.3, 1.8, 6.4);

  const ambient = new THREE.AmbientLight('#ffffff', 0.7);
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.position.set(3, 5, 2);
  scene.add(ambient, sun);

  const exhibit = buildExhibit();
  scene.add(exhibit.group);
  const items = exhibit.items;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(1.3, 0.9, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 2.5;
  controls.maxDistance = 10;
  controls.minPolarAngle = THREE.MathUtils.degToRad(20);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);

  const startCamera = { position: camera.position.clone(), target: controls.target.clone() };

  const timer = new THREE.Timer();
  timer.connect(document);

  let animating = true;

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
      const delta = timer.getDelta();
      const jade = items.find((item) => item.data.id === 'jade-stone');
      if (jade) jade.mesh.rotation.y += delta * 0.6;
      for (const item of items) item.mixer?.update(delta);
    }
    render();
  }

  function start() { renderer.setAnimationLoop(tick); }
  function stop() { renderer.setAnimationLoop(null); }

  function resetView() {
    camera.position.copy(startCamera.position);
    controls.target.copy(startCamera.target);
    controls.update();
  }

  new ResizeObserver(resize).observe(container);

  return {
    renderer,
    controls,
    items,
    exhibit,
    resize,
    render,
    start,
    stop,
    resetView,
    setAnimating: (value) => { animating = value; },
    isAnimating: () => animating,
    dispose: () => disposeExhibit(exhibit.group, items),
  };
}
