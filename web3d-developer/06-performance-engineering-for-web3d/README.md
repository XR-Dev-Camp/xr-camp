# Performance Engineering for Web3D

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web3d-developer` · **Lesson:** `performance-engineering-for-web3d-06` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Optimize a deliberately slow 3D application for mobile use.

---

## Learning objectives

By the end of this project you will be able to:

1. Read `renderer.info` and the Chrome Performance panel to measure a three.js scene instead of guessing at what is slow.
2. Replace many repeated meshes with a single `THREE.InstancedMesh`, and explain when instancing helps and when it does not.
3. Merge many static geometries into one with `BufferGeometryUtils.mergeGeometries`, and explain how that differs from instancing.
4. Set a texture-size budget for generated textures, and share one texture across every object that looks the same.
5. Decide which objects need shadows, and turn shadows off everywhere else.
6. Use `THREE.LOD` to swap a detailed object for a cheap stand-in once it is far from the camera.
7. Build and dispose of part of a scene on demand ("lazy loading"), based on the camera's distance from it.
8. Explain, in plain language, what KTX2/Basis Universal texture compression is for, even without converting a file yourself.
9. Replace an always-on render loop with a render-on-demand loop, and measure the difference.

## Prerequisites

- **Course 3.4: Three.js Foundations** — the renderer, camera, controls, and render-loop pattern this lesson builds on.
- **Course 3.5: Three.js Interaction, Assets, and Animation** — raycasting, loading, and animation; this lesson assumes you are comfortable reading a small multi-file three.js app.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A browser with WebGL 2 (Chrome, Firefox, Edge; Chromium-based browsers such as 360 or QQ Browser work in mainland China) | Run and test the hall | Free |
| Chrome DevTools (or Edge DevTools, which shares the same Performance panel) | Measure frame time and record a performance trace | Free, built in |
| A code editor (e.g. VS Code) | Edit the starter files | Free |
| A local web server | Load the page over `http://`, required for ES modules | Free — already running for this course |
| Optional: [KTX-Software](https://github.com/KhronosGroup/KTX-Software) command-line tools (`basisu`) | Convert an image into a KTX2/Basis Universal texture, if you want to try the optional step for real | Free, runs offline |

## What you will build

The exhibit has grown into a full hall: the same clay pot, woven basket ring, and jade stone from earlier lessons, repeated across eighty pedestals, plus four larger "showcase" pieces at the compass points and three small wings further out. The **starter** builds this hall the way it is easy to build and hard to live with: hundreds of separate meshes, a full-size texture generated for almost every one of them, shadows on everything, every wing loaded whether anyone visits it or not, and a render loop that redraws the whole scene sixty times a second forever. It runs, but it is far heavier than it needs to be — the kind of scene that stutters on a mid-range phone.

The **reference solution** in [`completed/`](completed/) is the same hall, the same eighty pedestals in the same places, rebuilt so it draws in about a dozen calls instead of hundreds: instanced pedestals and items, a merged floor, shared and shrunk textures, shadows only where they earn their cost, level-of-detail showcases, wings that build themselves as you approach and free themselves as you leave, and a render loop that only redraws when something changed. Nine numbered TODOs in the starter's `js/hall.js`, `js/textures.js`, and `js/app.js` mark exactly where each change belongs; the walkthrough below works through them one at a time, always with a number on the Stats panel to watch move.

## Folder guide

```text
06-performance-engineering-for-web3d/
├── README.md
├── starter/          # begin here — nine numbered TODOs
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── app.js        # renderer, camera, controls, render loop (TODO 9)
│       ├── hall.js        # the hall's layout (TODOs 1-4, 6-8)
│       ├── textures.js    # procedural swatch textures (TODO 5)
│       ├── describe.js    # the scene description text
│       └── main.js        # wires the page's buttons to the app
├── completed/        # reference solution — the optimised hall
├── challenges/       # Three challenges: Foundation is required
├── tests/            # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Make sure the course's local server is running, then open `starter/index.html` through it (for example `http://127.0.0.1:8766/web3d-developer/06-performance-engineering-for-web3d/starter/index.html`) — never by double-clicking the file, since ES module imports need `http://`.
2. Open `starter/js/hall.js`, `starter/js/textures.js`, and `starter/js/app.js` in your editor. Find the nine numbered `TODO` comments; skim them once before you start.
3. Open the browser's DevTools console and the Performance panel (F12, then the "Performance" tab) — you will use both throughout.
4. Keep [`completed/`](completed/) open in a second tab to compare against once you are partway through, but try each step yourself first.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Open the starter hall. Walk around it, read the nine TODOs in `hall.js`, `textures.js`, and `app.js`. | A short written list of what feels slow, and where in the code each problem lives. |
| 2 | Open the Performance panel, record a few seconds of dragging the camera, and read the Stats panel's numbers on load. | Your own baseline numbers written down: draw calls, triangles, geometries, textures, frame time. |
| 3 | Step 1: add real disposal (TODO 1). | Clicking "Rebuild hall" no longer raises the Geometries and Textures counts. |
| 4 | Step 2: instance the pedestals (TODO 2). | The pedestal layer draws in one call instead of eighty. |
| 5 | Step 3: instance the items (TODO 3). | The whole main grid draws in four calls total. |
| 6 | Step 4: merge the floor (TODO 4). | The floor is one mesh, one draw call, still one tile pattern. |
| 7 | Step 5: shrink and share textures (TODO 5). | The Textures count drops from dozens to a handful. |
| 8 | Step 6: shadows only where they matter (TODO 6). | The Performance panel's shadow-pass time drops, and the hall looks almost the same. |
| 9 | Step 7: add level of detail to the showcases (TODO 7). | Each showcase visibly simplifies to a plain block from a distance. |
| 10 | Step 8: lazy-load the wings (TODO 8). | A wing appears as you travel toward it and disappears once you leave. |
| 11 | Step 9: render on demand (TODO 9). | "Renders per second" falls to near 0 once you stop moving and pause the animation. |
| 12 | Read the KTX2/Basis Universal section in `textures.js` and "Key code explained" below. No file to convert this session — just understand what problem it solves. | A one-sentence answer, in your own words, to "when would I reach for this?" |
| 13 | Re-measure everything: Stats panel and a fresh Performance panel recording. Fill in your own before/after table (see "Performance considerations"). | A completed measurement table, in your own words, stating your numbers as "on my machine". |
| 14 | Accessibility pass: scene description, keyboard route through every travel button, reduced motion, the 2D list. Work through `tests/checklist.md`. | Most of the checklist ticked off. |
| 15 | The Foundation challenge. | `challenges/challenge-1.md` done. |
| 16 | Polish, screenshots, and **Submitting your work**. | Your finished project, screenshots, and journal entry, ready to share. |

### Step 1: Real disposal (TODO 1)

The starter's "Rebuild hall" button throws the old hall's `Group` away and builds a new one, but a `Mesh`'s geometry and material live in GPU buffers your JavaScript garbage collector cannot see. Removing an object from the scene does not free them — only calling `.dispose()` does.

```js
function disposeHall(group) {
  group.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) object.material.dispose();
  });
}
```

Call this before building the replacement hall. Click "Rebuild hall" a few times: the Geometries and Textures counts in the Stats panel should now return to the same numbers every time, instead of climbing.

### Step 2 and 3: Instance the pedestals and the items (TODOs 2 and 3)

Every pedestal in the starter is its own `Mesh`, with its own geometry and material, even though every pedestal is identical apart from where it stands. `THREE.InstancedMesh` draws many copies of one geometry and one material in a single draw call, using a small transform (position, rotation, scale) per copy instead of a whole separate object:

```js
const pedestals = new THREE.InstancedMesh(pedestalGeometry, pedestalMaterial, count);
const dummy = new THREE.Object3D();
positions.forEach(({ x, z }, i) => {
  dummy.position.set(x, PEDESTAL_HEIGHT / 2, z);
  dummy.updateMatrix();
  pedestals.setMatrixAt(i, dummy.matrix);
});
pedestals.instanceMatrix.needsUpdate = true; // easy to forget, and nothing draws without it
```

Do the same for the items, but you need three separate `InstancedMesh` objects, not one — clay pots, basket rings, and jade stones are three different geometries, and one `InstancedMesh` can only hold copies of a single geometry and material.

### Step 4: Merge the floor (TODO 4)

The floor tiles never move independently once placed, so they do not need instancing's per-copy transforms — a single merged geometry is the simpler, cheaper fit. `BufferGeometryUtils.mergeGeometries` (from `three/addons/utils/BufferGeometryUtils.js`) combines many geometries, each already positioned where it belongs, into one:

```js
const tileGeometries = positions.map(({ x, z }) => {
  const tile = new THREE.PlaneGeometry(SPACING * 0.95, SPACING * 0.95);
  tile.rotateX(-Math.PI / 2);
  tile.translate(x, 0, z); // bake the position in before merging
  return tile;
});
const floorGeometry = mergeGeometries(tileGeometries);
for (const tile of tileGeometries) tile.dispose(); // the originals are no longer needed once merged
```

### Step 5: Shrink and share textures (TODO 5)

Two separate problems hide in `textures.js`: the generated canvas is bigger than a flat colour swatch needs, and every mesh generates its own copy even when the colour is identical to one already made. Fix the sharing first — cache textures by colour and label — then shrink the size:

```js
const cache = new Map();
export function getSwatchTexture(color, label) {
  const key = `${color}:${label}`;
  if (cache.has(key)) return cache.get(key);
  // ...build the canvas as before, at a smaller size...
  cache.set(key, texture);
  return texture;
}
```

Sharing one texture per item type is also what makes instancing possible: every instance in an `InstancedMesh` batch must use the same material, and therefore the same texture.

### Step 6: Shadows only where they matter (TODO 6)

A shadow map is a second render of the scene from the light's point of view, redone every frame. Eighty near-identical pedestals in an even light contribute almost nothing to what a shadow reveals, for real cost every frame. Turn `castShadow` off on the main grid's pedestals and items (`receiveShadow` can stay on, so the floor still shows a shadow falling onto it), and keep `castShadow` only on the floor and the four hero showcases.

### Step 7: Level of detail for the showcases (TODO 7)

`THREE.LOD` holds several versions of one object and shows only the one that fits the camera's current distance — the others are simply not drawn, at no extra draw-call cost:

```js
const lod = new THREE.LOD();
lod.addLevel(detailedMesh, 0);       // used from 0 units away
lod.addLevel(simpleStandIn, 9);      // used from 9 units away and beyond
scene.add(lod);
// once per frame, with the camera:
lod.update(camera);
```

Give each showcase a detailed mesh (its usual geometry) and a cheap stand-in (a low-segment version of the same shape, or a plain box) sharing the same material.

### Step 8: Lazy-load the wings (TODO 8)

The three wings are built once, at start-up, whether or not anyone ever walks out to them. Instead, check the camera's distance from each wing's centre every so often (a few times a second is plenty — a camera cannot cross a wing's whole activation radius in one frame) and build or dispose that wing's group as it crosses two thresholds:

```js
function update(cameraPosition) {
  for (const wing of wings) {
    const distance = Math.hypot(cameraPosition.x - wing.x, cameraPosition.z - wing.z);
    if (!wing.group && distance < ACTIVATE_RADIUS) wing.group = buildWing(wing); // and scene.add it
    else if (wing.group && distance > DEACTIVATE_RADIUS) { disposeWing(wing.group); /* and scene.remove it */ }
  }
}
```

Use two different thresholds (a smaller one to activate, a larger one to deactivate), not one. A single shared threshold means a camera sitting right on the boundary builds and disposes the same wing every check — this gap ("hysteresis") stops that.

### Step 9: Render on demand (TODO 9)

The starter's render loop calls `renderer.render()` on every single frame, forever, even when nothing changed. Keep a flag, set it whenever something actually changes (a camera drag fires OrbitControls' `change` event; a resize; a frame where something animates), and only render when it is set:

```js
let needsRender = true;
controls.addEventListener('change', () => { needsRender = true; });

function tick() {
  controls.update();
  // ...update anything that animates, and set needsRender = true if it moved...
  if (needsRender) {
    renderer.render(scene, camera);
    needsRender = false;
  }
}
renderer.setAnimationLoop(tick); // still runs every frame — required for WebXR — but most frames now skip render()
```

Stop moving the camera and pause the animation: "Renders per second" should fall to near 0, because there is nothing left to redraw.

## Key code explained

- **`THREE.InstancedMesh`** draws many copies of one geometry and one material in a single draw call, using a per-copy transform matrix. It is the right tool once you have dozens of identical objects; below that, the bookkeeping usually costs more than it saves.
- **`BufferGeometryUtils.mergeGeometries`** combines several already-positioned geometries into one, for objects that never need an independent transform once placed — a floor is the classic case. Unlike instancing, a merged mesh cannot move one tile without rebuilding the whole thing.
- **`THREE.LOD`** holds several versions of an object and shows only the one that matches the camera's current distance. `lod.update(camera)` must run every frame; the levels you are not showing cost nothing to draw, but still exist in memory.
- **`renderer.info`** reports what the last `render()` call actually drew: `render.calls` (draw calls), `render.triangles`, and `memory.geometries` / `memory.textures` (resources currently uploaded to the GPU). It is the difference between measuring and guessing.
- **`.dispose()`** frees a geometry's, material's, or texture's GPU-side buffers. JavaScript's garbage collector cannot see GPU memory, so removing an object from the scene graph is never enough on its own — call `.dispose()` on everything you are done with.
- **Render on demand** (an `invalidate()` flag, set on any real change, checked before every `renderer.render()` call) turns "redraw sixty times a second, always" into "redraw only when something changed" — often the single biggest saving in a scene that mostly sits still.

## 3D and XR accessibility

This lesson is 3D throughout, so there is no separate 2D warm-up: every optimisation above must keep the hall exactly as usable as it was before.

- **Scene description.** `#scene-description` is built from the same counts (pedestals, showcases, wings, whether animation is playing) the hall itself is built from, in both the starter and the reference solution, so it can never fall out of sync with what is on screen.
- **Keyboard route.** Every "Go to..." travel button, "Turn left"/"Turn right", "Reset view", "Pause animation", and "Rebuild" are ordinary `<button>` elements, reachable and operable by keyboard alone. Dragging the view is mirrored by the arrow keys once the canvas has focus (via `controls.listenToKeyEvents`).
- **Reduced motion.** `prefers-reduced-motion: reduce` starts the showcases' turning paused, and the "Go to..." buttons jump the camera instantly instead of tweening — a click is a request, but a smooth glide is still motion some learners asked to avoid.
- **2D fallback.** The "Everything in the hall" list is always present, not only shown when WebGL fails: it names the main grid, all four showcases, and all three wings, the same information the 3D view carries.
- **Comfort.** The camera never moves unless you move it or click a travel button; `OrbitControls`' distance and polar-angle limits keep it from climbing over the hall or dropping below the floor.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The hall has a text description that names everything in it | 1.1.1 | A screen-reader user, or anyone who cannot see the canvas, still needs to know what is there. |
| Every 3D interaction (look, travel, pause, rebuild) has a keyboard route | 2.1.1 | Dragging a canvas is a pointer-only gesture unless a keyboard alternative exists. |
| Turning and animation stop under `prefers-reduced-motion` | 2.2.2 | Self-starting motion must be possible to pause; this lesson starts it paused outright for anyone who asked not to see it. |
| Focus is visible on every button and on the focused canvas | 2.4.7 | So keyboard users always know where they are. |
| Lists styled with `list-style: none` keep `role="list"` | Good practice | Safari drops list semantics once the bullet style is removed. |
| The camera never moves without the learner's request | Good practice | Unrequested camera motion is disorienting, and can trigger motion sickness in some viewers. |

## Performance considerations

- **Measure before you optimise.** Nancy Hitschfeld Kahler's own field is computational geometry and GPU computing: her work is a reminder that "this feels slow" is a starting question, not an answer. Use `renderer.info` for draw calls, triangles, and memory, and the Chrome Performance panel (record a few seconds of interaction, then read the "Main" track's frame time) for where the milliseconds actually go.
- **A rule of thumb for instancing.** Below a few dozen identical objects, plain `Mesh` instances are usually simpler and fast enough; once you are in the tens or hundreds, `InstancedMesh` almost always wins. This hall's eighty-pedestal main grid is a clear case; its four hero showcases are not, which is why they stay as ordinary meshes wrapped in `THREE.LOD` instead.
- **A rule of thumb for texture size.** A flat colour swatch, viewed from a few metres, rarely needs more than 256px on a side; reserve more resolution for textures with fine detail a viewer will actually get close to.
- **State your numbers as "on my machine".** Frame time depends on the device running it. Record what you actually measured, with the browser and rough date, rather than a number you expect to be true everywhere.

