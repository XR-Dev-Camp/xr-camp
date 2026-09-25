// lab.js: the Web3D concepts lab. One three.js scene, one set of controls,
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
  stone.position.set(num('stone-x'), num('stone-y'), num('stone-z'));

  // Re-parenting: attach() keeps the stone where it is in the world, even
  // though its position is now measured from a different parent.
  const wantParent = $('stone-on-table').checked ? table : scene;
  if (stone.parent !== wantParent) wantParent.attach(stone);

  table.rotation.y = THREE.MathUtils.degToRad(num('table-turn'));
  pot.scale.setScalar(num('pot-scale'));

  camera = $('camera-type').value === 'perspective' ? perspective : orthographic;
  perspective.fov = num('fov');
  $('fov').disabled = camera !== perspective;
  resize();

  ambient.intensity = num('ambient');
  const angle = THREE.MathUtils.degToRad(num('sun'));
  sun.position.set(Math.cos(angle) * 5, 4, Math.sin(angle) * 5);
  lamp.visible = $('lamp').getAttribute('aria-pressed') === 'true';

  const kind = $('material').value;
  pot.material = materials[kind];
  materials.standard.roughness = num('roughness');
  materials.standard.metalness = num('metalness');
  $('roughness').disabled = $('metalness').disabled = kind !== 'standard';

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
  const where = stone.parent === table ? 'It sits in the table\'s group, so it turns with the table.' : 'It is no longer part of the table, so turning the table leaves it where it is.';
  const cam = camera === perspective
    ? `a perspective camera with a ${perspective.fov}° field of view: far things look smaller`
    : 'an orthographic camera: far things look the same size, like a plan';
  const material = { basic: 'a basic material, which ignores light, so it looks flat', lambert: 'a matte Lambert material', standard: `a standard material, roughness ${num('roughness')}, metalness ${num('metalness')}` }[$('material').value];
  $('scene-description').textContent = [
    `A wooden table stands in the middle of a pale floor, turned ${num('table-turn')} degrees.`,
    `On it is an orange clay pot, ${num('pot-scale')} times its normal size, with ${material}.`,
    `A green stone is at x ${num('stone-x')}, y ${num('stone-y')}, z ${num('stone-z')} metres. ${where}`,
    `You see it through ${cam}.`,
    `Ambient light is at ${num('ambient')}; sunlight comes from ${num('sun')} degrees around the room; the lamp is ${lamp.visible ? 'on, casting a warm glow' : 'off'}.`,
    'Nothing moves unless you change a control.',
  ].join(' ');
}

// --- The scene graph as a nested list: its 2D twin. --------------------------
function drawTree() {
  const item = (object) => {
    const li = document.createElement('li');
    const named = object.children.filter((child) => child.name && child.name !== 'Leg');
    const legs = object.children.filter((child) => child.name === 'Leg').length;
    li.textContent = object.name + (legs ? ` (and ${legs} legs)` : '');
    if (named.length) {
      const ul = document.createElement('ul');
      ul.append(...named.map(item));
      li.append(ul);
    }
    return li;
  };
  $('tree').replaceChildren(item(scene));
}

// --- Rendering on demand: draw only when something changed. ------------------
// Nothing in this scene moves by itself, so there is no animation loop: the
// GPU rests until you change a control.
function render() {
  renderer.render(scene, camera);
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
