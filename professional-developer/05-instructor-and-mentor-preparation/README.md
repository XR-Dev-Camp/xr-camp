# Instructor and Mentor Preparation

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `professional-developer` · **Lesson:** `instructor-and-mentor-preparation-05` · **Time:** about 8 hours · 11 sessions of 45 minutes · about 3 weeks at 4 sessions a week

---

> Write a short lesson in the XR Camp format, or a mentor plan, and prepare to contribute it back.

---

## Learning objectives

By the end of this project you will be able to:

1. Write learning objectives that are specific enough to check, not just to feel true.
2. Plan 45-minute sessions that each end in something the learner can see, click, or read back — never a session that only ends in "read about X."
3. Write a worked example that teaches by showing a real, working piece of the finished thing, with reasoning attached.
4. Adapt teaching material for accessible, low-bandwidth learning: captions, plain language, and materials that work offline once downloaded.
5. Describe what an inclusive and safe learning space requires, including a real code of conduct and a real way to handle harm when it happens.
6. Give feedback that is specific and kind, on the work rather than the person, in a way a beginner can actually act on.
7. Design a simple mentoring structure: cadence, session shape, and clear boundaries.
8. Explain how a finished lesson or mentor plan becomes a real contribution back to XR Camp.

## Prerequisites

- **Course 6.4: Career Development and Professional Practice** — this lesson assumes you can already write clearly about your own real work.
- Completion of at least one earlier XR Camp phase, so you have first-hand experience of being taught in this format before you write it yourself.
- No new programming language is introduced here; the tools are writing, plain HTML, and, for the example this lesson studies, A-Frame you have already used in earlier phases.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A text editor (for example VS Code) | Write your lesson or mentor plan | Free |
| A modern browser | View any HTML page you build, and test printing/exporting | Free |
| A local server (the one already used throughout this course) | View pages at `http://`, not `file://` | Free |

No paid account, sign-up, or subscription is required anywhere in this lesson.

## What you will build

One real teaching deliverable, your choice: a short lesson, written entirely in the XR Camp format this course has used since Phase 1, or a mentor plan for guiding one real or realistically imagined learner. Either way, the point is not a simulation exercise — a lesson you write here could genuinely become a real XR Camp lesson one day, and a mentor plan should describe mentoring you could actually give.

The reference solution is in [`completed/`](completed/): Ana wrote both, to show what each looks like finished. Her example lesson, "Shapes and Colour," is a tiny, fully accessible A-Frame lesson that passes every check in this course's own pipeline, including `pa11y`. Your starter project has **12 numbered TODOs** across the two templates and the hub page.

## Folder guide

