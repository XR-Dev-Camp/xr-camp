# Three.js Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web3d-developer` · **Lesson:** `threejs-foundations-04` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Build the exhibit's three.js edition: a renderer, a camera you can orbit, and a render loop, built around the same clay pot, woven basket ring, and jade stone from the concepts lab, with nothing left running when nobody is looking at it.

---

## Learning objectives

By the end of this project you will be able to:

1. Set up a **WebGLRenderer**: antialiasing, colour space, tone mapping, and a pixel ratio capped for phones.
2. Build a **scene**, a **PerspectiveCamera**, and resize both correctly with a **ResizeObserver**.
3. Choose between a continuous **render loop** (`renderer.setAnimationLoop`) and **rendering on demand**, and explain when each is the right choice.
4. Animate at the same visible speed on any screen, using **`THREE.Timer`**, and explain why `THREE.Clock` is deprecated.
5. Add **OrbitControls**: damping, keyboard support, and comfort limits on distance and viewing angle.
6. **Pause** an animation, respect **reduced motion**, and stop the render loop when the tab is hidden.
7. **Dispose** of geometries, materials, and textures, and prove with `renderer.info` that a "Rebuild scene" button does not leak memory.
8. Split a three.js application into **modules** with one job each: the engine, the objects, the description, and the page.
9. Detect **WebGL 2** support, and provide a 2D fallback that carries the same information.
10. Read `renderer.info.render.calls` and explain, in plain language, what a **draw call** is.

## Prerequisites

- **Web3D Fundamentals (3.1)**, especially the scene graph, cameras, lights, and materials, and rendering on demand.
- **A-Frame Foundations and Advanced A-Frame (3.2-3.3)**: the same virtual exhibit, in HTML. This lesson builds the same idea in three.js's own API instead.
- **My XR Camp**, Phase 2's own small app (course map, dashboard, session planner): the same pattern of building one thing across several lessons continues here, with the virtual exhibit instead.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser with WebGL 2 | Every page in this lesson | Free |
| VS Code and a local server | Modules and import maps need `http://` | Free |
| The browser's **Performance** or **Rendering** panel | Watching frames while the tab is hidden or the animation is paused | Free |

The library loads from `cdn.jsdelivr.net`. If it is slow or blocked where you are, download the pinned files once where they work, save them next to the page, and change the import map's addresses to the local files.

## What you will build

The **three.js edition** of the virtual exhibit you started in 3.1 and built again in A-Frame in 3.2-3.3: the same clay pot, woven basket ring, and jade stone, each on its own pedestal, built from primitives (no model files: glTF arrives in 3.5). This time you write the engine yourself, in four small modules, and you will reuse this starter app unchanged for lessons 3.5 through 3.7.

The reference solution is in [`completed/`](completed/). The starter has the page and its controls; you write the four JavaScript modules behind them: nineteen TODOs.

## Folder guide

```text
04-threejs-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page and its controls (finished)
│   └── js/
│       ├── app.js                # The engine: TODOs 1-11
│       ├── exhibit.js            # The objects: TODOs 12-15
│       ├── describe.js           # The description: TODO 16
│       └── main.js               # Wiring the page: TODOs 17-19
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the starter into your `virtual-exhibit` folder, alongside your 3.1-3.3 work, and commit it with Git.
2. Start your local server, and open `index.html`. The controls are there, but the canvas box stays empty until TODO 1: that is expected.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: the renderer (TODO 1) | A grey canvas fills its box |
| 2 | Step 1, continued: keyboard and screen-reader access (TODO 2) | The canvas can take keyboard focus |
| 3 | Step 2: the scene, camera, and lights (TODO 3) | A lit, empty room appears |
| 4 | Step 3: resizing (TODO 4) | The canvas resizes without stretching |
| 5 | Step 4: the clay pot (TODO 12) | The pot stands on its pedestal |
| 6 | Step 4, continued: the basket ring and jade stone (TODOs 13-14) | All three objects stand on their pedestals |
| 7 | Step 5: OrbitControls (TODO 5) | You can drag to orbit the camera |
| 8 | Step 6: comfort limits and keyboard support (TODO 6) | Arrow keys orbit too, within limits |
| 9 | Step 7: the render loop, and `THREE.Timer` (TODOs 7-8) | The jade stone turns smoothly |
| 10 | Step 8: starting and stopping the loop (TODO 9) | You can explain `setAnimationLoop` versus rendering on demand |
| 11 | Step 9: reset view (TODO 10) | Reset view puts the camera back |
| 12 | Step 10: the scene description (TODO 16) | `#scene-description` matches the exhibit |
| 13 | Step 11: pausing, and reduced motion (TODO 18) | Pause works, and reduced motion starts paused |
| 14 | Step 12: turn left/right, and the hidden-tab check (TODO 19) | Every interaction has a keyboard route |
| 15 | Step 13: WebGL 2 detection and the 2D fallback (TODO 17) | The always-present item list, and the no-WebGL message |
| 16 | Step 14: disposal (TODO 15) | `disposeExhibit` frees geometries and materials |
| 17 | Step 15: rebuild, and the Stats panel (TODO 11) | Rebuild scene proves nothing leaks |
| 18 | [`tests/checklist.md`](tests/checklist.md) | A finished starter app |
| 19 | One challenge extension, then **Submitting your work** | The exhibit's three.js edition, ready for 3.5 |

