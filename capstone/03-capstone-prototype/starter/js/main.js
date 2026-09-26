// Capstone Prototype starter.
// Complete the four TODOs below, in order. Each one builds on the last.
import * as THREE from 'three';

const canvasBox = document.getElementById('canvas-box');
const sceneDescription = document.getElementById('scene-description');
const exhibitList = document.getElementById('exhibit-list');
const pauseToggle = document.getElementById('pause-toggle');

// TODO 1: Create a THREE.Scene, a THREE.PerspectiveCamera sized to
// canvasBox's width and height, and a THREE.WebGLRenderer. Append the
// renderer's DOM element to canvasBox, and render one frame so you see a
// blank (but not broken) view. See web3d-developer/04-threejs-foundations
// for the exact pattern.

// TODO 2: Build the object your prototype-plan.md named, using a three.js
// primitive geometry (for example BoxGeometry or SphereGeometry) and a
// MeshStandardMaterial, plus at least one light (a light is required for
// MeshStandardMaterial to be visible). Add it to the scene.

// TODO 3: Update sceneDescription.textContent to describe what is now in
// the scene, and add one <li> to exhibitList for the same object. Both
// must always match what the 3D view shows — build them from one shared
// piece of data, not two separate strings.

// TODO 4: Wire up #turn-left and #turn-right to rotate the camera (or an
// orbiting group) by a fixed step each click, and #pause-toggle to stop and
// start any animation you add, respecting window.__reducedMotion so motion
// never starts on its own when the visitor has asked to reduce it.

console.log('Capstone Prototype starter loaded. Complete TODOs 1-4 in js/main.js.');
