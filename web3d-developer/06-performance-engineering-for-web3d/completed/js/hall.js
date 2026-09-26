// hall.js: builds the optimised exhibit hall. Compare each function here
// with starter/js/hall.js: the layout (positions, counts) is identical, but
// how each layer reaches the GPU has changed. See "Key code explained" in
// the README for what each technique below is called and when to reach for
// it.

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { getSwatchTexture } from './textures.js';

export const ITEM_TYPES = [
  { id: 'clay-pot', name: 'Clay pot', color: '#b5562e' },
  { id: 'basket-ring', name: 'Woven basket ring', color: '#c9a24b' },
  { id: 'jade-stone', name: 'Jade stone', color: '#2f7d5b' },
];

export const MAIN_ROWS = 8;
export const MAIN_COLS = 10;
export const SPACING = 1.6;
export const PEDESTAL_HEIGHT = 0.6;

export const HEROES = [
  { id: 'north', name: 'North showcase', x: 0, z: -13, type: ITEM_TYPES[2] },
  { id: 'south', name: 'South showcase', x: 0, z: 13, type: ITEM_TYPES[0] },
  { id: 'east', name: 'East showcase', x: 13, z: 0, type: ITEM_TYPES[1] },
  { id: 'west', name: 'West showcase', x: -13, z: 0, type: ITEM_TYPES[2] },
];

export const WINGS = [
  { id: 'wing-a', name: 'Textiles wing', x: 20, z: -6, rows: 2, cols: 3 },
  { id: 'wing-b', name: 'Ceramics wing', x: 20, z: 6, rows: 2, cols: 3 },
  { id: 'wing-c', name: 'Stone wing', x: -20, z: 0, rows: 2, cols: 3 },
];

// A wing is "in range" once the camera is closer than this, and unloaded
// again once it is further than DEACTIVATE. The gap between the two numbers
// (hysteresis) stops a camera sitting right on the boundary from building
// and disposing the same wing every check.
export const WING_ACTIVATE_RADIUS = 11;
export const WING_DEACTIVATE_RADIUS = 15;

// A hero switches to its low-detail stand-in beyond this distance. THREE.LOD
// handles the swap itself, every frame, from these levels.
const HERO_LOD_DISTANCE = 9;

function itemGeometry(typeId, detail = 1) {
  if (typeId === 'clay-pot') return new THREE.CylinderGeometry(0.16, 0.22, 0.36, detail > 0 ? 24 : 6);
  if (typeId === 'basket-ring') return new THREE.TorusGeometry(0.22, 0.07, detail > 0 ? 16 : 4, detail > 0 ? 40 : 8);
  return new THREE.IcosahedronGeometry(0.22, detail > 0 ? 1 : 0);
}

function gridPositions(rows, cols, centerX, centerZ) {
  const originX = centerX - ((cols - 1) * SPACING) / 2;
  const originZ = centerZ - ((rows - 1) * SPACING) / 2;
  const positions = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({ x: originX + col * SPACING, z: originZ + row * SPACING });
    }
  }
  return positions;
}

const dummy = new THREE.Object3D();

