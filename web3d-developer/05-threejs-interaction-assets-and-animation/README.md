# Three.js Interaction, Assets, and Animation

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web3d-developer` · **Lesson:** `threejs-interaction-assets-and-animation-05` · **Time:** about 16 hours · 22 sessions of 45 minutes · about 6 weeks at 4 sessions a week

---

> Build the exhibit's model explorer: load two real, CC-licensed glTF models with `GLTFLoader`, alongside 3.4's three primitive objects, with a loading bar, raycasting selection you can also reach from the keyboard, each model's own built-in animation, correct colour spaces, and on-page attribution.

---

## Learning objectives

By the end of this project you will be able to:

1. Load a `.glb` file with **`GLTFLoader`**, and track its progress with a **`LoadingManager`**.
2. Handle a model that fails to load, without breaking the rest of the scene, using `Promise.allSettled`.
3. Fit a model of unknown size onto a pedestal by measuring it with **`THREE.Box3`**, instead of guessing a scale number.
4. Explain why a colour texture (base colour, emissive) is **sRGB** and a data texture (normal, roughness/metalness) is **linear**, and where `GLTFLoader` already sets this correctly.
5. Pick an object with a pointer using **`THREE.Raycaster`**, and give that same action a keyboard route.
6. Play a model's own animation with **`AnimationMixer`** and **`AnimationClip`**, and pause it exactly the way this course already pauses everything else.
7. Read a model's licence file and write an accurate, on-page attribution for it, alongside a repository `ATTRIBUTION.md`.
8. Recognise when a texture or geometry is **shared** across several meshes or materials in one glTF file, and dispose of it exactly once.

## Prerequisites

- **Three.js Foundations (3.4)**: this project's starter is 3.4's completed app, unchanged in its renderer, camera, controls, and render loop.
- **Web3D Fundamentals (3.1)** and **A-Frame Foundations and Advanced A-Frame (3.2-3.3)**: the same exhibit, now gaining the two real models those lessons deferred.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser with WebGL 2 | Every page in this lesson | Free |
| VS Code and a local server | Modules, import maps, and `fetch` all need `http://` | Free |
| The browser's **Network** panel | Watching the two `.glb` files load, and simulating a slow connection | Free |

The library and both models load from `cdn.jsdelivr.net` and this project's own `assets/` folder. If the CDN is slow or blocked where you are, download the pinned files once where they work, save them next to the page, and change the import map's addresses to the local files; the two `.glb` files are already local, so they need no change.

## What you will build

The exhibit gains two new items, on two new pedestals: a **fox figure** and a **Cesium milk truck**, both real, CC-licensed glTF models from the Khronos Group's own sample-asset library, loaded with `GLTFLoader`. Click or tap any of the five items (the three primitives from 3.4, plus these two) to select it, or use a Select button; each model plays its own built-in animation once it finishes loading, and a loading bar and a plain-language error message cover the time before that.

The reference solution is in [`completed/`](completed/). The starter is 3.4's completed app with its renderer, camera, controls, and render loop already working; you extend it with twelve TODOs.

## Folder guide

```text
05-threejs-interaction-assets-and-animation/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page and its controls (finished)
│   └── js/
│       ├── loader.js              # LoadingManager and GLTFLoader: TODO 1
│       ├── exhibit.js             # Fitting, colour spaces, loading: TODOs 2-4
│       ├── app.js                 # Picking, selection, animation: TODOs 5-7
│       ├── describe.js            # The description: TODO 8
│       └── main.js                # Wiring the page: TODOs 9-12
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/               # Fox.glb and CesiumMilkTruck.glb
└── screenshots/
```

## Setup

