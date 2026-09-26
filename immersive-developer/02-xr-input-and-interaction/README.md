# XR Input and Interaction

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `immersive-developer` · **Lesson:** `xr-input-and-interaction-02` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Build an XR interaction laboratory.

---

## Learning objectives

By the end of this project you will be able to:

1. Read WebXR's **`select`**/`selectstart`/`selectend` and **`squeeze`**/`squeezestart`/`squeezeend` events, and the **`XRInputSource`** properties (`targetRayMode`, `handedness`, `hand`, `gamepad`) that describe what fired them.
2. Show a real controller model with `renderer.xr.getControllerGrip()` and **`XRControllerModelFactory`**, and a tracked hand with `renderer.xr.getHand()` and **`XRHandModelFactory`**.
3. Explain **gaze** and **transient-pointer** as `targetRayMode` values distinct from `tracked-pointer`, and when a page might see each one.
4. Build a ray-based ("far") interaction, an in-world menu you point at and select, and a proximity-based **direct grab**, and explain when each interaction style suits a task.
5. Give visual and, where supported, **haptic** feedback for a selection, without ever relying on haptics alone.
6. Request an **immersive-ar** session with a required `'hit-test'` feature, and use `XRHitTestSource` and `frame.getHitTestResults()` to place an object onto a real surface.
7. Explain why a device can run only one WebXR session at a time, and design a page's buttons around that constraint.
8. Provide a full non-XR keyboard or 2D alternative for every interaction this lab offers in VR or AR.
9. Test WebXR features whose support varies widely between devices (hand tracking, hit-test) responsibly, and say plainly when something could not be confirmed.

## Prerequisites

- **Immersive Developer, WebXR Foundations (4.1)**: this lesson's starter is 4.1's completed exhibit, already WebXR-capable. You should already be comfortable with `renderer.xr.enabled`, requesting and ending a session, and `renderer.xr`'s own `sessionstart`/`sessionend` events.
- **Web3D Developer, Three.js Foundations (3.4)**: `WebGLRenderer`, `THREE.Group`, and disposing geometries and materials.
- **My XR Camp**, Phase 2's own small app: not extended directly by this lesson, but the same idea of building one thing across several lessons continues here, with the exhibit gaining hands and a floating menu of its own.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A Chromium-based desktop browser (Chrome or Edge) | WebXR support and DevTools | Free |
| The [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) browser extension | Testing controller sessions without owning a headset | Free |
| A VR headset with controllers or hand tracking (optional) | Real-device testing of controllers, hands, and haptics | Varies; not required |
| An AR-capable phone or headset (optional) | Real-device testing of hit-test placement | Varies; not required |
| A local server | Modules, import maps, and WebXR itself need `http://` | Free |

The Immersive Web Emulator can simulate a controller session reliably; its support for simulating a tracked hand or an AR hit-test surface varies by version and platform, so treat anything it cannot show as untested rather than broken, and confirm on a real device where you can. The `three` library loads from `cdn.jsdelivr.net`; if that is slow or blocked, download the pinned files once where they work and change the import map to point at your own copy.

## What you will build

The WebXR exhibit from 4.1 becomes an **interaction laboratory**: a small floating menu you point a controller, a tracked hand, or a screen tap at; a jade stone you can pick up directly by reaching for it; and a second, separate kind of WebXR session, immersive AR, that lets you place a virtual jade stone onto a real surface in your own room. Every one of these gets a full 2D or keyboard alternative, so nothing in this lesson requires owning a headset to try.

The reference solution is in [`completed/`](completed/). The starter is 4.1's finished, WebXR-capable exhibit with three new files (`controllers.js`, `menu.js`, `ar.js`) and small additions to two others: ten TODOs, numbered 2 to 11. Step 1 needs no code.

## Folder guide

