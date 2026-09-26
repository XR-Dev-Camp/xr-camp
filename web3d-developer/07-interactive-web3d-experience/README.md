# Phase 3 Capstone - Interactive Web3D Experience

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web3d-developer` · **Lesson:** `interactive-web3d-experience-07` · **Time:** about 20 hours · 27 sessions of 45 minutes · about 7 weeks at 4 sessions a week

> **This is a longer lesson (27 sessions).** Take it one step at a time: each session still ends with something you made, and it is fine to take a short break between steps.

---

> Publish a polished Web3D experience using A-Frame or Three.js.

## Learning objectives

By the end of this project you will be able to:

1. Integrate several lessons' worth of three.js code (or A-Frame code, if you took that path) into one polished, published-feeling page, without rewriting what already works.
2. Build an info panel that opens with the right details for a selected 3D object, including credit and licence for a loaded asset.
3. State a performance budget as numbers, and check a scene against it live, instead of only guessing whether it is "fast enough".
4. Keep a 2D twin of a 3D scene: the same facts, in words, always present, not only a fallback.
5. Write release notes (a `CHANGELOG.md`) that describe what a version of a project actually shipped.
6. Assemble a full accessibility pass across an existing 3D scene: scene description, keyboard route, reduced motion, and colour contrast, all checked together rather than one at a time.
7. Read a brief and a rubric before building, and use the rubric to check your own work before you submit it.
8. Explain, in your own words, the trade-offs behind the exhibit you chose to keep, change, or extend.

## Prerequisites

- **Course 3.1: Web3D Fundamentals** through **Course 3.6: Performance Engineering for Web3D** (this capstone continues the exhibit built there; the reference solution here continues 3.4-3.6's three.js edition).
- Comfort reading and extending existing JavaScript modules, rather than writing a 3D scene from nothing.
- A GLTFLoader-based project you can run through a local server (as every Web3D Developer lesson has been so far).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser (Chrome, Firefox, Edge, or Safari) | Runs the exhibit and its WebGL 2 canvas. | Free |
| A local static file server (e.g. `python3 -m http.server`, or VS Code's Live Server) | Serves the page over `http://`, which ES modules and `fetch()`-based glTF loading both require. | Free |
| A text editor (e.g. VS Code) | Editing HTML, CSS, and JavaScript. | Free |
| Browser DevTools (built into every browser above) | The Console, for errors; the Performance panel, for measuring your budget numbers. | Free |

No paid accounts, no API keys, and no service that is blocked in mainland China are used anywhere in this lesson.

## What you will build

The Phase 3 capstone: the virtual cultural exhibit you have built one lesson at a time since 3.1, published as one polished page. This reference solution continues the three.js path from 3.4 through 3.6 — the same five exhibits (a clay pot, a woven basket ring, a jade stone, a fox figure, and a Cesium milk truck) — and adds this capstone's own integration work on top: an info panel that opens with each exhibit's details, a performance budget checked live against the numbers below, a standalone attribution page, and release notes in `CHANGELOG.md`. If you built the A-Frame path in 3.2-3.3 instead, integrate from there; the brief and rubric apply either way.

The reference solution is in [`completed/`](completed/). It has 6 numbered TODOs across `starter/index.html` and `starter/js/main.js` — everything else in the starter (the engine from 3.5: `js/app.js`, `js/exhibit.js`, `js/loader.js`, `js/describe.js`) already works, because this capstone is about integration, not building a 3D scene from nothing. Read [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md) before you start.

Later, once "My XR Camp" (2.1-2.3) has a place for it, this capstone exhibit is the kind of project a learner journal or portfolio entry would link to — keep your screenshots and your `CHANGELOG.md` somewhere you can find them again.

## Folder guide

```text
07-interactive-web3d-experience/
├── README.md
├── ATTRIBUTION.md
├── starter/                 # begin here: brief.md, rubric.md, and 6 numbered TODOs
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html
│   ├── attribution.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── completed/               # reference solution
│   ├── index.html
│   ├── attribution.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── challenges/               # Three challenges: Foundation is required
├── tests/                    # self-review checklist
├── assets/                   # the two glTF models, reused unchanged from 3.5
└── screenshots/
```