### Step 1: the renderer (TODO 1)

A `WebGLRenderer` turns a scene into pixels on a `<canvas>`. Three settings matter beyond the basics:

- **`antialias: true`** smooths jagged edges, at a small performance cost worth paying on this small a scene.
- **`outputColorSpace`** defaults to `THREE.SRGBColorSpace` in this version of three.js: monitors expect colour encoded in sRGB, but three.js's own lighting maths runs in **linear** space (light physically adds and blends in a straight line; sRGB is a compressed encoding that saves bits where human eyes are less sensitive). The renderer converts back to sRGB on the way out. Setting it explicitly, even though it is already the default, makes the conversion visible in your own code instead of hiding inside a default nobody reads.
- **`toneMapping`** compresses a scene's brightest values into the range a screen can show, the way a camera's exposure does. The default, `NoToneMapping`, simply clips anything too bright to flat white. `ACESFilmicToneMapping` rolls bright highlights off gently instead, which suits a lit, physically based material like the jade stone's.

### Step 1, continued: keyboard and screen-reader access to the canvas (TODO 2)

A `<canvas>` cannot take keyboard focus by default, so `tabIndex = 0` gives it one, which the arrow-key support in Step 6 needs. `role="img"` and an `aria-label` tell assistive technology this canvas is a picture, not an interactive control: the real description is the text element below it.

### Step 2: the scene, camera, and lights (TODO 3)

Nothing here is new from 3.1: a `Scene`, a `PerspectiveCamera`, an `AmbientLight`, and a `DirectionalLight`. The difference is what you look at: three pedestals in a row, instead of one table.

### Step 3: resizing (TODO 4)

`renderer.setSize(width, height, false)` resizes the drawing buffer; the third argument, `false`, tells it to leave the canvas element's own CSS size alone, because the stylesheet already controls that with `.canvas-box`. After any change to `camera.aspect`, you must call `camera.updateProjectionMatrix()`, or the picture stays stretched. A `ResizeObserver` on the container calls this whenever its box changes size, not only when the whole window does.

### Step 4: the exhibit's objects (TODOs 12-14)

The same three objects from 3.1 and 3.2-3.3, built from primitives, with no model files (glTF arrives in 3.5):

| Object | Geometry | Why this material |
| --- | --- | --- |
| Clay pot | `CylinderGeometry`, narrower top than middle | High roughness, no metalness: unglazed clay is matte |
| Woven basket ring | `TorusGeometry`, laid flat | High roughness: woven fibre scatters light unevenly |
| Jade stone | `IcosahedronGeometry` | Lower roughness, no metalness: polished but not a metal |

`exhibit.js` keeps the facts about each object (`ITEMS`) separate from the meshes built from them, so `describe.js` can build sentences from the same data, and never say something the scene does not show.

### Step 5: OrbitControls (TODO 5)