// One InstancedMesh draws every copy of one shape, in one material, in a
// single draw call — instead of one Mesh (and one draw call) per copy. The
// trade-off: every instance must share the same geometry and material, so
// this only fits objects that repeat, like these pedestals and items.
function buildInstancedLayer(geometry, material, positions, yFor) {
  const mesh = new THREE.InstancedMesh(geometry, material, positions.length);
  positions.forEach(({ x, z }, i) => {
    dummy.position.set(x, yFor(x, z), z);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}

// Builds the always-present main grid: one InstancedMesh of pedestals, and
// one InstancedMesh per item type (three, since a batch needs one shared
// geometry). Also builds the floor as a single merged geometry.
export function buildMainGrid() {
  const group = new THREE.Group();
  group.name = 'MainGrid';
  const positions = gridPositions(MAIN_ROWS, MAIN_COLS, 0, 0);

  const pedestalGeometry = new THREE.CylinderGeometry(0.3, 0.34, PEDESTAL_HEIGHT, 20);
  const pedestalMaterial = new THREE.MeshStandardMaterial({ map: getSwatchTexture('#efe9f7', 'Pedestal'), roughness: 0.9 });
  const pedestals = buildInstancedLayer(pedestalGeometry, pedestalMaterial, positions, () => PEDESTAL_HEIGHT / 2);
  // Only the floor and the hero showcases cast/receive shadows (see
  // buildHeroes below): eighty near-identical pedestals in an even light add
  // almost nothing to what a shadow map shows, for real cost every frame.
  pedestals.receiveShadow = true;

  const itemMeshes = ITEM_TYPES.map((type, typeIndex) => {
    const own = positions.filter((_, i) => i % ITEM_TYPES.length === typeIndex);
    const geometry = itemGeometry(type.id);
    const material = new THREE.MeshStandardMaterial({ map: getSwatchTexture(type.color, type.name), roughness: 0.8 });
    const mesh = buildInstancedLayer(geometry, material, own, () => PEDESTAL_HEIGHT + 0.22);
    mesh.receiveShadow = true;
    return mesh;
  });

  // The floor: one PlaneGeometry per cell, merged into a single geometry
  // with BufferGeometryUtils.mergeGeometries, drawn as one Mesh. Unlike the
  // pedestals and items, floor tiles never need their own transform, so a
  // merge (which bakes every tile's position into one static geometry) is
  // the simpler fit — instancing exists for objects that need independent
  // per-copy positions, and a merge is cheaper when they do not.
  const tileGeometries = positions.map(({ x, z }) => {
    const tile = new THREE.PlaneGeometry(SPACING * 0.95, SPACING * 0.95);
    tile.rotateX(-Math.PI / 2);
    tile.translate(x, 0, z);
    return tile;
  });
  const floorGeometry = mergeGeometries(tileGeometries);
  for (const tile of tileGeometries) tile.dispose();
  const floor = new THREE.Mesh(floorGeometry, new THREE.MeshStandardMaterial({ color: '#e7e2f0', roughness: 1 }));
  floor.receiveShadow = true;

  group.add(floor, pedestals, ...itemMeshes);
  return { group, floor, pedestals, itemMeshes, count: positions.length };
}

export function disposeMainGrid(main) {
  main.floor.geometry.dispose();
  main.floor.material.dispose();
  main.pedestals.geometry.dispose();
  // Materials use cached, shared textures (see textures.js): disposing the
  // material here does not dispose the texture, so other layers still using
  // the same swatch keep working.
  main.pedestals.material.dispose();
  for (const mesh of main.itemMeshes) {
    mesh.geometry.dispose();
    mesh.material.dispose();
  }
}

// The four hero showcases: each is a THREE.LOD holding a detailed mesh for
// close viewing and a cheap low-poly stand-in for far away. LOD.update(),
// called once a frame with the camera, picks which level is actually in the
// scene graph — the other level is simply not drawn, at no extra draw-call
// cost.
export function buildHeroes() {
  const group = new THREE.Group();
  const heroes = HEROES.map((hero) => {
    const pedestalGeometry = new THREE.CylinderGeometry(0.3, 0.34, PEDESTAL_HEIGHT, 20);
    const pedestalMaterial = new THREE.MeshStandardMaterial({ map: getSwatchTexture('#efe9f7', 'Pedestal'), roughness: 0.9 });
    const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.position.set(hero.x, PEDESTAL_HEIGHT / 2, hero.z);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;

    const material = new THREE.MeshStandardMaterial({ map: getSwatchTexture(hero.type.color, hero.type.name), roughness: 0.6 });
    const near = new THREE.Mesh(itemGeometry(hero.type.id, 1), material);
    near.scale.setScalar(1.8);
    near.castShadow = true;
    near.receiveShadow = true;
    const far = new THREE.Mesh(itemGeometry(hero.type.id, 0), material);
    far.scale.setScalar(1.8);

    const lod = new THREE.LOD();
    lod.addLevel(near, 0);
    lod.addLevel(far, HERO_LOD_DISTANCE);
    lod.position.set(hero.x, PEDESTAL_HEIGHT + 0.5, hero.z);
    lod.name = hero.name;

    group.add(pedestal, lod);
    return { def: hero, lod, pedestal, near, far, material };
  });
  return { group, heroes };
}

export function disposeHeroes(heroes) {
  for (const hero of heroes) {
    hero.pedestal.geometry.dispose();
    hero.pedestal.material.dispose();
    hero.near.geometry.dispose();
    hero.far.geometry.dispose();
    hero.material.dispose();
  }
}

// --- Wings: lazy-loaded, not instanced ---------------------------------
// Each wing is only six pedestal-and-item pairs, far below the point where
// InstancedMesh's savings matter; the interesting cost here is not the draw
// calls, it is whether the wing exists in memory at all when nobody is
// nearby. buildWing() and disposeWing() are called on demand by the wing
// manager below, not once at start-up.
function buildWing(wing) {
  const group = new THREE.Group();
  group.name = wing.name;
  const positions = gridPositions(wing.rows, wing.cols, wing.x, wing.z);
  positions.forEach(({ x, z }, i) => {
    const floorGeometry = new THREE.PlaneGeometry(SPACING * 0.95, SPACING * 0.95);
    const floor = new THREE.Mesh(floorGeometry, new THREE.MeshStandardMaterial({ color: '#e7e2f0', roughness: 1 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(x, 0, z);
    floor.receiveShadow = true;

    const pedestalGeometry = new THREE.CylinderGeometry(0.3, 0.34, PEDESTAL_HEIGHT, 20);
    const pedestal = new THREE.Mesh(pedestalGeometry, new THREE.MeshStandardMaterial({ map: getSwatchTexture('#efe9f7', 'Pedestal'), roughness: 0.9 }));
    pedestal.position.set(x, PEDESTAL_HEIGHT / 2, z);
    pedestal.receiveShadow = true;

    const type = ITEM_TYPES[i % ITEM_TYPES.length];
    const itemGeometryInstance = itemGeometry(type.id);
    const item = new THREE.Mesh(itemGeometryInstance, new THREE.MeshStandardMaterial({ map: getSwatchTexture(type.color, type.name), roughness: 0.8 }));
    item.position.set(x, PEDESTAL_HEIGHT + 0.22, z);
    item.receiveShadow = true;

    group.add(floor, pedestal, item);
  });
  return group;
}

function disposeWingGroup(group) {
  group.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    // Materials hold a cached, shared texture (see textures.js): disposing
    // the material here is safe and does not touch that shared texture.
    if (object.material) object.material.dispose();
  });
}

// Watches the camera's distance from each wing and builds or disposes that
// wing's group as the camera crosses WING_ACTIVATE_RADIUS or
// WING_DEACTIVATE_RADIUS. Call update() only occasionally (main.js checks it
// a few times a second, not every frame): wing distance changes slowly
// compared to a camera drag.
export function createWingManager(scene) {
  const state = WINGS.map((def) => ({ def, group: null }));

  function update(cameraPosition) {
    let changed = false;
    for (const wing of state) {
      const distance = Math.hypot(cameraPosition.x - wing.def.x, cameraPosition.z - wing.def.z);
      if (!wing.group && distance < WING_ACTIVATE_RADIUS) {
        wing.group = buildWing(wing.def);
        scene.add(wing.group);
        changed = true;
      } else if (wing.group && distance > WING_DEACTIVATE_RADIUS) {
        disposeWingGroup(wing.group);
        scene.remove(wing.group);
        wing.group = null;
        changed = true;
      }
    }
    return changed;
  }

  function activeCount() {
    return state.filter((wing) => wing.group).length;
  }

  function disposeAll() {
    for (const wing of state) {
      if (wing.group) {
        disposeWingGroup(wing.group);
        scene.remove(wing.group);
        wing.group = null;
      }
    }
  }

  return { update, activeCount, disposeAll, defs: WINGS };
}