1. Copy the starter into your `virtual-exhibit` folder, alongside your 3.1-3.4 work, and commit it with Git.
2. Check `assets/` already holds `Fox.glb` and `CesiumMilkTruck.glb`: this project's `ATTRIBUTION.md` names exactly where they came from.
3. Start your local server, and open `index.html`. The three primitives and their pedestals appear immediately, exactly as 3.4 left them; the two model pedestals stay empty (a dimmed placeholder) until you complete the TODOs below.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read `js/exhibit.js`'s new `ITEMS` entries and `loader.js` | You can explain what each new field (`file`, `credit`, `licenseUrl`) is for |
| 2 | Step 1: the LoadingManager and GLTFLoader (TODO 1) | `createManager()` reports progress and errors |
| 3 | Step 2: fitting a model to its pedestal (TODO 2) | You can explain why a fixed scale number would be wrong |
| 4 | Step 3: colour spaces (TODO 3) | You can name which glTF textures are sRGB and which are linear |
| 5 | Step 4: loading both models (TODO 4), part 1 | One `.glb` file fetches over the Network panel |
| 6 | Step 4, continued: `Promise.allSettled` and animation clips | A model appears on its pedestal, playing its own animation |
| 7 | Step 5: raycasting (TODO 5) | Clicking an item logs its id to the console |
| 8 | Step 6: highlighting the selection (TODO 6) | The clicked item visibly tints |
| 9 | Step 7: animating every loaded model (TODO 7) | Both models play their own animation at once |
| 10 | Step 8: the scene description (TODO 8) | `#scene-description` names loading, loaded, and selected states |
| 11 | Step 9: the loading bar (TODO 9) | A progress bar fills while a model fetches |
| 12 | Step 10: on-page attribution (TODO 10) | Each model's credit and licence link appear on the page |
| 13 | Step 11: selecting an item, and picking one on the canvas (TODO 11), part 1 | A Select button updates `#selection-info` |
| 14 | Step 11, continued: the canvas click handler | Clicking a model selects it, exactly like its Select button |
| 15 | Step 12: reload (TODO 12) | Reload exhibit disposes and reloads both models |
| 16 | Test with a throttled connection (Network panel) | The loading bar and error message both work as expected |
| 17 | Test every interaction with the keyboard alone | Tab, arrow keys, and every button all reach every feature |
| 18 | Test with reduced motion switched on | Both models load already paused |
| 19 | Check both models' `LICENSE.md` files against `ATTRIBUTION.md` | Every credit and licence link is exact |
| 20 | [`tests/checklist.md`](tests/checklist.md) | A finished starter app |
| 21 | One challenge extension | Your own extension to the model explorer |
| 22 | **Submitting your work** | The exhibit's model explorer, ready for 3.6 |

### Step 1: the LoadingManager and GLTFLoader (TODO 1)

A `THREE.LoadingManager` tracks every request made through loaders built with it: `GLTFLoader` itself, plus the separate `.bin` and image requests each `.glb` file's textures trigger. `manager.onProgress(url, loaded, total)` fires on every one of those, so one manager, shared across both models, reports **combined** progress without this lesson's code ever adding two numbers together itself. `manager.onError(url)` fires if any of them fails.

### Step 2: fitting a model to its pedestal (TODO 2)

A model exported by a different artist, in a different tool, arrives in whatever units they used: metres, centimetres, or an arbitrary game-engine unit. Writing one fixed scale number (`model.scale.setScalar(0.03)`, guessed by eye) would be wrong for some models and needs re-guessing for every new one. `THREE.Box3().setFromObject(model)` measures a model's actual bounding box in whatever units it arrived in; scaling so its height matches a fixed target, then measuring again and reading the new box's `min.y`, places any model's true lowest point exactly on its pedestal, regardless of its author's units.

### Step 3: colour spaces (TODO 3)

A material's **base colour map** and **emissive map** store colour the way a photograph does: an artist looked at the image and it looked right, encoded in **sRGB**, which spends more of its numeric range on the darker tones human eyes are more sensitive to. A **normal map** or a **metalness/roughness map** stores numbers, not colour — a direction, or a percentage — and must stay **linear**, or those numbers would be wrongly brightened by the same curve that makes a photograph look right. `GLTFLoader` already sets `texture.colorSpace` correctly for every texture it creates, so this project's `ensureColorSpaces()` is a safety net that confirms it, not a fix for something broken.

