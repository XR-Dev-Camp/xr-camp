// exhibit.js: the capstone's five exhibits, carried over unchanged from
// 3.5's model explorer. ITEMS stays the single source of truth: describe.js
// builds the scene description from it, main.js builds the 2D twin list, the
// info panel, and the on-page attribution from it, and this lesson adds
// nothing new here — the capstone's work is in integrating what 3.1-3.6
// already built, not in building new exhibits.

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

// A dimmed, half-size placeholder shown on a model's pedestal while its
// glTF file is still loading (or if it fails). It is pickable like any other
// item, so Tab and the Select buttons already work before the real model
// arrives; describe.js says "still loading" for as long as this mesh is the
// one in place.
function buildPlaceholder() {
  const geometry = new THREE.OctahedronGeometry(0.16, 0);
  const material = new THREE.MeshStandardMaterial({ color: '#c9c4d4', roughness: 1, metalness: 0, transparent: true, opacity: 0.6 });
  return new THREE.Mesh(geometry, material);
}

// Builds the exhibit's five pedestals. The three primitive objects are
// complete immediately; the two model slots start out holding a placeholder
// that loadModels() (below) replaces once each glTF file arrives. Returns
// the group to add to the scene, and an `items` array pairing each ITEMS
// entry with its current mesh, its pedestal, and (for models) a `mixer` and
// `status` that main.js and describe.js can read.
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

function placeOnPedestal(object3D, x, y) {
  object3D.position.set(x, y, 0);
}

// Scales a freshly loaded model to MODEL_TARGET_HEIGHT and sets it down on
// its pedestal. Real-world glTF files arrive in whatever units their
// original artist used (metres, centimetres, arbitrary game units), so
// guessing one fixed scale number for every model would be wrong for some of
// them. Measuring the model's own bounding box and scaling from that works
// for any model, regardless of its authored size.
function fitAndPlaceModel(object3D, x, pedestalTopY) {
  const box = new THREE.Box3().setFromObject(object3D);
  const size = box.getSize(new THREE.Vector3());
  const scale = size.y > 0 ? MODEL_TARGET_HEIGHT / size.y : 1;
  object3D.scale.setScalar(scale);

  // Re-measure after scaling: the box above was in the model's original
  // units, so its min/max must be recomputed before they can be used to sit
  // the model's lowest point exactly on the pedestal.
  const scaledBox = new THREE.Box3().setFromObject(object3D);
  const center = scaledBox.getCenter(new THREE.Vector3());
  object3D.position.x += x - center.x;
  object3D.position.z += 0 - center.z;
  object3D.position.y += pedestalTopY - scaledBox.min.y;
}

// glTF materials carry two kinds of texture: colour textures (the base
// colour map, and any emissive map) store colour the way a photograph does,
// in sRGB; data textures (normal maps, and the combined metalness/roughness
// map) store numbers, not colour, and must stay linear, or their values
// would be wrongly brightened. GLTFLoader already sets this correctly for
// every texture it creates; this function only confirms it, and fixes it on
// any texture where it is somehow missing.
function ensureColorSpaces(object3D) {
  object3D.traverse((node) => {
    const material = node.material;
    if (!material) return;
    if (material.map && material.map.colorSpace !== THREE.SRGBColorSpace) {
      material.map.colorSpace = THREE.SRGBColorSpace;
      material.needsUpdate = true;
    }
    if (material.emissiveMap && material.emissiveMap.colorSpace !== THREE.SRGBColorSpace) {
      material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      material.needsUpdate = true;
    }
  });
}

// Loads both model items' glTF files and swaps each placeholder for the real
// thing as it arrives. Uses Promise.allSettled, not Promise.all, so one
// model failing to load (a bad path, a network error, an offline learner)
// does not stop the other one from appearing.
export async function loadModels(exhibit, { manager, onItemReady, onItemError }) {
  const modelItems = exhibit.items.filter((item) => item.data.kind === 'model');
  await Promise.allSettled(modelItems.map(async (item) => {
    try {
      const gltf = await loadGLTF(manager, item.data.file);
      const model = gltf.scene;
      model.userData.itemId = item.data.id;
      model.traverse((node) => { node.userData.itemId = item.data.id; });
      ensureColorSpaces(model);
      fitAndPlaceModel(model, item.data.x, PEDESTAL_HEIGHT);

      exhibit.group.remove(item.mesh);
      disposeObject(item.mesh);
      exhibit.group.add(model);
      item.mesh = model;
      item.status = 'ready';

      if (gltf.animations.length > 0) {
        item.mixer = new THREE.AnimationMixer(model);
        item.action = item.mixer.clipAction(gltf.animations[0]);
        item.action.play();
      }
      onItemReady?.(item);
    } catch (error) {
      item.status = 'error';
      item.error = error?.message ?? String(error);
      onItemError?.(item, error);
    }
  }));
}

// Frees GPU memory for one object: its geometry's triangle data and its
// material's compiled shader program, plus any texture a material holds. The
// `seen` set makes sure each geometry, material, and texture is disposed
// exactly once, even when traverse() visits it by way of more than one mesh.
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
// stops any running AnimationMixer.
export function disposeExhibit(group, items) {
  for (const item of items) {
    item.mixer?.stopAllAction();
    item.mixer = null;
    item.action = null;
  }
  disposeObject(group);
}