## Setup

1. Open this folder in your editor.
2. Start a local server at the repository root (for example `python3 -m http.server 8766`), so the page is served over `http://`, not opened as a `file://` path.
3. Open `starter/index.html` through that server.
4. Read [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md) fully before you write any code.
5. Confirm the starter already runs: five exhibits load, the 2D twin lists them, and Select buttons, Turn left/right, Pause, and Reload all work. That is 3.5's engine, unchanged; nothing here is broken before you start.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read `brief.md` and `rubric.md`; skim 3.1-3.6's completed folders for what you can reuse. | A short plan: which exhibits you are keeping, changing, or adding. |
| 2 | Set up the starter and confirm 3.5's engine runs unchanged. | Five exhibits loading, selectable, and animating in your browser. |
| 3 | Read `js/exhibit.js`, `js/loader.js`, `js/describe.js`, and `js/app.js` in full. | Notes on what each file owns, so you integrate instead of rewriting. |
| 4 | Step 3: build the info-panel container (TODO 1). | An empty but present `#info-panel` element on the page. |
| 5 | Step 4: build the performance-budget markup (TODO 2). | `#budget-calls`, `#budget-triangles`, and `#budget-result` visible on the page. |
| 6 | Step 5: write `renderInfoPanel()` for the three primitive exhibits (TODO 3, part 1). | A function that returns the right heading and paragraph for a primitive. |
| 7 | Step 5, continued: extend `renderInfoPanel()` for a loaded model's credit and link (TODO 3, part 2). | The same function, now correct for all five exhibits. |
| 8 | Step 6: call `renderInfoPanel()` from `selectItem()` (TODO 4). | Clicking or tapping any exhibit opens its info panel. |
| 9 | Keyboard-only pass: Tab to every Select button and confirm the panel opens the same way. | Proof the info panel has a full keyboard route, not only a pointer one. |
| 10 | Step 7: add the `BUDGET` constant and the draw-call comparison (TODO 5, part 1). | Live draw-call numbers next to your budget. |
| 11 | Step 7, continued: add the triangle comparison and the pass/fail text (TODO 5, part 2). | A budget result sentence that changes correctly. |
| 12 | Step 8: clear the info panel on reload (TODO 6); confirm disposal still balances. | A clean reload with no stale info panel text. |
| 13 | Step 9: measure your own numbers with `renderer.info` and the Performance panel. | Real "on my machine" numbers for the README's performance table. |
| 14 | Step 10: build the standalone attribution page. | `attribution.html` crediting both models with working links. |
| 15 | Cross-check `ATTRIBUTION.md` against `js/exhibit.js` and the attribution page. | Three consistent copies of the same credit and licence facts. |
| 16 | Step 11: write `CHANGELOG.md`'s `1.0.0` entry. | A release note describing what your capstone actually ships. |
| 17 | Step 12: an accessibility pass — scene description, live regions, and heading order. | Screen-reader-relevant text confirmed accurate by reading it aloud yourself. |
| 18 | A reduced-motion pass: confirm the animation starts paused when the OS asks for it. | Reduced motion behaving correctly in your browser's emulation. |
| 19 | Test at 390 px and 1280 px; fix any horizontal overflow. | A page that works at both widths. |
| 20 | A full keyboard-only pass across every control on the page. | Every interaction confirmed reachable and usable without a mouse. |
| 21 | Test the no-WebGL fallback path (disable WebGL, or use DevTools to simulate it). | Confirmation that the 2D twin still carries every fact. |
| 22 | Re-read your own code and comments for intent, not just correctness. | Comments that explain why, not only what. |
| 23 | Work through `tests/checklist.md` end to end. | Every box checked, or a fix for each one that is not. |
| 24 | Do the Foundation challenge (`challenges/challenge-1.md`). | The required challenge complete. |
| 25 | Choose Creative or Explorer, and start it. | A first working version of your chosen extension. |
| 26 | Finish your chosen challenge; update `CHANGELOG.md` if you changed anything. | The extension complete and documented. |
| 27 | Final submission: screenshots, the checklist re-checked, and your journal question answered. | A capstone ready to submit. |

### Step 1: read the brief and the rubric

