// scene.js: a deliberately small three.js scene. This lesson is about the
// API, not the 3D, so most of the setup below is finished for you — only
// applySettings (TODO 12) is left to write.

import * as THREE from 'three';

export const EXHIBITS = [
  { id: 'clay-pot', name: 'Clay pot', made: 'unglazed terracotta clay', x: -1.3 },
  { id: 'basket-ring', name: 'Woven basket ring', made: 'woven plant fibre', x: 0 },
  { id: 'jade-stone', name: 'Jade stone', made: 'polished jade', x: 1.3 },
];

// Fixed camera positions, chosen by hand, so "Camera start" stays easy to
// reason about.
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

  // TODO 12: finish applySettings(settings). It should:
  //   1. For every [id, { group }] in `objects`, set group.visible to
  //      whether settings.visibleExhibits includes that id.
  //   2. Look up settings.cameraStart in CAMERA_PRESETS (fall back to
  //      CAMERA_PRESETS.front if it is missing), and move the camera there:
  //      camera.position.set(...preset.position); camera.lookAt(LOOK_AT);
  //   3. Set `animating` to !settings.reducedMotion.
  //   4. Call resize() and render(), so a change shows immediately even
  //      while the tab is not visible.
  // Until this is written, ticking a checkbox in the form will not change
  // what the 3D view shows — the always-present exhibit list (built in
  // js/main.js) will still update correctly, so you can check your work
  // against it.
  function applySettings(settings) {
    // not implemented yet
  }

  function setAnimating(value) {
    animating = value;
  }

  return { applySettings, setAnimating, isAnimating: () => animating, resize };
}
