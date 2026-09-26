// app.js: the three.js engine, carried over from 4.1 (WebXR Foundations)
// with one small addition: onXRFrame() (below), a way for ar.js to run code
// once per XR frame with that frame's own XRFrame object, which is what
// hit-test placement needs and nothing before this lesson did. Everything
// else this lesson adds - controllers, hands, and the in-world menu - lives
// entirely in controllers.js and menu.js instead: they need no engine change
// at all, only new input sources feeding into the same `scene` and `items`
// this file already exposed.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildExhibit, disposeExhibit } from './exhibit.js';

export function createApp(container) {
  // --- Renderer ---------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  // r186 already defaults outputColorSpace to SRGBColorSpace: monitors
  // expect colour in sRGB, so three.js converts its lighting maths (done in
  // linear space) back to sRGB before it reaches the screen. Setting it
  // explicitly says what the renderer is doing, rather than relying on a
  // default a reader cannot see.
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Tone mapping compresses a lit scene's bright values into the 0-1 range a
  // screen can show, the way a camera's exposure does. The default,
  // NoToneMapping, clips anything too bright to flat white. ACESFilmic rolls
  // off highlights gently instead, which suits a lit, physically based scene
  // like this one.
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  // Never draw more than twice the pixels a screen has. A phone reporting a
  // device pixel ratio of 3 would otherwise ask the GPU to draw more than
  // twice as many pixels as at 2, for sharpness nobody can see. Note that
  // this line only affects the desktop view: while a headset is presenting,
  // three.js's WebXRManager sets the pixel ratio to 1 and resizes to the
  // headset's own framebuffer by itself (verified in the r186 source), and
  // restores this value automatically when the session ends.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // From 4.1: turn on WebXR support, and choose a reference space.
  // `renderer.xr.enabled` defaults to false: without this line, requesting a
  // session and calling `renderer.xr.setSession(session)` (see xr.js) would
  // not draw anything into the headset. `local-floor` places the origin at
  // the floor, under wherever the camera was at the moment the session
  // starts, which is what xr-accessibility.md recommends for a seated
  // experience: `local-floor` is already r186's own default, but setting it
  // explicitly says so in code a reader can see, the same reasoning as
  // `outputColorSpace` above. This call must happen before a session starts:
  // once presenting, changing it only logs a warning and does nothing.
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');

  // Focusable, so the keyboard route into OrbitControls (the arrow keys)
  // has somewhere to land. role="img" and the label tell assistive
  // technology this canvas is a picture, not a control, and that the real
  // description lives elsewhere on the page.
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'The 3D exhibit. Its description follows below.');
  container.append(renderer.domElement);

  // --- Scene and camera ---------------------------------------------------
  const scene = new THREE.Scene();
  scene.name = 'Scene';
  scene.background = new THREE.Color('#eef4ff');

  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
  camera.position.set(0, 1.6, 4.2);

  const ambient = new THREE.AmbientLight('#ffffff', 0.7);
  ambient.name = 'Ambient light';
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.name = 'Sunlight';
  sun.position.set(3, 5, 2);
  scene.add(ambient, sun);

  // The exhibit itself lives in a mutable holder so rebuild() can replace
  // its contents without every other function needing a new reference.
  const exhibit = buildExhibit();
  scene.add(exhibit.group);
  const items = exhibit.items; // kept as one array; rebuild() replaces its contents, not the array itself

  // --- Controls: OrbitControls from three/addons -------------------------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.9, 0);
  controls.enableDamping = true; // motion eases to a stop instead of snapping
  controls.dampingFactor = 0.08;

  // Comfort limits (see docs/en/xr-accessibility.md): keep the camera at a
  // sensible distance, and stop it climbing over the exhibit or dipping
  // below the floor. The camera never moves on its own; these limits only
  // shape where the learner's own dragging or key presses can take it.
  // The same starting position (1.6 m up, 4.2 m back) doubles as this
  // exhibit's seated-VR origin: 1.6 m is an ordinary adult eye height, seated
  // or standing, and 4.2 m keeps the whole exhibit, and the in-world menu
  // this lesson adds between the viewer and the pedestals, in easy,
  // comfortable view without leaning or turning around.
  controls.minDistance = 2;
  controls.maxDistance = 7;
  controls.minPolarAngle = THREE.MathUtils.degToRad(20);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(85);

  // Gives the arrow keys a route into orbiting, as long as the canvas has
  // focus (Tab reaches it, because of the tabIndex set above).
  controls.listenToKeyEvents(renderer.domElement);

  const startCamera = { position: camera.position.clone(), target: controls.target.clone() };

  // --- Timer: frame-rate-independent motion -------------------------------
  // THREE.Timer replaced THREE.Clock, deprecated since r183. update() must
  // run once per frame, before getDelta(); connect(document) uses the Page
  // Visibility API so returning to a hidden tab does not report one huge
  // delta (the render loop below also stops outright while hidden, so this
  // is a second, independent safeguard).
  const timer = new THREE.Timer();
  timer.connect(document);

  let animating = true; // whether the jade stone keeps turning; the camera itself never animates by itself
  let presenting = false; // whether a headset currently owns the camera (set by xr.js)

  // Callbacks that need the raw XRFrame itself (only ar.js does, for
  // hit-test), rather than just "a frame happened". `renderer.setAnimationLoop`
  // already passes its callback a second argument, the active XRFrame,
  // during a WebXR session, and `undefined` otherwise; tick() below simply
  // forwards it on to whoever asked.
  const frameCallbacks = new Set();
  function onXRFrame(callback) {
    frameCallbacks.add(callback);
    return () => frameCallbacks.delete(callback);
  }

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    // The third argument, false, means "resize the drawing buffer only, not
    // the canvas's CSS size": the stylesheet already sizes the canvas box.
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix(); // required after any change to aspect or fov
  }

  function render() {
    renderer.render(scene, camera);
  }

  function tick(time, frame) {
    // While presenting, three.js drives the camera from the headset's own
    // pose every frame; controls.update() below is a no-op for orbiting in
    // that case (setPresenting has disabled it), but damping motion left
    // over from before the session still needs a chance to settle, so it
    // stays harmless to call either way.
    timer.update(time);
    controls.update(); // required every frame: damping and inertia rely on it

    if (animating) {
      const jade = items.find((item) => item.data.id === 'jade-stone');
      if (jade) jade.mesh.rotation.y += timer.getDelta() * 0.6; // radians per second: same speed at 30fps or 120fps
    }

    for (const callback of frameCallbacks) callback(frame);

    render();
  }

  // Applications should always start and stop their loop through
  // setAnimationLoop rather than requestAnimationFrame directly: it also
  // covers WebXR sessions, and passing null stops it outright, which frees
  // the GPU completely rather than merely skipping work inside the callback.
  // Once xr.js hands a session to renderer.xr.setSession(), three.js starts
  // calling this same `tick` function once per XR frame instead of once per
  // browser frame: no separate XR render loop is needed anywhere in this app.
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

  // From 4.1: called by xr.js when a VR session starts or ends. OrbitControls
  // does not know about a headset: if it kept listening for drags and arrow
  // keys while a headset owns the camera, the two would fight over where the
  // camera points. Disabling it during the session, and re-enabling it once
  // the session ends, keeps exactly one thing driving the camera at a time.
  function setPresenting(value) {
    presenting = value;
    controls.enabled = !value;
  }

  // Disposes the current exhibit and builds a fresh one in its place.
  // renderer.info.memory.geometries and .textures should read the same
  // numbers after this as before it: if they climb every time, something is
  // not being disposed.
  function rebuild() {
    disposeExhibit(exhibit.group);
    scene.remove(exhibit.group);
    const next = buildExhibit();
    exhibit.group = next.group;
    scene.add(exhibit.group);
    items.splice(0, items.length, ...next.items);
    // renderer.info.memory only counts a geometry once it has actually been
    // drawn, not from the moment it is created: render once now, so a stats
    // panel reading renderer.info right after rebuild() sees the new
    // exhibit's numbers immediately, not the stale, just-disposed ones.
    render();
  }

  new ResizeObserver(resize).observe(container);

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
    rebuild,
    setAnimating: (value) => { animating = value; },
    isAnimating: () => animating,
    setPresenting,
    isPresenting: () => presenting,
    onXRFrame,
  };
}