`OrbitControls`, from `three/addons/controls/OrbitControls.js`, orbits the camera around a `target` point when you drag. `enableDamping` makes that motion ease to a stop instead of snapping the moment you release. Damping only works if `controls.update()` runs every frame, which is one more reason this lesson needs a render loop rather than rendering on demand.

### Step 6: comfort limits and keyboard support (TODO 6)

Two kinds of limit keep the exhibit comfortable to look at (see [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md)):

- **`minDistance` / `maxDistance`** stop the camera getting uncomfortably close or drifting far away.
- **`minPolarAngle` / `maxPolarAngle`**, in radians, stop the camera climbing over the top of the exhibit or dipping below the floor.

`controls.listenToKeyEvents(renderer.domElement)` gives the arrow keys a route into orbiting, once the canvas has focus (Step 1, continued gave it one). Read the r186 source before you rely on any three.js method: it takes the element to listen on, and its default key bindings are the arrow keys.

### Step 7: the render loop, and `THREE.Timer` (TODOs 7-8)

`THREE.Clock` has been **deprecated since r183**; use `THREE.Timer` instead. Both measure time, but `Timer` separates measuring time (`update()`) from reading it (`getDelta()`, `getElapsed()`), so calling `getDelta()` twice in one frame does not silently give two different answers. `timer.connect(document)` uses the Page Visibility API so that returning to a long-hidden tab does not report one huge time jump.

Multiply movement by `timer.getDelta()`, not by a fixed number, and it becomes **frame-rate independent**: the jade stone turns at the same visible speed on a screen drawing 30 frames a second and one drawing 120.

### Step 8: starting and stopping the loop (TODO 9)

`renderer.setAnimationLoop(callback)` starts a render loop; `renderer.setAnimationLoop(null)` stops it completely, freeing the GPU rather than merely skipping work inside the callback. Applications should always start and stop their loop this way, not with `requestAnimationFrame` directly: it also covers WebXR sessions automatically.

This exhibit keeps its loop running continuously, because `OrbitControls`'s damping needs a frame to ease to a stop after every drag, even while the jade stone's own animation is paused. Contrast this with 3.1's concepts lab, which rendered **on demand**, because nothing there moved by itself and damping was not in use. The Explorer challenge asks you to combine both: render on demand once the camera has settled and the animation is paused.

### Step 9: reset view (TODO 10)

Record the camera's starting position and the controls' starting target once, when the app is created. "Reset view" copies them back with `Vector3.copy()`, then calls `controls.update()` so the change takes effect immediately.

### Step 10: the scene description (TODO 16)

Same idea as 3.1: a 3D scene is a picture drawn by JavaScript, and screen readers cannot see into it, so `#scene-description` carries the same information in words, built from the same `ITEMS` data the meshes are built from. It also needs to say whether the jade stone is currently turning, and how to look around, because both can change while a learner is on the page.

### Step 11: pausing, and reduced motion (TODO 18)

The Pause button's `aria-pressed` state, and its own visible text, must always say what is currently true and what pressing it will do next: "Pause animation" when it is running, "Resume animation" once it is paused. A learner whose system requests reduced motion should never see the animation start moving on its own: check `prefers-reduced-motion` once, early, and start already paused if it is set.

### Step 12: turn left/right, and the hidden-tab check (TODO 19)

`controls.rotateLeft(angle)` orbits the camera programmatically, exactly as if the learner had dragged. Check the r186 source for its sign convention before deciding which button passes a positive angle and which passes a negative one. `document.visibilitychange`, checking `document.hidden`, is the standard way to know when a tab is not visible: stop the render loop then, and nobody's battery drains for a scene nobody can see.

### Step 13: WebGL 2 detection and the 2D fallback (TODO 17)

three.js's `WebGLRenderer` requests a `webgl2` context by default in this version. Detecting that support **before** creating the renderer means a browser without it sees a clear message instead of a silent failure or a console error. The exhibit's item list is not only shown in that case: it is always in the page, so the exhibit's information never lives only in the picture (WCAG 1.3.1).

### Step 14: disposal (TODO 15)

