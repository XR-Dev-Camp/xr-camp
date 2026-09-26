// exhibit.js: three pedestals, geometry copied down unchanged from
// web3d-developer/07's ITEMS builders (clay pot, basket ring, jade stone).
// No new 3D technique is taught here — the point of this file, in this
// lesson, is that it holds no text at all. Every word a learner reads about
// these objects lives in js/locales/*.js instead, keyed by id.

import * as THREE from 'three';
import { ITEMS } from './config.js';

const PEDESTAL_HEIGHT = 0.8;
const PEDESTAL_TOP_RADIUS = 0.3;

function buildPedestal(x) {
  const geometry = new THREE.CylinderGeometry(PEDESTAL_TOP_RADIUS, PEDESTAL_TOP_RADIUS * 1.15, PEDESTAL_HEIGHT, 24);
  const material = new THREE.MeshStandardMaterial({ color: '#efe9f7', roughness: 0.9, metalness: 0 });
  const pedestal = new THREE.Mesh(geometry, material);
  pedestal.position.set(x, PEDESTAL_HEIGHT / 2, 0);
  return pedestal;
}

function buildClayPot() {
  const geometry = new THREE.CylinderGeometry(0.16, 0.22, 0.36, 24);
  const material = new THREE.MeshStandardMaterial({ color: '#b5562e', roughness: 0.9, metalness: 0 });
  return new THREE.Mesh(geometry, material);
}

function buildBasketRing() {
  const geometry = new THREE.TorusGeometry(0.22, 0.07, 12, 32);
  const material = new THREE.MeshStandardMaterial({ color: '#c9a24b', roughness: 0.85, metalness: 0 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  return mesh;
}

// TODO 6: write buildJadeStone(), the one item this lesson leaves for you.
// Copy the pattern above: an IcosahedronGeometry(0.22, 0), a
// MeshStandardMaterial in a jade green such as '#2f7d5b', low roughness
// (around 0.35, so it takes a polished highlight) and metalness 0 (jade is a
// mineral, not a metal). Return the Mesh.
function buildJadeStone() {
  return new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3));
}

const BUILDERS = {
  'clay-pot': buildClayPot,
  'basket-ring': buildBasketRing,
  'jade-stone': buildJadeStone,
};

// Builds the three pedestals and their objects. Returns the group to add to
// the scene, and an `items` array pairing each config ITEMS entry with its
// mesh and pedestal, for main.js and labels.js to read.
export function buildExhibit() {
  const group = new THREE.Group();
  group.name = 'Exhibit';
  const items = [];
  for (const data of ITEMS) {
    const pedestal = buildPedestal(data.x);
    pedestal.name = `${data.id} pedestal`;
    const mesh = BUILDERS[data.id]();
    mesh.name = data.id;
    mesh.userData.itemId = data.id;
    mesh.position.set(data.x, PEDESTAL_HEIGHT + 0.22, 0);
    group.add(pedestal, mesh);
    items.push({ data, mesh, pedestal });
  }
  return { group, items };
}

export const PEDESTAL_TOP_Y = PEDESTAL_HEIGHT + 0.22;
