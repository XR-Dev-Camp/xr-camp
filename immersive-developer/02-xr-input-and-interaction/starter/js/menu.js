// menu.js: builds the in-world menu, a small flat panel of three buttons
// floating between the viewer and the exhibit. This file is finished code:
// it is ordinary three.js geometry and canvas-drawn text, nothing WebXR-
// specific, so the lesson's TODOs live in controllers.js instead, where the
// menu is actually pointed at and pressed.
//
// Each button is drawn onto a canvas and used as a texture, rather than
// three.js's TextGeometry (which needs a font file) or an HTML overlay
// (which cannot be positioned inside a 3D scene at all). A canvas texture
// also sidesteps the font problem A-Frame's default text has with accents
// and Chinese: this same technique is how the Creative challenge can safely
// relabel these buttons in any language.

import * as THREE from 'three';

const BUTTON_WIDTH = 0.42;
const BUTTON_HEIGHT = 0.16;
const GAP = 0.06;

// Draws one button's face: a rounded rectangle and a centred label, at a
// resolution sharp enough to read up close in a headset.
function drawButtonTexture(label) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512 * (BUTTON_HEIGHT / BUTTON_WIDTH);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#5b2a86';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  ctx.fillStyle = '#3f1d5e';
  ctx.font = 'bold 64px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Builds one pressable button: a plane with the drawn texture, its action
// name in userData for controllers.js to read after a raycast hit, and a
// redraw() function so the Creative challenge or a language switch can
// relabel it without rebuilding the whole menu.
function buildButton(label, action, x) {
  const geometry = new THREE.PlaneGeometry(BUTTON_WIDTH, BUTTON_HEIGHT);
  const material = new THREE.MeshBasicMaterial({ map: drawButtonTexture(label), toneMapped: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;
  mesh.userData.action = action;
  mesh.userData.baseColor = material.color.clone();
  mesh.name = `Menu button: ${label}`;
  return mesh;
}

// Builds the whole menu: three buttons in a row, positioned between the
// viewer's seated-VR starting point (z = 4.2, see app.js) and the exhibit
// (z = 0), at a comfortable seated eye height. Returns the group to add to
// the scene, plus the flat array of button meshes controllers.js raycasts
// against.
export function buildMenu() {
  const group = new THREE.Group();
  group.name = 'In-world menu';
  group.position.set(0, 1.3, 2.4);

  const buttons = [
    buildButton('Pause', 'pause', -(BUTTON_WIDTH + GAP)),
    buildButton('Rebuild', 'rebuild', 0),
    buildButton('Reset view', 'reset', BUTTON_WIDTH + GAP),
  ];
  group.add(...buttons);

  return { group, buttons };
}

// Visual feedback for a raycast hit: a brief highlight so a learner sees
// which button their ray or hand is over, before and independent of any
// haptic pulse (see controllers.js), since not every input source can
// vibrate.
export function setButtonHighlight(mesh, on) {
  mesh.material.color.set(on ? '#ffe27a' : mesh.userData.baseColor);
}
