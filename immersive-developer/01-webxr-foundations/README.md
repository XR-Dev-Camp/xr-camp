# WebXR Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `immersive-developer` · **Lesson:** `webxr-foundations-01` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Create a WebXR-capable experience with desktop and mobile fallbacks.

---

## Learning objectives

By the end of this project you will be able to:

1. Feature-detect WebXR with **`navigator.xr.isSessionSupported()`**, and treat "not supported", "not allowed", and "no such API" as one calm fallback.
2. Explain what a **secure context** is, and why WebXR needs one.
3. Turn on WebXR support in three.js with **`renderer.xr.enabled`**, and choose a **reference space** with `renderer.xr.setReferenceSpaceType()`.
4. Request and end an **immersive-vr session** with `navigator.xr.requestSession()` and `session.end()`, and explain why the request must happen inside a user gesture.
5. React to **`sessionstart`** and **`sessionend`**, the events three.js's own `renderer.xr` dispatches, and keep your engine, your button, and a live status region all agreeing about which mode the page is in.
6. Reuse a render loop for both the desktop view and WebXR, using **`renderer.setAnimationLoop`**.
7. Build a graceful fallback: the exhibit's 2D and 3D view keeps working fully, with no headset, no WebXR support, or an insecure connection.
8. Design for **seated mode**: keep interactive objects within a comfortable, reachable, forward-facing view, with no forced standing or turning around.
9. Test a WebXR feature without owning a headset, using the free **Immersive Web Emulator** browser extension, and know what to expect on an ordinary phone.
10. Read a library's own source (three.js's `VRButton.js`) to check what an API call really does, rather than guessing.

## Prerequisites

- **Web3D Developer, Three.js Foundations (3.4)**: this lesson's starter is 3.4's completed exhibit. You should already be comfortable with `WebGLRenderer`, `OrbitControls`, and `renderer.setAnimationLoop`.
- **A-Frame Foundations and Advanced A-Frame (3.2-3.3)** and **Performance Engineering for Web3D (3.6)**, if completed, are helpful background but not required.
- **My XR Camp**, Phase 2's own small app (course map, dashboard, session planner): the same idea of building one thing across several lessons continues here, with the virtual exhibit going into VR.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A Chromium-based desktop browser (Chrome or Edge) | WebXR support and DevTools | Free |
| The [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) browser extension | Testing VR sessions without owning a headset | Free |
| A VR headset (optional) | Real-device testing, if you have access to one | Varies; not required |
| A local server | Modules, import maps, and WebXR itself need `http://` | Free |

The Immersive Web Emulator is open source (MIT licence) and installs from the Chrome Web Store or the Microsoft Edge Add-ons store; both work the same way. If neither store is reachable where you are, the project's GitHub page (`meta-quest/immersive-web-emulator`) also explains installing it from an unpacked release. The `three` library loads from `cdn.jsdelivr.net`; if that is slow or blocked, download the pinned files once where they work and change the import map to point at your own copy.

## What you will build

The exhibit you built in three.js in 3.4 becomes **WebXR-capable**: an "Enter VR" button appears whenever the browser and device support it, a click steps you into the exhibit at full size with a headset, and everything else keeps working exactly as before for everyone else. This is the exhibit's first step into Phase 4, where it goes from a picture on a screen to something you can stand, or sit, inside.

The reference solution is in [`completed/`](completed/). The starter is 3.4's finished exhibit with one new file, `js/xr.js`, and small additions to three others: eight TODOs in total.

## Folder guide

