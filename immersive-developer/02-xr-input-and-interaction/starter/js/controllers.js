// controllers.js: everything about a WebXR input source once a session (VR
// or AR) is active - controllers, tracked hands, the ray you point with, the
// menu you point at, and grabbing an object directly instead of pointing at
// it. Kept apart from xr.js (which only starts and ends sessions) and app.js
// (the engine), the same separation of concerns 4.1 used for entering VR.
//
// This file is set up once, when the page loads, not each time a session
// starts: `renderer.xr.getController(n)` returns a THREE.Group that three.js
// keeps empty and inert until a session actually supplies a matching input
// source, then updates every frame for as long as that source is tracked.

import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { setButtonHighlight } from './menu.js';

const RAY_LENGTH = 6;
const GRAB_DISTANCE = 0.25; // metres: how close a hand or grip must be to the jade stone to grab it

// A thin, undecorated line along an input source's own -Z axis: WebXR's
// target ray space always points this way, by definition, whatever the
// input source is (a controller, a tracked hand's index finger, or gaze).
function buildRay() {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -RAY_LENGTH),
  ]);
  const material = new THREE.LineBasicMaterial({ color: '#d62f6b', transparent: true, opacity: 0.7 });
  const line = new THREE.Line(geometry, material);
  line.name = 'Pointing ray';
  line.scale.z = 0; // grown to full length only once an input source is confirmed present (see 'connected')
  return line;
}

