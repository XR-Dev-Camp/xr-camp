// scene-loader.js: a small wrapper around three.js's own loading tools,
// carried over unchanged from Course 3.5 (web3d-developer/05). It has no
// idea whether the URL it is given points at the network or at a `blob:`
// URL created from an offline-saved file (see scene-main.js) — GLTFLoader
// treats both exactly the same way.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createManager({ onProgress, onError } = {}) {
  const manager = new THREE.LoadingManager();
  manager.onProgress = (url, loaded, total) => onProgress?.({ url, loaded, total });
  manager.onError = (url) => onError?.(url);
  return manager;
}

export function loadGLTF(manager, url) {
  const loader = new GLTFLoader(manager);
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}