A geometry's triangle data and a material's compiled shader program live in GPU memory, outside the JavaScript heap that the browser's garbage collector manages. Removing a mesh from the scene graph does not free that memory: you must call `.dispose()` on its geometry and material yourself (and on any textures a material holds, once 3.5 adds them).

### Step 15: rebuild, and the Stats panel (TODO 11)

"Rebuild scene" disposes the current exhibit and builds a fresh one. `renderer.info.memory.geometries` and `.textures` count what is currently uploaded to the GPU: if disposal worked, these numbers return to what they were before the click. If they climb a little every time, something was not disposed.

These counts only update once a geometry has actually been drawn, not from the moment it is created, so `rebuild()` renders one frame itself before handing control back: otherwise a Stats panel reading `renderer.info` immediately afterwards could briefly show the stale, just-disposed numbers instead of the new exhibit's real ones.

Expect `.textures` to read **1**, not 0, even though this exhibit loads no image files: three.js creates one small internal lookup texture the first time it renders any `MeshStandardMaterial`, and reuses it for every physically based material afterwards. It is not one of yours to dispose, and not a leak, as long as it stays at 1. What matters for proving disposal is that both numbers stay flat across repeated rebuilds, not that either one reaches zero.

## Key code explained

**`THREE.Timer`** replaces `THREE.Clock`, deprecated since r183. Call `timer.update(time)` once per frame, before `timer.getDelta()`.

**`renderer.setAnimationLoop(callback)`** starts a render loop that also works inside a WebXR session; `setAnimationLoop(null)` stops it outright.

**`controls.listenToKeyEvents(domElement)`** gives `OrbitControls` a keyboard route, using the arrow keys by default, once `domElement` has focus.

**`controls.rotateLeft(angle)`** and **`controls.rotateUp(angle)`** orbit the camera by a given angle in radians, exactly as dragging does.

**`camera.updateProjectionMatrix()`** must follow any change to `fov`, `aspect`, or the near/far planes.

**`renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`** draws sharply on high-density screens without asking the GPU to draw more than twice the pixels a screen actually benefits from.

**`renderer.info.render.calls`** and **`.triangles`** count what the most recently rendered frame cost; **`renderer.info.memory.geometries`** and **`.textures`** count what is currently uploaded, which is how you prove disposal worked.

**The import map** maps `three` to the pinned build, maps three.js's own `three.core.js` to its minified copy, and maps `three/addons/` to the `examples/jsm/` folder that `OrbitControls.js` lives in (see [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md)).

## 3D and XR accessibility

- The scene has a text description (`#scene-description`) that follows every change: which objects are there, whether the animation is running, and how to look around.
- Every 3D interaction has a keyboard route: Tab reaches the canvas, the arrow keys orbit it, and "Turn left", "Turn right", "Reset view", "Pause animation", and "Rebuild scene" are all ordinary buttons.
- Reduced motion is respected: the exhibit loads already paused when the operating system asks for it, and the Pause button always works regardless.
- The exhibit's information also lives in an always-present HTML list, so it works with WebGL 2 unavailable, on a slow device, or for a screen-reader user who skips the canvas entirely.
- The camera never moves unless a person moves it: no automatic path, no auto-rotation, no camera shake. Only the jade stone animates, and only when not paused.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The scene has a text description that follows its changes | 1.1.1 | The picture's information is also in words. |
| Every 3D interaction also works with the keyboard | 2.1.1 | Orbiting, turning, resetting, pausing, and rebuilding are all reachable without a mouse. |
| The Pause button shows its state with `aria-pressed`, and its text names what happens next | 4.1.2 | Screen readers say "pressed" or "not pressed"; sighted learners read the same fact in the label. |
| Reduced motion is respected, and there is a visible pause control regardless | 2.2.2, 2.3.3 | No one is shown motion they did not ask for, and anyone can stop what remains. |
| The exhibit's contents exist as HTML, not only inside the canvas | 1.3.1 | The information is not lost when WebGL is unavailable. |
| The page never scrolls sideways on a phone | 1.4.10 | The exhibit sits above the controls on narrow screens. |

## Performance considerations