export function initInteraction({ renderer, scene, menuButtons, getGrabTarget, onMenuAction, onInputChange, onGrabChange, status }) {
  const controllerModelFactory = new XRControllerModelFactory();
  const handModelFactory = new XRHandModelFactory();
  const raycaster = new THREE.Raycaster();
  const tempMatrix = new THREE.Matrix4();

  // grabbedBy maps a controller/hand group to the mesh it is currently
  // carrying, so squeezeend (or, for a tracked hand, selectend) knows what
  // to put down, and so two input sources can never fight over one object.
  const grabbedBy = new Map();

  function announce(text) {
    if (status) status.textContent = text;
  }

  // TODO 2: build the *grip* group for one controller, and give it a visible
  // model.
  // `renderer.xr.getControllerGrip(index)` returns a group three.js moves to
  // match the grip pose - the pose to hold a virtual object at, as if it sat
  // in the user's hand. A bare group with nothing added to it is invisible,
  // which is why `controllerModelFactory.createControllerModel(grip)`
  // matters: it fetches a model matching the *actual connected device* (read
  // from the input source's own `profiles`) and attaches it to the grip for
  // you. `.add()` it onto the grip, `scene.add(grip)`, and return the grip.
  function buildControllerGrip(index) {

  }

  // TODO 3: the same idea for a tracked hand. `renderer.xr.getHand(index)`
  // returns a group three.js moves to match the hand's overall pose;
  // `handModelFactory.createHandModel(hand, 'mesh')` adds a skinned mesh
  // that follows each of the 25 joints WebXR's Hand Input module reports.
  // Try 'boxes' or 'spheres' instead of 'mesh' in the Explorer challenge:
  // they need no extra model download, useful for testing without a
  // hand-tracking-capable device. Build the model, `.add()` it onto the
  // hand, `scene.add(hand)`, and return the hand.
  function buildHandModel(index) {

  }

  // TODO 4: the pointing ray. `renderer.xr.getController(index)` returns the
  // group for the input source's *target ray* space - not the same space as
  // the grip (a controller's target ray tilts slightly from its physical
  // grip; a hand's target ray follows its index finger, not its palm).
  //
  // Build the ray with `buildRay()` above, `.add()` it to the controller
  // group, and store it at `controller.userData.ray` (kept for reference;
  // not required by later TODOs). Then, inside the 'connected' listener
  // already started for you below, store the input source at
  // `controller.userData.inputSource` and set `ray.scale.z = 1` so it
  // becomes visible only once a real input source is confirmed present.
  // Inside 'disconnected', clear `controller.userData.inputSource`, set
  // `ray.scale.z = 0`, and remove this controller from `grabbedBy` (in case
  // it was mid-grab when the source disconnected). Finish by wiring
  // 'selectstart', 'selectend', 'squeezestart', and 'squeezeend' to the four
  // handler functions already written below (`onSelectStart(controller)`,
  // etc.), then `scene.add(controller)` and return it.
  function buildController(index) {
    const controller = renderer.xr.getController(index);

    controller.addEventListener('connected', (event) => {
      const kind = event.data.hand ? 'hand' : 'controller';
      const label = event.data.targetRayMode === 'gaze' ? 'gaze' : kind;
      announce(`${event.data.handedness === 'none' ? 'An input source' : `Your ${event.data.handedness} ${kind}`} connected, using ${label}.`);
      onInputChange?.(kind);
    });
    controller.addEventListener('disconnected', () => {
      onInputChange?.(null);
    });

    return controller;
  }

  // A short, gentle buzz, only where the underlying device supports it
  // (most tracked hands, and some controllers, do not: `hapticActuators` is
  // then undefined or empty, so this quietly does nothing rather than
  // throwing). Visual feedback (setButtonHighlight, below) never depends on
  // this, since it cannot be the only feedback a learner gets. Finished code
  // - nothing to do here.
  function pulse(controller, intensity = 0.5, duration = 60) {
    try {
      controller.userData.inputSource?.gamepad?.hapticActuators?.[0]?.pulse(intensity, duration);
    } catch {
      // Some browsers implement hapticActuators but reject pulse() outside
      // certain contexts; a missed buzz is not worth failing the click over.
    }
  }

  // TODO 5: ray-based selection of the in-world menu. This is "ray"
  // interaction: the object acted on is far from the hand, reached only
  // through the direction the input source points.
  //
  // Build a Raycaster from `controller`'s own target-ray space: set
  // `raycaster.ray.origin` from `controller.matrixWorld` (there is a
  // three.js Vector3 method for reading a world position straight out of a
  // matrix), and `raycaster.ray.direction` to the local -Z axis rotated into
  // world space (`tempMatrix.identity().extractRotation(controller.matrixWorld)`,
  // then apply it to a `(0, 0, -1)` vector and normalize it). Then call
  // `raycaster.intersectObjects(menuButtons, false)`. If it returns a hit:
  // highlight the hit button with `setButtonHighlight(button, true)`
  // (removing the highlight again after ~150ms with `setTimeout`), pulse
  // the controller, and call `onMenuAction(button.userData.action)`.
  //
  // If there is no hit, and `controller.userData.inputSource?.hand` is
  // truthy: call `tryGrab(controller)` instead (see TODO 6). A tracked hand
  // has no squeeze gesture, so its pinch - which WebXR reports as `select`,
  // the same event a controller's trigger fires - doubles as the grab
  // gesture whenever the hand is close to the jade stone instead of
  // pointing at the menu.
  function onSelectStart(controller) {

  }

  function onSelectEnd(controller) {
    if (controller.userData.inputSource?.hand) release(controller);
  }

  // TODO 6: squeeze-based direct grab, for controllers with a physical grip
  // button, and the shared grab/release logic both this and TODO 5 use.
  // Unlike the ray above, grabbing never raycasts: it only checks real
  // distance between the input source and the object, because grabbing is
  // meant to feel like reaching out and taking hold of something next to
  // you, not aiming at it from across the room.
  //
  // `onSqueezeStart(controller)` and `onSqueezeEnd(controller)` should just
  // call `tryGrab(controller)` and `release(controller)`.
  //
  // `tryGrab(controller)`: get the grab target with `getGrabTarget()`; if
  // there is none, or `grabbedBy.size > 0` (something is already held),
  // return. Otherwise measure the distance between the controller's world
  // position and the target mesh's world position (`Object3D.getWorldPosition`
  // takes a Vector3 to write into); if it is more than `GRAB_DISTANCE`,
  // return. Otherwise: remember `target.mesh.parent`, its `.position`, and
  // its `.quaternion` (clone them - you will need the originals back), then
  // `controller.attach(target.mesh)` (this reparents it while keeping its
  // current world position and rotation), record `grabbedBy.set(controller, target)`,
  // pulse the controller, call `onGrabChange?.(true)`, and announce what
  // happened.
  //
  // `release(controller)`: look the target up in `grabbedBy`; if there is
  // none, return. Otherwise remove it from `grabbedBy`, reattach the mesh to
  // its original parent (`originalParent.attach(target.mesh)`), copy its
  // original position and quaternion back onto it (nothing here is
  // animated: it returns instantly, so there is no motion to reduce for a
  // learner sensitive to it), call `onGrabChange?.(false)`, and announce
  // that it is back on its pedestal.
  function onSqueezeStart(controller) {

  }
  function onSqueezeEnd(controller) {

  }

  function tryGrab(controller) {

  }

  function release(controller) {

  }

  const controllers = [0, 1].map(buildController);
  const grips = [0, 1].map(buildControllerGrip);
  const hands = [0, 1].map(buildHandModel);

  return { controllers, grips, hands };
}