```text
01-webxr-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page, controls, and Enter VR panel (finished)
│   └── js/
│       ├── app.js                # The engine, from 3.4: TODOs 2-3
│       ├── exhibit.js            # The objects, from 3.4 (finished)
│       ├── describe.js           # The description: TODO 7
│       ├── xr.js                 # New: entering and leaving VR. TODOs 1, 4-5
│       └── main.js               # Wiring the page: TODO 6, TODO 8
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the starter into your `virtual-exhibit` folder, alongside your 3.1-3.4 work, and commit it with Git.
2. Start your local server, and open `index.html`. The desktop exhibit works exactly as it did at the end of 3.4. The "Enter VR" panel reads "Checking whether this browser and device support VR…" and goes no further until you finish the TODOs.
3. Install the Immersive Web Emulator browser extension now, so it is ready by the time you reach the testing sessions.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup: copy 3.4's completed exhibit in as this lesson's starter | The unchanged desktop exhibit, plus an empty "Enter VR" panel |
| 2 | Step 1: `'xr' in navigator` (TODO 1, part 1) | `supportsImmersiveVR()` returns `false` on a browser with no WebXR API |
| 3 | Step 1, continued: `isSessionSupported('immersive-vr')` (TODO 1, part 2) | It correctly reports `true` or `false` on a browser that does have the API |
| 4 | Step 2: `renderer.xr.enabled` (TODO 2, part 1) | WebXR is switched on (no visible change yet) |
| 5 | Step 2, continued: `renderer.xr.setReferenceSpaceType('local-floor')` (TODO 2, part 2) | You can explain what a reference space is |
| 6 | Step 3: pausing `OrbitControls` while presenting (TODO 3) | `setPresenting(true)` disables dragging and arrow keys |
| 7 | Step 4: resetting the view before every session (TODO 4, part 1) | You can explain why this matters for comfort |
| 8 | Step 4, continued: `requestSession` and `session.end()` (TODO 4, part 2) | Clicking the button (once shown) requests a real session |
| 9 | Step 5: `sessionstart` (TODO 5, part 1) | The button's text and `#xr-status` update the moment a session begins |
| 10 | Step 5, continued: `sessionend` (TODO 5, part 2) | Ending the session restores the button's text and the status message |
| 11 | Step 6: showing the button, or a fallback message (TODO 6) | The Enter VR button finally appears, or a clear reason why not |
| 12 | Step 7: the scene description in VR (TODO 7) | `#scene-description` changes its wording once you are in VR |
| 13 | Step 8: wiring it all into `main.js` (TODO 8) | A complete, working Enter VR panel |
| 14 | Testing with the Immersive Web Emulator | A real (emulated) VR session, viewed inside DevTools |
| 15 | Testing on a phone, and what "not supported" should look like | Confirmation that the 2D/3D fallback works everywhere |
| 16 | Seated-mode comfort review, against [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) | You can point to the exact lines that keep this exhibit seated-safe |
| 17 | [`tests/checklist.md`](tests/checklist.md) | A finished, WebXR-capable exhibit |
| 18 | One challenge extension | Your chosen extension |
| 19 | **Submitting your work** | The exhibit's first WebXR edition, ready for 4.2 |

### Step 1: feature detection (TODO 1)

`navigator.xr` only exists in browsers that implement the WebXR Device API at all. Even then, `navigator.xr.isSessionSupported('immersive-vr')` returns a promise that can resolve `false` (the API exists, but no immersive-vr device or runtime is available right now) or, on some browsers, reject outright for a disallowed or unimplemented mode. `supportsImmersiveVR()` treats all three outcomes as one thing: not supported, so the rest of the page has one clear question to answer, not three.

### Step 2: turning on WebXR, and choosing a reference space (TODO 2)

`renderer.xr.enabled` defaults to `false`. Without setting it to `true`, handing a session to `renderer.xr.setSession()` later would not draw anything into the headset. A **reference space** is the coordinate system the headset's tracking is measured against: `local-floor` places its origin at floor level, under wherever the camera was the moment the session starts, which is what a seated experience wants (see [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md)). Three.js's `WebXRManager` already defaults to `local-floor` internally, in this version; setting it explicitly says so in code a reader can see, instead of relying on a default nobody wrote down. This call only works before a session starts: three.js logs a warning and ignores it if called while presenting.

### Step 3: comfort - pausing `OrbitControls` while presenting (TODO 3)

`OrbitControls` does not know a headset exists. If it kept listening for drags and arrow keys while a headset is driving the camera from the wearer's own head movements, the two would fight over where the camera points. `setPresenting(true)` disables `controls.enabled`; `setPresenting(false)` turns it back on once the session ends. Exactly one thing drives the camera at any moment.

### Step 4: resetting the view, then requesting a session (TODO 4)

Whatever the camera's position and rotation are at the exact moment a `local-floor` session starts becomes that session's floor-level origin. A learner who had dragged the desktop view around before clicking "Enter VR" would otherwise put on the headset facing an arbitrary, possibly disorienting direction. Calling `app.resetView()` first guarantees the same seated-safe starting pose every time.

`navigator.xr.requestSession('immersive-vr', options)` must be called directly inside a genuine, still-active user gesture, such as a button's own `click` handler, with nothing awaited beforehand in that call chain: this is the WebXR Device API's **transient activation** rule, the same idea that stops background code from opening pop-ups. `optionalFeatures: ['local-floor', 'bounded-floor']` asks for both, without requiring either: the session must still work on a headset that offers neither a floor-level origin nor a tracked play area.

### Step 5: `sessionstart` and `sessionend` (TODO 5)

