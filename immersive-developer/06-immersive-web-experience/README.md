# Phase 4 Capstone: Immersive Web Experience

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `immersive-developer` · **Lesson:** `immersive-web-experience-06` · **Time:** about 22 hours · 30 sessions of 45 minutes · about 8 weeks at 4 sessions a week

---

> Publish a complete XR experience usable with and without a headset.

---

## Learning objectives

By the end of this project you will be able to:

1. Combine four already-built WebXR subsystems — VR entry, input, accessibility and ethics fixes, and spatial audio — into one working page, integrating instead of rewriting.
2. Request an `immersive-vr` session from a real click, apply comfort while presenting, and report a play-space boundary honestly, including when none is reported.
3. Give every XR interaction — select, grab, place — a keyboard-reachable, on-screen equal, so nothing here requires owning a headset to try.
4. Apply an ethics fix that explains a sensor-using feature before it ever asks for permission, and never stores or shows what it senses.
5. Anchor a caption to the visitor rather than to a point in the 3D world, in both a flat page and inside a VR session.
6. Build a scene description and a 2D twin from one shared state object, so neither can fall out of sync with the other.
7. Read a brief and a rubric before building, and test across a stated matrix: desktop, phone, an emulator, and a headset if one is available.
8. Write release notes that describe what a shipped version actually contains, including what was not tested.

## Prerequisites

