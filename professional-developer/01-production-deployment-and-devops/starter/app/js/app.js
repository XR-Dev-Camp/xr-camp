// app.js: the capstone's three.js engine, carried over unchanged from 3.5's
// model explorer: the renderer, scene, camera, controls, raycasting
// selection, highlighting, and per-model AnimationMixer driving. The
// capstone's new work (the info panel, the performance budget check, and
// the release notes) is integration glue in main.js, not new engine code
// here — no DOM text or button wiring happens in this file.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildExhibit, disposeExhibit, loadModels } from './exhibit.js';
import { createManager } from './loader.js';

const HIGHLIGHT_COLOR = new THREE.Color('#ffd166');

export function createApp(container, { onProgress, onItemReady, onItemError } = {}) {
  // --- Renderer ---------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The 3D exhibit. Its description follows below. Click or tap an item to select it, or use the Select buttons.');
  container.append(renderer.domElement);

  // --- Scene and camera ---------------------------------------------------
  const scene = new THREE.Scene();
  scene.name = 'Scene';
  scene.background = new THREE.Color('#eef4ff');

  // Widened and pulled back from 3.4: five pedestals now span x = -1.3 to
  // x = 3.9, so both the starting camera position and the orbit distance
  // limits below grew to keep the whole exhibit in view.
  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
  camera.position.set(1.3, 1.8, 6.4);

  const ambient = new THREE.AmbientLight('#ffffff', 0.7);
  ambient.name = 'Ambient light';
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.name = 'Sunlight';
  sun.position.set(3, 5, 2);
  scene.add(ambient, sun);

  let exhibit = buildExhibit();
  scene.add(exhibit.group);
  const items = exhibit.items; // one stable array; reload() replaces its contents, not the array itself

  // --- Controls: OrbitControls from three/addons -------------------------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(1.3, 0.9, 0); // the exhibit's rough centre, now that it spans five pedestals
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 2.5;
  controls.maxDistance = 10;
  controls.minPolarAngle = THREE.MathUtils.degToRad(20);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
  controls.listenToKeyEvents(renderer.domElement);

  const startCamera = { position: camera.position.clone(), target: controls.target.clone() };

  // --- Timer ---------------------------------------------------------------
  const timer = new THREE.Timer();
  timer.connect(document);

  let animating = true; // whether the jade stone, and every loaded model's own animation, keeps playing
  let selectedId = null;

  // --- Raycasting: picking an item with the pointer ------------------------
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();

  // Converts a pointer event's client coordinates to normalised device
  // coordinates relative to the canvas (not the whole page), casts a ray
  // from the camera through that point, and returns the id of the item hit,
  // or null. Walking up through .parent handles a glTF model, which is
  // several meshes deep; every one of them was tagged with the same
  // userData.itemId when it was placed (see exhibit.js).
  function pickItem(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects(exhibit.group.children, true);
    for (const hit of hits) {
      let node = hit.object;
      while (node) {
        if (node.userData.itemId) return node.userData.itemId;
        node = node.parent;
      }
    }
    return null;
  }

  // Restores the previously selected item's materials, then tints every
  // material on the newly selected item's mesh with an emissive highlight.
  // Storing each material's original emissive colour on the material itself
  // (material.userData.__baseEmissive) means this works the same way for a
  // single-mesh primitive and a multi-mesh glTF model, without the two
  // cases needing separate code.
  function paintSelection(id) {
    for (const item of items) {
      const isSelected = item.data.id === id;
      item.mesh.traverse((node) => {
        if (!node.material) return;
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        for (const material of materials) {
          if (!('emissive' in material)) continue;
          if (material.userData.__baseEmissive === undefined) {
            material.userData.__baseEmissive = material.emissive.clone();
          }
          material.emissive.copy(isSelected ? HIGHLIGHT_COLOR : material.userData.__baseEmissive);
        }
      });
    }
  }

  function setSelected(id) {
    selectedId = id;
    paintSelection(id);
  }

  function getSelected() {
    return items.find((item) => item.data.id === selectedId) ?? null;
  }

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
      for (const item of items) {
        item.mixer?.update(delta);
      }
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

  // Disposes everything currently in the exhibit (primitives, any loaded
  // models, and their textures) and builds and reloads it from nothing.
  // renderer.info.memory.geometries and .textures should read the same
  // numbers afterwards as they did before this call, including for the
  // real textures the two glTF files bring in: that is the stronger proof
  // of disposal this lesson adds to 3.4's.
  async function reload() {
    disposeExhibit(exhibit.group, items);
    scene.remove(exhibit.group);
    selectedId = null;

    exhibit = buildExhibit();
    scene.add(exhibit.group);
    items.splice(0, items.length, ...exhibit.items);
    render();

    await loadAll();
  }

  // Shared by the first load (below) and every reload(): builds a fresh
  // LoadingManager (a used-up manager does not report progress correctly a
  // second time) and loads both glTF files into whatever the current
  // exhibit's placeholders are.
  async function loadAll() {
    const manager = createManager({ onProgress, onError: () => {} });
    await loadModels(exhibit, { manager, onItemReady, onItemError });
    render();
  }

  new ResizeObserver(resize).observe(container);

  loadAll(); // kick off the first load; main.js does not need to ask for it

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
    reload,
    pickItem,
    setSelected,
    getSelected,
    setAnimating: (value) => { animating = value; },
    isAnimating: () => animating,
  };
}