### Step 4: loading both models (TODO 4)

`Promise.allSettled`, not `Promise.all`, is the whole point here: `Promise.all` rejects the instant any one promise does, which would mean one learner's blocked network, or one bad file path, takes down the entire exhibit. `allSettled` waits for every promise to either resolve or reject, and lets this project handle each one on its own — a working fox next to a milk truck's plain-language error message, side by side.

Once a model's scene graph arrives, `gltf.animations` is an array of `THREE.AnimationClip` objects: 0, 1, or more, depending on what the artist authored. This project's two models each ship with one clip that plays on a loop; a model with several (the real Fox file, not this project's use of it, ships three: Survey, Walk, and Run) would need code deciding which one to play, since a single skeleton usually cannot play two at once.

### Step 5: raycasting (TODO 5)

`THREE.Raycaster` casts an invisible line from the camera, through a point on the screen, into the scene, and reports everything it passes through, nearest first. That point must be in **normalised device coordinates**: -1 to 1 across the canvas, with y flipped, because screen coordinates grow downward and NDC grows upward. Getting this from a pointer event means subtracting the canvas's own on-screen position first (`getBoundingClientRect()`), not just the window's: a canvas that is not flush against the browser's edges would otherwise pick the wrong point.

### Step 6: highlighting the selection (TODO 6)

A single primitive object has one mesh and one material; a glTF model can have several of each. Selecting "the milk truck" really means tinting every material on every mesh under its root object, which is exactly what `object3D.traverse()` is for. Each material's original `emissive` colour must be remembered before it is overwritten, or restoring it later would have nothing to restore to.

### Step 7: animating every loaded model (TODO 7)

`mixer.update(delta)` must run every frame for an `AnimationMixer` to advance, the same requirement `controls.update()` has for `OrbitControls`'s damping. Skipping that call while `animating` is false — not calling it with a delta of zero — is what freezes a model exactly where it was, precisely as this project's jade stone rotation already worked in 3.4.

### Step 8: the scene description (TODO 8)

A scene with two things loading, and a fifth thing possibly selected, has more states to describe than 3.4's three static primitives did. The description must say, for each model, whether it is still loading, failed, or ready, because a screen-reader user has no progress bar to glance at.

### Step 9: the loading bar (TODO 9)

`<progress>` is a native HTML element with built-in accessibility semantics; setting its `value` and `max` attributes is enough for assistive technology to announce percentage progress, without any ARIA needed. The loading text beside it, in a `role="status"` live region, announces the same information in words, for a reader whose screen reader does not surface `<progress>` values the same way every browser does.

### Step 10: on-page attribution (TODO 10)

A repository-level `ATTRIBUTION.md` is necessary but not sufficient: a learner who only ever opens the page has no reason to go looking for a file next to it. Building the attribution panel from the same `ITEMS` data the scene reads from means the credit line, the licence link, and the source link can never say something different from what `ATTRIBUTION.md` says, because they are the same words, in one place.

### Step 11: selecting an item, and picking one on the canvas (TODO 11)

A Select button and a canvas click both end up calling the same `selectItem(id)` function: the pointer interaction (raycasting) and its keyboard-accessible equivalent (a button) must produce an identical result, or one of them is a second-class citizen. A click that misses every item — the background, a bare patch of floor — is deliberately ignored rather than treated as "select nothing": a small slip of the pointer should not undo a choice a learner made on purpose.

### Step 12: reload (TODO 12)

"Reload exhibit" disposes every mesh, material, and texture currently in the scene — the three primitives 3.4 already proved, and now the two models' own geometry and textures too — and starts loading from nothing. Watch the Geometries count in the Stats panel: it returns to the same number every time, which is the strongest proof this project can offer that nothing is silently piling up in GPU memory as a learner explores.

## Key code explained

**`new THREE.LoadingManager()`**, passed to a loader's constructor, reports combined progress and errors across every request that loader (and any other loader built with the same manager) makes.

**`new THREE.Box3().setFromObject(object3D)`** computes an object's axis-aligned bounding box in world space; `.getSize()` and `.getCenter()` read a `Vector3` from it, and `.min` / `.max` read its corners directly.

**`texture.colorSpace`** is `THREE.SRGBColorSpace` for a colour texture (base colour, emissive) and `THREE.NoColorSpace` for a data texture (normal, roughness/metalness). `GLTFLoader` sets this correctly on load.

**`raycaster.setFromCamera(ndc, camera)`** then **`raycaster.intersectObjects(objects, true)`** returns every object a ray through a screen point passes through, nearest first; the `true` searches descendants too.

**`new THREE.AnimationMixer(root)`**, **`mixer.clipAction(clip)`**, and **`action.play()`** play one `AnimationClip` on one object; `mixer.update(delta)` must run every frame while it plays.

**`Promise.allSettled(promises)`** waits for every promise to settle, successfully or not, unlike `Promise.all`, which rejects as soon as the first one does.

## 3D and XR accessibility

- Every 3D interaction has a keyboard route: Tab reaches the canvas and the Select buttons; the arrow keys orbit it; clicking or tapping an item on the canvas and pressing its Select button do exactly the same thing.
- The scene description (`#scene-description`) follows every change: which models have loaded, which failed and why, which item is selected, and whether anything is animating.
- Reduced motion is respected: both the jade stone's rotation and every loaded model's own animation load already paused when the operating system asks for it.
- The exhibit's list, and the attribution panel, exist as HTML, so the exhibit's information and its licences are never available only inside the canvas.
- The camera never moves unless a person moves it, and a model's animation is its own author's content (a walk cycle, a driving loop), never something this project added.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Selecting an item on the canvas also works from a Select button | 2.1.1 | Raycasting is a pointer-only interaction by default; the button is its keyboard route. |
| The loading bar's percentage is also announced as text | 4.1.2, 1.1.1 | `<progress>`'s accessible semantics vary by assistive technology; the text beside it is exact and universal. |
| A failed model shows a plain-language message, not a blank pedestal | 1.1.1 | A silent failure gives a screen-reader user, or anyone glancing at an empty space, no information at all. |
| Reduced motion is respected for the jade stone and every loaded model | 2.2.2 | No one is shown motion they did not ask for, including motion this project did not author itself. |
| Every model's credit and licence are visible on the page, not only in a repository file | Good practice | A learner who only opens the page can still see what they are looking at, and under what licence. |
| The page never scrolls sideways on a phone | 1.4.10 | The exhibit sits above the controls on narrow screens. |

## Performance considerations

Both models stay well under this project's 5 MB per-model budget (163 KB and 370 KB), because the Khronos Group's own sample assets are already reasonably optimised; 3.6 goes much further into compressing what a learner's own, larger models might need. Loading two small files still has a real, visible cost on a slow connection, which is why this project shows a loading bar rather than a silent wait. `Promise.allSettled` means one slow or failing file never blocks the other from appearing. Disposing every geometry, material, and texture on "Reload exhibit" matters more here than it did in 3.4: a real texture, unlike a primitive's flat colour, can be a meaningful number of megabytes of GPU memory, and letting it accumulate across repeated reloads would eventually slow the page down or crash the tab.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Guessing a fixed scale number for a model | It is comically huge, tiny, or floats above its pedestal | Measure it with `THREE.Box3` and scale from that |
| Using `Promise.all` for two independent model loads | One failing model blocks the other from ever appearing | `Promise.allSettled`, handled per item |
| Converting NDC coordinates from `event.clientX` and window size, not the canvas's own box | Raycasting picks the wrong object whenever the canvas is not flush with the window's edges | Subtract `getBoundingClientRect()`'s own `left`/`top` and divide by its own `width`/`height` |
| Forgetting `mixer.update(delta)` in the render loop | A model's animation never advances past its first frame | Call it every frame the mixer's model is animating |
| Disposing a shared texture once per mesh that uses it, without checking whether it was already disposed | No visible bug, but wasted work, and a trap for code that assumes one dispose call per resource | Track disposed resources in a `Set` by `uuid` |
| Treating a Select button as a lesser version of clicking the canvas | The keyboard route quietly falls behind as models change | Route both through the exact same `selectItem(id)` function |

## Troubleshooting

**A model's pedestal stays a dimmed, empty shape.** Check the Network panel for a 404 on its `.glb` file: `exhibit.js`'s `ITEMS` entries use a path relative to `index.html` (`../assets/Fox.glb`), which differs between `starter/` and `completed/` only in that both already point one level up correctly. If the path is right, check the Console for a parse error instead.

**The model appears, but absurdly large or tiny, or half-buried in its pedestal.** TODO 2 (`fitAndPlaceModel`) is missing, incomplete, or measuring the box before scaling instead of after. Remember: the second `Box3` measurement, after scaling, is the one whose numbers you actually use to position it.

**Clicking a model does nothing, but its Select button works.** TODO 5 (`pickItem`) is either not converting to NDC correctly, or not walking up through `.parent` far enough to find the `userData.itemId` a deeper mesh's ancestor group carries.

**The Stats panel's Textures count climbs a little with every "Reload exhibit" click.** Geometries should return to exactly the same number every time; Textures may drift by one or two counts when a model's several materials share one texture (this project's milk truck does, for its wheels) — a rough edge in how the renderer's own internal accounting handles a texture used by more than one material, not a sign your own dispose calls are wrong. What matters is that repeated reloads do not make either number climb by dozens or hundreds: if they do, check that every material on every mesh is actually being reached by `disposeObject()`'s traversal.

**A loaded model's animation plays even with "Pause animation" pressed, or with reduced motion switched on.** TODO 7 is missing from `tick()`: check that the mixer update is inside the same `if (animating)` block the jade stone's own rotation already uses.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a third glTF model from the Khronos sample-asset library, checking its licence file yourself.
2. **[Creative](challenges/challenge-2.md)**: write your own on-page description of one model, in your own language, and add an info panel that shows it when that model is selected.
3. **[Explorer](challenges/challenge-3.md)**: let a learner choose which of a model's several animation clips plays, where the model has more than one.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of the exhibit once both models have loaded, and again with one item selected.
3. Keep them, and this project, in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: why does this project use `Promise.allSettled` instead of `Promise.all` to load its two models, and what would a learner see if it used `Promise.all` instead, on a day one file failed to load?

## Further reading

- [three.js manual: Load 3D models](https://threejs.org/manual/#en/load-gltf)
- [three.js docs: `GLTFLoader`](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [three.js docs: `AnimationMixer`](https://threejs.org/docs/#api/en/animation/AnimationMixer)
- [MDN: `Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Khronos Group: glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets)

## Women to Know

**Soraia Raupp Musse** is a computer-graphics professor at PUCRS, in Porto Alegre, Brazil, and a leading researcher in crowd simulation and virtual humans. She earned her PhD at EPFL under Daniel Thalmann, and later co-wrote the Springer book *Crowd Simulation* with him.

This project's fox and milk truck are single, individually animated models; the field she has spent her career on asks a harder question, how to animate hundreds of virtual humans at once, believably, in real time. The same `AnimationMixer` idea this project introduces, driving one skeleton from one clip, is the smallest unit of a problem her research scales up to a crowd.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

**glTF 2.0**, the format both of this project's models arrive in, is a Khronos Group standard: an open, royalty-free specification for transmitting 3D scenes and models, designed (as the Khronos Group describes it) to be a small, fast-to-load "JPEG of 3D". `GLTFLoader` is three.js's own implementation of a glTF reader, not a standard itself, which is exactly why lessons in this course pin its version alongside three.js's own. The **Creative Commons** licences this project's two models carry (CC0 1.0 and CC BY 4.0) are not a Khronos or W3C standard, but a widely used, standardised set of public licences that make checking and crediting a model's terms possible in the first place.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
