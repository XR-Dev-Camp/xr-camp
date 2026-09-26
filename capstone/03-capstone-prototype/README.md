# Capstone Prototype

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `capstone` · **Lesson:** `capstone-prototype-03` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Deliver a tested prototype and design review.

---

## Learning objectives

By the end of this project you will be able to:

1. Build a small, working technical proof of your Stage 2 design, in three.js.
2. Keep a running test log as you build, not only at the end.
3. Test your prototype for accessibility with a screen reader and the keyboard alone.
4. Test your prototype against the performance budget you set in Stage 2.
5. Check your prototype's readiness for localisation, even before translation exists.
6. Run a design review, and record what changed as a result.
7. Decide, from evidence, what is ready to take into Stage 4's production build.

## Prerequisites

- **Stage 7.2: Experience and System Design.** You need an approved data model, scene graph, spatial layout, and test plan before this stage begins.
- **Course 3.4: Three.js Foundations** and **Course 3.6: Performance Engineering for Web3D.**

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser with WebGL 2 | Runs the three.js prototype | Free |
| VS Code and a local server | Modules need `http://` | Free |
| A screen reader (NVDA, VoiceOver, or similar) | Testing the prototype's accessibility | Free |

## What you will build

Stage 3 of the Professional Capstone: a **small, working prototype** that proves your Stage 2 design in code, plus a **test log**, and a **design review** record. This is not the finished capstone — it is the smallest slice that proves your riskiest design decisions actually work.

The reference solution in [`completed/`](completed/) is a trimmed-down version of Ana's single gallery room from Stage 2: one exhibit stand built from a three.js primitive, with a scene description, a 2D twin list, keyboard controls, and a Pause button — reusing the accessible-3D-page pattern from `web3d-developer/07-interactive-web3d-experience`. The starter has three planning templates (`prototype-plan.md`, `test-log.md`, `design-review.md`) with 7 TODOs, plus a minimal three.js starter page with its own TODOs to complete.

## Folder guide

```text
03-capstone-prototype/
├── README.md
├── project.json
├── starter/
│   ├── index.html            # A minimal three.js page: 4 TODOs
│   ├── prototype-plan.md      # TODOs 1–3: what you will prove, and how
│   ├── test-log.md             # TODOs 4–5: a running log as you test
│   ├── design-review.md        # TODOs 6–7: the review record
│   └── rubric.md               # How this stage is assessed
├── completed/                 # The tiny working prototype: open this last
├── challenges/                 # Three challenges: Foundation is required
├── tests/checklist.md
├── assets/
└── screenshots/
```

## Setup

1. Confirm Stage 2's design documents are mentor-approved before you start.
2. Copy `starter/` into your capstone workspace.
3. Open `starter/index.html` through a local server — a blank canvas with a console message is expected before you complete its TODOs.
4. Read [`starter/rubric.md`](starter/rubric.md).

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; re-read your Stage 2 scene graph | A plan for the smallest scene that proves your design |
| 2 | Step 1: the prototype plan, part 1 (TODOs 1–2) | A named list of the riskiest things this prototype must prove |
| 3 | Step 1, continued (TODO 3) | A scope for the prototype, smaller than the full capstone |
| 4 | Step 2: renderer, camera, and scene (TODO 1 in `index.html`) | An empty three.js scene rendering in the browser |
| 5 | Step 3: building your primitive object(s) (TODO 2) | Your Stage 2 object(s) visible on screen |
| 6 | Step 3, continued | Lighting and materials matching your spatial layout |
| 7 | Step 4: the scene description and 2D twin (TODO 3) | A text alternative that matches the scene, always visible |
| 8 | Step 5: keyboard controls (TODO 4) | Every 3D interaction has a working keyboard route |
| 9 | Step 6: reduced motion and the Pause button | Animation respects `prefers-reduced-motion`, with a working Pause control |
| 10 | Step 7: testing, part 1 — accessibility (TODOs 4–5 in `test-log.md`) | A screen reader and keyboard walkthrough, logged |
| 11 | Step 7, continued — performance | Draw calls and triangles measured against your Stage 2 budget |
| 12 | Step 7, continued — localisation | A check that no text is hard-coded outside your data model |
| 13 | Step 8: the design review (TODOs 6–7) | A review meeting (real or with a peer/mentor) recorded in `design-review.md` |
| 14 | Revise the prototype from review feedback | Changes made and logged |
| 15 | [`tests/checklist.md`](tests/checklist.md); request mentor approval | A tested, reviewed prototype |
| 16 | One challenge extension, then **Submitting your work** | An approved capstone prototype |

