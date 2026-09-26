// The exhibit's three.js engine: renderer, scene, camera, the three
// pedestals from EXHIBITS, and the render loop. This file is unchanged in
// spirit from 4.1-4.5's own app.js: nothing here is new to this capstone,
// it is what those five lessons already built, reused as-is so this
// capstone can focus on combining what they taught, not rebuilding it.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXHIBITS } from './exhibit.js';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createApp(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.xr.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4efe6);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.set(0, 1.6, 3.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enableDamping = true;
  controls.update();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x3a2f28, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(2, 4, 2);
  scene.add(key);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(3, 32).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xe4d9c6, roughness: 1 }),
  );
  scene.add(floor);

  // Three pedestals, in a shallow arc facing the starting camera position,
  // one per EXHIBITS entry, in the same order.
  const pedestals = new Map();
  EXHIBITS.forEach((data, i) => {
    const angle = (i - 1) * 0.6;
    const radius = 1.6;
    const group = new THREE.Group();
    group.position.set(Math.sin(angle) * radius, 0, -Math.cos(angle) * radius);

    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.36, 0.7, 20),
      new THREE.MeshStandardMaterial({ color: 0xd8cdb8, roughness: 0.9 }),
    );
    stand.position.y = 0.35;
    group.add(stand);

    const geometry = data.geometry === 'torus'
      ? new THREE.TorusGeometry(0.32, 0.13, 16, 32)
      : data.geometry === 'icosahedron'
        ? new THREE.IcosahedronGeometry(0.4, 1)
        : new THREE.CylinderGeometry(0.28, 0.36, 0.7, 24);
    const item = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.7 }),
    );
    item.position.y = 0.35 + 0.7 / 2 + 0.05;
    item.userData.id = data.id;
    group.add(item);

    scene.add(group);
    pedestals.set(data.id, { group, item });
  });

  const app = {
    renderer, scene, camera, controls, pedestals,
    selectedId: null,
    grabbedId: null,
    paused: REDUCED_MOTION,
    onChange: () => {},
  };

  function resize() {
    const { clientWidth: w, clientHeight: h } = renderer.domElement.parentElement;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  renderer.setAnimationLoop(() => {
    if (app.grabbedId && !app.paused) {
      const p = pedestals.get(app.grabbedId);
      if (p) p.item.rotation.y += 0.02;
    }
    controls.update();
    renderer.render(scene, camera);
  });

  return app;
}

export function selectExhibit(app, id) {
  app.selectedId = id;
  app.onChange();
}

export function setGrabbed(app, id, grabbed) {
  app.grabbedId = grabbed ? id : (app.grabbedId === id ? null : app.grabbedId);
  app.onChange();
}

export function setPaused(app, paused) {
  app.paused = paused;
  app.onChange();
}
