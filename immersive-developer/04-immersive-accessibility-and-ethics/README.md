# Immersive Accessibility and Ethics

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `immersive-developer` · **Lesson:** `immersive-accessibility-and-ethics-04` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Complete an accessibility and ethics redesign of an immersive experience.

---

## Learning objectives

By the end of this project you will be able to:

1. Recognise, in a working XR scene, the difference between a scene that merely renders and one a disabled learner can actually use.
2. Explain what a W3C Group Note is, how it differs from a W3C Recommendation, and cite the XR Accessibility User Requirements (XAUR) accurately, including what it does and does not cover.
3. Fix captions that are anchored in 3D world space so they stay readable however the learner is looking, in a headset and on a screen.
4. Provide a full non-audio, non-XR alternative for spoken content, and a full 2D fallback for content that only exists in a 3D scene.
5. Bring an interactive control within a comfortable, one-handed, seated reach, and give it a keyboard route.
6. Tell forced camera movement (never acceptable) apart from an animation that only needs a reduced-motion check and a pause control.
7. Ask for consent, from a genuine user gesture, before turning on a camera or another sensor, and explain in plain language what that sensor could reveal.
8. Give a shared XR space a personal-space boundary and a way to mute or block another participant.

## Prerequisites

- **Course 4.1: WebXR Foundations** (entering and leaving a VR session).
- **Course 4.2: XR Input and Interaction** (this lesson's three.js scene follows the same engine pattern).
- **Course 4.3: Spatial UX Design.**
- Comfortable reading a short HTML page and JavaScript module without being shown where every part is.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A text editor (e.g. VS Code) | Editing the starter files | Free |
| A modern desktop browser (Chrome, Firefox, or Edge) | Running and testing the scene; all work well in mainland China | Free |
| A local static file server (e.g. `python3 -m http.server`, or the VS Code "Live Server" extension) | Pages must be opened over `http://`, not `file://`, for JavaScript modules to load | Free |
| Your browser's accessibility inspector and keyboard | Testing the fixes: Tab order, focus, reduced motion | Free, built in |

No account, no API key, and no paid service is used anywhere in this lesson. Speech comes from the browser's own built-in Web Speech API, not a cloud service.

## What you will build

A short XR gallery talk: a presenter, three objects from earlier lessons, spoken narration, a visiting avatar, and an optional camera-based "personalization" feature. The [`starter/`](starter/) version is **deliberately broken** - it runs without errors, but it fails learners with disabilities and takes liberties with their privacy and comfort, on purpose, so you have real problems to find. Your job is to audit it against the W3C's XR Accessibility User Requirements (XAUR) and WCAG 2.2, then fix what you find. The reference solution is in [`completed/`](completed/), alongside [`completed/audit.md`](completed/audit.md): a full audit mapping every fix to the exact XAUR user need or WCAG success criterion it answers, including three fixes that XAUR does not cover at all. There are 10 numbered TODOs across `starter/js/`.

## Folder guide

```text
04-immersive-accessibility-and-ethics/
├── README.md
├── starter/          # begin here: the deliberately broken scene
│   ├── index.html
│   ├── styles.css
│   └── js/           # app.js, talk.js, visitor.js, sensors.js, xr.js, main.js
├── completed/        # reference solution, plus audit.md
├── challenges/       # Three challenges: Foundation is required
├── tests/            # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open a terminal in this folder's parent, `immersive-developer/`.
2. Start a local server from the repository root, for example `python3 -m http.server 8000`.
3. Open `http://localhost:8000/immersive-developer/04-immersive-accessibility-and-ethics/starter/index.html`.
4. Open `starter/index.html`, `starter/styles.css`, and every file in `starter/js/` in your editor. Search for `TODO` to find all 10, in lesson order.
5. Keep [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) and the [XAUR document](https://www.w3.org/TR/xaur/) open in a tab while you work.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Run the starter. Read the broken banner. Try the scene as a sighted, mouse-using learner, then try it with your eyes closed and with the mouse put away. | A written list of at least five problems you noticed, before reading any TODOs. |
| 2 | Read the XAUR document's 19 user needs and `docs/en/xr-accessibility.md`. Compare your list from session 1 against them. | Notes on which of your problems already have a XAUR user need, and which do not. |
| 3 | Fix TODO 1: build `#scene-description` and the transcript list from `TALK_SCRIPT`. | A transcript of the whole talk visible on the page before you press "Start the talk". |
| 4 | Fix TODO 2: remove the forced camera path in `app.js`. | Dragging the scene moves the camera; letting go leaves it exactly where you left it. |
| 5 | Fix TODO 4: gate the presenter's idle animation behind `prefers-reduced-motion`, and add a Pause button. | Toggling "reduce motion" in your OS settings starts the presenter still; the Pause button works either way. |
| 6 | Fix TODO 3: move captions from a world-anchored plane to one parented to the camera, plus a DOM caption bar. | Turning the camera away from the presenter still shows the current caption. |
| 7 | Fix TODO 5: replace the unreachable 3D "Ask a question" mesh with a real, keyboard-operable button. | Pressing Tab repeatedly reaches "Ask a question"; pressing Enter reveals the answer. |
| 8 | Fix TODO 6: make the transcript, answer, and consent panel work with WebGL disabled. | With WebGL turned off in your browser flags (or `chrome://flags`), the page still shows the transcript and lets you ask a question. |
| 9 | Fix TODO 7: require a genuine click before requesting the camera. | The camera is never requested until you press "Turn on camera personalization". |
| 10 | Fix TODO 8: write the privacy notice shown before that button. | A plain-language paragraph explaining what a camera frame could reveal, visible before you can click "Turn on". |
| 11 | Fix TODO 9: give the visitor a personal-space radius. | The visitor walks over, then stops about 1.2 metres away, and the status region says so. |
| 12 | Fix TODO 10: add "Mute visitor" and "Block visitor" buttons. | Clicking "Block visitor" makes the visitor disappear and stop moving; clicking it again brings them back. |
| 13 | Draft your own audit table: one row per fix, with the XAUR user need or WCAG 2.2 success criterion it answers (or "not covered by XAUR" where that is true). | A draft table, checked line by line against [`completed/audit.md`](completed/audit.md). |
| 14 | Test everything with the mouse put away, with reduced motion turned on, and with WebGL disabled, one at a time. | Every item in [`tests/checklist.md`](tests/checklist.md) ticked. |
| 15 | Work through the Foundation challenge. | The Foundation challenge's "Done when" list satisfied. |
| 16 | Take your screenshots, re-read your journal notes from sessions 1 and 2, and submit. | Everything in **Submitting your work** below completed. |

### Step 1: Read the scene as an audit, not as a bug list (TODO 1, 3, 6)

Three of this lesson's problems are all versions of the same question: *if this learner cannot see the 3D canvas, or cannot hear the audio, or cannot look wherever the captions happen to be, do they still get the content?* `starter/js/talk.js` answers "no" three different ways: no transcript, world-anchored captions, and a page that goes blank without WebGL. Fix all three by building one small, honest source of truth - `TALK_SCRIPT` - and reading from it everywhere: the transcript list, the scene description, and the captions.

```js
// completed/js/main.js
function renderTranscript() {
  const list = $('transcript-list');
  list.replaceChildren(...TALK_SCRIPT.map((line) => {
    const li = document.createElement('li');
    li.textContent = line.text;
    return li;
  }));
}
```

### Step 2: Tell "the camera moved" from "something animated" apart (TODO 2, 4)

`docs/en/xr-accessibility.md` states the comfort rule plainly: *the camera never moves unless the learner moves it.* Not "unless reduced motion is off" - never. That is why the starter's forced camera orbit in `app.js` is simply deleted, not wrapped in a `prefers-reduced-motion` check. The presenter's small idle bob is different: it is a real animation, so it follows the same rule every 3D lesson in this course uses - start paused under reduced motion, and always offer a visible Pause control.

```js
// completed/js/app.js
let idleAnimating = !window.__reducedMotion;
```

### Step 3: Anchor captions to the viewer, not the world (TODO 3)

A caption drawn onto a plane that sits still in the scene is only readable from one direction. Parenting the plane to `camera` instead of `scene` keeps it in the same place in the learner's *view*, the way a subtitle track stays at the bottom of a video however the camera in the video moves.

```js
// completed/js/talk.js
const captionPlane = new THREE.Mesh(geometry, material);
captionPlane.position.set(0, -0.32, -1); // relative to the camera, not the world
camera.add(captionPlane);
```

### Step 4: Give every interaction a keyboard route (TODO 5)

A 3D mesh is not, by itself, reachable by Tab. Where the interaction can be an ordinary HTML control instead of a 3D object - as "Ask a question" can - that is the simpler and more robust fix, not a compromise: it is reachable by Tab, activatable with Enter or Space, and meets the WCAG 2.2 minimum target size without any extra work.

### Step 5: Ask before you sense, and say what you might find (TODO 7, 8)

WebXR itself will not let a page request a session outside a genuine click; treat a camera request the same way. `js/sensors.js`'s `requestCamera` only runs from inside a button's own `click` handler, after a notice that names, specifically, what a camera frame could show - not only "your face".

### Step 6: Give shared space a boundary (TODO 9, 10)

The visitor in this lesson is simulated - there is no live multiplayer server - but the fix is the one a real shared XR space needs regardless: stop another avatar before it reaches you, and offer a way to mute or block them if their presence is unwanted.

```js
// completed/js/visitor.js
const PERSONAL_SPACE_RADIUS = 1.2; // metres
```

## Key code explained

- **`describeScene()`** builds the `#scene-description` paragraph from the same facts the 3D scene is built from, so the two can never disagree.
- **`captionPlane` parented to `camera`** is the standard XR "HUD" technique: an object that moves with the viewer's head instead of staying fixed in the world, the same idea 4.2's in-world menu used, applied to text instead of buttons.
- **`requestCamera(onGranted, onDenied)`** never runs itself; it exists only to be called from a click handler, so a camera request always follows a real, informed user gesture.
- **`PERSONAL_SPACE_RADIUS`** is a plain distance check, run every frame in `visitor.update()`, between the visitor and the camera - the entire "boundary" is this one comparison.
- **`window.__reducedMotion`**, read once from `matchMedia('(prefers-reduced-motion: reduce)')` before the module script runs, decides whether the presenter's idle animation starts on or off.

## 3D and XR accessibility

This lesson is 3D and XR throughout, so its accessibility requirements are the manual checks from [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md), applied to the gallery talk scene specifically:

| Check | How this scene meets it |
| --- | --- |
| Scene description | `#scene-description`, built from `describeScene()`. |
| Keyboard route for every interaction | "Start the talk", "Turn off captions", "Pause presenter animation", "Ask a question", the camera-consent buttons, and "Mute"/"Block visitor" are all ordinary `<button>` elements. |
| Reduced motion | The presenter's idle animation starts paused under `prefers-reduced-motion`; the camera never moves by itself regardless. |
| 2D fallback | The transcript, the answer text, the consent panel, and the visitor controls all work with WebGL disabled. |
| Comfort | No forced camera path. The visitor stops at a personal-space distance instead of approaching indefinitely. |

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every spoken line has a text equivalent, present before playback starts | 1.1.1 | A learner who cannot hear speech synthesis, or whose browser lacks it, still gets the content. |
| Captions stay in view regardless of where the learner is looking | Good practice (no single SC covers live captions in 3D) | XAUR User Need 19 names this directly; WCAG's captioning criteria are written for prerecorded video. |
| No automatic camera movement | 2.2.2 | Forced viewpoint movement is the leading cause of VR motion sickness (XAUR User Need 16). |
| Every interactive control is reachable by keyboard | 2.1.1 | Not every learner can point a mouse or a VR controller precisely. |
| Interactive controls meet the minimum target size | 2.5.8 | Supports learners with limited mobility or restricted vision (XAUR User Need 4). |
| A sensor (camera, microphone) is requested only after a clear explanation and a real click | Good practice (outside XAUR's and WCAG's scope) | Consent has to come before access, not after. |

## Performance considerations

- The scene has three small meshes, one presenter, and one visitor: it renders comfortably even on modest laptops and mid-range phones.
- `SpeechSynthesisUtterance` runs on the device; it adds no network request and no measurable load.
- The visitor's position update runs on a plain `setInterval`, not inside the render loop, so pausing the tab (`visibilitychange`) does not also freeze the personal-space check in a way that could let it "teleport" once the tab returns to view - the distance clamp in `visitor.update()` always re-checks from the current position.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Gating the forced camera orbit behind `prefers-reduced-motion` instead of removing it | Learners without reduced motion set still get an uncontrollable camera | Delete forced camera movement outright; only the learner's own input should ever move the camera. |
| Citing a XAUR "user need" number for consent or multi-user safety | Misrepresents what a W3C Group Note actually says | Say plainly that XAUR does not cover it, as `completed/audit.md` does. |
| Anchoring captions to the camera but forgetting the DOM caption bar | Headset users see captions; desktop learners using assistive tech on the page do not, since the 3D HUD is invisible to them | Keep both: a camera-attached plane for presenting, and a DOM element for the ordinary page view. |
| Requesting the camera as soon as the "personalization" section is scrolled into view | Still not a genuine click-triggered request | Request only inside the button's own `click` handler. |

## Troubleshooting

**Speech never plays.** Some browsers only expose `speechSynthesis` voices after the page has been interacted with once, or need a moment to load voices asynchronously. The transcript still works regardless; this is exactly the kind of gap the transcript exists to cover.

**"Enter VR" never appears.** That means this browser or device does not support `immersive-vr`. The talk, transcript, and every control work fully without it.

**Camera personalization always fails, even after granting permission.** In Firefox, check the padlock icon's "Permissions" panel; in Safari, check Safari → Settings → Websites → Camera. Both must show "Allow" for this page's origin.

**The visitor's chatter never stops after muting.** Confirm you pressed "Mute visitor" itself, not "Block visitor" - muting stops chatter but keeps the visitor visible and approaching; blocking stops both.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add one more XAUR-mapped fix to a problem this lesson did not cover.
2. **[Creative](challenges/challenge-2.md)**: make it personal - your language, your community, or a talk about something you care about.
3. **[Explorer](challenges/challenge-3.md)**: a harder technique - live captions driven by the Web Speech API's `SpeechRecognition`, or a second, real remote participant using WebRTC.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) completely.
2. Take a screenshot of your finished scene, and a screenshot of your own audit table from session 13.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: which of the eleven fixes in this lesson would you have missed if you had only read XAUR, without also thinking about ethics beyond disability access - and why do you think XAUR does not cover it?

## Further reading

- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/)
- [W3C: Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [XR Access](https://xraccess.org/)
- [MDN: Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## Women to Know

Wanda Díaz-Merced is a Puerto Rican astronomer who lost her sight as a young student and became a pioneer of sonification in modern astronomy - turning astrophysical data into sound so it can be studied by ear rather than by sight. She holds a PhD from the University of Glasgow and has held research posts at the Harvard-Smithsonian Center for Astrophysics, the South African Astronomical Observatory, and the European Gravitational Observatory.

Her work is a direct answer to this lesson's theme: instead of treating a blind scientist's needs as an afterthought, sonification makes an entire dataset accessible by a different sense from the one it was originally designed for - the same principle behind giving this lesson's talk a full text transcript and a full 2D fallback, not just a nod towards accessibility bolted onto a visual-first design. She continues to advocate for disability inclusion in STEM.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

The W3C publishes several kinds of document, and this lesson deliberately uses one of each. WCAG 2.2 is a **Recommendation**: the W3C's most mature status, reached through a formal process, and the standard this course tests every lesson against. XAUR is a **Group Note**: a snapshot of a working group's research and community input, published to share knowledge, but never brought through the Recommendation process and never balloted as a standard. A Group Note is valuable - XAUR is, at the time of writing, the most detailed public account of what disabled users need from XR - but citing it as if it settles a question with the same authority as WCAG overstates what it is. Good practice is to say exactly what you are citing: a Recommendation, a Note, or, where neither says anything at all, your own reasoned judgement.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
