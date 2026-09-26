// loader.js: a small wrapper around three.js's own loading tools. The
// exhibit's five items load in two stages: buildExhibit() (in exhibit.js)
// draws pedestals and the three primitive objects instantly, then
// loadModels() calls into this file to fetch the two glTF files over the
// network and swap them in when they arrive. Keeping that network code in
// one small file, separate from exhibit.js's placement logic, means a
// future lesson (3.6) can change how loading works without touching what
// gets built once a model is in memory.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// A LoadingManager tracks every request made through loaders built with it,
// so one onProgress callback reports combined progress across both glTF
// files (and their separate .bin and texture requests) without this file
// having to add the numbers up itself. onError receives the URL that
// failed, so the caller can say which model did not arrive.
export function createManager({ onProgress, onError } = {}) {
  const manager = new THREE.LoadingManager();
  manager.onProgress = (url, loaded, total) => onProgress?.({ url, loaded, total });
  manager.onError = (url) => onError?.(url);
  return manager;
}

// Wraps GLTFLoader's callback-based .load() in a Promise, so callers can
// use async/await and Promise.allSettled. Rejects with the loader's own
// error, which is usually an HTTP status or a parse error.
export function loadGLTF(manager, url) {
  const loader = new GLTFLoader(manager);
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}
