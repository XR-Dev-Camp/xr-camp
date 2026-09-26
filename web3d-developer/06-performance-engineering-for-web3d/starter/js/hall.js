// hall.js: builds the exhibit hall this lesson optimises. It is deliberately
// slow: the numbered TODOs below mark each of the problems you will fix as
// you work through the README. Nothing here is broken — everything draws
// correctly — it is just far more expensive than it needs to be. Keep the
// Stats panel open while you read this file: every TODO has a number you
// can watch move on the page.

import * as THREE from 'three';
import { makeSwatchTexture } from './textures.js';

export const ITEM_TYPES = [
  { id: 'clay-pot', name: 'Clay pot', color: '#b5562e' },
  { id: 'basket-ring', name: 'Woven basket ring', color: '#c9a24b' },
  { id: 'jade-stone', name: 'Jade stone', color: '#2f7d5b' },
];

export const MAIN_ROWS = 8;
export const MAIN_COLS = 10;
export const SPACING = 1.6;
export const PEDESTAL_HEIGHT = 0.6;

// Four featured showcase pieces, one per compass point, well outside the
// main grid. HERO_ACTIVATION_RADIUS is used in the README's LOD step.
export const HEROES = [
  { id: 'north', name: 'North showcase', x: 0, z: -13, type: ITEM_TYPES[2] },
  { id: 'south', name: 'South showcase', x: 0, z: 13, type: ITEM_TYPES[0] },
  { id: 'east', name: 'East showcase', x: 13, z: 0, type: ITEM_TYPES[1] },
  { id: 'west', name: 'West showcase', x: -13, z: 0, type: ITEM_TYPES[2] },
];

// Three small wings, further out again. Each is a handful of ordinary
// pedestal-and-item pairs, the same kind as the main grid, just placed where
// a visitor only reaches them on purpose.
export const WINGS = [
  { id: 'wing-a', name: 'Textiles wing', x: 20, z: -6, rows: 2, cols: 3 },
  { id: 'wing-b', name: 'Ceramics wing', x: 20, z: 6, rows: 2, cols: 3 },
  { id: 'wing-c', name: 'Stone wing', x: -20, z: 0, rows: 2, cols: 3 },
];

function itemGeometry(typeId) {
  if (typeId === 'clay-pot') return new THREE.CylinderGeometry(0.16, 0.22, 0.36, 24);
  if (typeId === 'basket-ring') return new THREE.TorusGeometry(0.22, 0.07, 16, 40);
  return new THREE.IcosahedronGeometry(0.22, 1);
}

function buildItemMesh(type, scale = 1) {
  // TODO 2 and TODO 3: this function runs once per item in the main grid —
  // eighty times — and again for every wing item. Each call creates its own
  // geometry and its own material, even though every "clay pot" is
  // identical to every other "clay pot". Eighty unique geometries and
  // eighty unique materials means eighty separate entries in
  // renderer.info.memory, and eighty separate draw calls just for this one
  // layer of the hall. An InstancedMesh draws every copy of one shape, in
  // one material, in a single draw call: see "Key code explained".
  const geometry = itemGeometry(type.id);
  const texture = makeSwatchTexture(type.color, type.name);
  const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.setScalar(scale);
  // TODO 6: every item and every pedestal below casts AND receives shadows.
  // A shadow map is a second render of the scene from the light's point of
  // view, done every frame; the more shadow-casting objects it must draw,
  // the longer that second render takes. Most of these small, repeated
  // items add almost nothing you can see in their shadow, because they sit
  // in a long row under an even light. Reserve shadows for the pieces where
  // they are worth their cost: the four hero showcases.
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function buildPedestal(x, z) {
  const geometry = new THREE.CylinderGeometry(0.3, 0.34, PEDESTAL_HEIGHT, 20);
  const material = new THREE.MeshStandardMaterial({ color: '#efe9f7', roughness: 0.9 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, PEDESTAL_HEIGHT / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function buildFloorTile(x, z) {
  // TODO 4: the floor is one separate PlaneGeometry (and one separate draw
  // call) per grid cell, instead of one geometry for the whole hall floor.
  // Unlike the pedestals and items above, floor tiles never move
  // independently of each other, so they do not need InstancedMesh's
  // per-copy transforms — a single merged geometry is the simpler, cheaper
  // fit here. See BufferGeometryUtils.mergeGeometries in "Key code
  // explained".
  const geometry = new THREE.PlaneGeometry(SPACING * 0.95, SPACING * 0.95);
  const material = new THREE.MeshStandardMaterial({ color: '#e7e2f0', roughness: 1 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0, z);
  mesh.receiveShadow = true;
  return mesh;
}

function gridPositions(rows, cols, originX, originZ) {
  const positions = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({ x: originX + col * SPACING, z: originZ + row * SPACING });
    }
  }
  return positions;
}

// Builds one pedestal-and-item pair grid (used for both the main hall and
// each wing) as plain, individual meshes, and adds them straight into
// `group`. Returns how many pairs it added.
function addGridInto(group, rows, cols, centerX, centerZ) {
  const originX = centerX - ((cols - 1) * SPACING) / 2;
  const originZ = centerZ - ((rows - 1) * SPACING) / 2;
  const positions = gridPositions(rows, cols, originX, originZ);
  positions.forEach(({ x, z }, i) => {
    group.add(buildFloorTile(x, z));
    group.add(buildPedestal(x, z));
    const type = ITEM_TYPES[i % ITEM_TYPES.length];
    const item = buildItemMesh(type);
    item.position.set(x, PEDESTAL_HEIGHT + 0.22, z);
    group.add(item);
  });
  return positions.length;
}

// Builds the whole hall in one call: the main grid, the four hero
// showcases, and the three wings. Everything is built up front and added to
// the scene immediately, whether or not a visitor will ever walk out to it.
export function buildHall() {
  const group = new THREE.Group();
  group.name = 'Hall';

  const mainCount = addGridInto(group, MAIN_ROWS, MAIN_COLS, 0, 0);

  // TODO 7: each hero is a single mesh at full detail, all the time, no
  // matter how far away the camera is standing. A THREE.LOD swaps in a
  // cheaper stand-in once an object is far enough away that nobody can see
  // the difference.
  for (const hero of HEROES) {
    const mesh = buildItemMesh(hero.type, 1.8);
    mesh.name = hero.name;
    mesh.position.set(hero.x, PEDESTAL_HEIGHT + 0.5, hero.z);
    group.add(buildPedestal(hero.x, hero.z));
    group.add(mesh);
  }

  // TODO 8: the three wings are built and added right here, even though a
  // visitor starts in the middle of the main grid and may never walk out to
  // them this session. Building (and keeping) every wing's meshes and
  // textures whether or not anyone visits is exactly what "lazy loading"
  // below asks you to stop doing.
  let wingItemCount = 0;
  for (const wing of WINGS) {
    wingItemCount += addGridInto(group, wing.rows, wing.cols, wing.x, wing.z);
  }

  return { group, mainCount, heroCount: HEROES.length, wingItemCount };
}

// TODO 1: there is no disposeHall() here. Click "Rebuild hall" in the Stats
// panel a few times and watch "Geometries" and "Textures": they climb every
// time and never come back down, because the old hall's GPU resources are
// never freed, only forgotten about. A geometry's triangle data and a
// material's compiled program live in GPU buffers JavaScript's garbage
// collector cannot see: removing a mesh from the scene is not enough.