- **Course 4.1: WebXR Foundations** through **Course 4.5: Spatial Audio, Media, and Presence** (this capstone's reference solution reuses 4.1, 4.2, 4.4, and 4.5's ideas directly, as finished code in the starter; 4.3's world-locked and body-locked placement ideas are assumed, not separately demonstrated here).
- Comfort reading and extending existing JavaScript modules across several files, rather than writing a 3D scene from nothing.
- A three.js project you can run through a local server, as every lesson so far has been.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser (Chrome, Firefox, Edge, or Safari) | Runs the exhibit and its WebGL 2 canvas. | Free |
| A local static file server (e.g. `python3 -m http.server`, or VS Code's Live Server) | Serves the page over `http://`, which ES modules require. | Free |
| A text editor (e.g. VS Code) | Editing HTML, CSS, and JavaScript. | Free |
| Browser DevTools (built into every browser above) | The Console, for errors; device emulation, for the testing matrix. | Free |
| A WebXR emulator browser extension (optional; e.g. "Immersive Web Emulator") | Lets you test Enter VR without owning a headset. | Free |
| A VR headset (optional) | Lets you test the real Enter VR path and its play-space boundary. | Not required |

No paid accounts, no API keys, and no service that is blocked in mainland China are used anywhere in this lesson.

## What you will build

The Phase 4 capstone: one page combining everything 4.1 through 4.5 taught, continuing the same three.js exhibit (a clay pot, a woven basket ring, and a jade stone) since web3d-developer/04-threejs-foundations. Enter VR (4.1) requests a real session, with comfort and a play-space boundary report. Selecting, grabbing, and placing a marker (4.2) each work by controller, by squeeze, and by an on-screen, keyboard-reachable button. The accessibility and ethics fixes from 4.4 stay in force: captions anchored to the visitor, a full keyboard route, and a camera-based "Personalize" feature that explains itself before it ever asks for permission. Spatial audio and captions (4.5) give each pedestal its own sound, a caption bar, and a transcript that is complete before anyone presses play.

The reference solution is in [`completed/`](completed/). It has 8 numbered TODOs across `starter/index.html` and `starter/js/main.js` — everything else in the starter (`js/app.js`, `js/exhibit.js`, `js/describe.js`, `js/xr.js`, `js/interact.js`, `js/presenter.js`, `js/audio-captions.js`) already works, because this capstone is about integration, not building a 3D scene from nothing. Read [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md) before you start.

Later, once "My XR Camp" (2.1-2.3) has a place for it, this capstone exhibit is the kind of project a learner journal or portfolio entry would link to — keep your screenshots and your `CHANGELOG.md` somewhere you can find them again.

## Folder guide

```text
06-immersive-web-experience/
├── README.md
├── ATTRIBUTION.md
├── starter/                 # begin here: brief.md, rubric.md, and 8 numbered TODOs
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── completed/               # reference solution
│   ├── index.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── challenges/          # Three challenges: Foundation is required
├── tests/                    # self-review checklist
├── assets/                   # three pedestal sounds and a caption file, reused from 4.5
└── screenshots/
```

## Setup

1. Open this folder in your editor.
2. Start a local server at the repository root (for example `python3 -m http.server 8766`), so the page is served over `http://`, not opened as a `file://` path.
3. Open `starter/index.html` through that server.
4. Read [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md) fully before you write any code.
5. Confirm the starter already runs: three pedestals and a still avatar load, the exhibit list shows a Select button per exhibit, and Select, Pause, and Reload all work. That is 4.1-4.5's finished engine; nothing here is broken before you start.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read `brief.md` and `rubric.md`; skim 4.1, 4.2, 4.4, and 4.5's completed folders for what this capstone reuses. | A clear picture of which finished file does which job. |
| 2 | Set up the starter and confirm the engine runs unchanged. | Three pedestals and an avatar loading, Select working, in your browser. |
| 3 | Read `js/xr.js`, `js/interact.js`, `js/presenter.js`, and `js/audio-captions.js` in full. | Notes on what each file owns, so you integrate instead of rewriting. |
| 4 | Step 3: add the `#boundary-status` markup (TODO 1). | An empty but present boundary paragraph under Enter VR. |
| 5 | Step 4: wire `isVRSupported()` and `enterVR()` (TODO 2). | A working Enter VR button, its support note, and a boundary report. |
| 6 | Test the Enter VR path with a WebXR emulator or by reading the disabled-button message on a device without support. | Proof the button behaves correctly either way. |
| 7 | Step 5: add the `#place-marker` button (TODO 3). | A visible Place marker button in the Controls section. |
| 8 | Step 6, part 1: extend each exhibit's list item with Grab and Play narration buttons (TODO 4, part 1). | Three exhibits, each with three buttons. |
| 9 | Step 6, part 2: wire the Grab, Play, and Place marker clicks (TODO 4, part 2). | Grabbing turns an exhibit; Place marker adds a marker; both announce what happened. |
| 10 | Keyboard-only pass: Tab to every button added so far and confirm each one works the same way. | Proof every new control has a full keyboard route (4.2). |
| 11 | Step 7: add the Personalize section's explanation, consent button, and result paragraph (TODO 5). | A Personalize section that explains itself, with no working button yet. |
| 12 | Step 8: wire the consent click to `requestPersonalize()` (TODO 6). | A Personalize button that only ever asks for the camera after that click. |
| 13 | Test Personalize three ways: allow it, deny it, and (in a browser DevTools flag) simulate no camera support. | Three honest result messages, none of them a crash. |
| 14 | Step 9: add the caption bar and transcript markup (TODO 7). | An empty caption bar and an empty transcript list, both visible. |
| 15 | Step 10, part 1: build the transcript from `transcriptLines()` (TODO 8, part 1). | All three captions listed, before any narration has played. |
| 16 | Step 10, part 2: write `setCaption()` and call it from the Play narration branch (TODO 8, part 2). | Pressing Play narration updates the caption bar and plays its sound. |
| 17 | Step 10, part 3: attach and detach the caption HUD mesh on VR start and end (TODO 8, part 3). | The caption moves from the page to the headset's view, and back. |
| 18 | Confirm `#scene-description` updates correctly for every state: selection, grab, marker, and VR status. | A description that never says something the page does not show. |
| 19 | A reduced-motion pass: confirm a grabbed exhibit's turning starts paused when the OS asks for it, and that Pause always states what it will do next. | Reduced motion behaving correctly in your browser's emulation. |
| 20 | Test at 390 px and 1280 px; fix any horizontal overflow. | A page that works at both widths. |
| 21 | Test the no-WebGL fallback path (disable WebGL, or use DevTools to simulate it). | Confirmation that the exhibit list and transcript still carry every fact. |
| 22 | Build this README's testing matrix (see below) from what you actually tested. | A completed, honest testing matrix. |
| 23 | Step 11: write `CHANGELOG.md`'s `1.0.0` entry. | A release note describing what your capstone actually ships. |
| 24 | Re-read your own code and comments for intent, not just correctness. | Comments that explain why, not only what. |
| 25 | Work through `tests/checklist.md` end to end. | Every box checked, or a fix for each one that is not. |
| 26 | Confirm every row in `starter/rubric.md` against your own build. | The Foundation challenge (the eight TODOs) fully complete. |
| 27 | Choose Creative or Explorer, and start it. | A first working version of your chosen extension. |
| 28 | Finish your chosen challenge; update `CHANGELOG.md` if you changed anything. | The extension complete and documented. |
| 29 | A full keyboard-only pass across every control on the page, one more time. | Every interaction confirmed reachable and usable without a mouse. |
| 30 | Final submission: screenshots, the checklist re-checked, and your journal question answered. | A capstone ready to submit. |

### Step 1: read the brief and the rubric

Open [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md). Like web3d-developer/07's capstone, this one starts with a brief and a rubric, not a blank page — reading both before writing any code is itself part of the skill this lesson teaches.

### Step 2: tour the starter's finished engine

Open `starter/js/app.js`, `js/exhibit.js`, and `js/describe.js` (the pedestals, the exhibit data, and the scene-description builder — unchanged since earlier lessons), then `js/xr.js` (4.1), `js/interact.js` (4.2), `js/presenter.js` (4.4), and `js/audio-captions.js` (4.5). All seven are finished. Your work in this capstone lives in `starter/index.html` and `starter/js/main.js` only.

### Step 3: the boundary status markup (TODO 1)

In `starter/index.html`, find TODO 1 inside the Enter VR section and add a paragraph with `id="boundary-status"` and `class="scene-text"`, starting empty. `js/xr.js`'s `enterVR()` already reports the play-space boundary through an `onBoundary` callback; Step 4 writes that report here.

### Step 4: wiring Enter VR (TODO 2)

In `starter/js/main.js`, find TODO 2. Call `isVRSupported()` once, on load, to enable the Enter VR button or explain in `#vr-support-note` why it stays disabled. On click, call `enterVR(app, { onStart, onEnd, onBoundary })`: `onStart` sets `state.xrActive = true` and calls `updateDescription()`; `onBoundary` writes a plain sentence into `#boundary-status`, saying how many points were reported, or that none were. Wrap the click handler's body in `try`/`catch`, since `requestSession()` can reject.

### Step 5: the Place marker button (TODO 3)

In `starter/index.html`'s Controls section, find TODO 3 and add a button with `id="place-marker"`, labelled "Place marker" — the 2D/keyboard equal of 4.2's AR hit-test placement, for anyone without a phone or headset that supports it.

### Step 6: Grab, Play narration, and wiring them (TODO 4)

In `starter/js/main.js`, find TODO 4 in two places: first, extend each exhibit's list-item template (next to the existing Select button) with a Grab button (`data-grab`, `aria-pressed="false"`) and a Play narration button (`data-play`). Second, in the click handler below it, add an `else if (btn.dataset.grab)` branch calling `setGrabbed(app, ...)`, and an `else if (btn.dataset.play)` branch calling `playNarration(sounds, ...)`. Also wire the Place marker button from Step 5 to `placeMarker(app)`.

### Step 7: the Personalize section's markup (TODO 5)

In `starter/index.html`, find TODO 5 and add: a paragraph explaining exactly what this feature does and does not do with the camera; a button with `id="personalize-consent"`; and a paragraph with `id="personalize-result"` and `role="status"`. This is 4.4's fix for a starter that used to take a photo without asking — explain, then ask, in that order.

### Step 8: wiring Personalize (TODO 6)

In `starter/js/main.js`, find TODO 6. Add a click listener on the button from Step 7 that calls `await requestPersonalize()` and writes one of four plain messages into `#personalize-result`, depending on whether access was granted, denied, unsupported, or failed for another reason. `requestPersonalize()` already stops the camera immediately after checking it; never call it from anywhere except this click.

### Step 9: the caption bar and transcript markup (TODO 7)

In `starter/index.html`, find TODO 7 and add the caption-bar section (a visually-hidden heading plus `#caption-text`, `role="status"`) and the transcript section (a heading plus an empty `#transcript` list). This is 4.5's caption, anchored to the visitor rather than to a point in the world — the fix 4.4's audit asked for.

### Step 10: wiring captions and the transcript (TODO 8)

In `starter/js/main.js`, find TODO 8 in three places: build the transcript from `transcriptLines()` so it is complete before anything plays; write a `setCaption(text)` helper that updates `#caption-text` and calls `captionHud.setText(text)`, called from Step 6's Play narration branch; and, inside `enterVR()`'s `onStart`/`onEnd` callbacks, attach and detach `captionHud.mesh` to `app.camera`, hiding and showing `#caption-bar` to match.

### Step 11: the testing matrix

Fill in the table under "Performance considerations" below with what you actually tested this capstone on: your desktop browser, a phone (even without WebXR, to confirm the 2D path), a WebXR emulator if you used one, and a real headset if you have access to one. Write "not tested" honestly where it applies — an honest gap is more useful to the next person than a guess.

### Step 12: release notes and a final accessibility pass

Write `CHANGELOG.md`'s `1.0.0` entry: what shipped, and any known limitation (for example, hardware you could not test on). Then read `#scene-description`'s text aloud, confirm every live region (`role="status"`) announces once per change, and confirm heading order is unbroken. A capstone is where every accessibility habit from four earlier lessons has to hold at once.

## Key code explained

- **`js/xr.js`'s `enterVR()`** requests the session only from inside a real click handler (a user activation), because the WebXR Device API silently rejects `requestSession()` calls made any other way. It also disables `OrbitControls` for comfort: once a headset owns the camera, a mouse-drag view would fight it.
- **`js/interact.js`'s controller ray and squeeze events** are one way into `selectExhibit()` and `setGrabbed()` — the same functions the on-screen Select and Grab buttons call. Neither path is a fallback for the other; both are equally real routes into the same state.
- **`js/presenter.js`'s `requestPersonalize()`** calls `getUserMedia()` only from an explicit click, and stops every track immediately after the permission prompt resolves. It never renders a preview, because this demo needs to know whether access was granted, not what the camera saw.
- **`js/audio-captions.js`'s `createCaptionHud()`** draws a caption onto a `<canvas>`-backed `CanvasTexture`, on a plane added as a child of the camera rather than the scene — so it always sits in the same place in the visitor's view, in front of them, however they turn their head.
- **`buildSceneDescription()`** reads the same `app` and `state` objects every button handler already updates, so the description can never describe a selection, a grab, or a VR session that is not actually the current one.
- **The eight numbered TODOs are all in `index.html` and `main.js`**, never in `app.js`, `xr.js`, `interact.js`, `presenter.js`, or `audio-captions.js`. A capstone that integrates already-working code is a more realistic skill than starting from nothing each time.

## 3D and XR accessibility

This capstone is 3D throughout, continuing 4.1-4.5's exhibit, so its accessibility work is not one moment inside a 2D page — it is the whole page. Every requirement below was already taught in an earlier Immersive Developer lesson; this capstone's job is making sure all of them still hold once every subsystem is combined.

- The scene description updates for selection, grab, marker placement, and VR/boundary status (`js/describe.js`).
- The exhibit list and transcript carry the same facts as the 3D view and the caption bar, so no fact exists only inside the canvas.
- Every interaction has a keyboard route: Select, Grab, Play narration, Place marker, Pause, Reload, Enter VR, and Personalize, none of which require a pointer or a controller.
- Reduced motion is respected: a grabbed exhibit's turning starts paused when the OS asks for it, and Pause always states what it will do next.
- The caption is anchored to the visitor (a DOM bar on a screen, a camera-attached HUD plane in VR), never to a fixed point in the 3D world.
- The camera never moves on its own; only the learner's drag, or a headset's own tracking, moves it.
- The Personalize feature explains itself before it ever asks for camera access, and never stores or displays what the camera sees.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `#status`, `#boundary-status`, `#caption-text`, and `#personalize-result` use `role="status"` where they announce a change | 4.1.3 (Status Messages) | A screen-reader user hears what just happened without needing to move focus to find out. |
| Every button's accessible name starts with its visible word ("Select: Jade stone") | 2.5.3 (Label in Name) | A voice-control or screen-reader user can activate a button by the word they see. |
| The Personalize feature asks for consent before requesting camera access, and explains what it does first | Good practice (XR Accessibility User Requirements: informed consent) | A visitor should never be surprised by what a sensor-using feature does with their camera. |
| Focus is visible on every control | 2.4.7 (Focus Visible) | This project's `:focus-visible` outline must show on every button, old and new. |
| Reduced motion stops the grabbed exhibit's turning | 2.2.2 (Pause, Stop, Hide) | The exhibit's own animation starts paused when the OS asks for less motion, exactly as 4.4 fixed it. |
| `role="list"` on every list styled with `list-style: none` | Good practice (Safari drops list semantics otherwise) | The exhibit list and the transcript both stay announced as lists. |

## Performance considerations

This capstone's testing matrix, filled in from what was actually tested for this reference solution:

| Target | Tested? | Result |
| --- | --- | --- |
| Desktop browser (Chrome, integrated graphics) | Yes | Runs at 60 fps; no console errors; Enter VR correctly reports "not supported" without a headset. |
| Desktop browser, no WebGL 2 (simulated) | Yes | Exhibit list and transcript remain fully readable; 3D panel and its controls hide cleanly. |
| Phone browser (no WebXR) | Yes | The 2D path (Select, Grab, Play narration, Place marker, Personalize) works fully by touch. |
| WebXR emulator extension | Not tested for this release | See `CHANGELOG.md`'s known limitations. |
| Real VR headset | Not tested for this release | See `CHANGELOG.md`'s known limitations. |

Replace this table with your own results once you complete Step 11 — an honest "not tested" is more useful than a guess about hardware you do not have.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Calling `requestSession()` from a promise chain instead of directly inside the click handler | The browser silently rejects it, with no useful error | Call `enterVR()` as the very first line of the click handler's body |
| Wiring Grab and Play narration only inside the click handler's `if (btn.dataset.select)` branch | Grabbing and playing narration never work, even though the buttons exist | Add separate `else if` branches for `btn.dataset.grab` and `btn.dataset.play` |
| Calling `requestPersonalize()` on page load "to check support early" | The browser prompts for camera access before the visitor has read what it is for | Call it only from the consent button's click handler, exactly once per click |
| Adding the caption HUD mesh to the scene instead of the camera | The caption stays fixed in the 3D world and can end up behind the visitor | `app.camera.add(captionHud.mesh)`, not `app.scene.add(...)` |
| Writing the testing matrix from memory instead of actually testing each row | The README claims coverage nobody checked | Test each row, or mark it "not tested" honestly, as this lesson's own table does |

## Troubleshooting

**Enter VR stays disabled even on a device I know supports WebXR.** `isVRSupported()` can resolve `false` on `http://` origins other than `localhost` or `127.0.0.1` — some browsers require a secure context. Confirm you are serving from exactly the address the brief names.

**Grab does nothing when I click it.** Check TODO 4's click-handler branch was added as a **separate** `else if`, not appended inside the existing `if (btn.dataset.select)` block — a common copy-paste mistake.

**The caption never appears in VR, only on the page.** Confirm TODO 8's `onStart` callback calls `app.camera.add(captionHud.mesh)` — without it, `setText()` updates a texture nothing in the scene is showing.

**Firefox:** WebXR support varies by build; check `about:config` for `dom.vr.webxr.enabled` if `isVRSupported()` unexpectedly resolves `false`.

**Safari:** does not yet support the WebXR Device API on most platforms; `#vr-support-note` will correctly explain this, and every other control still works.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: finish the eight numbered TODOs so all four combined subsystems work together.
2. **[Creative](challenges/challenge-2.md)**: replace one exhibit with something from your own culture, community, or language.
3. **[Explorer](challenges/challenge-3.md)**: build a real `immersive-ar` hit-test session, keeping the 2D "Place marker" button as its equal.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) end to end, including the "3D and XR (manual)" section.
2. Take two or three screenshots: the exhibit with an item selected and held, and the Enter VR panel showing its support note or boundary report.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: which of the four combined lessons (4.1, 4.2, 4.4, 4.5) took the most care to wire in correctly, and what almost went wrong?

## Further reading

- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [W3C: WebXR Hit Test Module](https://www.w3.org/TR/webxr-hit-test-1/)
- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/)
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

## Women to Know

Ayşegül Yönet is a W3C Invited Expert and co-chair of the W3C Immersive Web Working Group (with Ada Rose Cannon and Chris Wilson), the group that develops the WebXR Device API this entire capstone is built on — the same `navigator.xr.requestSession()` call `js/xr.js` uses. She has been a Senior Cloud Developer Advocate at Microsoft focused on spatial computing and WebXR, is a Google Developer Expert in Web Technologies, co-hosts the San Francisco WebXR Meetup, and teaches the Frontend Masters course "3D on the Web & WebXR".

A capstone that combines Enter VR, controller input, and hit-test placement into one page depends entirely on the WebXR Device API staying a stable, cross-browser standard rather than a set of incompatible vendor APIs — the exact work Yönet's working group does. Reading a spec before using an API, the way `js/xr.js`'s comments point back to the WebXR Device API's own rules about user activation, is a small daily habit that keeps this kind of standards work visible.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Every subsystem this capstone combines rests on one W3C standard: the WebXR Device API (`navigator.xr`), developed by the Immersive Web Working Group, with the WebXR Hit Test and Augmented Reality Modules extending it for surface placement. The Working Group publishes these and other WebXR modules, including the Hand Input and Depth Sensing Modules, as Working Drafts on the Recommendation track. A capstone that "just works" across a phone, a headset, and a plain screen is quietly resting on that one API staying the same everywhere it runs.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