**Before/after, measured on a MacBook, Chrome, headless (software renderer via SwiftShader), September 2026:**

| Measurement | Starter (on load) | Completed (on load) |
| --- | --- | --- |
| Draw calls (`renderer.info.render.calls`) | 397 | 12 |
| Triangles (`renderer.info.render.triangles`) | 91,964 | 46,308 |
| Geometries in memory (`renderer.info.memory.geometries`) | 269 | 11 |
| Textures in memory (`renderer.info.memory.textures`) | 66 | 7 |
| Renders per second, camera still, animation paused | about 60 | falls to near 0 |

A real GPU will show different absolute numbers than software-rendered Chrome, and your own machine's numbers will differ from these — that is the point of measuring your own, not copying this table.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Setting an instance's matrix but forgetting `instanceMatrix.needsUpdate = true` | Nothing moves to its assigned position; every instance draws at the origin | Set the flag once, after the last `setMatrixAt` call |
| Disposing a shared, cached texture inside one material's cleanup | Every other object still using that texture goes blank | Dispose materials and geometries per object; dispose a shared texture only when nothing references it any more |
| Assuming `InstancedMesh` culls each instance against the camera frustum | The whole batch draws (or is skipped) as one bounding volume, even if only one instance is visible | Keep batches spatially close together, or split a very spread-out batch into a few smaller ones |
| Checking wing distance every single frame | Wastes CPU for no benefit — a camera cannot cross a wing's activation radius in one frame | Check a few times a second instead |
| Rebuilding a scene without disposing the old one first | `renderer.info.memory` climbs a little more on every rebuild | Always dispose before you discard a reference |

