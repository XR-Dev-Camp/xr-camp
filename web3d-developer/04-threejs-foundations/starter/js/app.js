// app.js: the three.js engine. TODOs 1-11 are in this file. Everything you
// write here is reusable across 3.5-3.7: the renderer, the scene, the
// camera, the controls, and the render loop. exhibit.js supplies the
// objects; main.js wires the page's buttons and text to what this file
// exports. Do not put DOM text or button wiring here: that keeps this file
// reusable in a page with completely different controls.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildExhibit, disposeExhibit } from './exhibit.js';

export function createApp(container) {
  // TODO 1: THE RENDERER. Create `const renderer = new THREE.WebGLRenderer({ antialias: true })`.
  // Then:
  //  - Set renderer.outputColorSpace to THREE.SRGBColorSpace (this is
  //    already the default in this version of three.js; set it anyway, so
  //    the code says what it is doing). Monitors expect colour in sRGB, but
  //    three.js's lighting maths runs in linear space, so the renderer
  //    converts back to sRGB on the way out.
  //  - Set renderer.toneMapping to THREE.ACESFilmicToneMapping, and
  //    renderer.toneMappingExposure to 1. The default, NoToneMapping, clips
  //    bright values to flat white; ACESFilmic rolls them off gently.
  //  - Cap the pixel ratio: renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)).
  //    A phone reporting a ratio of 3 would otherwise draw more than twice
  //    as many pixels as at 2, for sharpness nobody can see.
  //  - Append renderer.domElement to `container`.

  // TODO 2: KEYBOARD AND SCREEN-READER ACCESS TO THE CANVAS. Set
  // renderer.domElement.tabIndex = 0 (so Tab can reach it, which the arrow
  // keys in TODO 6 need), and set its role to "img" and an aria-label
  // saying the description is below (screen readers should not try to read
  // a <canvas> pixel by pixel).

  // TODO 3: SCENE AND CAMERA. Create `const scene = new THREE.Scene()`, give
  // it a name and a pale background colour (new THREE.Color('#eef4ff')).
  // Create `const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100)`
  // and position it around (0, 1.6, 4.2) so it starts facing the exhibit.

  const ambient = new THREE.AmbientLight('#ffffff', 0.7);
  ambient.name = 'Ambient light';
  const sun = new THREE.DirectionalLight('#fff4e0', 2);
  sun.name = 'Sunlight';
  sun.position.set(3, 5, 2);
  // scene.add(ambient, sun); // uncomment once `scene` exists (TODO 3)

  const exhibit = buildExhibit();
  // scene.add(exhibit.group); // uncomment once `scene` exists (TODO 3)
  const items = exhibit.items;

  // TODO 4: RESIZING. Write `resize()`: read container.getBoundingClientRect(),
  // guard against a zero width or height, call renderer.setSize(width, height, false)
  // (false keeps the canvas's CSS size, which the stylesheet already
  // controls), set camera.aspect = width / height, and call
  // camera.updateProjectionMatrix() — required after any change to aspect or fov.
  function resize() {

  }

  function render() {
    // renderer.render(scene, camera) belongs here, once `scene` and
    // `camera` exist (TODO 3). Leave the rest of this function for TODO 8.
  }

  // TODO 5: ORBITCONTROLS. Create
  // `const controls = new OrbitControls(camera, renderer.domElement)`
  // (once `camera` and `renderer` exist). Set controls.target to about
  // (0, 0.9, 0) — the exhibit's rough centre height. Set
  // controls.enableDamping = true and controls.dampingFactor = 0.08, so
  // motion eases to a stop instead of snapping.

  // TODO 6: COMFORT LIMITS AND KEYBOARD SUPPORT. On the same `controls`:
  //  - controls.minDistance and controls.maxDistance, so the camera cannot
  //    get uncomfortably close or drift far away (try 2 and 7).
  //  - controls.minPolarAngle and controls.maxPolarAngle, in radians via
  //    THREE.MathUtils.degToRad(...), so the camera cannot climb over the
  //    exhibit or dip below the floor (try 20 and 85 degrees).
  //  - controls.listenToKeyEvents(renderer.domElement), so the arrow keys
  //    orbit the camera once the canvas has focus (TODO 2 made it
  //    focusable). Check the r186 source before you use this method: does
  //    it exist, and what does it take?

  // const startCamera = { position: camera.position.clone(), target: controls.target.clone() };
  // (uncomment once `controls` exists — TODO 5)

  // TODO 7: THE TIMER. THREE.Clock has been deprecated since r183; use
  // THREE.Timer instead. Create `const timer = new THREE.Timer()` and call
  // `timer.connect(document)`, which uses the Page Visibility API to avoid
  // one huge time delta when a hidden tab becomes visible again.

  let animating = true; // whether the jade stone keeps turning

  function tick(time) {
    // TODO 8: THE RENDER LOOP. Call timer.update(time), then controls.update()
    // (required every frame for damping to work). If `animating` is true,
    // find the jade stone in `items` (its data.id is 'jade-stone') and add
    // `timer.getDelta() * 0.6` (radians per second) to its mesh's
    // rotation.y. Multiplying by the delta, not a fixed number, is what
    // makes this frame-rate independent: the stone turns at the same speed
    // whether the screen draws 30 or 120 times a second. Finish by calling render().
  }

  // TODO 9: START AND STOP. Write `start()`, which calls
  // renderer.setAnimationLoop(tick), and `stop()`, which calls
  // renderer.setAnimationLoop(null). Applications should always use
  // setAnimationLoop rather than requestAnimationFrame directly.
  function start() {

  }
  function stop() {

  }

  function resetView() {
    // TODO 10: RESET VIEW. Copy startCamera.position back onto
    // camera.position, and startCamera.target back onto controls.target
    // (THREE.Vector3 has a .copy(other) method), then call controls.update().
  }

  function rebuild() {
    // TODO 11: DISPOSE AND REBUILD. Call disposeExhibit(exhibit.group), then
    // scene.remove(exhibit.group). Build a fresh one with buildExhibit(),
    // set exhibit.group to its .group, scene.add(exhibit.group), and
    // replace the contents of `items` with its .items (try
    // items.splice(0, items.length, ...next.items) so the existing `items`
    // array reference, which describe.js and main.js already hold, stays
    // valid). Afterwards, renderer.info.memory.geometries and .textures
    // should read the same numbers as before this call: that is how you
    // will prove nothing leaked. Finish by calling render() once more:
    // renderer.info only counts a geometry once it has actually been
    // drawn, so without this, a Stats panel reading renderer.info right
    // after a rebuild would briefly show stale, just-disposed numbers.
  }

  new ResizeObserver(resize).observe(container);

  return {
    renderer: null, // TODO: return the real `renderer` once it exists (TODO 1)
    scene: null, // TODO: return the real `scene` once it exists (TODO 3)
    camera: null, // TODO: return the real `camera` once it exists (TODO 3)
    controls: null, // TODO: return the real `controls` once it exists (TODO 5)
    items,
    resize,
    render,
    start,
    stop,
    resetView,
    rebuild,
    setAnimating: (value) => { animating = value; },
    isAnimating: () => animating,
  };
}
