// lab.js: the Web3D concepts lab. TODOs 2–12 are in this file.
// One three.js scene, one set of controls,
// and a description that always says what the picture shows.

import * as THREE from 'three';

const box = document.querySelector('#canvas-box');
const panel = document.querySelector('#controls');
const $ = (id) => document.getElementById(id);

// --- Renderer: draws the scene onto a <canvas> with WebGL. ------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
box.append(renderer.domElement);
renderer.domElement.setAttribute('role', 'img');
renderer.domElement.setAttribute('aria-label', 'The 3D scene. Its description follows.');

// --- The scene graph: a tree of objects. -------------------------------------
const scene = new THREE.Scene();
scene.name = 'Scene';
scene.background = new THREE.Color('#eef4ff');

const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: '#dcd6e6' }));
floor.name = 'Floor';
floor.rotation.x = -Math.PI / 2;   // three.js rotations are in radians: -90°
scene.add(floor);

// The table is a Group: an empty parent that holds its parts and its objects.
const table = new THREE.Group();
table.name = 'Table';
scene.add(table);

const wood = new THREE.MeshStandardMaterial({ color: '#8a5a3b', roughness: 0.8 });
const top = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.2), wood);
top.name = 'Tabletop';
top.position.y = 0.75;
table.add(top);
for (const [x, z] of [[-1.1, -0.5], [1.1, -0.5], [-1.1, 0.5], [1.1, 0.5]]) {
  const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.08), wood);
  leg.name = 'Leg';
  leg.position.set(x, 0.35, z);
  table.add(leg);
}

const materials = {
  basic: new THREE.MeshBasicMaterial({ color: '#b5562e' }),
  lambert: new THREE.MeshLambertMaterial({ color: '#b5562e' }),
  standard: new THREE.MeshStandardMaterial({ color: '#b5562e', roughness: 0.7, metalness: 0 }),
};
const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.18, 0.5, 32), materials.standard);
pot.name = 'Pot';
pot.position.set(-0.5, 1.05, 0);
table.add(pot);

const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22), new THREE.MeshStandardMaterial({ color: '#2f7d5b', roughness: 0.4 }));
stone.name = 'Stone';
table.add(stone);

// --- Lights. -----------------------------------------------------------------
const ambient = new THREE.AmbientLight('#ffffff', 0.6);
ambient.name = 'Ambient light';
const sun = new THREE.DirectionalLight('#fff4e0', 2);
sun.name = 'Sunlight';
const lamp = new THREE.PointLight('#ffd08a', 8, 6);
lamp.name = 'Lamp';
lamp.position.set(0.8, 2.2, 0.8);
scene.add(ambient, sun, lamp);

const axes = new THREE.AxesHelper(1.5);
axes.name = 'Axes helper';
scene.add(axes);

// --- Cameras: two kinds, and we switch between them. -------------------------
const perspective = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const orthographic = new THREE.OrthographicCamera(-3, 3, 2.25, -2.25, 0.1, 100);
for (const camera of [perspective, orthographic]) {
  camera.position.set(0, 2.6, 5);
  camera.lookAt(0, 0.8, 0);
}
let camera = perspective;

// --- Read the controls, and apply them to the scene. -------------------------
function num(id) { return Number($(id).value); }

function apply() {
  // TODO 2: COORDINATES. Set the stone's position from the three sliders:
  // stone.position.set(num('stone-x'), num('stone-y'), num('stone-z'))

  // TODO 5: THE SCENE GRAPH. If #stone-on-table is ticked, the stone's
  // parent should be the table; otherwise the scene. Use wantParent.attach(stone).
  // First try wantParent.add(stone) instead, and turn the table: why does
  // the stone jump? (Hint: its position is measured from its parent.)

  // TODO 3: TRANSFORMS. Turn the table: three.js rotations are in RADIANS,
  // the slider is in degrees. table.rotation.y = THREE.MathUtils.degToRad(...)

  // TODO 4: Scale the pot with pot.scale.setScalar(...).

  // TODO 6: THE CAMERA. Choose perspective or orthographic from #camera-type,
  // set perspective.fov, disable #fov for the orthographic camera, and call
  // resize() (it calls updateProjectionMatrix, which you need after changing fov).

  // TODO 7: LIGHTS. Set ambient.intensity. Place the sun on a circle:
  // x = cos(angle) * 5, y = 4, z = sin(angle) * 5 (angle in radians).
  // TODO 8: The lamp is visible when #lamp has aria-pressed="true".

  // TODO 9: MATERIALS. pot.material = materials[kind]. Update roughness and
  // metalness of materials.standard, and disable those sliders otherwise.

  showValues();
  describe();
  drawTree();
  render();
}

// Show each slider's value beside it.
function showValues() {
  for (const input of panel.querySelectorAll('input[type="range"]')) {
    $(`${input.id}-out`).textContent = input.value;
  }
}

// --- The description: the picture, in words. --------------------------------
function describe() {
  // TODO 10: Write the picture in words, from the same values: the table's
  // turn, the pot's size and material, the stone's position and parent, the
  // camera, and the lights. End with "Nothing moves unless you change a
  // control." Put it in #scene-description.
}

// --- The scene graph as a nested list: its 2D twin. --------------------------
function drawTree() {
  // TODO 11: Build a nested <ul> from the scene graph, starting at scene:
  // one <li> per object with a name, with its named children in a <ul>
  // inside it (object.children). Skip the four legs, or count them.
  // Put it in #tree. When you re-parent the stone, the list must change.
}

// --- Rendering on demand: draw only when something changed. ------------------
// Nothing in this scene moves by itself, so there is no animation loop: the
// GPU rests until you change a control.
function render() {
  // TODO 12: Draw the scene once: renderer.render(scene, camera).
  // There is no animation loop. Why is that good for a phone's battery?
}

function resize() {
  const { width, height } = box.getBoundingClientRect();
  if (!width || !height) return;
  renderer.setSize(width, height, false);
  const aspect = width / height;
  perspective.aspect = aspect;
  perspective.updateProjectionMatrix();
  orthographic.left = -2.25 * aspect;
  orthographic.right = 2.25 * aspect;
  orthographic.updateProjectionMatrix();
}

new ResizeObserver(() => { resize(); render(); }).observe(box);

panel.addEventListener('input', apply);
panel.addEventListener('change', apply);
$('lamp').addEventListener('click', () => {
  const on = $('lamp').getAttribute('aria-pressed') !== 'true';
  $('lamp').setAttribute('aria-pressed', String(on));
  apply();
});
// Reset: every control goes back to the value written in the HTML.
$('reset').addEventListener('click', () => {
  for (const input of panel.querySelectorAll('input')) {
    if (input.type === 'checkbox') input.checked = input.defaultChecked;
    else input.value = input.defaultValue;
  }
  for (const select of panel.querySelectorAll('select')) {
    select.value = [...select.options].find((option) => option.defaultSelected)?.value ?? select.options[0].value;
  }
  $('lamp').setAttribute('aria-pressed', 'false');
  apply();
});

apply();