## Troubleshooting

**The Stats panel shows the same numbers in the starter and the completed version.** You are probably comparing against a cached copy of one of the two pages — hard-refresh (Shift+Reload) both tabs.

**`mergeGeometries` throws an error about mismatched attributes.** Every geometry you pass in needs the same vertex attributes (position, normal, uv). A `PlaneGeometry` built with different constructor arguments still matches; a geometry missing normals or UVs will not.

**The showcase never switches to its low-detail stand-in.** Check that `lod.update(camera)` actually runs every frame, and that the distances you passed to `addLevel` are in the same units as your scene (this hall's units are metres).

**A wing keeps loading and unloading rapidly as I stand near its edge.** Your activate and deactivate radii are too close together, or equal. Widen the gap between them.

**Firefox or Safari shows a much lower frame rate than Chrome for the same scene.** Open Firefox's `about:support` or Safari's Web Inspector "Timelines" (not "Performance", which is Chrome's name for the same panel) to check whether hardware acceleration is available in that browser on your machine — software rendering is slower everywhere, not just in this lesson.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth wing, lazy-loaded like the other three.
2. **[Creative](challenges/challenge-2.md)**: reskin the hall for your own culture or community.
3. **[Explorer](challenges/challenge-3.md)**: measure a real KTX2 conversion, or push the merge-versus-instance trade-off further.

Two further optional bonuses, beyond the three challenges above and not required for submission: **[WebGPU and TSL](challenges/bonus-webgpu.md)** (see ["Going further: WebGPU"](#going-further-webgpu)) and **[compressing glTF models](challenges/bonus-gltf-compression.md)** (see ["Going further: compressing glTF models"](#going-further-compressing-gltf-models)).

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) and fix anything unchecked.
2. Take two screenshots: the starter hall (showing its Stats panel numbers) and the completed hall (showing its Stats panel numbers) from the same camera angle.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: which single change made the biggest difference on your machine — and did the Chrome Performance panel confirm what you expected, or surprise you?

## Further reading

- [three.js manual: How to update things](https://threejs.org/manual/#en/how-to-update-things) — the canonical explanation of `InstancedMesh`, disposal, and render-on-demand.
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Khronos Group: KTX File Format](https://www.khronos.org/ktx/) — the texture container this lesson's optional step points to.
- [Chrome DevTools: Analyze runtime performance](https://developer.chrome.com/docs/devtools/performance/)
- [three.js documentation: `THREE.LOD`](https://threejs.org/docs/#api/en/objects/LOD)

## Going further: WebGPU

Optional, not required for this lesson. Everything above uses `WebGLRenderer`, the renderer every three.js lesson in this course relies on. three.js also ships `WebGPURenderer`, a newer renderer built around [WebGPU](https://www.w3.org/TR/webgpu/), the W3C's successor to WebGL, plus **TSL** (Three.js Shading Language), a way to write shaders as JavaScript expressions instead of GLSL strings.

The important part for a course that runs on many learners' devices: `WebGPURenderer` falls back to a WebGL 2 backend automatically when a browser does not support WebGPU. You write one scene once; it runs on whichever backend is available, without an `if` statement in your own code.

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js",
      "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.core.js": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.core.min.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/",
      "three/webgpu": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.webgpu.min.js",
      "three/tsl": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.tsl.min.js"
    }
  }
</script>
```

`WebGPURenderer` is imported from `three/webgpu`, not from `three` itself — three.js keeps it as a separate entry point so a lesson that never uses it never has to load its (larger) code:

```js
import { WebGPURenderer } from 'three/webgpu';

const renderer = new WebGPURenderer({ antialias: true });
await renderer.init(); // requests a GPU adapter, or falls back to WebGL 2 if none is available
```

`renderer.init()` is asynchronous and must resolve before the first `render()` call — this is the one structural difference from the `WebGLRenderer` pattern used everywhere else in this course, where the renderer is ready to use the moment its constructor returns.

A tiny TSL example — a material whose colour is built as an expression tree instead of a shader string:

```js
import { color, time, positionLocal, mix, sin, uniform } from 'three/tsl';
import { MeshBasicNodeMaterial } from 'three/webgpu';

const heightFactor = positionLocal.y.add(0.5).clamp(0, 1);
const material = new MeshBasicNodeMaterial();
material.colorNode = mix(color(0x5b2a86), color(0xd62f6b), heightFactor)
  .mul(sin(time.mul(uniform(0.6))).mul(0.15).add(0.85));
```

Nothing here runs once per frame in your own JavaScript: the whole expression compiles into a shader that the GPU evaluates every pixel, every frame, on its own. `WebGPURenderer` compiles the same node graph to WGSL (WebGPU's shading language) or GLSL, whichever backend is active — the node graph does not change.

Feature detection matters here in a way it usually does not elsewhere in this course: `'gpu' in navigator` only tells you the browser exposes the WebGPU JavaScript API, not that a real adapter and device are available — a browser flag, an outdated GPU driver, or a headless test runner (this lesson's own reference solution is tested in headless Chrome, over software rendering) can expose the API and still fail to obtain one. The only reliable check is trying: call `renderer.init()`, and read which backend actually started, exactly as `completed/webgpu.html` does.

A complete, working example is in [`completed/webgpu.html`](completed/webgpu.html): two cubes, one shaded with the TSL material above, one with an ordinary `MeshBasicMaterial` for comparison, both turning slowly. It carries the same accessibility structure as the main hall — a scene description built from what actually rendered (so it says "WebGL 2 fallback" truthfully when that is what ran), an always-present 2D list, `prefers-reduced-motion` starting the turning paused, and a keyboard-reachable **Pause animation** button. Try it yourself, then see the [bonus challenge](challenges/bonus-webgpu.md).

## Going further: compressing glTF models

Optional, not required for this lesson. This course's models stay under the 5&nbsp;MB budget in [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md) by being simple, but a real-world glTF/GLB model — especially one with many vertices or large textures — often needs deliberate compression to stay small and fast to load. Three techniques do most of the work, and they combine:

- **Draco** compresses geometry (positions, normals, UVs) by re-encoding it, often shrinking a mesh to a fraction of its original size at the cost of a short decode step when the model loads.
- **Meshopt** also compresses geometry, with a different trade-off: faster decoding than Draco, usually at a slightly larger file size. Some pipelines use both together — Meshopt for interleaved vertex compression, Draco for the geometry stream — but either alone is a real improvement over neither.
- **KTX2** (with Basis Universal or UASTC encoding) compresses textures into a format the GPU can decode natively, unlike a `.jpg` or `.png`, which the browser must fully decompress into an uncompressed bitmap before upload. This is the same KTX2 format `js/textures.js` already points to as an optional step earlier in this lesson.

Two free command-line tools apply these without touching your modelling software:

```sh
# gltf-transform: a general-purpose glTF toolkit (pinned version, exact — do not use ^ or ~)
npx @gltf-transform/cli@4.5.0 optimize input.glb output.glb --compress draco --texture-compress ktx2

# gltfpack: a smaller, faster, more opinionated alternative, strong at Meshopt compression
npx gltfpack@1.3.0 -i input.glb -o output.glb -cc
```

Measure before you trust either one:

```sh
ls -lh input.glb output.glb   # file size, before and after
```

Then confirm the result still loads and still looks right — a compressed model that fails to decode, or that looks visibly worse, is not actually an improvement.

Loading a Draco- or Meshopt-compressed model in three.js needs one extra loader step each, using the same `three/addons/` import-map entry every other addon in this course uses:

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/libs/draco/gltf/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);       // only needed if the model used Draco
loader.setMeshoptDecoder(MeshoptDecoder); // only needed if the model used Meshopt
loader.load('output.glb', (gltf) => scene.add(gltf.scene));
```

Both loaders are safe to register even on a model that used neither technique — each one only does work if the file actually contains that compression's data. `GLTFLoader.js` is already vendored in this repository (`vendor/three/0.186.1/examples/jsm/loaders/GLTFLoader.js`); `DRACOLoader.js` and `meshopt_decoder.module.js` follow the same `three/addons/` path pattern as every other addon this course uses.

No new binary model is added to this repository for this bonus — if you compress a model of your own to try this, keep it under this course's 5&nbsp;MB model budget and credit its source in your own `ATTRIBUTION.md`, exactly as [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md) requires. See the [bonus challenge](challenges/bonus-gltf-compression.md) to try this yourself.

## Women to Know

Nancy Hitschfeld Kahler is a computer-science professor at the University of Chile, where her research covers polygonal mesh generation, computational geometry, and GPU computing — the exact territory this lesson borrows from every time it counts triangles or decides what belongs on the GPU. She was the first woman hired as an academic in the university's Department of Computer Science (DCC), which she went on to direct.

Beyond her own research, Hitschfeld Kahler co-created the Adelina Gutiérrez Network, a network working for gender equity in her field. A performance lesson is a fitting place to name her: the questions her work asks — how a mesh is built, and how a GPU is asked to do less work for the same result — are the same questions this lesson has been asking about a hall full of pedestals.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The Khronos Group, the industry consortium behind WebGL itself, also standardises the KTX file format and steers the open-source Basis Universal texture compressor this lesson's optional step points to — the same body that defines the API a scene draws with also defines the format its textures can travel in. Separately, the W3C's Media Queries specification defines `prefers-reduced-motion`, the CSS and JavaScript feature this hall (and every 3D lesson in this course) checks before turning anything on its own.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
