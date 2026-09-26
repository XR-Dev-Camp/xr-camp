// Input, reused and combined from 4.2's interaction laboratory: a
// controller ray for selecting an exhibit, a squeeze for grabbing one
// directly, and a placed marker standing in for AR hit-test placement.
// Every one of the three has a 2D, keyboard-reachable button as its equal,
// not a fallback — Tab and Enter reach every button here exactly as a
// mouse click does, so nothing in this file requires a headset to use.
import * as THREE from 'three';
import { selectExhibit, setGrabbed } from './app.js';

const raycaster = new THREE.Raycaster();
const tmpMatrix = new THREE.Matrix4();

function meshesOf(app) {
  return [...app.pedestals.values()].map((p) => p.item);
}

function rayIntersect(app, controller) {
  tmpMatrix.identity().extractRotation(controller.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tmpMatrix);
  const hit = raycaster.intersectObjects(meshesOf(app))[0];
  return hit?.object.userData.id ?? null;
}

// Wires the two XR controllers' native events. A missed ray, or a session
// with no controllers connected (hand-tracking only), simply does nothing
// here — the on-screen Select and Grab buttons still work either way.
export function setupControllers(app) {
  for (const index of [0, 1]) {
    const controller = app.renderer.xr.getController(index);
    controller.addEventListener('selectstart', () => {
      const id = rayIntersect(app, controller);
      if (id) selectExhibit(app, id);
    });
    controller.addEventListener('squeezestart', () => {
      if (app.selectedId) setGrabbed(app, app.selectedId, true);
    });
    controller.addEventListener('squeezeend', () => {
      if (app.selectedId) setGrabbed(app, app.selectedId, false);
    });
    app.scene.add(controller);
  }
}

// The 2D/keyboard equivalent of AR hit-test placement (4.2's "place a
// virtual jade stone on a real surface"): without a phone or a headset that
// supports hit-test, this places the same marker at a fixed spot in front
// of the viewer, so the idea — "put an object where you are looking" — is
// still reachable from a Tab-and-Enter keyboard pass alone.
export function placeMarker(app) {
  const existing = app.scene.getObjectByName('placed-marker');
  if (existing) app.scene.remove(existing);

  const marker = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.24, 16),
    new THREE.MeshStandardMaterial({ color: 0xd62f6b }),
  );
  marker.name = 'placed-marker';
  marker.position.set(0, 0.12, 1.1);
  app.scene.add(marker);
  app.markerPlaced = true;
  app.onChange();
}
