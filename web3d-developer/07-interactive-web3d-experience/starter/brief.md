# Brief: the Phase 3 capstone

You have spent Phase 3 building one virtual cultural exhibit, one lesson at a time: primitives and a fixed camera (3.1-3.2), interaction and animation with A-Frame (3.3), a three.js edition with OrbitControls (3.4), real glTF models with raycasting and their own animation (3.5), and a performance pass (3.6). This capstone asks you to publish it as one polished page.

## What to deliver

A single page, in either A-Frame or three.js (this reference solution uses three.js, continuing from 3.4-3.6; if you built the A-Frame path in 3.2-3.3, integrate from there instead), with:

1. **3 to 5 exhibits**, each on its own pedestal, each with something that makes it worth looking at (a shape, a material, or — for a loaded model — its own animation).
2. **An info panel** that opens for the selected exhibit: what it is, what it is made of, and, for a loaded model, its credit and a link to its licence.
3. **A keyboard route** into every interaction: selecting an exhibit, looking around, pausing animation, and reloading, all without a mouse.
4. **A scene description** (`id="scene-description"`) built from the same data as the scene, so it can never fall out of sync with it.
5. **A 2D twin**: an always-present list with the same names and facts as the 3D view (WCAG 1.3.1), not only a fallback for when WebGL is unavailable.
6. **A performance budget**, stated as numbers (draw calls, triangles) and checked live against what the exhibit actually measures, on your machine.
7. **An attribution page** for every third-party asset, plus `ATTRIBUTION.md`.
8. **Release notes**: a `CHANGELOG.md` with a `1.0.0` entry describing what shipped.

## What is already done for you

The starter's engine (`js/app.js`, `js/exhibit.js`, `js/loader.js`, `js/describe.js`) is 3.5's model explorer, finished and working. Your job in this capstone is integration, not building a 3D scene from nothing: six numbered TODOs across `index.html` and `js/main.js` add the info panel and the performance budget check on top of what already works. See [`../README.md`](../README.md) for the full walkthrough.

## How you will be assessed

See [`rubric.md`](rubric.md).
