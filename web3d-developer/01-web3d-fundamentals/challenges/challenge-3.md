# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a fifth column to your comparison.

## Task

Choose one:

- **Babylon.js**: build the exhibit with Babylon.js, loaded from a pinned version on a CDN (write the exact version in the page).
- **PlayCanvas**: build the exhibit with the open-source PlayCanvas engine (not the editor), from a pinned version.
- **WebGPU**: render your three.js exhibit with three.js's `WebGPURenderer` (import it from `three/webgpu` in the same 0.186.1 version). Check first whether your browser supports WebGPU: `'gpu' in navigator`. It falls back to WebGL where WebGPU is not available.

Then, for your choice:

1. Give the page a scene description and a fixed camera, like the others.
2. Measure its download in the Network panel, and count its lines of scene code.
3. Add it as a fifth column in your `analysis.md`, and say whether it changes your choice for the virtual exhibit.

## Why this matters

Reading the documentation of an unfamiliar engine, and getting the same scene working, is exactly what developers do when a project needs a new tool. The skill transfers to every engine you will ever meet.

## Done when

- [ ] The exhibit works in a fifth technology, with a pinned version.
- [ ] It has a scene description and a fixed camera.
- [ ] Your analysis has a fifth column, measured.
