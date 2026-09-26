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
// Nothing here needs to know whether a session is running yet.

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

  // TODO 2: for each of the two possible input sources, build the group that
  // represents its *grip* - the pose to hold a virtual object at, as if it
  // sat in the user's hand - and give it a visible model.
  // `renderer.xr.getControllerGrip(index)` returns a group three.js moves to
  // match the grip pose; a bare group with nothing added to it is invisible,
  // which is why `XRControllerModelFactory.createControllerModel(grip)`
  // matters: it fetches a model matching the *actual connected device* (read
  // from the input source's own `profiles`), not a generic placeholder, and
  // attaches it to the grip group for you.
  function buildControllerGrip(index) {
    const grip = renderer.xr.getControllerGrip(index);
    grip.add(controllerModelFactory.createControllerModel(grip));
    scene.add(grip);
    return grip;
  }

  // TODO 3: the same idea for a tracked hand. `renderer.xr.getHand(index)`
  // returns a group three.js moves to match the hand's overall pose (not any
  // one joint); `XRHandModelFactory.createHandModel(hand, 'mesh')` adds a
  // skinned mesh that follows each of the 25 joints WebXR's Hand Input
  // module reports (wrist, four segments per finger, plus the thumb). Pass
  // 'boxes' or 'spheres' instead of 'mesh' for simple placeholder joints
  // that need no extra model download - useful while testing without a
  // hand-tracking-capable device, and worth trying in the Explorer challenge.
  function buildHandModel(index) {
    const hand = renderer.xr.getHand(index);
    hand.add(handModelFactory.createHandModel(hand, 'mesh'));
    scene.add(hand);
    return hand;
  }

  // TODO 4: the pointing ray. `renderer.xr.getController(index)` returns the
  // group for the input source's *target ray* space - the pose a ray or
  // reticle should be drawn from, which is not the same space as the grip
  // (a controller's target ray tilts slightly from its physical grip; a
  // hand's target ray follows its index finger, not its palm). The ray is
  // scaled to zero until 'connected' confirms an input source is really
  // there, so an empty seat never shows a stray line pointing at nothing.
  function buildController(index) {
    const controller = renderer.xr.getController(index);
    const ray = buildRay();
    controller.add(ray);
    controller.userData.ray = ray;

    controller.addEventListener('connected', (event) => {
      controller.userData.inputSource = event.data;
      ray.scale.z = 1;
      const kind = event.data.hand ? 'hand' : 'controller';
      const label = event.data.targetRayMode === 'gaze' ? 'gaze' : kind;
      announce(`${event.data.handedness === 'none' ? 'An input source' : `Your ${event.data.handedness} ${kind}`} connected, using ${label}.`);
      onInputChange?.(kind);
    });
    controller.addEventListener('disconnected', () => {
      controller.userData.inputSource = null;
      ray.scale.z = 0;
      grabbedBy.delete(controller);
      onInputChange?.(null);
    });

    controller.addEventListener('selectstart', () => onSelectStart(controller));
    controller.addEventListener('selectend', () => onSelectEnd(controller));
    controller.addEventListener('squeezestart', () => onSqueezeStart(controller));
    controller.addEventListener('squeezeend', () => onSqueezeEnd(controller));

    scene.add(controller);
    return controller;
  }

  // A short, gentle buzz, only where the underlying device supports it
  // (most tracked hands, and some controllers, do not: `hapticActuators` is
  // then undefined or empty, so this quietly does nothing rather than
  // throwing). Visual feedback (setButtonHighlight, below) never depends on
  // this, since it cannot be the only feedback a learner gets.
  function pulse(controller, intensity = 0.5, duration = 60) {
    try {
      controller.userData.inputSource?.gamepad?.hapticActuators?.[0]?.pulse(intensity, duration);
    } catch {
      // Some browsers implement hapticActuators but reject pulse() outside
      // certain contexts; a missed buzz is not worth failing the click over.
    }
  }

  // TODO 5: ray-based selection of the in-world menu. Casts from the
  // controller's own target-ray space (its local -Z axis, transformed into
  // world space) against the menu's three buttons, and runs whichever
  // action the hit button carries in `userData.action` (set in menu.js).
  // This is "ray" interaction: the object acted on is far from the hand,
  // reached only through the direction the input source points.
  function onSelectStart(controller) {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix).normalize();

    const hits = raycaster.intersectObjects(menuButtons, false);
    if (hits.length > 0) {
      const button = hits[0].object;
      setButtonHighlight(button, true);
      pulse(controller, 0.7, 40);
      onMenuAction(button.userData.action);
      setTimeout(() => setButtonHighlight(button, false), 150);
      return;
    }

    // A tracked hand has no squeeze gesture (see TODO 6), so its pinch
    // (which WebXR reports as select, the same event a controller's trigger
    // fires) doubles as the grab gesture whenever the hand is close to the
    // jade stone instead of pointing at the menu. This is "direct" grab:
    // the object itself, not a ray, decides what gets picked up.
    if (controller.userData.inputSource?.hand) tryGrab(controller);
  }

  function onSelectEnd(controller) {
    if (controller.userData.inputSource?.hand) release(controller);
  }

  // TODO 6: squeeze-based direct grab, for controllers with a physical grip
  // button. Unlike the ray above, this never raycasts: it only checks real
  // distance between the grip and the object, because grabbing is meant to
  // feel like reaching out and taking hold of something next to you, not
  // aiming at it from across the room.
  function onSqueezeStart(controller) {
    tryGrab(controller);
  }
  function onSqueezeEnd(controller) {
    release(controller);
  }

  function tryGrab(controller) {
    const target = getGrabTarget();
    if (!target || grabbedBy.size > 0) return; // one object, one holder, at a time
    const distance = controller.getWorldPosition(new THREE.Vector3()).distanceTo(target.mesh.getWorldPosition(new THREE.Vector3()));
    if (distance > GRAB_DISTANCE) return;

    target.originalParent = target.mesh.parent;
    target.originalPosition = target.mesh.position.clone();
    target.originalQuaternion = target.mesh.quaternion.clone();
    controller.attach(target.mesh); // keeps its current world position and rotation while reparenting
    grabbedBy.set(controller, target);
    pulse(controller, 1, 70);
    announce('You picked up the jade stone. Move your hand or controller, then release the grip (or pinch) to put it down.');
    onGrabChange?.(true);
  }

  function release(controller) {
    const target = grabbedBy.get(controller);
    if (!target) return;
    grabbedBy.delete(controller);
    // Put it back exactly where it started, on its own pedestal, rather than
    // wherever the release happened to leave it: nothing here animates the
    // return, so there is no motion to reduce for learners sensitive to it.
    target.originalParent.attach(target.mesh);
    target.mesh.position.copy(target.originalPosition);
    target.mesh.quaternion.copy(target.originalQuaternion);
    announce('You put the jade stone back on its pedestal.');
    onGrabChange?.(false);
  }

  // main.js passes `onMenuAction` in as a callback rather than this file
  // importing app.js directly: controllers.js should not need to know the
  // exhibit's own API, only that "this action name was chosen".
  const controllers = [0, 1].map(buildController);
  const grips = [0, 1].map(buildControllerGrip);
  const hands = [0, 1].map(buildHandModel);

  return { controllers, grips, hands };
}
