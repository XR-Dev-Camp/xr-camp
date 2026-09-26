# Spatial UX Design

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `immersive-developer` · **Lesson:** `spatial-ux-design-03` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Redesign the My XR Camp learning dashboard as a spatial interface, with world-, body-, and view-locked panels and teleport locomotion.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain the difference between **world-locked**, **body-locked**, and **view-locked** placement, and choose between them for a given piece of content.
2. Build a **canvas-texture panel** in three.js — a `<canvas>` drawn with `CanvasTexture`, `MeshBasicMaterial`, and `PlaneGeometry` — and keep it legible at different viewing distances.
3. Calculate a panel's **angular size** from its physical size and distance, and use that number instead of guessing whether text will be readable.
4. Treat published comfortable-distance and text-size guidance as a **starting point to test**, not a fixed rule, and say where a number came from.
5. Implement **teleport locomotion** between fixed points, including how it must move a WebXR session differently from the desktop view.
6. Add a **smooth-movement** option with a comfort vignette, and explain why teleporting is usually the safer default.
7. Mark out a simple **personal-space boundary**, and explain what it is for.
8. Write a short **design rationale** justifying spatial choices, citing sources.

## Prerequisites

- **Immersive Developer, WebXR Foundations (4.1)**: this lesson reuses its renderer setup, session handling, and `Enter VR` button pattern without re-teaching them.
- **Frontend Engineer, The Document Object Model and Dynamic Interfaces (2.2)**: this lesson redesigns that lesson's own learning dashboard, and reads the same saved progress from your browser.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A Chromium-based desktop browser (Chrome or Edge) | WebXR support and DevTools | Free |
| The [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) browser extension | Testing VR sessions without owning a headset | Free |
| A screen reader | Testing the scene description and live regions | Free |
| A VR headset (optional) | Real-device testing, if you have access to one | Varies; not required |

## What you will build

A **spatial redesign of the My XR Camp dashboard** from Course 2.2: instead of a flat page of progress bars, a small room with a **progress kiosk** (world-locked, always in the same spot) and a **goals panel** you can switch between world-, body-, and view-locked while it is running, so you can feel the difference rather than only read about it. Three floor markers let you teleport between three distances from the kiosk — very close, comfortable, and far — while a live readout reports the kiosk's **angular size** in degrees at each one. A floor ring marks your own personal space. Everything also works seated in VR, using the same "Enter VR" pattern from 4.1.

The reference solution is in [`completed/`](completed/). The starter has `index.html`, `styles.css`, `data/catalog.json`, and `js/app.js`, `js/data.js`, and `js/xr.js` finished. `js/panels.js`, `js/layout.js`, `js/locomotion.js`, `js/describe.js`, and `js/main.js` have ten TODOs between them; the room already runs before TODO 1, with plain placeholder panels and instant, unfaded teleporting, so you can see the shape of the whole thing before you start.

## Folder guide

