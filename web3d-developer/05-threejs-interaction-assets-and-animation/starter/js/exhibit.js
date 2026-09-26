// exhibit.js: the exhibit's five items. TODOs 2-4 are in this file. The
// same clay pot, woven basket ring, and jade stone from 3.1 through 3.4,
// built from primitives exactly as before (given below, unchanged), plus
// two real glTF models on two new pedestals: a fox figure and a milk
// truck, both official Khronos Group sample assets. ITEMS stays the single
// source of truth, so describe.js can build its sentences from the same
// facts the scene is built from, for every item, old or new.

import * as THREE from 'three';
import { loadGLTF } from './loader.js';

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
  {
    id: 'fox',
    name: 'Fox figure',
    kind: 'model',
    file: '../assets/Fox.glb',
    x: 2.6,
    note: 'A low-poly fox. Its own built-in animation plays automatically once it loads.',
    credit: 'Model by PixelMannen (CC0, 2014). Rigging and animation by @tomkranis for Cesium (CC BY 4.0, 2014). glTF conversion by @AsoboStudio and @scurest (CC BY 4.0, 2017).',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/legalcode',
    licenseLabel: 'CC0-1.0 (model) and CC BY 4.0 (animation and conversion)',
    sourceUrl: 'https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Fox',
  },
  {
    id: 'milk-truck',
    name: 'Cesium milk truck',
    kind: 'model',
    file: '../assets/CesiumMilkTruck.glb',
    x: 3.9,
    note: 'A textured, multi-part model with its own short built-in animation, which also plays automatically once it loads.',
    credit: 'Model by Cesium / Analytical Graphics, Inc. (CC BY 4.0, 2017). Includes the Cesium logo, which is a trademark and is not covered by that licence.',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/legalcode',
    licenseLabel: 'CC BY 4.0 (model); Cesium logo is a separately licensed trademark',
    sourceUrl: 'https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CesiumMilkTruck',
  },
];

const PEDESTAL_HEIGHT = 0.8;
const PEDESTAL_TOP_RADIUS = 0.3;
const MODEL_TARGET_HEIGHT = 0.9; // world units every loaded model is scaled to fit

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

// A dimmed, half-size placeholder shown on a model's pedestal while its
// glTF file is still loading (or if it fails). It is pickable like any
// other item, so Tab and the Select buttons already work before the real
// model arrives; describe.js says "still loading" for as long as this mesh
// is the one in place. Given, unchanged.
function buildPlaceholder() {
  const geometry = new THREE.OctahedronGeometry(0.16, 0);
  const material = new THREE.MeshStandardMaterial({ color: '#c9c4d4', roughness: 1, metalness: 0, transparent: true, opacity: 0.6 });
  return new THREE.Mesh(geometry, material);
}

function placeOnPedestal(object3D, x, y) {
  object3D.position.set(x, y, 0);
}

// Builds the exhibit's five pedestals. The three primitive objects are
// complete immediately; the two model slots start out holding a placeholder
// that loadModels() (below) replaces once each glTF file arrives. Given,
// unchanged: everything here already works the way 3.4's buildExhibit()
// did, just with two more entries.
export function buildExhibit() {
  const group = new THREE.Group();
  group.name = 'Exhibit';
  const items = [];
  for (const data of ITEMS) {
    const pedestal = buildPedestal(data.x);
    pedestal.name = `${data.name} pedestal`;
    const mesh = data.kind === 'model' ? buildPlaceholder() : BUILDERS[data.id]();
    mesh.name = data.name;
    mesh.userData.itemId = data.id;
    placeOnPedestal(mesh, data.x, data.kind === 'model' ? PEDESTAL_HEIGHT + 0.16 : PEDESTAL_HEIGHT + 0.22);
    group.add(pedestal, mesh);
    items.push({ data, mesh, pedestal, mixer: null, action: null, status: data.kind === 'model' ? 'loading' : 'ready' });
  }
  return { group, items };
}

