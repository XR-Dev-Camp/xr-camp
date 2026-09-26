// exhibit.js: the exhibit's three cultural objects, built from primitives.
// The same small collection as 3.1's concepts lab and 3.2-3.3's A-Frame
// rooms: a clay pot, a woven basket ring, and a jade stone, each on its own
// pedestal. No model files: glTF models arrive in 3.5. ITEMS is the single
// source of truth, so describe.js can build its sentences from the exact
// facts these meshes are built from, and they can never fall out of sync.

import * as THREE from 'three';

export const ITEMS = [
  {
    id: 'clay-pot',
    name: 'Clay pot',
    made: 'unglazed terracotta clay',
    note: 'Hand-shaped and kiln-fired storage pots like this one carry no glaze on their surface.',
    x: -1.3,
  },
  {
    id: 'basket-ring',
    name: 'Woven basket ring',
    made: 'woven plant fibre',
    note: 'The rim of a coiled basket, woven from dried grass or reed.',
    x: 0,
  },
  {
    id: 'jade-stone',
    name: 'Jade stone',
    made: 'polished jade',
    note: 'Carved and polished smooth, so it catches the light as it turns.',
    x: 1.3,
  },
];

const PEDESTAL_HEIGHT = 0.8;
const PEDESTAL_TOP_RADIUS = 0.3;

function buildPedestal(x) {
  const geometry = new THREE.CylinderGeometry(PEDESTAL_TOP_RADIUS, PEDESTAL_TOP_RADIUS * 1.15, PEDESTAL_HEIGHT, 24);
  const material = new THREE.MeshStandardMaterial({ color: '#efe9f7', roughness: 0.9, metalness: 0 });
  const pedestal = new THREE.Mesh(geometry, material);
  pedestal.position.set(x, PEDESTAL_HEIGHT / 2, 0);
  return pedestal;
}

// A clay pot: one CylinderGeometry with a narrower top than middle, made of
// two different radii. Clay is matte, so roughness is high and metalness 0.
function buildClayPot() {
  const geometry = new THREE.CylinderGeometry(0.16, 0.22, 0.36, 24);
  const material = new THREE.MeshStandardMaterial({ color: '#b5562e', roughness: 0.9, metalness: 0 });
  return new THREE.Mesh(geometry, material);
}

// A woven basket ring: a TorusGeometry laid flat, like a basket's rim seen
// from the side. Woven fibre scatters light unevenly, so roughness is high.
function buildBasketRing() {
  const geometry = new THREE.TorusGeometry(0.22, 0.07, 12, 32);
  const material = new THREE.MeshStandardMaterial({ color: '#c9a24b', roughness: 0.85, metalness: 0 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  return mesh;
}

// A jade stone: an IcosahedronGeometry, carved-looking rather than perfectly
// round. Jade is a mineral, not a metal, so metalness stays 0; its polish is
// low roughness, which lets it pick up a highlight as it turns.
function buildJadeStone() {
  const geometry = new THREE.IcosahedronGeometry(0.22, 0);
  const material = new THREE.MeshStandardMaterial({ color: '#2f7d5b', roughness: 0.35, metalness: 0 });
  return new THREE.Mesh(geometry, material);
}

const BUILDERS = {
  'clay-pot': buildClayPot,
  'basket-ring': buildBasketRing,
  'jade-stone': buildJadeStone,
};

// Builds one fresh copy of the exhibit: a Group holding three pedestals and
// their objects. Returns the group to add to the scene, and an `items` array
// pairing each ITEMS entry with the mesh built for it, so main.js and
// describe.js can find "the jade stone's mesh" without searching the scene
// graph by name.
export function buildExhibit() {
  const group = new THREE.Group();
  group.name = 'Exhibit';
  const items = [];
  for (const data of ITEMS) {
    const pedestal = buildPedestal(data.x);
    pedestal.name = `${data.name} pedestal`;
    const mesh = BUILDERS[data.id]();
    mesh.name = data.name;
    mesh.position.set(data.x, PEDESTAL_HEIGHT + 0.22, 0);
    group.add(pedestal, mesh);
    items.push({ data, mesh, pedestal });
  }
  return { group, items };
}

// Frees GPU memory. A geometry's triangle data and a material's compiled
// program live in GPU buffers that JavaScript's garbage collector cannot
// see, so removing an object from the scene is not enough: without this,
// every "Rebuild scene" click would leak a little more memory forever.
// Textures are included for completeness; this exhibit has none yet, but
// the glTF models arriving in 3.5 will.
export function disposeExhibit(group) {
  group.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        for (const key of Object.keys(material)) {
          if (material[key]?.isTexture) material[key].dispose();
        }
        material.dispose();
      }
    }
  });
}
