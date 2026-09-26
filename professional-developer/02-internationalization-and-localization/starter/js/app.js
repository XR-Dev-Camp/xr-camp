// app.js: the three.js engine. Renderer, scene, camera, and OrbitControls
// are the same pattern as web3d-developer/07's app.js, trimmed to three
// static items (no raycasting-picked glTF loading here — main.js drives
// selection from the Select buttons, which is also the keyboard route).

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildExhibit } from './exhibit.js';
import { setLabel } from './labels.js';

export function createApp(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The 3D exhibit. Its description follows below.');
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
  camera.position.set(0, 1.6, 3.2);

  const ambient = new THREE.AmbientLight('#ffffff', 0.8);
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.position.set(2, 4, 2);
  scene.add(ambient, sun);

  const exhibit = buildExhibit();
  scene.add(exhibit.group);
  const items = exhibit.items;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.9, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1.8;
  controls.maxDistance = 6;
  controls.minPolarAngle = THREE.MathUtils.degToRad(20);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);

  const timer = new THREE.Timer();
  timer.connect(document);

  let animating = !window.__reducedMotion;

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
    }

    // TODO 8: billboard every label so it always faces the camera, however
    // the learner has orbited the view. A sprite already always faces the
    // camera on its own — that is what makes THREE.Sprite the right choice
    // for a label instead of a plane — so this loop can be a no-op if every
    // label is a Sprite. If you instead used a THREE.Mesh with a plane
    // geometry for the label (also a valid choice), copy the camera's
    // rotation onto each label here:
    // `for (const item of items) item.label?.quaternion.copy(camera.quaternion);`

    render();
  }

  function start() {
    renderer.setAnimationLoop(tick);
  }
  function stop() {
    renderer.setAnimationLoop(null);
  }

  function setAnimating(value) {
    animating = value;
  }

  new ResizeObserver(resize).observe(container);
  resize();
  render();

  return { renderer, scene, camera, controls, items, resize, render, start, stop, setAnimating, isAnimating: () => animating, setLabel };
}
