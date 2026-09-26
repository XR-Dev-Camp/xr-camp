# Shapes and Colour: A Tiny A-Frame Lesson

**Course:** `sample` · **Lesson:** `shapes-and-colour-demo` · **Time:** about 45 minutes · 1 session of 45 minutes

---

> Place three coloured shapes in an A-Frame scene, and write a scene description a screen reader user can rely on.

---

> This is a demonstration lesson, written by Ana as a worked example for [Course 6.5: Instructor and Mentor Preparation](../../README.md). It is deliberately tiny: one session, one file, three shapes. Its job is to show the full XR Camp lesson anatomy working end to end, including every 3D accessibility requirement, not to teach a large amount of A-Frame.

## Learning objectives

By the end of this project you will be able to:

1. Place A-Frame primitive shapes (`a-box`, `a-sphere`, `a-cylinder`) in a scene, and set each one's size, position, and colour.
2. Write a `#scene-description` paragraph that stays accurate as a scene changes.
3. Build an always-present 2D list that gives a screen reader, or a phone with no WebGL, the same information as the canvas.
4. Add one keyboard-reachable 3D interaction, and one reduced-motion-aware animation with a working pause control.

## Prerequisites

- Comfortable with basic HTML tags and attributes.
- No prior A-Frame experience is assumed; this is a first lesson.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A text editor | Write the HTML and JavaScript | Free |
| A modern browser | View the scene | Free |
| A local server | Open the page at `http://`, not `file://` | Free |

## What you will build

A very small 3D scene: a red box, a blue sphere, and a slowly turning gold cylinder, sitting on a plain floor with a fixed camera. Next to the scene, a matching list in plain HTML names every shape and colour in words, a button lets a keyboard user highlight each shape in turn, and a second button pauses the cylinder's rotation, starting paused automatically if the learner's system prefers reduced motion.

The reference solution is in [`completed/`](completed/). The starter has **3 numbered TODOs**, all in `index.html`.

## Folder guide

```text
example-lesson/
├── README.md
├── project.json
├── ATTRIBUTION.md
├── starter/              # begin here: 3 numbered TODOs
├── completed/            # reference solution
├── challenges/           # Three challenges: Foundation is required
└── tests/                # self-review checklist
```

## Setup

1. Open `starter/index.html` through a local server.
2. Have `completed/index.html` open in another tab to compare against once you are done.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Finish the box and sphere (TODOs 1-2), write the scene description (TODO 3), then work through [`tests/checklist.md`](tests/checklist.md) | A working, accessible three-shape scene |

### Step 1: finish the box, and add the sphere (TODOs 1-2)

`a-box` and `a-sphere` are A-Frame's built-in primitive shapes: HTML tags that draw a 3D mesh with no separate model file. Give the box a `width`, `height`, `depth`, and a `color`; add a sphere the same way, with a `radius` instead of three dimensions.

```html
<a-box id="box" position="-1.5 0.5 -3" width="1" height="1" depth="1" color="#a4133c"></a-box>
```

### Step 2: write the scene description (TODO 3)

`#scene-description` is not a caption for people who can already see the canvas; it is the only description some learners will ever get. Name every shape, its colour, and roughly where it is, and update it whenever the scene changes — a description that no longer matches the scene is worse than none, because it actively misleads.

## Key code explained

- **`id="scene-description"`.** A real paragraph, not a `title` or `alt` attribute, because a 3D `<canvas>` has no equivalent of an image's `alt` text (WCAG 1.1.1).
- **`aria-hidden="true"` on `<a-scene>`.** The canvas itself carries no accessible information of its own; hiding it from assistive technology avoids an empty, confusing announcement, since the real information lives in the paragraph and list next to it.
- **`role="list"` on the shape list.** Safari drops a list's implicit semantics once it has `list-style: none`, unlike other browsers; `role="list"` restores it everywhere.
- **`matchMedia('(prefers-reduced-motion: reduce)')`.** A single check, run once, that decides whether the cylinder starts turning or starts paused, before the learner has to touch anything.
- **A plain `requestAnimationFrame` loop instead of A-Frame's `animation` component.** One boolean, `paused`, fully controls the rotation, which keeps the reduced-motion logic easy to read and test.

## 3D and XR accessibility

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `#scene-description` names every shape, colour, and position | 1.1.1 | The canvas itself has no text alternative |
| The highlight button is a real `<button>`, reachable and activatable by keyboard | 2.1.1 | Nothing in this lesson depends on pointing a mouse at the 3D canvas |
| The cylinder's rotation respects `prefers-reduced-motion`, and a labelled button can also pause and resume it | 2.2.2, 2.3.3 | Motion sensitivity is common, and an automatic rotation with no control is one of the most frequent causes |
| The shape list exists in plain HTML, always, not only inside the canvas | 1.3.1, 4.1.2 | Works with WebGL disabled, and for anyone using a screen reader |
| The camera never moves | 2.3.3 | `look-controls` and `wasd-controls` are both disabled; this lesson does not teach camera movement |

## Performance considerations

Three primitive shapes and a plane are a trivial load for any device that can run a browser at all; there is nothing to optimise here. The one thing worth watching is the rotation loop: it reads `time` from `requestAnimationFrame` rather than assuming a fixed frame rate, so it turns at the same real-world speed on a fast or a slow device.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Writing the scene description once and forgetting to update it | The description says something the scene no longer shows | Update `#scene-description` in the same step you change the scene |
| Using colour alone to mark the highlighted shape | A colour-blind or screen-reader user gets no information from the highlight | Announce the highlighted shape's name in the `#status` live region too |
| Starting the rotation before checking `prefers-reduced-motion` | A learner who asked their system to reduce motion sees it anyway | Check the media query once, before the first frame, and start `paused` accordingly |
| Leaving `look-controls` and `wasd-controls` at their A-Frame defaults | The camera can be dragged or moved, which this lesson never asked for | Explicitly set `enabled: false` on both, until a later lesson teaches them |

## Troubleshooting

**The scene is blank.** Check the browser console: A-Frame logs a clear error if the `<script>` tag failed to load, which usually means the page was opened as `file://` instead of through a local server.

**The highlight button's text never changes.** Confirm `script.js` is loaded after the elements it looks up with `getElementById`; a script placed in `<head>` instead of at the end of `<body>` will not find them yet.

**Firefox shows a different reduced-motion setting than Chrome.** Firefox reads the OS-level "reduce motion" setting directly; Chrome and Edge have their own DevTools override (Rendering panel → "Emulate CSS media feature prefers-reduced-motion") for testing without changing the whole system.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth shape, fully in the same accessible pattern.
2. **[Creative](challenges/challenge-2.md)**: recolour the scene with colours meaningful to your own culture or community.
3. **[Explorer](challenges/challenge-3.md)**: rebuild the same scene in three.js.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) completely.
2. Take a screenshot of the finished scene.
3. Keep it in your learner journal and portfolio.
4. Journal question: what is the smallest lesson topic you could teach this completely, in one session that still ends in something visible?

## Further reading

- [A-Frame: primitives](https://aframe.io/docs/1.8.0/introduction/html-and-primitives.html) — how `a-box`, `a-sphere`, and similar tags work
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — the media feature this lesson checks
- [W3C: Understanding Success Criterion 1.1.1 (Non-text Content)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) — why `#scene-description` exists
- [`docs/en/xr-accessibility.md`](../../../../docs/en/xr-accessibility.md) — the full manual-check requirements this lesson follows

## License

Code: [`LICENSE-CODE`](../../../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