### Step 1: the prototype plan (TODOs 1–3)

Open [`starter/prototype-plan.md`](starter/prototype-plan.md). Not every part of your Stage 2 design needs a prototype: pick the riskiest two or three things — the parts most likely to fail or most expensive to get wrong later — and plan to prove only those. Ana's plan proves one thing: can a single primitive-built exhibit be shown, described, and controlled accessibly, within budget?

### Step 2: renderer, camera, and scene (TODO 1 in `starter/index.html`)

Set up a `THREE.Scene`, a `PerspectiveCamera`, and a `WebGLRenderer`, the same pattern as `web3d-developer/04-threejs-foundations`. Use the exact pinned import map from this repository's `versions.json`.

### Step 3: your object(s) (TODO 2)

Build the object your prototype plan named, from three.js primitives (a `BoxGeometry`, `SphereGeometry`, or similar) and a `MeshStandardMaterial`, plus at least one light. Keep it small: this step proves the shape of your pipeline, not the final art.

### Step 4: scene description and 2D twin (TODO 3)

Add a `<p id="scene-description">` built from the same data your scene uses, and an always-present 2D list or table with the same information. Neither one is a fallback shown only when 3D fails — both are always there (WCAG 1.3.1).

### Step 5: keyboard controls (TODO 4)

Add buttons (or keydown handlers) that do exactly what a mouse drag or click would do: turning the view, or selecting the object. Every 3D interaction needs a working keyboard route.

### Step 6: reduced motion and the Pause button

If anything animates, check `matchMedia('(prefers-reduced-motion: reduce)')` before starting it, and add a **Pause animation** button with `aria-pressed` that works regardless of that preference.

### Step 7: testing (TODOs 4–5 in `test-log.md`)

Open [`starter/test-log.md`](starter/test-log.md) and keep it open while you test. Log, with dates: your screen reader walkthrough, your keyboard-only walkthrough, your measured draw calls and triangles against the Stage 2 budget, and a check that no visible text is hard-coded outside your data model.

### Step 8: the design review (TODOs 6–7)

Open [`starter/design-review.md`](starter/design-review.md). Show your working prototype to your mentor or a peer. Record what they said, and — this is the part learners skip — what you changed as a result, or why you chose not to.

## Key code explained

- **Prototype.** The smallest working slice that proves a design decision, deliberately smaller in scope than the final build.
- **`prefers-reduced-motion`.** A media query the browser exposes from the operating system's accessibility settings; code checks it before starting any animation that was not requested.
- **Test log.** A dated record of what you tested and what you found, kept as you go — not reconstructed from memory afterward.
- **Design review.** A structured moment where someone other than the builder looks at the work and the builder records the outcome, including changes made.
- **Draw call.** One instruction from the CPU telling the GPU to draw something; fewer, larger draw calls are usually cheaper than many small ones.

## 3D and XR accessibility