```text
05-instructor-and-mentor-preparation/
├── README.md
├── starter/                        # begin here
│   ├── lesson-template/            # TODOs 1-9: choose this to write a lesson
│   ├── mentor-plan-template.md     # TODOs 10-11: choose this to write a mentor plan
│   └── index.html                  # TODO 12: your hub page
├── completed/                      # reference solution (Ana wrote both)
│   ├── example-lesson/             # Ana's finished tiny lesson
│   └── mentor-plan.md              # Ana's finished mentor plan
├── challenges/                     # Three challenges: Foundation is required
├── tests/                          # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open `starter/index.html` through the local server this course uses.
2. Read [`.github/CODE_OF_CONDUCT.md`](../../.github/CODE_OF_CONDUCT.md) and [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) once, in full, before you start; both are short, and this lesson refers back to specific parts of each.
3. Decide which of the two deliverables you are writing. Challenge 3 is the only place you are asked to try the other one too.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Step 1: what makes a lesson or mentor plan actually work — objectives, and sessions that end in something visible | Draft learning objectives for your own topic, and a one-line description of what each session of your lesson will end with |
| 2 | Step 2: choose your path, and copy the matching template (TODO 6, or start of TODO 10) | A copied `lesson-template/` folder or `mentor-plan-template.md`, with its metadata filled in |
| 3 | Step 3: accessible and low-bandwidth teaching (TODOs 1, 4) | A plain-language pass on your objectives, and a low-bandwidth note for your material |
| 4 | Step 4: write your worked example and, if writing a lesson, your starter TODOs (TODOs 2-3, 7) | A starter file or document with real, numbered TODOs for your own future learners |
| 5 | Step 4, continued: build your completed reference | A working `completed/index.html`, or a filled-in plan document |
| 6 | Step 5: inclusive and safe learning spaces (TODO 5) | A code-of-conduct reference and a written escalation step, specific to your deliverable |
| 7 | Step 6: giving feedback (TODO 11) | A specific, actionable feedback section, tested by giving real feedback on Ana's example lesson |
| 8 | Step 7: mentoring structures (TODOs 10-11) | A session-cadence plan, even if your main deliverable is a lesson, not a mentor plan |
| 9 | Step 8: challenges and checklist (TODO 9) | Your own `challenges/challenge-1.md` through `challenge-3.md`, and `tests/checklist.md` |
| 10 | Step 9: accessibility pass and `pa11y` (TODO 8, if your deliverable has a completed page) | A page that passes a local WCAG 2.2 AA check |
| 11 | [`tests/checklist.md`](tests/checklist.md), one challenge extension, then **Submitting your work** | A finished, checked lesson or mentor plan, and your `index.html` hub page updated (TODO 12) |

### Step 1: what makes a lesson or mentor plan actually work

Every XR Camp lesson you have taken so far shares two habits worth naming explicitly now that you are about to write one. First, its learning objectives are checkable: "place a shape and set its colour" can be confirmed by looking at the finished work; "understand 3D" cannot. Second, every 45-minute session ends in something visible — a working feature, a filled-in table, a passing checklist item — never in "read about X" alone, because a beginner who cannot see progress at the end of 45 minutes has no way to tell whether the session worked.

### Step 2: choose your path, and start your template

`starter/lesson-template/` is a complete, empty copy of the exact folder anatomy every real XR Camp lesson uses: `README.md`, `project.json`, `starter/`, `completed/`, `challenges/`, `tests/checklist.md`. `starter/mentor-plan-template.md` is a single document with the sections a mentor plan needs: mentee and goal, session structure, worked examples, feedback, accessible and low-bandwidth mentoring, inclusive and safe mentoring, and graduation. Copy whichever one matches your choice, and fill in its metadata first — a title, a rough time estimate, and, for a lesson, a `project.json` with an accurate `estimatedMinutes` and `schedule.sessions` that agree with each other, the same rule [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) enforces on every real lesson in this repository.

### Step 3: accessible teaching, in plain language and low bandwidth

Write for a beginner in her second or third language, on a connection too slow for a large video call: short sentences, one idea per sentence, and no jargon introduced without a plain explanation next to it the first time. Captions matter for the same reason worked examples do — a learner should never need working audio to follow along, so if your lesson or plan uses any recorded explanation, its written form must carry the same content, not a summary of it. Every material you point to must work offline once downloaded, the same rule this whole repository follows for its own pinned libraries.

### Step 4: a worked example, and, for a lesson, starter TODOs (TODOs 1-3, 7)

A worked example teaches by showing real, working code or a real, filled-in document, with the reasoning attached — not a finished thing with no explanation, and not an explanation with nothing to point at. If you are writing a lesson, your starter file needs numbered `// TODO n: <what and why>` comments, in the order a learner will meet them, the same convention every model lesson in this repository uses; your completed file is the same file, finished, plus, if it has any 3D content, `id="scene-description"`, a keyboard route for every interaction, and a `prefers-reduced-motion` check with a Pause button. Ana's `completed/example-lesson/` shows this pattern working end to end, at the smallest possible scale.

### Step 5: inclusive and safe learning spaces

