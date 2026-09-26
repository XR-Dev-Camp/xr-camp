// main.js: wires the page's buttons and text to the engine (app.js) and the
// hall's layout data (hall.js, describe.js). No three.js API appears in this
// file except THREE.Vector3, used only to hand flyTo() a plain point.

import { createApp } from './app.js';
import { describeHall } from './describe.js';
import { HEROES, WINGS, MAIN_ROWS, MAIN_COLS } from './hall.js';
import * as THREE from 'three';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');
const reducedMotion = window.__reducedMotion === true;

function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function renderList() {
  const list = $('exhibit-list');
  const rows = [
    { name: 'Main grid', note: `${MAIN_ROWS * MAIN_COLS} pedestals, each with a clay pot, a woven basket ring, or a jade stone, drawn as four instanced batches.` },
    ...HEROES.map((h) => ({ name: h.name, note: `A larger ${h.type.name.toLowerCase()}, shown at full detail up close and as a simple stand-in from far away.` })),
    ...WINGS.map((w) => ({ name: w.name, note: `${w.rows * w.cols} more pedestals, only built once you travel close to them.` })),
  ];
  list.replaceChildren(...rows.map((row) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = row.name;
    li.append(strong, document.createTextNode(` — ${row.note}`));
    return li;
  }));
}
renderList();

if (!supportsWebGL2()) {
  $('canvas-box').hidden = true;
  $('no-webgl-message').hidden = false;
  $('scene-description').textContent = 'This browser cannot show the 3D hall: WebGL 2 is unavailable. The list above has the same information.';
} else {
  const app = createApp(container);

  function updateDescription() {
    const main = app.main();
    const stats = app.readStats();
    describeAndSet(main, stats);
  }
  function describeAndSet(main, stats) {
    $('scene-description').textContent = describeHall({
      mainCount: main.count,
      heroCount: app.heroesInfo().count,
      wingCount: app.wingDefs.length,
      activeWings: stats.activeWings,
      animating: app.isAnimating(),
    });
  }

  function updateStats() {
    const { render, memory, activeWings } = app.readStats();
    $('stat-calls').textContent = render.calls;
    $('stat-triangles').textContent = Math.round(render.triangles);
    $('stat-geometries').textContent = memory.geometries;
    $('stat-textures').textContent = memory.textures;
    $('stat-renders').textContent = app.getRenderRate();
    $('stat-wings').textContent = activeWings;
  }
  const statsTimer = setInterval(() => { updateStats(); updateDescription(); }, 500);
  window.addEventListener('pagehide', () => { clearInterval(statsTimer); app.dispose(); });

  app.resize();
  app.start();

  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    app.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription();
  }
  setAnimating(!reducedMotion);
  pauseButton.addEventListener('click', () => setAnimating(!app.isAnimating()));

  $('turn-left').addEventListener('click', () => app.controls.rotateLeft(Math.PI / 8));
  $('turn-right').addEventListener('click', () => app.controls.rotateLeft(-Math.PI / 8));
  $('reset-view').addEventListener('click', () => { app.resetView(); updateDescription(); });

  const travel = $('travel-buttons');
  const destinations = [
    ...HEROES.map((h) => ({ label: h.name, x: h.x, z: h.z })),
    ...WINGS.map((w) => ({ label: w.name, x: w.x, z: w.z })),
  ];
  travel.replaceChildren(...destinations.map((dest) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `Go to: ${dest.label}`;
    button.addEventListener('click', () => {
      const angle = Math.atan2(dest.z, dest.x);
      const camX = dest.x + Math.cos(angle) * 3;
      const camZ = dest.z + Math.sin(angle) * 3;
      app.flyTo(new THREE.Vector3(camX, 3, camZ), new THREE.Vector3(dest.x, 0.8, dest.z), { reducedMotion });
      updateDescription();
    });
    li.append(button);
    return li;
  }));

  $('rebuild').addEventListener('click', () => {
    app.rebuild();
    updateDescription();
    updateStats();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  updateDescription();
  updateStats();
}