Open [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md). This capstone, unlike earlier lessons, starts with a brief: a short document naming what to deliver, and a rubric naming exactly how it will be checked. Reading both before writing any code is itself part of the skill this lesson teaches — it is what a real project brief looks like.

### Step 2: tour the starter

Open `starter/js/exhibit.js`, `js/loader.js`, `js/describe.js`, and `js/app.js`. All four are finished, unchanged from [3.5](../05-threejs-interaction-assets-and-animation/completed/): the pedestals, the two glTF models, raycasting selection, and each model's own `AnimationMixer`. Your work in this capstone lives in `js/main.js` and `index.html` only.

### Step 3: the info-panel container (TODO 1)

In `starter/index.html`, find "3. Info panel" and add a container element with `id="info-panel"`, `role="status"`, and a starting message. `role="status"` means a screen reader announces the panel's new content when it changes, without the learner needing to move focus there themselves.

### Step 4: the performance-budget markup (TODO 2)

In the same file, find "5. Performance budget" and add the `<dl>` with `#budget-calls` and `#budget-triangles`, plus a `#budget-result` paragraph with `role="status"`. These are plain elements with starting text; `js/main.js` fills them in.

### Step 5: `renderInfoPanel()` (TODO 3)

In `starter/js/main.js`, write `renderInfoPanel(item)`. Given `null`, it shows a "nothing selected" message. Given a primitive exhibit, it shows a heading and what it is made of. Given a loaded model, it also shows the model's credit and a link to its source and licence — the same facts `js/exhibit.js` already carries in `data.credit` and `data.sourceUrl`, read once, not retyped.

### Step 6: wiring the info panel into selection (TODO 4)

Call `renderInfoPanel(app.getSelected())` from inside `selectItem()`. This is the one line that connects TODO 3's function to every existing way of selecting an exhibit — clicking the canvas, tapping it, or a Select button — because all three already call `selectItem()`.

### Step 7: the performance budget check (TODO 5)

Add a `BUDGET` constant (`{ calls: 20, triangles: 25000 }`) and, inside `updateStats()`, compare `app.renderer.info.render.calls` and `.triangles` against it. Write the live numbers and the pass/fail sentence into the elements from Step 4. This is the same `renderer.info` object 3.6 used to prove disposal worked; here it proves the exhibit stays inside a stated budget.

### Step 8: clearing the panel on reload (TODO 6)

Call `renderInfoPanel(null)` inside the Reload button's click handler, alongside clearing the Select buttons' `aria-pressed` state. Without this, a reload would leave the previous selection's info panel showing next to an exhibit where nothing is actually selected any more.

### Step 9: measuring your own numbers

Open the Performance panel in your browser's DevTools, and also read `app.renderer.info` directly (as the Stats panel already shows). Record what you see, on your own machine, and write those numbers into this README's "Performance considerations" table below, replacing the ones written when this lesson was authored. "On my machine" is the correct, honest way to report a performance number — it will differ from a learner's own device, and that is expected, not a bug.

### Step 10: the attribution page and `ATTRIBUTION.md`

`completed/attribution.html` is a standalone page crediting both models in full, separate from the on-page attribution list. Build the same for your own version, and keep `ATTRIBUTION.md` in sync with it: the same facts, in the same words, in both places, so nobody has to guess which one is current.

### Step 11: `CHANGELOG.md`'s `1.0.0` entry

Write a `1.0.0` entry in `CHANGELOG.md` describing what your capstone ships: what is new (the info panel, the performance budget, the attribution page), and any known limitation (for example, that the budget was measured on one machine). This is the same discipline frontend-engineer/09 teaches for a release: say what shipped, in one dated entry, not scattered across commit messages nobody will read again.

### Step 12: an accessibility pass

Read `scene-description`'s text aloud. Confirm every live region (`role="status"`) announces exactly once per change, not on every animation frame. Confirm heading order is unbroken (`h1` → `h2` → `h3`, no level skipped). This step gathers together checks earlier lessons taught one at a time; a capstone is where they all have to hold at once.

## Key code explained