Three ideas carry forward from 3.1 and go further here. **A capped pixel ratio** avoids asking a phone's GPU to draw pixels nobody can distinguish. **Stopping the render loop when the tab is hidden** (`setAnimationLoop(null)` on `visibilitychange`) means a background tab draws nothing at all, rather than 60 wasted frames a second. **Disposal** matters the moment an application lets learners rebuild or replace what is on screen: without it, memory climbs a little on every rebuild until the tab eventually slows down or crashes. `renderer.info` makes all of this visible instead of invisible: the Stats panel's draw calls, triangles, and memory counts are the same numbers a real performance review would start from. Phase 3's performance lesson (3.6) goes much further into reducing draw calls with merged geometry and instancing.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Changing `camera.aspect` without `updateProjectionMatrix()` | The picture looks stretched after a resize | Always call it after |
| Using `THREE.Clock` | A console warning, and code that will not carry forward | `THREE.Timer`, deprecated since r183 |
| Forgetting `controls.update()` in the render loop | Damping and inertia never settle, or never move at all | Call it once every frame, unconditionally |
| Disposing a mesh's geometry but not its material (or the reverse) | Memory still climbs on every rebuild | Dispose both, and any textures a material holds |
| A fixed number added to rotation every frame | The object spins faster on a fast screen, slower on a slow one | Multiply by `timer.getDelta()` |
| `listenToKeyEvents` on an element that cannot take focus | Arrow keys never do anything | Give the element `tabIndex = 0` first |

## Troubleshooting

**The canvas box stays empty.** TODO 1 is missing, or there is an error in the Console. Check that you opened the page through `http://`.

**`Failed to resolve module specifier "three"`.** The import map is missing, or appears after a module script. It must come first in `<head>`.

**Dragging works, but the arrow keys do nothing.** The canvas needs `tabIndex = 0` and needs to actually have focus (click it, or press Tab) before `listenToKeyEvents` will hear anything.

**The jade stone is missing, or the console shows an error reading `.name` of `undefined`.** A `build...()` function in `exhibit.js` (TODOs 12-14) has not returned a mesh yet: this is expected in the starter until you finish it.

**The Geometries or Textures count keeps climbing after Rebuild scene.** Something in `disposeExhibit()` is not disposing every geometry or material; check it runs on every object the group's `traverse()` visits, not only the top-level meshes.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth object to the exhibit, on its own pedestal.
2. **[Creative](challenges/challenge-2.md)**: swap in objects from your own culture or community, described in your own language.
3. **[Explorer](challenges/challenge-3.md)**: add render-on-demand back, for when the animation is paused and the camera has settled.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of the exhibit from its starting view, and again after using "Turn left" or the arrow keys.
3. Keep them, and this project, in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: what is the difference between a render loop and rendering on demand, and which would you choose for a scene where absolutely nothing moves?

## Further reading

- [three.js manual: How to update things](https://threejs.org/manual/#en/how-to-update-things)
- [three.js docs: `Timer`](https://threejs.org/docs/#examples/en/misc/Timer)
- [three.js docs: `OrbitControls`](https://threejs.org/docs/#examples/en/controls/OrbitControls)
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [MDN: Import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap)

## Women to Know

**Lisa Su 苏姿丰** was born in Tainan and moved to the USA at the age of three. Early in her career, as a semiconductor engineer, she helped bring copper interconnects into IBM's chips. She has been AMD's CEO since October 2014, and its Chair since 2022, and in 2021 she became the first woman to receive the IEEE Robert N. Noyce Medal.

Every frame this lesson's render loop draws is drawn by a GPU, and AMD, the company she leads, is one of the small number of companies in the world that designs them. The `renderer.setAnimationLoop` callback you wrote in this lesson is, ultimately, a request to hardware that people like her build and lead.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

**WebGL 2**, the graphics API this lesson's renderer uses by default, is a Khronos Group standard, based on OpenGL ES 3.0. **Import maps**, the `<script type="importmap">` block every three.js lesson relies on, are part of the WHATWG HTML Standard: they let a page write short specifiers like `"three"` instead of a long, versioned CDN URL, and every module that imports `"three"` resolves to exactly the same pinned file. Neither three.js nor its `addons/` folder is itself a standard: they are an open-source project built on top of these standards, which is why XR Camp pins their version.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
