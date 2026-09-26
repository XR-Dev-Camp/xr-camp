// Capstone Prototype reference solution.
// A trimmed-down reuse of the accessible 3D page pattern from
// web3d-developer/07-interactive-web3d-experience: one primitive-built
// object, a scene description and 2D twin built from the same data, a
// keyboard route for every interaction, and a reduced-motion-aware Pause
// button. See prototype-plan.md for what this prototype is meant to prove.
import * as THREE from 'three';

const canvasBox = document.getElementById('canvas-box');
const sceneDescription = document.getElementById('scene-description');
const exhibitList = document.getElementById('exhibit-list');
const pauseToggle = document.getElementById('pause-toggle');
const noWebglMessage = document.getElementById('no-webgl-message');
const budgetCalls = document.getElementById('budget-calls');
const budgetTriangles = document.getElementById('budget-triangles');
const budgetResult = document.getElementById('budget-result');

// The exhibit stand's data: the single source of truth for both the 3D
// object and its text description, so the two can never say different
// things (WCAG 1.3.1).
const STAND = {
  name: 'Exhibit stand prototype',
  description: 'A simple cylindrical stand, standing in for one gallery exhibit. It turns slowly on its own axis.',
};

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true });
} catch {
  renderer = null;
}

if (!renderer) {
  noWebglMessage.hidden = false;
  sceneDescription.textContent = STAND.description;
  addTwin();
  budgetResult.textContent = 'Not checked: WebGL 2 is unavailable in this browser.';
} else {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeef4ff);

  const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
  camera.position.set(0, 1.2, 4);
  camera.lookAt(0, 0.5, 0);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(light);
  const key = new THREE.DirectionalLight(0xffffff, 0.8);
  key.position.set(2, 3, 2);
  scene.add(key);

  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.8, 1.2, 24),
    new THREE.MeshStandardMaterial({ color: 0x5b2a86 }),
  );
  stand.position.y = 0.6;
  scene.add(stand);

  function resize() {
    const width = canvasBox.clientWidth || 320;
    const height = canvasBox.clientHeight || 240;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  canvasBox.appendChild(renderer.domElement);
  window.addEventListener('resize', resize);
  resize();

  // TODO-style comment kept for teaching: this is the finished version of
  // the starter's TODOs 1-2.
  sceneDescription.textContent = STAND.description;
  addTwin();

  // Look-around: turning the camera around the stand, with a keyboard route
  // identical to what dragging would do.
  let angle = 0;
  function turn(step) {
    angle += step;
    camera.position.x = Math.sin(angle) * 4;
    camera.position.z = Math.cos(angle) * 4;
    camera.lookAt(0, 0.5, 0);
  }
  document.getElementById('turn-left').addEventListener('click', () => turn(-0.3));
  document.getElementById('turn-right').addEventListener('click', () => turn(0.3));

  // Animation: the stand turns on its own, unless the visitor has asked to
  // reduce motion, in which case it starts paused. Either way, the Pause
  // button always works.
  let paused = window.__reducedMotion === true;
  pauseToggle.setAttribute('aria-pressed', String(paused));
  pauseToggle.textContent = paused ? 'Play animation' : 'Pause animation';
  pauseToggle.addEventListener('click', () => {
    paused = !paused;
    pauseToggle.setAttribute('aria-pressed', String(paused));
    pauseToggle.textContent = paused ? 'Play animation' : 'Pause animation';
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!paused) stand.rotation.y += 0.01;
    renderer.render(scene, camera);
    updateBudget();
  }
  animate();

  function updateBudget() {
    const info = renderer.info;
    const calls = info.render.calls;
    const triangles = info.render.triangles;
    budgetCalls.textContent = `${calls} / 15`;
    budgetTriangles.textContent = `${triangles} / 8000`;
    const within = calls <= 15 && triangles <= 8000;
    budgetResult.textContent = within
      ? 'Within budget.'
      : 'Over budget: simplify before Stage 4.';
    budgetResult.classList.toggle('over-budget', !within);
  }
}

function addTwin() {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${STAND.name}</strong><br>${STAND.description}`;
  exhibitList.appendChild(li);
}
