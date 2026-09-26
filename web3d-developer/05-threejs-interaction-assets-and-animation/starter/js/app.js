// app.js: the three.js engine, carried over from 3.4 unchanged in its
// renderer, scene, camera, controls, and render-loop setup (all given
// below), and extended with what a model explorer needs. TODOs 5-7 are in
// this file: picking an item with a ray from the pointer, highlighting the
// selected one, and driving an AnimationMixer per model. No DOM text or
// button wiring happens here, so main.js can change the page's controls
// without touching this file.

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

  // TODO 5: PICK AN ITEM. Write pickItem(clientX, clientY):
  //  - Get the canvas's on-screen box: `const rect = renderer.domElement.getBoundingClientRect()`.
  //  - Convert the pointer's page coordinates to normalised device
  //    coordinates *relative to the canvas*, not the whole page:
  //    `pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1`, and
  //    `pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1` (the y
  //    axis flips: screen y grows downward, NDC y grows upward).
  //  - `raycaster.setFromCamera(pointerNdc, camera)`, then
  //    `raycaster.intersectObjects(exhibit.group.children, true)` (the
  //    `true` means "search descendants too", which a multi-mesh glTF
  //    model needs).
  //  - For each hit, in order (closest first), walk up through `.parent`
  //    from `hit.object` until you find a node with a `userData.itemId`
  //    (set when the item was placed — see exhibit.js), and return it.
  //  - Return `null` if nothing was hit, or no hit had an itemId.
  function pickItem(clientX, clientY) {
    return null;
  }

  // TODO 6: HIGHLIGHT THE SELECTION. Write setSelected(id), which should
  // update `selectedId` and then re-paint every item: for the item whose
  // `data.id === id`, tint every material on its mesh (traverse it, since a
  // glTF model can be several meshes); for every other item, restore its
  // original colour. A material's original emissive colour needs to be
  // remembered somewhere before you overwrite it — try stashing it in
  // `material.userData.__baseEmissive` the first time you touch that
  // material (`material.userData.__baseEmissive === undefined`), using
  // `material.emissive.clone()`. Then, each time: if the item is selected,
  // `material.emissive.copy(HIGHLIGHT_COLOR)`; otherwise,
  // `material.emissive.copy(material.userData.__baseEmissive)`. Skip any
  // material that has no `.emissive` property.
  function setSelected(id) {
    selectedId = id;
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

      // TODO 7: ANIMATE EVERY LOADED MODEL. Loop over `items`, and for each
      // one that has a `mixer` (only the two model items ever will, and
      // only once their glTF file has loaded), call `item.mixer.update(delta)`.
      // Skipping this call entirely — not merely setting a speed of zero —
      // is what makes `animating` freeze a model exactly where it was, the
      // same principle as the jade stone's rotation above.
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
  // Given, unchanged: it calls the same buildExhibit()/disposeExhibit() you
  // already have, plus loadAll() below.
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
  // exhibit's placeholders are. Given, unchanged.
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