Every requirement from `docs/en/xr-accessibility.md` applies to this stage's prototype, in miniature: a `scene-description` element built from the same data as the scene, a 2D list with the same information, a keyboard route for every interaction, a reduced-motion check before anything animates, a working Pause button, and no camera motion the visitor did not ask for. Testing this small prototype thoroughly now is far cheaper than discovering a missed requirement in Stage 4's larger production build.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `#scene-description` describes the current scene | 1.1.1 Non-text Content | A person who cannot see the canvas needs an equivalent |
| The 2D object list is always present, not only on WebGL failure | 1.3.1 Info and Relationships | Information should not live only in a picture |
| Every 3D interaction has a keyboard route | 2.1.1 Keyboard | Visitors without a pointer must reach the same functionality |
| Animation checks `prefers-reduced-motion` and offers a Pause button | 2.2.2 Pause, Stop, Hide | Moving content can distract or harm some visitors unless it can be stopped |
| Focus is visible on every control | 2.4.7 Focus Visible | Keyboard users need to see where they are |

## Performance considerations

Measure draw calls and triangles with `renderer.info`, the same technique as `web3d-developer/06-performance-engineering-for-web3d`, and compare against the budget in your Stage 2 `test-plan.md`. A prototype that is already over budget on one small object is a signal to simplify before Stage 4 adds more.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Building the whole scene before testing anything | Accessibility and performance problems are found late, when they are expensive to fix | Test the smallest working piece first, before adding more |
| Skipping the design review because "it's just a prototype" | Design flaws reach Stage 4's much larger production build | Show the working prototype to someone else, even informally, and record the outcome |
| Hard-coding visible text instead of reading it from data | Localisation becomes a rewrite instead of adding translations | Read every visible string from a small local data file, as Stage 2 planned |
| Adding animation without checking reduced motion first | The prototype fails an accessibility check that is easy to build in from the start | Check `prefers-reduced-motion` before any animation begins, every time |
| Treating the test log as an afterthought | Testing is reconstructed from memory, missing details | Log dates and findings as you go, not after the fact |

## Troubleshooting

**My scene renders black.** Check that a light is added to the scene — a `MeshStandardMaterial` needs one — and that the camera is positioned so it is not inside your object.

**The reduced-motion check does not seem to work.** In Chrome DevTools, use the "Rendering" panel's "Emulate CSS media feature prefers-reduced-motion" control to test without changing your OS setting. Firefox and Safari read the OS-level accessibility setting directly.

**My draw calls are already high with one object.** Check you are not creating a new material or geometry per frame inside your render loop; create objects once, outside the loop that calls `renderer.render()`.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: Run a full keyboard-only walkthrough of your prototype with your mouse unplugged (or trackpad disabled) and log every place you got stuck.
2. **[Creative](challenges/challenge-2.md)**: Prototype one detail that reflects your own language or community, and test that it reads correctly to someone from outside it.
3. **[Explorer](challenges/challenge-3.md)**: Add a second, different type of object to your prototype and re-measure your performance budget with both present.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your working prototype and your test log's performance numbers.
3. Keep your prototype plan, test log, and design review in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: what did your design review change about the plan you had going into this stage?

## Further reading

- [three.js manual: Fundamentals](https://threejs.org/manual/#en/fundamentals) 
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) 
- [W3C WAI: Evaluating Web Accessibility Overview](https://www.w3.org/WAI/test-evaluate/) 
- [docs/en/xr-accessibility.md](../../docs/en/xr-accessibility.md) 

## Women to Know

Katya Echazarreta is an electrical engineer, born in Guadalajara, Mexico, who worked at NASA's Jet Propulsion Laboratory from 2018 to 2021 on five missions, including the Perseverance Mars rover and the Europa Clipper. In June 2022 she became the first Mexican-born woman to travel to space, flying on Blue Origin's suborbital NS-21 flight as Space for Humanity's citizen astronaut.

Every mission she worked on at JPL depended on ground testing that proved a system would work before it ever left Earth. That is exactly what this stage asks of your capstone: prove the riskiest parts work, on the ground, in a small prototype, before committing to the full production build.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The **Khronos Group's WebGL 2** specification is what makes three.js's renderer possible in every modern browser without a plugin. Khronos also publishes glTF, the 3D model format used across XR Camp's Web3D courses; a prototype stage is a good place to confirm early which of these open standards your capstone will depend on.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