- **`renderInfoPanel(item)`** replaces earlier lessons' one-line selection text with a real panel: a heading naming the exhibit, and a paragraph for its material or its credit. It reads from the same `ITEMS` data `js/exhibit.js` already exports, so the panel can never say something the scene itself does not.
- **The `BUDGET` constant** turns "is this fast enough?" into a yes-or-no question with a stated number, checked every time `updateStats()` runs (twice a second). Stating a budget before measuring, then comparing against it, is the opposite of guessing.
- **`role="status"` on `#info-panel` and `#budget-result`** are ARIA live regions: a screen reader announces their new content automatically. Both start with static text so they are never empty before JavaScript runs.
- **`attribution.html`** exists separately from the on-page attribution list so a reviewer, or a future learner reusing your assets, has one clear page to check licences from, without needing to run the exhibit at all.
- **`CHANGELOG.md`** is a plain Markdown file, not a database or a tool: release notes are a habit, not a feature, and the habit is what this step teaches.
- **The six numbered TODOs are all in `index.html` and `main.js`**, never in `exhibit.js`, `loader.js`, `describe.js`, or `app.js`. That split is deliberate: a capstone that integrates working code, rather than rewriting it, is a more realistic skill than starting from nothing each time.

## 3D and XR accessibility

This capstone is 3D throughout, continuing 3.1-3.6's exhibit, so accessibility work here is not one moment inside a 2D page — it is the whole page. Every requirement below was already taught in an earlier Web3D Developer lesson; this capstone's job is making sure all of them still hold once the info panel and the performance budget are added on top.

- The scene description updates for every relevant change: selection, animation state, and camera reset (`js/describe.js`, reused unchanged from 3.5).
- The 2D twin (`#exhibit-list`) carries the same facts as the 3D view and the info panel, so no fact exists only inside the canvas.
- Every interaction has a keyboard route: Select buttons, Turn left/right, Reset view, Pause/Resume, and Reload, none of which require a pointer.
- Reduced motion is respected: `window.__reducedMotion` starts animation paused, and the Pause button always states what it will do next.
- The camera never moves on its own; `controls.enableDamping` only smooths a movement the learner already started.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why | 
| --- | --- | --- |
| `#info-panel` and `#budget-result` use `role="status"` | 4.1.3 (Status Messages) | A screen-reader user hears the info panel open, and the budget result change, without moving focus to find out. |
| Every button's accessible name starts with its visible word ("Select: Fox figure") | 2.5.3 (Label in Name) | A voice-control or screen-reader user can activate a button by the word they see. |
| Colour is not the only signal for over-budget | 1.4.1 (Use of Color) | `#budget-result.over-budget` changes the background and the text, not only a colour swatch. |
| Focus is visible on every control | 2.4.7 (Focus Visible) | This project's `:focus-visible` outline, unchanged from earlier lessons, must still show once new controls are added. |
| Reduced motion stops all animation | 2.2.2 (Pause, Stop, Hide) | The jade stone's turn and every model's own animation both start paused when the OS asks for less motion. |
| `role="list"` on lists styled with `list-style: none` | Good practice (Safari drops list semantics otherwise) | The 2D twin, the Select buttons, and the attribution list all stay announced as lists. |

## Performance considerations

This capstone's stated budget, once every exhibit has loaded: **at most 20 draw calls and 25,000 triangles.** These numbers were measured on the machine this lesson was written on (a mid-range laptop, Chrome, integrated graphics), with a small margin above what the reference solution actually reaches — see Step 9 above for how to measure your own and update this table.

| Measurement | On my machine (reference solution) | Budget |
| --- | --- | --- |
| Draw calls, all five exhibits loaded | 11 | 20 |
| Triangles, all five exhibits loaded | about 18,000 | 25,000 |
| Geometries in memory after Reload | matches the count before Reload | must match (proves disposal) |
| Textures in memory after Reload | matches the count before Reload | must match (proves disposal) |
| Total project size (`assets/` + code) | well under 1 MB | 20 MB (project budget) |

