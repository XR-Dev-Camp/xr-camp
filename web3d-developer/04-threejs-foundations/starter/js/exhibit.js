// exhibit.js: the exhibit's three cultural objects, built from primitives.
// TODOs 12-15 are in this file. The same small collection as 3.1's concepts
// lab and 3.2-3.3's A-Frame rooms: a clay pot, a woven basket ring, and a
// jade stone, each on its own pedestal. No model files: glTF models arrive
// in 3.5. ITEMS is the single source of truth, so describe.js can build its
// sentences from the exact facts these meshes are built from.

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

// TODO 12: THE CLAY POT. Build it from one CylinderGeometry with a narrower
// top radius than bottom radius (try 0.16 and 0.22), height about 0.36, and
// a MeshStandardMaterial: clay is matte, so use a high roughness (0.9) and
// metalness 0. Give it a warm terracotta colour, such as '#b5562e'.
function buildClayPot() {

}

// TODO 13: THE WOVEN BASKET RING. Build it from a TorusGeometry (try radius
// 0.22, tube 0.07). Rotate the mesh so it lies flat, like a basket's rim
// seen from the side: mesh.rotation.x = Math.PI / 2. Woven fibre scatters
// light unevenly, so give its MeshStandardMaterial a high roughness (about
// 0.85) and metalness 0. Try a straw colour, such as '#c9a24b'.
function buildBasketRing() {

}

// TODO 14: THE JADE STONE. Build it from an IcosahedronGeometry (try radius
// 0.22, detail 0) — its flat carved-looking faces suit a cut stone better
// than a perfectly round sphere would. Jade is a mineral, not a metal, so
// keep metalness at 0, but give it a lower roughness (about 0.35) than the
// other two: that lets it pick up a highlight as it turns. Try a green
// colour, such as '#2f7d5b'.
function buildJadeStone() {

}

const BUILDERS = {
  'clay-pot': buildClayPot,
  'basket-ring': buildBasketRing,
  'jade-stone': buildJadeStone,
};

// Builds one fresh copy of the exhibit: a Group holding three pedestals and
// their objects. Returns the group to add to the scene, and an `items`
// array pairing each ITEMS entry with the mesh built for it.
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

// TODO 15: DISPOSAL. A geometry's triangle data and a material's compiled
// program live in GPU buffers that JavaScript's garbage collector cannot
// see, so removing an object from the scene is not enough. Write
// disposeExhibit(group): call group.traverse(...) and, for every object
// that has a .geometry, call its .dispose(); for every object that has a
// .material (it may be one material or an array of them), call .dispose()
// on each one. Loop over each material's own keys too, and dispose any
// property whose value has isTexture === true (this exhibit has no
// textures yet, but the glTF models arriving in 3.5 will).
export function disposeExhibit(group) {

}
