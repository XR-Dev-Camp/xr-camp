// scene.js: a deliberately small three.js scene. Course 3.4 already built a
// full exhibit engine with OrbitControls, disposal and a stats panel: this
// lesson is about the API, not the 3D, so the scene here is a simple viewer
// that reacts to settings loaded from js/main.js. EXHIBITS repeats the same
// three objects from web3d-developer/04-threejs-foundations (a clay pot, a
// woven basket ring, a jade stone), so the id you tick in the form is the
// same id the server saves and the same id three.js hides or shows.

import * as THREE from 'three';

export const EXHIBITS = [
  { id: 'clay-pot', name: 'Clay pot', made: 'unglazed terracotta clay', x: -1.3 },
  { id: 'basket-ring', name: 'Woven basket ring', made: 'woven plant fibre', x: 0 },
  { id: 'jade-stone', name: 'Jade stone', made: 'polished jade', x: 1.3 },
];

// Fixed camera positions, chosen by hand rather than computed, so the
// "Camera start" setting stays easy to reason about. The camera only ever
// moves to one of these four spots, and only when a setting says to.
export const CAMERA_PRESETS = {
  front: { position: [0, 1.6, 4.2], label: 'Front view' },
  left: { position: [-3.4, 1.6, 1.6], label: 'Left side' },
  right: { position: [3.4, 1.6, 1.6], label: 'Right side' },
  close: { position: [0, 1.2, 1.9], label: 'Close-up' },
};
const LOOK_AT = new THREE.Vector3(0, 0.8, 0);

function buildMesh(id) {
  if (id === 'clay-pot') {
    return new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.22, 0.36, 24),
      new THREE.MeshStandardMaterial({ color: '#b5562e', roughness: 0.9 }),
    );
  }
  if (id === 'basket-ring') {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.07, 12, 32),
      new THREE.MeshStandardMaterial({ color: '#c9a24b', roughness: 0.85 }),
    );
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  }
  // jade-stone
  return new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.22, 0),
    new THREE.MeshStandardMaterial({ color: '#2f7d5b', roughness: 0.35 }),
  );
}

export function createScene(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The exhibit. Its description is below.');
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#eef4ff');
  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);

  scene.add(new THREE.AmbientLight('#ffffff', 0.8));
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.position.set(3, 5, 2);
  scene.add(sun);

  const objects = new Map();
  for (const item of EXHIBITS) {
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.34, 0.8, 24),
      new THREE.MeshStandardMaterial({ color: '#efe9f7', roughness: 0.9 }),
    );
    pedestal.position.set(item.x, 0.4, 0);
    const mesh = buildMesh(item.id);
    mesh.position.set(item.x, 0.8 + 0.22, 0);
    const group = new THREE.Group();
    group.add(pedestal, mesh);
    scene.add(group);
    objects.set(item.id, { group, mesh });
  }

  let animating = true;

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);

  function render() {
    renderer.render(scene, camera);
  }

  function tick() {
    if (animating) {
      const jade = objects.get('jade-stone');
      if (jade) jade.mesh.rotation.y += 0.01;
    }
    render();
  }
  renderer.setAnimationLoop(tick);
  document.addEventListener('visibilitychange', () => {
    renderer.setAnimationLoop(document.hidden ? null : tick);
  });

  // Applies a full settings object: which exhibits are visible, where the
  // camera starts, and whether the jade stone is allowed to turn. Called
  // once when settings first load, and again every time Save changes them,
  // so the scene is never more than one settings object away from correct.
  function applySettings(settings) {
    for (const [id, { group }] of objects) {
      group.visible = settings.visibleExhibits.includes(id);
    }
    const preset = CAMERA_PRESETS[settings.cameraStart] ?? CAMERA_PRESETS.front;
    camera.position.set(...preset.position);
    camera.lookAt(LOOK_AT);
    animating = !settings.reducedMotion;
    resize();
    render();
  }

  function setAnimating(value) {
    animating = value;
  }

  return { applySettings, setAnimating, isAnimating: () => animating, resize };
}
