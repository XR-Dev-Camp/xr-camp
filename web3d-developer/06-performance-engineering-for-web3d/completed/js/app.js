// app.js: the three.js engine for the optimised hall. Compare this with
// starter/js/app.js: the renderer, camera, and controls setup are the same
// shape, but the render loop now renders on demand instead of every frame,
// and the hall is built from buildMainGrid + buildHeroes + a wing manager
// instead of one big buildHall() call.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildMainGrid, disposeMainGrid, buildHeroes, disposeHeroes, createWingManager } from './hall.js';

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

  let main = buildMainGrid();
  scene.add(main.group);
  const heroesResult = buildHeroes();
  scene.add(heroesResult.group);
  let heroes = heroesResult.heroes;
  const wingManager = createWingManager(scene);

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

  let animating = true;

  // --- Render on demand -----------------------------------------------
  // needsRender starts true so the first frame always draws. From then on,
  // renderer.render() only runs when something actually changed: a camera
  // drag or damping settling (controls fires 'change'), a resize, a wing
  // being built or disposed, or a frame where the hero showcases turn.
  // The animation loop itself (setAnimationLoop) still runs every frame —
  // that part is required for WebXR — but most frames now skip the
  // expensive render() call entirely.
  let needsRender = true;
  function invalidate() { needsRender = true; }
  controls.addEventListener('change', invalidate);

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    invalidate();
  }

  let renderCount = 0;
  let wingCheckAccumulator = 0;
  function tick(time) {
    timer.update(time);
    controls.update();
    const delta = timer.getDelta();

    if (animating) {
      for (const hero of heroes) hero.lod.rotation.y += delta * 0.4;
      invalidate(); // something is moving, so this frame must draw
    }

    for (const hero of heroes) hero.lod.update(camera);

    // Checked a few times a second, not every frame: a camera has to travel
    // several metres to cross a wing's activation radius, so checking on
    // every one of sixty frames a second buys nothing.
    wingCheckAccumulator += delta;
    if (wingCheckAccumulator > 0.2) {
      wingCheckAccumulator = 0;
      if (wingManager.update(camera.position)) invalidate();
    }

    if (needsRender) {
      renderer.render(scene, camera);
      needsRender = false;
      renderCount++;
    }
  }

  function start() { renderer.setAnimationLoop(tick); }
  function stop() { renderer.setAnimationLoop(null); }

  function resetView() {
    camera.position.copy(startCamera.position);
    controls.target.copy(startCamera.target);
    controls.update();
    invalidate();
  }

  // Rebuilds only the main grid: disposes its geometries and materials
  // first (see hall.js's disposeMainGrid), then builds a fresh one.
  // renderer.info.memory.geometries should read the same number afterwards
  // as before: if it climbs every click, something was missed.
  function rebuild() {
    scene.remove(main.group);
    disposeMainGrid(main);
    main = buildMainGrid();
    scene.add(main.group);
    invalidate();
  }

  // Moves the camera to look at a point from a given distance. A tween runs
  // over the given duration unless reduced motion is on, in which case the
  // camera jumps straight there: this motion only ever happens because the
  // learner clicked a "Go to..." button, but a smooth glide is still motion
  // an unrequested-feeling amount of the time reduced-motion users asked to
  // avoid, so it is skipped for them.
  function flyTo(position, target, { reducedMotion = false, duration = 700 } = {}) {
    const fromPosition = camera.position.clone();
    const fromTarget = controls.target.clone();
    if (reducedMotion || duration <= 0) {
      camera.position.copy(position);
      controls.target.copy(target);
      controls.update();
      invalidate();
      return;
    }
    let start = null;
    function step(now) {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
      camera.position.lerpVectors(fromPosition, position, eased);
      controls.target.lerpVectors(fromTarget, target, eased);
      controls.update();
      invalidate();
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function readStats() {
    return { render: renderer.info.render, memory: renderer.info.memory, activeWings: wingManager.activeCount() };
  }

  let renderRate = 0;
  setInterval(() => { renderRate = renderCount; renderCount = 0; }, 1000);

  new ResizeObserver(resize).observe(container);

  return {
    renderer,
    camera,
    controls,
    main: () => main,
    heroesInfo: () => ({ count: heroes.length }),
    wingDefs: wingManager.defs,
    resize,
    start,
    stop,
    resetView,
    rebuild,
    flyTo,
    readStats,
    getRenderRate: () => renderRate,
    setAnimating: (value) => { animating = value; invalidate(); },
    isAnimating: () => animating,
    dispose() {
      stop();
      disposeMainGrid(main);
      disposeHeroes(heroes);
      wingManager.disposeAll();
    },
  };
}