```text
02-xr-input-and-interaction/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page, controls, and every new panel (finished)
│   └── js/
│       ├── app.js                # The engine, from 4.1, plus onXRFrame() (finished)
│       ├── exhibit.js            # The objects, from 4.1 (finished)
│       ├── xr.js                 # Entering/leaving VR, from 4.1 (finished)
│       ├── menu.js               # The in-world menu's geometry and labels (finished)
│       ├── describe.js           # The description: TODO 7
│       ├── controllers.js        # New: controllers, hands, ray, grab. TODOs 2-6
│       ├── ar.js                 # New: AR sessions and hit-test placement. TODOs 8-10
│       └── main.js               # Wiring the page: TODO 11
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the starter into your `virtual-exhibit` folder, alongside your earlier work, and commit it with Git.
2. Start your local server, and open `index.html`. The exhibit behaves exactly as 4.1 left it: the "Enter VR" panel works, but the in-world menu, direct grab, "Enter AR", and the new 2D alternatives do nothing yet.
3. If you have not already, install the Immersive Web Emulator browser extension.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup: copy 4.1's completed exhibit in, and read the three new files | An unchanged desktop exhibit, plus empty new panels |
| 2 | Step 1: the controller grip and its model (TODO 2) | A controller model appears in VR, on a device with one |
| 3 | Step 2: the tracked hand model (TODO 3) | A tracked hand renders, on a hand-tracking-capable device |
| 4 | Step 3: the pointing ray (TODO 4, part 1) | A ray extends from a connected input source |
| 5 | Step 3, continued: `'connected'`/`'disconnected'` (TODO 4, part 2) | The ray appears only once a real input source is present |
| 6 | Step 4: ray-selecting the in-world menu (TODO 5) | Pointing at a button and selecting highlights and triggers it |
| 7 | Step 4, continued: haptic feedback | A supported controller buzzes briefly on selection |
| 8 | Step 5: direct grab with squeeze (TODO 6, part 1) | Holding the grip button near the jade stone picks it up |
| 9 | Step 5, continued: release, and a hand's pinch-to-grab (TODO 6, part 2) | Releasing puts the stone back; a tracked hand can grab it too |
| 10 | Step 6: the interaction-aware scene description (TODO 7) | The description names the connected input and the stone's state |
| 11 | Step 7: requesting an AR session with hit-test (TODO 8) | "Enter AR" requests a session that requires the `hit-test` feature |
| 12 | Step 7, continued: the hit-test source and reticle (TODO 9) | A reticle tracks a real, flat surface each frame |
| 13 | Step 8: placing an object on select (TODO 10) | Selecting in AR places the jade stone at the reticle's pose |
| 14 | Step 9: wiring it all together, and the 2D alternatives (TODO 11) | A complete interaction lab, every XR action with a 2D or keyboard twin |
| 15 | Testing with the Immersive Web Emulator, and a real headset or phone if you have one | Confirmation of what works, and an honest note on what you could not test |
| 16 | [`tests/checklist.md`](tests/checklist.md), one challenge extension, then **Submitting your work** | A finished interaction lab |

### Step 1: the controller grip and its model (TODO 2)

`renderer.xr.getControllerGrip(index)` returns a `THREE.Group` three.js keeps updated to match the input source's **grip pose** - where a virtual object should sit if it were held in the user's hand. A bare group renders nothing: `XRControllerModelFactory.createControllerModel(grip)` is what makes it visible, by reading the connected input source's own `profiles` array (a list of strings identifying the exact device) and fetching a matching 3D model at runtime, rather than drawing one generic shape for every controller.

### Step 2: the tracked hand model (TODO 3)

`renderer.xr.getHand(index)` is the same idea for a tracked hand, and `XRHandModelFactory.createHandModel(hand, 'mesh')` builds a skinned mesh that follows all 25 joints WebXR's Hand Input module reports: the wrist, four for the thumb, and five for each of the other four fingers. Passing `'boxes'` or `'spheres'` instead of `'mesh'` draws simple placeholder shapes at each joint instead, useful for testing without downloading a model (see the Explorer challenge).

### Step 3: the pointing ray (TODO 4)

`renderer.xr.getController(index)` returns a third group, for the input source's **target ray space**: not the same pose as the grip, since a controller's ray tilts slightly away from how it is physically held, and a tracked hand's ray follows its index finger rather than its palm. A `THREE.Line` drawn along this group's own local -Z axis is, by definition, pointing exactly where WebXR says the input source is aimed. `'connected'` and `'disconnected'` fire on this group whenever a session actually starts or stops supplying a matching input source, which is why the ray only appears once one is truly present, rather than being drawn for two seats that might stay empty all session.

### Step 4: ray-selecting the in-world menu (TODO 5)

Selecting the menu is "far" interaction: nothing about it depends on how close the input source is to the buttons, only on where it is pointed. `selectstart` fires with no useful geometry of its own, so this step raycasts from the controller's own world position and forward direction against `menu.js`'s three button meshes, using ordinary `THREE.Raycaster`. A hit runs whichever `action` string the button carries, and gives two kinds of feedback: `setButtonHighlight()` (visual, from `menu.js`) and a short pulse from `GamepadHapticActuator.pulse()`, tried only where the input source actually has one.

### Step 5: direct grab (TODO 6)

Grabbing the jade stone is the opposite of Step 4: "direct", or "near", interaction, where only real distance to the object matters, not where anything points. `squeezestart`/`squeezeend` fire for a controller's physical grip button; a tracked hand has no standardised squeeze gesture, so its pinch (reported, like a controller's trigger, as `select`) does the same job whenever the hand is close enough to the stone rather than pointed at the menu. `Object3D.attach()` reparents the stone onto whichever input source grabbed it while keeping its exact current position and rotation, so nothing jumps at the moment of the grab; releasing reverses it, restoring the stone's original parent, position, and rotation instantly.

### Step 6: the interaction-aware scene description (TODO 7)

The description already changed once, in 4.1, to say whether a headset was active. It now also says which kind of input is connected (a hand, a controller, or neither yet) and what that input's gestures do, and whether the jade stone is currently held. A screen-reader user relying on this paragraph should be told exactly as much as a sighted learner sees, no more and no less.

### Step 7: requesting an AR session with hit-test (TODO 8)

`immersive-ar` is requested the same way `immersive-vr` was in 4.1, with one difference: `requiredFeatures: ['hit-test']`. There is no way to feature-detect `'hit-test'` itself in advance the way `isSessionSupported()` checks a session mode; a runtime that cannot provide a required feature simply rejects the whole `requestSession()` call, which is why `enterAR()` wraps it in try/catch and reports `error.message` rather than assuming success.

### Step 8: the hit-test source and reticle, then placing an object (TODOs 9-10)

A hit-test source is requested against the **`'viewer'`** reference space - rooted to wherever the device itself faces - so `frame.getHitTestResults(source)`, called once per XR frame through `app.onXRFrame()`, reports what real surface is directly ahead right now. Each result's `getPose()` returns a full transform matrix, which the reticle copies directly; selecting decomposes that same matrix into a position and rotation for the placed jade stone, since a `Matrix4` cannot be assigned to an `Object3D`'s `position` or `quaternion` properties directly.

### Step 9: wiring it together (TODO 11)

The last step connects everything: the in-world menu is built once and added to the scene; `initInteraction()` is called once, harmlessly, whatever WebXR support this browser turns out to have; `initXR()` and `initAR()` each disable the other's button while their own session is active, since a device can only run one WebXR session at a time; and "Lift jade stone" and "Place object (2D)" give the same two ideas, grabbing and placing, a form that needs no headset, controller, or hand at all.

## Key code explained

**`XRInputSource.targetRayMode`** is `'gaze'` (a head- or eye-tracked direction, no controller involved), `'tracked-pointer'` (a physically tracked controller or hand), `'screen'` (a tap on a phone screen, including in an inline or AR session), or `'transient-pointer'` (an OS-generated pointer from sensitive information that cannot be exposed directly, such as gaze-based intents, or from webdriver-synthesized or assistive-technology inputs) - not the same thing as `'gaze'`, even though both can stand in for "no hardware controller".

**`renderer.xr.getController(i)`**, **`getControllerGrip(i)`**, and **`getHand(i)`** each return a different `THREE.Group` for the same input source: the target ray space, the grip space, and the hand's overall pose, respectively. Attaching the wrong model to the wrong one is a common, silent mistake (see "Common mistakes").

**`XRControllerModelFactory`** and **`XRHandModelFactory`** both take an optional `GLTFLoader` in their constructor and default to creating their own; their `createControllerModel(grip)`/`createHandModel(hand, profile)` methods fetch a model matching the connected device from the [WebXR input profiles](https://github.com/immersive-web/webxr-input-profiles) registry at runtime, which is why nothing in this project ships its own controller or hand model file.

**`session.requestHitTestSource({ space })`** and **`frame.getHitTestResults(source)`** are the whole of the WebXR Hit Test module used here: the first asks "tell me what real surfaces this ray keeps finding", the second asks each frame "what did it find just now".

**`GamepadHapticActuator.pulse(intensity, duration)`**, reached through `inputSource.gamepad.hapticActuators[0]`, is the simplest haptic call WebXR exposes; support is inconsistent enough that every call here is wrapped so a missing buzz never breaks a selection.

## 3D and XR accessibility

- The scene description names whichever input is connected, and updates the instant that changes, the moment the jade stone is grabbed or released, and the moment anything is placed.
- Every ray-based and direct interaction has a full 2D or keyboard equivalent: the menu's three actions are ordinary page buttons too, "Lift jade stone" mirrors direct grab, and "Place object (2D)" mirrors AR placement.
- The camera never moves on its own in any mode, including AR, where the device's own passthrough tracking - not this page - moves the view.
- Haptic feedback is always paired with a visible highlight, never the only signal that a selection worked.
- Entering VR or AR keeps the same seated, comfortable-reach layout 4.1 established: the menu and the jade stone both sit within easy reach of the seated starting position.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The scene description names the current input and interaction state | 1.1.1, 4.1.2 | A screen-reader user gets the same picture of "what can I do right now" that a sighted learner sees. |
| Every XR action (menu, grab, AR placement) has a non-XR alternative | 2.1.1 | The entire lab stays fully usable with a mouse, a finger, or a keyboard; VR and AR are always optional. |
| Haptic feedback is never the only feedback for an action | Good practice | Not every input source can vibrate, and not every learner would feel it if it could. |
| Visible button text always matches what the button currently does | 2.5.3, 4.1.2 | "Enter VR"/"Exit VR" and "Place object (2D)"/"Remove placed object" say exactly what happens next. |
| The camera never moves unless the learner (or, in AR, their own device) moves it | 2.2.2 | Unrequested motion is disorienting, and can cause real physical discomfort. |
| Grabbing and placing an object are never animated over time | 2.3.3 | Instant position changes carry no risk of motion sickness; a tween would. |

## Performance considerations

Two controller groups and two hand groups are created up front, whether or not a session ever supplies matching input sources: they cost almost nothing while empty, since `XRControllerModelFactory` and `XRHandModelFactory` only fetch and build a model once a `'connected'` event actually arrives. The raycast against the menu's three buttons runs only on `selectstart`, not every frame, so it adds no per-frame cost; the hit-test loop in `ar.js` does run every XR frame, but `frame.getHitTestResults()` is designed for exactly that and does no scene traversal of its own the way a `THREE.Raycaster` would.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Attaching a controller model to `getController()` instead of `getControllerGrip()` | The model sits at the wrong angle, tilted along the target ray instead of the grip | Use `getControllerGrip()` for models, `getController()` for rays |
| Reading `squeeze` events on a tracked hand | Nothing happens; hand input sources have no standardised squeeze gesture | Use `select` (pinch) for a hand's grab, `squeeze` for a controller's |
| Assuming `isSessionSupported('immersive-ar')` guarantees hit-test works | `requestSession()` with `requiredFeatures: ['hit-test']` can still reject | Always wrap it in try/catch, as with any `requestSession()` call |
| Leaving both "Enter VR" and "Enter AR" enabled at once | The second `requestSession()` call fails, since one session is already active | Disable each button while the other's session is active (TODO 11) |
| Animating the jade stone's return to its pedestal | Adds motion a reduced-motion learner did not ask for, for no real benefit | Set its position back instantly, as this lesson does |
| Relying on a haptic pulse to confirm a selection | Learners on hands, or on controllers without haptics, get no confirmation at all | Always pair it with `setButtonHighlight()` or another visible change |

## Troubleshooting

**No controller or hand model appears in VR.** Check the 'connected' listener actually fired: log `event.data.profiles` to confirm an input source arrived at all. If it did, check the model was attached to the *grip* group, not the controller (target ray) group.

**The menu button never highlights or triggers.** Log the raycaster's hits; a common cause is casting from the wrong group's `matrixWorld`, or forgetting to normalize the ray's direction after `applyMatrix4()`.

**Grabbing works with a controller but not a tracked hand.** Hands have no `squeeze` event; check the grab call for a hand happens on `selectstart`, gated on `controller.userData.inputSource?.hand` being truthy.

**"Enter AR" rejects immediately with a feature-related error.** The device or browser does not support `hit-test`, even though it supports `immersive-ar` generally. This is expected on many phones and headsets; the status message should say so, and "Place object (2D)" should still work.

**The reticle never appears in AR.** Point the device at a flat, well-lit, textured surface (a screen or blank wall can be too featureless for many devices' surface detection) and hold it steady for a moment; `frame.getHitTestResults()` can legitimately return nothing yet.

**Haptics never buzz.** Many controllers, and effectively all tracked hands, do not expose `hapticActuators`. Confirm with `console.log(inputSource.gamepad?.hapticActuators)`; an empty or undefined result means this device cannot vibrate, not that the code is wrong.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth button to the in-world menu, wired the same way as the other three.
2. **[Creative](challenges/challenge-2.md)**: rewrite the menu and every status message in your own language or community's words, and change which exhibit item can be grabbed and placed.
3. **[Explorer](challenges/challenge-3.md)**: add dwell-time gaze selection for controller-free headsets, and compare `XRHandModelFactory`'s `'boxes'`/`'spheres'` placeholders against its real hand mesh.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: the desktop lab, the in-world menu, a controller or hand model in VR (or the emulator), and the AR reticle or the "Place object (2D)" result.
3. Keep them, and this project, in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: why does grabbing use `squeeze` for a controller but `select` for a tracked hand, and what would go wrong for a learner if a lesson quietly assumed every input source works the same way?

## Further reading

- [W3C: WebXR Device API](https://www.w3.org/TR/webxr/)
- [W3C: WebXR Hand Input Module](https://www.w3.org/TR/webxr-hand-input-1/)
- [W3C: WebXR Hit Test Module](https://www.w3.org/TR/webxr-hit-test-1/)
- [MDN: Inputs and input sources](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Inputs)
- [three.js docs: `XRControllerModelFactory`](https://threejs.org/docs/#examples/en/webxr/XRControllerModelFactory)

## Women to Know

**Ming C. Lin**, born in Taiwan, is a Distinguished University Professor at the University of Maryland and a pioneer of collision detection - including the Lin-Canny closest-features algorithm - physics-based simulation, haptics, and sound rendering. She received the IEEE VGTC Virtual Reality Technical Achievement Award in 2010, was inducted into the IEEE VR Academy in 2022, and co-founded Impulsonic, whose audio technology Valve acquired and released as Steam Audio.

This lesson's "direct grab" is, underneath, a distance check between two objects: a small, everyday piece of the collision-detection problem her research made fast enough for real-time graphics. Its haptic pulse belongs to the same broader field she has spent much of her career on, giving virtual touch and sound a physical basis.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

This lesson's APIs come from three related specifications, all published by the W3C's **Immersive Web Working Group**: the core **WebXR Device API** (sessions, input sources, `select`/`squeeze` events); the **WebXR Hand Input Module**, which adds `XRHand` and its 25 tracked joints; and the **WebXR Hit Test Module**, which adds `XRHitTestSource` for AR surface detection. All three are still evolving drafts on the Recommendation track rather than finished Recommendations, which is one reason this lesson treats hand tracking and hit-test support as something to check for, never assume. Three.js's `XRControllerModelFactory` and `XRHandModelFactory` are not standards themselves: they are open-source conveniences, built on the [WebXR input profiles](https://github.com/immersive-web/webxr-input-profiles) community project, that implement these same W3C APIs underneath.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