```text
03-spatial-ux-design/
├── README.md
├── README.es.md
├── README.zh-Hans.md
├── project.json
├── starter/
│   ├── index.html, styles.css, data/catalog.json   # Finished
│   ├── js/app.js, js/data.js, js/xr.js             # Finished
│   ├── js/panels.js     # TODOs 1–3: the canvas-texture panel
│   ├── js/layout.js     # TODOs 4–6: world-/body-/view-locking
│   ├── js/locomotion.js # TODOs 7–8: teleport and smooth movement
│   ├── js/describe.js   # TODO 9: the scene description
│   ├── js/main.js       # TODO 10: wiring the lock-mode and movement controls
│   └── design-rationale.md  # Fill this in as you build
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the `starter/` folder to work in, or open it directly.
2. Start your local server, and open `starter/index.html` through it.
3. Open your browser's DevTools Console and Elements panel, and if you have a screen reader, turn it on for later steps.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; tour the starter and Course 2.2's flat dashboard | You can explain what already works here and what is still a placeholder |
| 2 | Discussion: read the distance and text-size sources in Further reading | You can state a comfortable panel distance and say exactly where that number came from |
| 3 | Step 1: building a panel (TODO 1) | Two plain plaques appear at the correct physical size |
| 4 | Step 2: drawing legible text (TODO 2) | The kiosk panel shows real progress numbers |
| 5 | Step 2, continued: the goals panel's text | Both panels show real, readable text |
| 6 | Step 3: angular size (TODO 3) | The move-status line reports a real degree number at each waypoint |
| 7 | Step 4: world-locked placement (TODO 4) | The kiosk is correctly positioned and facing the room |
| 8 | Step 5: body-locked placement (TODO 5) | The goals panel follows you and stays level as you look around |
| 9 | Step 6: switching lock modes (TODO 6) | All three lock-mode radios visibly change the goals panel's behaviour |
| 10 | Discussion: personal space and multi-user boundaries | You can explain what the floor ring is for |
| 11 | Step 7: picking a waypoint with a pointer (TODO 7) | Clicking or tapping a floor marker teleports you |
| 12 | Step 8: teleport and smooth movement (TODO 8) | Both movement styles work, with the vignette and reduced motion respected |
| 13 | Step 9: the scene description (TODO 9) | A screen reader hears the complete, current room state |
| 14 | Step 10: wiring the last controls (TODO 10) | The checkbox and radios change behaviour end to end |
| 15 | Testing: keyboard, reduced motion, and VR if available | Work through `tests/checklist.md` |
| 16 | One challenge extension, then Submitting your work | Your screenshots and `design-rationale.md` are ready |

### Step 1: building a panel (TODO 1)

A spatial panel starts as an ordinary HTML `<canvas>`, drawn on with the same 2D drawing API as any web page's canvas, then wrapped in a `THREE.CanvasTexture` so three.js can paint it onto a `PlaneGeometry`. Nothing about this is XR-specific: it is the same technique used for dashboards, labels, and signs in any three.js scene.

```js
const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
```

### Step 2: drawing legible text (TODO 2)

Draw with the canvas's ordinary 2D context (`fillText`, `fillRect`), sized relative to the canvas's own pixel width so the panel scales sensibly at any physical size. Call `texture.needsUpdate = true` after every redraw, or the GPU keeps showing the old pixels.

### Step 3: angular size (TODO 3)

Two panels of the same pixel resolution can still be very differently readable, because what actually matters is how large they appear from where you are standing: their **angular size**, in degrees. `2 * atan((height / 2) / distance)` gives that angle from a physical height and a viewing distance — the same panel at 2.5 m subtends a much smaller angle than at 0.6 m, with not one pixel of its texture changed.

### Step 4: world-locked placement (TODO 4)

World-locked content sits at one fixed point in the room, the way this lesson's progress kiosk always does. Nothing needs to update it every frame, because by definition it does not move.

### Step 5: body-locked placement (TODO 5)

Body-locked content follows the learner, but only their left-right facing (**yaw**), never their pitch or roll — so looking up or down does not tip a body-locked panel over. `camera.getWorldDirection()` and `Math.atan2(direction.x, direction.z)` give that heading, whether or not a WebXR session is currently overriding the camera's own transform.

### Step 6: switching lock modes (TODO 6)

An `Object3D` can only have one parent, so switching modes means detaching first. View-locked content becomes a child of the camera itself (`camera.add(object)`); the other two modes attach it to the scene instead. Try each mode on the goals panel and read "Key code explained" below for the comfort trade-off between them.

### Step 7: picking a waypoint with a pointer (TODO 7)

Every waypoint already has a real `<button>` (built in `main.js`), which is enough on its own for keyboard and screen-reader use. TODO 7 adds a second, direct way to reach the same three spots: clicking or tapping their floor markers, using a `THREE.Raycaster` built from the pointer's position and the camera.

### Step 8: teleport and smooth movement (TODO 8)

Teleporting jumps instantly, hidden by a brief fade; smooth movement interpolates continuously over about 700ms, with a comfort vignette shown the whole time. Reduced motion skips both effects entirely and cuts straight to the destination.

### Step 9: the scene description (TODO 9)

Build one paragraph, from the same numbers the room is built from, covering what is in the room, the current waypoint and its angular size, how the goals panel is locked, and whether a headset is currently active.

### Step 10: wiring the last controls (TODO 10)

Connect the "move smoothly" checkbox and the three lock-mode radio buttons to `app.setSmooth()` and `app.setGoalsLockMode()`. This is the last piece: once it is done, every control on the page does something.

## Key code explained

- **`CanvasTexture` and `needsUpdate`**: a texture built from a live canvas, not a static file, so redrawing the canvas and setting `texture.needsUpdate = true` is enough to update what is shown in 3D — no new geometry, no reload.
- **Angular size**: `2 * atan((height / 2) / distance)`. This is the actual, distance-aware measure of legibility this lesson uses instead of a single fixed "minimum font size", because the same panel's readability changes with where you stand, not just how it was drawn.
- **The movement rig**: reading three.js r186's `WebXRManager` source shows that once a session is active, `camera.position` is overwritten every frame from the tracked headset pose combined with `camera.parent.matrixWorld`. Setting `camera.position` directly (which works before a session starts) does nothing once presenting. This lesson solves that by parenting the camera to a `Group` (a "rig" or "dolly") and moving the *rig's* position during teleport while presenting — the transform that genuinely gets multiplied in.
- **`camera.getWorldPosition()` / `getWorldDirection()`**: used instead of reading `camera.position` and `camera.rotation` directly, because those return values relative to the camera's parent (the rig), which is not the same as world space once the rig has moved. The `getWorld…` methods always return true world-space values, in or out of a session.
- **Lock-mode re-parenting**: `object.parent.remove(object)` before attaching anywhere else. Three.js does not warn if you skip this; the object simply stays wherever it already was, silently, which is a confusing bug to track down later.

## 3D and XR accessibility

This lesson is 3D throughout, so it has no single "3D moment": every panel, teleport, and lock mode must already meet the requirements below, not just one page section.

- Every panel's information also exists as plain HTML text (the phase list, the goals list, the scene description): nothing is spatial-only.
- Every teleport and lock-mode change is also a real `<button>`, `<input type="radio">`, or `<input type="checkbox">`, reachable and operable by keyboard alone.
- Reduced motion turns off the fade and vignette entirely and cuts instantly, both for teleporting and for smooth movement.
- The camera only ever moves because the learner dragged it, used the arrow keys, or chose a waypoint — never automatically.
- Teleporting works the same way, through the same buttons, whether presenting in VR or not (see "Key code explained").
- Every waypoint and panel stays within a seated, forward-facing, comfortable reach; nothing requires standing or turning all the way around.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why | How this lesson meets it |
| --- | --- | --- | --- |
| Text alternative for the 3D scene | 1.1.1 | A canvas is invisible to assistive technology | `#scene-description`, rebuilt from the same data as the room |
| Full information available as text | 1.3.1 | The picture is never the only copy of the facts | The phase list and goals list duplicate the kiosk and goals panel |
| Keyboard operability | 2.1.1 | Not everyone uses a mouse, touch, or a VR controller | Every action has a real, focusable HTML control |
| Visible focus | 2.4.7 | Keyboard users need to see where they are | Inherited from this repo's global `:focus-visible` style |
| No unrequested motion | 2.3.3, 2.2.2 | Vestibular disorders and motion sickness | The camera and player only move on request; reduced motion removes fades and the vignette |
| Accessible names start with the visible label | 2.5.3 | Voice-control users speak the visible text | Buttons and labels use plain, matching wording |
| Live status updates | Good practice | Screen-reader users should hear results without losing their place | `#move-status` and `#xr-status` use `role="status"` |

