// loader.js: a small wrapper around three.js's own loading tools. TODO 1 is
// in this file. The exhibit's five items load in two stages: buildExhibit()
// (in exhibit.js) draws pedestals and the three primitive objects
// instantly, then loadModels() calls into this file to fetch the two glTF
// files over the network and swap them in when they arrive. Keeping that
// network code in one small file, separate from exhibit.js's placement
// logic, means a future lesson (3.6) can change how loading works without
// touching what gets built once a model is in memory.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// TODO 1: LOADING MANAGER AND LOADER. Write createManager({ onProgress, onError }):
// create `const manager = new THREE.LoadingManager()`. A LoadingManager
// tracks every request made through loaders built with it, so one
// onProgress callback can report combined progress across both glTF files
// (and their separate .bin and texture requests) without this file having
// to add the numbers up itself.
//  - Set manager.onProgress to a function that calls onProgress?.({ url, loaded, total })
//    with the three arguments LoadingManager passes it.
//  - Set manager.onError to a function that calls onError?.(url) with the
//    one argument LoadingManager passes it: the URL that failed.
//  - Return the manager.
export function createManager({ onProgress, onError } = {}) {
  return new THREE.LoadingManager();
}

// Wraps GLTFLoader's callback-based .load() in a Promise, so callers can use
// async/await and Promise.allSettled. Rejects with the loader's own error,
// which is usually an HTTP status or a parse error. This part is given.
export function loadGLTF(manager, url) {
  const loader = new GLTFLoader(manager);
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}