These two events are three.js's own: `renderer.xr` dispatches them once a session actually starts or ends. The raw WebXR `XRSession` object itself has no "start" event at all, only `'end'` (used to clear the local `session` variable in `xr.js`). Listening on `renderer.xr` rather than on the session keeps one place responsible for telling the engine, the button, and the live status region that the mode has changed.

### Step 6: showing the button, or explaining why not (TODO 6)

Checking `supportsImmersiveVR()` once, on page load, rather than only reacting when a button is clicked, means a learner without a headset never sees a button that would do nothing. `describeUnsupported()` in `xr.js` tells apart two different reasons for "no": an insecure connection (`window.isSecureContext` is `false`, so WebXR is unavailable regardless of the device) and simply having no compatible browser or headset. Every message also says the exhibit above still works fully without VR, because it does.

### Step 7: the scene description in VR (TODO 7)

`describeExhibit()` already told a screen-reader user what was in the exhibit and how to look around it. Now it also needs to say when looking around means turning your head, not dragging or pressing arrow keys, because a headset changes what those instructions mean. The `presenting` flag, read from `app.isPresenting()`, decides which sentence to add.

### Step 8: wiring it together in `main.js` (TODO 8)

`main.js` calls `supportsImmersiveVR()`, shows or hides `#xr-button` based on the result, calls `initXR()` when supported, and updates `#scene-description` on both `sessionstart` and `sessionend` so it never falls out of date. No three.js API and no WebXR API appears in `main.js` itself: it only reads results from `xr.js` and `app.js` and updates the page.

## Key code explained

**`navigator.xr.isSessionSupported(mode)`** returns a promise resolving to `true` or `false` for whether a session of that mode (`'immersive-vr'`, `'immersive-ar'`, or `'inline'`) can currently be created; it requires a secure context and can reject instead of resolving `false` on some browsers.

**`renderer.xr.enabled`** and **`renderer.xr.setReferenceSpaceType(type)`** must both be set before a session starts; changing the reference space type while presenting only logs a warning.

**`renderer.xr.addEventListener('sessionstart' | 'sessionend', handler)`** are three.js's own synthetic events, not part of the raw WebXR `XRSession` object, which has only `'end'`.

**`navigator.xr.requestSession('immersive-vr', { optionalFeatures })`** must be called synchronously inside a user gesture; `session.end()` ends it from your own code, and the headset's own system menu can end it too, firing the same `'end'` event either way.

**`renderer.setAnimationLoop(callback)`**, already used in 3.4 for the desktop render loop, needs no change at all for WebXR: once a session is handed to `renderer.xr.setSession()`, three.js starts calling the same callback once per XR frame instead of once per browser frame.

## 3D and XR accessibility

- The scene description (`#scene-description`) reflects whichever view is currently active, desktop or VR, and updates the instant a session starts or ends.
- The camera never moves on its own, on a screen or inside a headset: only the learner's own hand, arrow keys, or head movements move it.
- `local-floor`, plus the 1.6 m eye height and 4.2 m viewing distance already chosen in 3.4, keep the whole VR experience usable while seated, with nothing above head height or behind the viewer.
- Every action available in VR (looking around) has a full, equally capable alternative outside it: dragging, arrow keys, and the "Turn left"/"Turn right" buttons.
- The exhibit's information also lives in an always-present HTML list and an always-present text description, exactly as in 3.4, regardless of whether WebGL, WebXR, or a headset is available.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The Enter VR button's visible text always matches what it currently does | 2.5.3, 4.1.2 | "Enter VR" and "Exit VR" say exactly what will happen next, for sighted and screen-reader users alike. |
| `#xr-status` is a live region that announces session changes | Good practice | A learner who cannot see the headset view still hears that something changed. |
| Every XR action has a non-XR alternative | 2.1.1 | The entire exhibit is fully usable with a mouse, a finger, or a keyboard; VR is always optional. |
| The experience works seated, with nothing out of comfortable reach or above head height | Good practice | Not everyone can stand, reach high, or turn around freely. |
| The camera never moves unless the learner moves it, on a screen or in a headset | 2.2.2 | Unrequested motion is disorienting, and can cause real physical discomfort in VR. |
| The exhibit's contents exist as HTML, not only inside the canvas or a headset | 1.3.1 | The information is never lost when WebGL, WebXR, or a device is unavailable. |

## Performance considerations