## Performance considerations

- Two panels means two canvases and two textures: cheap compared to the loaded glTF models arriving in Web3D Developer, but redraw them only when their data actually changes (`redrawGoalsPanel` is called after every add/remove, not on every frame).
- `applyBodyLock` runs once per frame only while the goals panel is in body-locked mode; it is skipped entirely in world- and view-locked mode, since neither needs a per-frame update.
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`, carried over from 4.1, caps unnecessary GPU work on high-density phone and tablet screens.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Forgetting `texture.needsUpdate = true` | The canvas changes, but the panel keeps showing old text | Set it at the end of every redraw function |
| Reading `camera.position` during an XR session | Gets a value relative to the rig, not the real world position | Use `camera.getWorldPosition()` |
| Attaching an object to a new parent without detaching first | It silently fails to move, or ends up in two places | Always `parent.remove(object)` first |
| Making everything view-locked because it is easiest to read | Feels intrusive and tiring within seconds | Reserve view-locked for short-lived, urgent content only |
| A teleport or smooth-move animation that ignores reduced motion | Fails the comfort requirement and can trigger real discomfort | Check `window.__reducedMotion` before choosing an effect, every time |

## Troubleshooting

**The panels are plain grey rectangles with no text.** TODO 1/2 are not filled in yet, or `texture.needsUpdate` was never set to `true` after drawing.

**The goals panel spins or jitters as I turn.** Check TODO 5 uses `atan2(direction.x, direction.z)` for yaw only — using the full `camera.quaternion` instead also copies pitch and roll.

**Teleporting works on desktop but not while presenting in VR.** Confirm `app.setPresenting(true)` is running (check `xr.js`'s `sessionstart` listener) and that the teleport code moves the rig, not `camera.position`, while presenting.

**Firefox or Safari:** Firefox calls the Elements panel "Inspector". Safari needs the Develop menu enabled in Preferences → Advanced before its own Web Inspector is available.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth waypoint at a distance this lesson does not test, and read what happens.
2. **[Creative](challenges/challenge-2.md)**: make the room's content your own.
3. **[Explorer](challenges/challenge-3.md)**: add a fourth, hand-relative lock mode, connecting back to 4.2's controller and hand tracking.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of the room from each of the three waypoints, and of the goals panel in each of its three lock modes.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: which of the three lock modes did you personally find least comfortable to use for more than a few seconds, and why do you think that was?

## Further reading

- [Meta Horizon OS: Panels](https://developers.meta.com/horizon/design/panels/) — a working platform's guidance on panel sizing, read cautiously as one data point, not a universal rule.
- [Meta Horizon OS: Comfort](https://developers.meta.com/horizon/design/comfort/) — locomotion and motion-discomfort guidance, including favouring teleporting over continuous movement.
- [Android XR: Scale, sizes, and visual design](https://developer.android.com/design/ui/xr/guides/visual-design) — a different platform's own default panel distance, useful for seeing that these numbers vary.
- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/) — the standards document behind this repo's manual XR accessibility checks.
- [MDN: `CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) — the 2D drawing API this lesson's panels are built with.

## Women to Know

**Clarisse Sieckenius de Souza** is a Brazilian HCI researcher, now Professor Emerita at PUC-Rio, who co-created Semiotic Engineering, the first semiotic theory of human-computer interaction to come out of computer science. She founded PUC-Rio's Semiotic Engineering Research Group and was inducted into the ACM SIGCHI CHI Academy in 2013.

Every choice in this lesson — where a panel sits, how it is labelled, what it silently communicates by staying put or by following you — is exactly the kind of question her field studies: not just whether an interface works, but what it says to the person using it, and how they come to understand that without being told directly.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The **WebXR Device API** underneath this lesson's "Enter VR" button is published by the W3C's Immersive Web Working Group, the same specification used in 4.1. There is no single W3C standard for spatial UX layout itself: the **W3C XR Accessibility User Requirements (XAUR)**, a Group Note rather than a Recommendation, sets accessibility expectations for spatial interfaces without prescribing a specific design system, which is why this lesson instead draws on individual platforms' own published design guidance (Meta Horizon OS, Android XR) and is explicit about treating those numbers as a starting point rather than a standard.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