// TODO 2: FIT AND PLACE A LOADED MODEL. Real-world glTF files arrive in
// whatever units their original artist used (metres, centimetres, arbitrary
// game units), so guessing one fixed scale number for every model would be
// wrong for some of them. Write fitAndPlaceModel(object3D, x, pedestalTopY):
//  - Measure it: `const box = new THREE.Box3().setFromObject(object3D)`,
//    then `const size = box.getSize(new THREE.Vector3())`.
//  - Scale it so its height matches MODEL_TARGET_HEIGHT:
//    `object3D.scale.setScalar(MODEL_TARGET_HEIGHT / size.y)` (guard
//    against size.y being 0).
//  - Measure it again, now that it is scaled — the first box was in the
//    model's original units, so its numbers cannot be used to position the
//    now-scaled model: `const scaledBox = new THREE.Box3().setFromObject(object3D)`.
//  - Centre it over its pedestal in x and z, using `scaledBox.getCenter(...)`
//    and adjusting `object3D.position` by the difference between the
//    pedestal's (x, 0) and that centre.
//  - Sit its lowest point exactly on the pedestal: add
//    `pedestalTopY - scaledBox.min.y` to `object3D.position.y`.
function fitAndPlaceModel(object3D, x, pedestalTopY) {

}

// TODO 3: COLOUR SPACES. A colour texture (the base colour map, and any
// emissive map) stores colour the way a photograph does, in sRGB; a data
// texture (a normal map, or the combined metalness/roughness map) stores
// numbers, not colour, and must stay linear, or its values would be wrongly
// brightened. GLTFLoader already sets this correctly for every texture it
// creates, so this function is a safety net, not a fix for something
// broken: write ensureColorSpaces(object3D), traverse it, and for each
// mesh's material, if it has a `.map` or `.emissiveMap` whose `.colorSpace`
// is not already `THREE.SRGBColorSpace`, set it to `THREE.SRGBColorSpace`
// and set `material.needsUpdate = true`. Leave `.normalMap` and any
// roughness/metalness map alone: their correct colour space is
// `THREE.NoColorSpace`, which GLTFLoader already gives them.
function ensureColorSpaces(object3D) {

}

// TODO 4: LOAD BOTH MODELS. Write loadModels(exhibit, { manager, onItemReady, onItemError }):
//  - Filter exhibit.items for `item.data.kind === 'model'`.
//  - Use `Promise.allSettled` (not `Promise.all`) across an async function
//    per item, so one model failing to load (a bad path, a network error,
//    an offline learner) does not stop the other one from appearing.
//  - Inside, in a try/catch: `const gltf = await loadGLTF(manager, item.data.file)`.
//    On success: take `gltf.scene`, tag it and every descendant's
//    `userData.itemId = item.data.id` (traverse it), call
//    `ensureColorSpaces(model)` and `fitAndPlaceModel(model, item.data.x, PEDESTAL_HEIGHT)`,
//    then remove `item.mesh` from `exhibit.group` and dispose it (see
//    `disposeObject`, below), add the new `model` to `exhibit.group`, set
//    `item.mesh = model` and `item.status = 'ready'`. If
//    `gltf.animations.length > 0`, create `item.mixer = new THREE.AnimationMixer(model)`,
//    `item.action = item.mixer.clipAction(gltf.animations[0])`, and call
//    `item.action.play()`. Finish by calling `onItemReady?.(item)`.
//  - On failure (the catch block): set `item.status = 'error'`, set
//    `item.error` to a short message from the caught error, and call
//    `onItemError?.(item, error)`.
export async function loadModels(exhibit, { manager, onItemReady, onItemError }) {

}

// Frees GPU memory for one object: its geometry's triangle data and its
// material's compiled shader program, plus any texture a material holds.
// Used both when a placeholder is replaced by its real model, and inside
// disposeExhibit() below. A glTF model can have several meshes sharing one
// material, or several materials sharing one texture (this project's milk
// truck does both, for its wheels): the `seen` set makes sure each
// geometry, material, and texture is disposed exactly once, even when
// traverse() visits it by way of more than one mesh. Given, unchanged.
function disposeObject(object3D) {
  const seen = new Set();
  const disposeOnce = (resource) => {
    if (!resource || seen.has(resource.uuid)) return;
    seen.add(resource.uuid);
    resource.dispose();
  };
  object3D.traverse((object) => {
    if (object.geometry) disposeOnce(object.geometry);
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        for (const key of Object.keys(material)) {
          if (material[key]?.isTexture) disposeOnce(material[key]);
        }
        disposeOnce(material);
      }
    }
  });
}

// Disposes every mesh, material, and texture currently in the exhibit, and
// stops any running AnimationMixer. Given, unchanged.
export function disposeExhibit(group, items) {
  for (const item of items) {
    item.mixer?.stopAllAction();
    item.mixer = null;
    item.action = null;
  }
  disposeObject(group);
}
