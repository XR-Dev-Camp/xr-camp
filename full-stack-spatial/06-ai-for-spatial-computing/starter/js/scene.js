// scene.js: a small three.js viewer, finished for you (this lesson is about
// where a scene's numbers are stored, not about 3D graphics). It knows
// nothing about accounts, fetch, or SQLite — js/main.js owns all of that,
// and hands this file plain objects: an array of
// { exhibitId, position: {x,y,z}, rotationY } describing where each exhibit
// currently sits. That is exactly the shape validateSceneObjects() in
// server/validation.js checks and db.js's scene_objects table stores, so a
// scene loaded from the server, and a scene this page is about to save, are
// always the same shape with no translation step in between.

import * as THREE from 'three';

export const EXHIBITS = [
  { id: 'clay-pot', name: 'Clay pot', made: 'unglazed terracotta clay' },
  { id: 'basket-ring', name: 'Woven basket ring', made: 'woven plant fibre' },
  { id: 'jade-stone', name: 'Jade stone', made: 'polished jade' },
];

// A default layout — the same starting arrangement Course 5.2 used — shown
// before any scene has been loaded or saved.
export function defaultObjects() {
  return [
    { exhibitId: 'clay-pot', position: { x: -1.3, y: 0, z: 0 }, rotationY: 0 },
    { exhibitId: 'basket-ring', position: { x: 0, y: 0, z: 0 }, rotationY: 0 },
    { exhibitId: 'jade-stone', position: { x: 1.3, y: 0, z: 0 }, rotationY: 0 },
  ];
}

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
  camera.position.set(0, 1.6, 4.2);
  camera.lookAt(0, 0.8, 0);

  scene.add(new THREE.AmbientLight('#ffffff', 0.8));
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.position.set(3, 5, 2);
  scene.add(sun);

  // Every exhibit has a pedestal (fixed, decorative) and the exhibit mesh
  // itself, which is what applyObjects() below moves and turns.
  const pedestals = new Map();
  const meshes = new Map();
  for (const item of EXHIBITS) {
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.34, 0.8, 24),
      new THREE.MeshStandardMaterial({ color: '#efe9f7', roughness: 0.9 }),
    );
    const mesh = buildMesh(item.id);
    scene.add(pedestal, mesh);
    pedestals.set(item.id, pedestal);
    meshes.set(item.id, mesh);
  }

  // Small floating text labels for annotations, built from HTML overlays
  // (a <div> positioned with CSS), not A-Frame/three.js text geometry —
  // this project's annotations can include accented characters a WebGL
  // font would need extra work to draw, so an ordinary DOM element is the
  // simplest correct choice (see the house style's note on non-ASCII text).
  const markerLayer = document.createElement('div');
  markerLayer.className = 'annotation-markers';
  container.append(markerLayer);
  let markers = [];

  let animating = true;
  let currentObjects = defaultObjects();

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);

  function updateMarkerPositions() {
    for (const { exhibitId, element } of markers) {
      const mesh = meshes.get(exhibitId);
      if (!mesh) continue;
      const projected = mesh.position.clone().add(new THREE.Vector3(0, 0.3, 0)).project(camera);
      const { width, height } = container.getBoundingClientRect();
      element.style.left = `${((projected.x + 1) / 2) * width}px`;
      element.style.top = `${((1 - projected.y) / 2) * height}px`;
      element.hidden = projected.z > 1; // behind the camera
    }
  }

  function render() {
    updateMarkerPositions();
    renderer.render(scene, camera);
  }

  function tick() {
    if (animating) {
      const jade = meshes.get('jade-stone');
      if (jade) jade.rotation.y += 0.01;
    }
    render();
  }
  renderer.setAnimationLoop(tick);
  document.addEventListener('visibilitychange', () => {
    renderer.setAnimationLoop(document.hidden ? null : tick);
  });

  // Applies a full objects array (this scene's current layout) to the 3D
  // view: every mesh's position and rotation come only from this array,
  // never from a value left over from a previous scene.
  function applyObjects(objects) {
    currentObjects = objects;
    for (const object of objects) {
      const pedestal = pedestals.get(object.exhibitId);
      const mesh = meshes.get(object.exhibitId);
      if (!pedestal || !mesh) continue;
      pedestal.position.set(object.position.x, object.position.y + 0.4, object.position.z);
      mesh.position.set(object.position.x, object.position.y + 0.8 + 0.22, object.position.z);
      // A-Frame rotation is in degrees; three.js rotation is in radians —
      // the boundary between the two is exactly here, at the one place a
      // stored, human-entered number (degrees, the form's own unit) becomes
      // a three.js call.
      mesh.rotation.y = THREE.MathUtils.degToRad(object.rotationY);
    }
    render();
  }

  function getObjects() {
    return currentObjects;
  }

  // Renders the always-present annotation list as small markers over the
  // 3D view, purely decorative (the accessible, always-there version of the
  // same information is the "Annotations" list js/main.js renders as real
  // DOM text — see the README's "3D and XR accessibility" section).
  function setAnnotationMarkers(annotations) {
    for (const { element } of markers) element.remove();
    markers = annotations.map((annotation) => {
      const element = document.createElement('div');
      element.className = 'annotation-marker';
      element.textContent = '📝';
      element.title = annotation.text;
      markerLayer.append(element);
      return { exhibitId: annotation.exhibitId, element };
    });
    render();
  }

  function setAnimating(value) {
    animating = value;
    render();
  }

  applyObjects(currentObjects);

  return {
    applyObjects, getObjects, setAnnotationMarkers, setAnimating, isAnimating: () => animating, resize,
  };
}