If your own exhibit exceeds this budget, either apply a technique from 3.6 (instancing, merged geometry, a smaller texture) or raise the `BUDGET` constant and explain why in `CHANGELOG.md` — a budget that changed on purpose, and was written down, is very different from a budget nobody checked.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Calling `renderInfoPanel()` only from the canvas click handler | Selecting with a Select button (the keyboard route) never opens the panel | Call it once, inside `selectItem()`, which every selection route already calls |
| Hard-coding the budget numbers into the HTML instead of `js/main.js` | The live numbers stop updating, and the pass/fail text never changes | Write them once, in the `BUDGET` constant, and read them from there |
| Writing `ATTRIBUTION.md` and `attribution.html` from memory, separately | The two drift apart the first time either one is edited | Copy the facts from `js/exhibit.js`'s `data.credit` and `data.sourceUrl` into both |
| Skipping `CHANGELOG.md` because "nothing shipped yet" | The capstone has no record of what it actually contains | Write the `1.0.0` entry once the rubric's eight rows are met, describing exactly that |
| Measuring performance once and never on your own machine | The README's numbers describe someone else's computer, not yours | Redo Step 9 yourself, and replace the numbers in the table above |

## Troubleshooting

**The info panel never appears, even after TODO 3 and TODO 4 are done.** Check that `#info-panel` exists in `index.html` with exactly that `id` (TODO 1) — a typo here fails silently, because `document.getElementById()` simply returns `null` and `renderInfoPanel()` does nothing.

**The budget numbers show `0 / 20` forever.** `updateStats()` runs on a `setInterval`, not once. Confirm the interval was not accidentally cleared, and that the elements from TODO 2 exist before the interval's first tick.

**Firefox:** the Performance panel is under a different tab layout than Chrome's; look for "Performance" in the same DevTools toolbar (F12). Numbers from `renderer.info` are identical across browsers; only the DevTools panel's presentation differs.

**Safari:** `role="list"` is required on any list with `list-style: none`, exactly as earlier lessons taught — Safari's VoiceOver otherwise announces the list as plain text. Confirm you kept it on any new list markup you add.

**The exhibit list duplicates entries after a reload.** `renderItemList()` uses `replaceChildren()`, not `append()`; if a Creative-challenge edit changed that to `append()`, old items stay in the DOM alongside new ones.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: finish the six numbered TODOs so the info panel and the performance budget check both work.
2. **[Creative](challenges/challenge-2.md)**: replace an exhibit with something from your own culture or community.
3. **[Explorer](challenges/challenge-3.md)**: add a sixth exhibit using a technique this capstone does not otherwise use, and measure its cost.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) end to end, including the "3D and XR (manual)" section.
2. Take two or three screenshots: the exhibit with an item selected (info panel open), and the performance budget panel showing a live result.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: which exhibit did you keep exactly as it was from 3.5, and which did you change or add for the Creative or Explorer challenge — and why did you make that choice?

## Further reading

- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [three.js manual: WebGLRenderer.info](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info)
- [Keep a Changelog](https://keepachangelog.com/)
- [Khronos glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets)
- [W3C WAI: Writing a good alt text and text alternative](https://www.w3.org/WAI/tips/writing/)

## Women to Know

Anita Havele is Executive Director of the Web3D Consortium, the standards body behind X3D — the ISO/IEC-standardized format for 3D on the web, whose version 4.0 (announced March 2024) integrates with HTML5 and supports glTF, the same format this capstone's own models use. She coordinates the Consortium's work with the W3C, Khronos, OGC, and ISO, and was a general co-chair of the ACM Web3D 2025 conference; earlier in her career she worked on engineering standards at GM/EDS.

Publishing a polished Web3D experience, as this capstone asks you to do, depends on standards like glTF and X3D staying interoperable across tools and browsers — work that rarely gets a learner's attention, because it succeeds by being invisible. Havele's role, coordinating one standards body's work with several others, is a reminder that "it just works" is usually the result of people deliberately keeping formats compatible.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

This lesson's models are glTF 2.0 files, a Khronos Group standard for efficient 3D asset transmission, loaded here with three.js's own `GLTFLoader`. The wider Web3D standards landscape includes the W3C (which stewards WebGL and, with Khronos, WebGPU) and the Web3D Consortium (which stewards X3D and coordinates with Khronos on glTF). A capstone that "just works" across browsers is quietly resting on all three bodies agreeing on the same formats.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