Every XR Camp space, including the one you are about to create, is covered by [`.github/CODE_OF_CONDUCT.md`](../../.github/CODE_OF_CONDUCT.md): a harassment-free environment, expected and unacceptable behaviour, a real reporting address, and specific notes for shared 3D and XR spaces (respecting personal space, not using spatial audio to harass, honouring another participant's comfort settings). Your own lesson or mentor plan must name this document, not restate a shorter version of it, and must say in your own words what happens if someone reports harm: you do not investigate or resolve it yourself, and you name a real place the report should go.

### Step 6: giving feedback

Specific, kind feedback names what happened and why it matters, without naming the person as the problem: "this heading overflows its container at 320 pixels wide" teaches something; "your layout is broken" does not. Feedback on correct work matters just as much, and needs the same specificity, so the learner can repeat what worked on purpose. Practise this directly: write one paragraph of real feedback on Ana's `completed/example-lesson/`, naming one thing that works and why, and one thing you would change if it were your own lesson.

### Step 7: mentoring structures

A mentoring relationship needs a predictable shape: an agreed cadence (Ana's example plan uses one 45-minute session every two weeks), a session structure that reviews real work rather than a description of it, and clear boundaries about contact, hours, and what is and is not the mentor's job to fix. Write this section even if your main deliverable is a lesson, not a mentor plan: name, in two or three sentences, how a mentor might use your lesson as one worked example inside a longer mentoring relationship.

### Step 8: challenges, checklist, and a local accessibility check (TODOs 8-9)

Write your own three challenge extensions — Foundation required, Creative and Explorer optional — and your own `tests/checklist.md`, ending with a "3D and XR (manual)" section if your lesson has any 3D content. If your deliverable has a `completed/index.html`, run it through a local `pa11y` check before you submit, exactly the way this course's own house style requires for every lesson.

## Key code explained

- **Checkable objectives.** An objective phrased as an action a learner performs on a real artifact ("place a shape and set its colour") can be verified by looking at the finished work; a feeling-based objective ("understand 3D") cannot, and belongs in a summary sentence instead.
- **`// TODO n: <what and why>`.** A numbered comment convention, shared across every starter file in this repository, so a learner always knows both what to build and why it matters, in the exact order they will meet each step.
- **`prefers-reduced-motion` plus a Pause button.** The pairing this course always requires for anything that animates: the system preference sets the default, and a visible, labelled control lets the learner override it either way (WCAG 2.2.2, 2.3.3).
- **A code-of-conduct reference, not a restatement.** Linking to `.github/CODE_OF_CONDUCT.md` keeps one authoritative version of the rules; a lesson or mentor plan that quietly writes its own shorter version risks drifting out of agreement with it.
- **A decision record for your own template choice.** Naming, in one sentence, why you chose a lesson or a mentor plan is a small instance of the same "explain your reasoning, briefly, in writing" habit Course 6.3 taught with its decision records.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `starter/index.html` and `completed/index.html` each declare a document language and have one clear `<h1>` | 3.1.1, 2.4.6 | The hub pages themselves must model the standard they teach |
| Any list styled with `list-style: none` keeps `role="list"` | 1.3.1 | Safari drops a list's implicit semantics once it has no bullets, unlike other browsers |
| Every link's purpose is clear from its own text | 2.4.4 | "Ana's mentor plan" tells a screen reader user what they will get; "click here" does not |
| Focus is visible on every link and button | 2.4.7 | Keyboard users must always see where they are |
| Colour contrast meets AA everywhere, including in any example scene | 1.4.3 | Applies equally to a hub page and to Ana's 3D example |
| Any 3D page you or your lesson's example adds has `id="scene-description"`, a keyboard route, a `prefers-reduced-motion` check, a 2D fallback, and a fixed camera | Good practice; see [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) | Automated tools cannot see inside a `<canvas>`, so 3D content needs the same manual checks every 3D lesson in this repository declares |

## Performance considerations

This lesson's own deliverable is text, a small hub page, and one tiny nested example; none of it is heavy. If your own lesson topic includes a 3D scene, apply what Course 3.6 already taught: measure before you optimise, and state any numbers as "on my machine."

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Writing an objective as a feeling ("understand accessibility") | No one, including you, can check whether it was met | Phrase it as a checkable action ("add a working keyboard route to a 3D interaction") |
| A session that ends in "read about X" | A beginner has no way to tell whether the session worked | End every session in something visible: a feature, a filled table, a passing check |
| Restating the code of conduct in your own shorter words | The restatement drifts out of agreement with the real one over time | Link to `.github/CODE_OF_CONDUCT.md` directly, and add only what your specific lesson or plan needs beyond it |
| Feedback that names the person, not the work | The learner gets defensive instead of informed | Name the specific line, behaviour, or decision, and why it matters |
| Skipping a real code-of-conduct reference in a mentor plan because "it's just one-on-one" | A mentee has no named path if something goes wrong specifically with the mentor | Name the reporting address and the escalation step explicitly, even in a one-on-one plan |
| Building a 3D worked example with no `#scene-description` or keyboard route | It fails the exact accessibility bar this whole repository holds every other lesson to | Follow `completed/example-lesson/` as a minimum, working pattern |

## Troubleshooting

**My `project.json`'s `schedule.sessions` does not match my `estimatedMinutes`.** `sessions` must equal `estimatedMinutes / sessionMinutes`, rounded up — the same rule [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) enforces on every lesson in this repository. Recalculate one from the other, and update your README's time line at the top too.

**My `pa11y` check fails on a `<form>`.** A `<form>` element needs a submit button (pa11y's H32 rule); if your controls are only grouped visually with no actual submission, use a `<div>` or `<fieldset>` instead of `<form>`.

**Safari announces my list as plain text, no bullets, no "list" role.** Any `<ul>` or `<ol>` styled with `list-style: none` needs an explicit `role="list"`; Chrome and Firefox keep the implicit list semantics regardless, which is exactly why this gap is easy to miss during testing in only one browser.

**My A-Frame text looks wrong for a non-English label.** A-Frame's default text font drops accented Latin characters and all Chinese characters. Use an HTML overlay or a canvas-drawn label instead of `<a-text>` for anything beyond plain ASCII, the same workaround `docs/en/xr-accessibility.md`'s worked examples use.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: get one real person to try your lesson or mentor plan, and record their honest feedback.
2. **[Creative](challenges/challenge-2.md)**: root your lesson topic, examples, or mentoring approach in your own language, culture, or community.
3. **[Explorer](challenges/challenge-3.md)**: write the other deliverable too, and cross-reference the two.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) completely.
2. Take a screenshot of your finished lesson's completed page, or of your mentor plan.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: which part of writing this — the objectives, the accessibility work, the safety section, or the feedback language — took the most redrafting, and why?

## Further reading

- [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) — the exact anatomy rules and ten pull-request requirements a real contribution must meet
- [`.github/CODE_OF_CONDUCT.md`](../../.github/CODE_OF_CONDUCT.md) — the code of conduct every XR Camp space, including yours, follows
- [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) — the manual 3D and XR accessibility checks referenced throughout this lesson
- [W3C: Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) — the success-criterion explanations this lesson cites
- [Mozilla Foundation: Teaching Kits and open teaching materials](https://foundation.mozilla.org/en/what-we-fund/awards/) — an example of another organisation publishing openly licensed, community-contributed teaching material, the same model this lesson prepares you to contribute to

## Women to Know

**Camila Achutti**, a Brazilian computer scientist, started the "Mulheres na Computação" ("Women in Computing") blog in 2010 while still an undergraduate at the University of São Paulo's Institute of Mathematics and Statistics. She went on to co-found the tech-education company Mastertech in 2015, and founded the education non-profit SOMA in 2019.

Starting a teaching project as a student, before feeling fully qualified, and then building two separate organisations around education over the following decade, is close to the exact arc this lesson asks you to begin: writing one small, honest piece of teaching material now, with the expectation that the habit of teaching and mentoring can grow into something much larger.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

This lesson does not introduce a new web standard; instead, it asks you to work inside one this repository already follows closely: the W3C's Web Content Accessibility Guidelines (WCAG) 2.2, maintained by the W3C Accessibility Guidelines Working Group. Every accessibility requirement your own lesson or mentor plan states should cite a real success-criterion number from that specification, the same discipline this course's own README files have used since Phase 1 — a habit worth carrying into any teaching material you contribute anywhere, not only here.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