Three.js's `WebXRManager` already handles the performance-sensitive parts of presenting for you: while a session is active, it sets the renderer's pixel ratio to `1` and resizes to the headset's own framebuffer, then restores your page's own pixel ratio and size the moment the session ends (verified in the r186 source: no code in this lesson needs to do either). What it does not do for you is anything about the scene itself: this exhibit is light enough (three primitive meshes, no textures) that stereo rendering, two views instead of one, costs little here. A heavier scene would need everything Phase 3's performance lesson (3.6) covers, doubly so once it is rendered twice a frame instead of once.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Forgetting `renderer.xr.enabled = true` | The session starts, but nothing draws into the headset | Set it once, in `app.js`, before any session can start |
| Calling `requestSession()` after an earlier `await` in the click handler | The browser rejects it: transient activation has expired | Call it as the first thing the handler does |
| Listening for a `'start'` event on the `XRSession` itself | Nothing happens; that event does not exist on the raw session | Listen for `'sessionstart'` on `renderer.xr` instead |
| Leaving `OrbitControls` enabled while presenting | Stray drags or key presses fight the headset's own tracking | `setPresenting(false)`'s opposite: disable it on `'sessionstart'` |
| Not resetting the view before requesting a session | The learner may start VR facing an arbitrary, disorienting direction | Call `app.resetView()` immediately before `requestSession()` |
| Assuming `isSessionSupported` resolving `true` guarantees a headset is plugged in right now | `requestSession()` can still fail | Always wrap `requestSession()` in try/catch and show its `error.message` |

## Troubleshooting

**The Enter VR button never appears, even in Chrome.** Check you are on `http://localhost` or `http://127.0.0.1`, not a plain network IP address: WebXR requires a secure context, and only those two count as secure without HTTPS. Check the Console for a rejected promise from `isSessionSupported`.

**Clicking Enter VR does nothing, with no error.** `renderer.xr.enabled` was probably never set to `true`. Check `app.js`.

**The status text never updates when a session starts.** Check the listener is attached to `renderer.xr`, not to the `session` object: only `renderer.xr` dispatches `'sessionstart'`.

**`requestSession` rejects with a security-related error.** The call happened too late, after an `await`, outside the click handler's own turn. Move it to the very first line inside `enterVR()`.

**The Immersive Web Emulator's panel is empty, or the page ignores it.** Reload the page after opening the extension's DevTools panel and choosing a device: the emulated `navigator.xr` is injected fresh on each page load. In Firefox, the extension is not available at all; use Chrome or Edge for this testing session.

**On my phone, the button never appears.** This is usually correct, not a bug: most phone browsers do not implement `immersive-vr` unless the phone is paired with a compatible headset (for example, through a standalone headset's own browser). The rest of the page should still work as the ordinary 2D/3D exhibit.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a second Enter VR button, kept in sync with the first.
2. **[Creative](challenges/challenge-2.md)**: rewrite the Enter VR panel's words for your own language or community, and optionally swap in an object from your own culture.
3. **[Explorer](challenges/challenge-3.md)**: compare your own code against three.js's `VRButton`, and feature-detect `immersive-ar` alongside `immersive-vr`.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: the desktop exhibit, the Enter VR panel before and after WebXR support is detected, and, if you tested with the Immersive Web Emulator or a headset, the emulator's own device view.
3. Keep them, and this project, in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: why does resetting the view before requesting a session matter for comfort, and what could go wrong for a learner if a lesson skipped that step?

## Further reading

- [W3C: WebXR Device API](https://www.w3.org/TR/webxr/)
- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [MDN: `XRReferenceSpace`](https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace)
- [three.js docs: `WebXRManager`](https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager)
- [Immersive Web Emulator (GitHub)](https://github.com/meta-quest/immersive-web-emulator)

## Women to Know

**Luciana Nedel** is a full professor at Brazil's UFRGS, where she has researched virtual reality, immersive visualization, and 3D interaction since 2002. She was a Program Chair of IEEE VR 2025 and sits on the IEEE VR 2026 program committee.

Reference spaces, session events, and reset views can feel like plumbing, but they exist to make experiences like the ones her research studies possible at all: how people perceive, move through, and interact inside virtual, tracked spaces. The seated-comfort choices this lesson makes are a small, practical piece of the much larger field she works in.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The **WebXR Device API**, everything behind `navigator.xr` in this lesson, is published by the W3C's Immersive Web Working Group; as of mid-2026 it is a Candidate Recommendation Draft on the Recommendation track, not yet a finished Recommendation, which is one reason this lesson feature-detects rather than assumes support. **Secure contexts**, the HTTPS-or-localhost rule WebXR depends on, are their own W3C specification, shared by many browser APIs. Three.js and its `WebXRManager` are not a standard: they are an open-source project that implements this same W3C API underneath, which is why calls like `renderer.xr.setSession()` map so directly onto `navigator.xr.requestSession()`.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
