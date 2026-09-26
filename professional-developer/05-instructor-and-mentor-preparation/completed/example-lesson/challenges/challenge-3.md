# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Rebuild the same scene in a second engine: three.js.

## Task

1. Create a new page that loads three.js using the pinned import map from `versions.json` (`three@0.186.1`), not A-Frame.
2. Recreate the same three shapes, positions, and colours with `THREE.BoxGeometry`, `THREE.SphereGeometry`, and `THREE.CylinderGeometry`.
3. Keep every accessibility feature: the same `#scene-description` text, the same always-present 2D list, a keyboard-reachable highlight button, and a reduced-motion check with a Pause animation button, driven this time by `renderer.setAnimationLoop` instead of A-Frame's scene.
4. Note, in a short paragraph, one real difference between building this in A-Frame versus three.js for a beginner audience.

## Why this matters

XR Camp teaches both A-Frame and three.js because they solve the same accessibility problems differently: A-Frame's declarative tags versus three.js's explicit scene graph and render loop. Rebuilding the same tiny, fully accessible scene in both is the fastest way to see which parts of the accessibility work are engine-specific, and which are not.

## Done when

- [ ] A working three.js version of the same scene exists, using the exact pinned version.
- [ ] It passes the same accessibility checklist as the A-Frame version.
- [ ] The comparison paragraph names one real, specific difference.
