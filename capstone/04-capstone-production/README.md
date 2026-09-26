# Capstone Production

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `capstone` · **Lesson:** `capstone-production-04` · **Time:** about 28 hours · 38 sessions of 45 minutes · about 10 weeks at 4 sessions a week

---

> Build the production application.

---

## Learning objectives

By the end of this project you will be able to:

1. Turn an approved prototype and design into a production build plan.
2. Work through a build checklist without losing track of what is done.
3. Write documentation a stranger could use to run and understand your project.
4. Keep a changelog as you build, not only at release.
5. Apply the accessibility, performance, and security plans from Stage 2 to real production code.
6. Review your own work against a quality checklist before it is considered done.
7. Recognise when to cut scope rather than miss quality, using your Stage 1 "out of scope" list as a guide.

## Prerequisites

- **Stage 7.3: Capstone Prototype.** You need an approved, tested prototype and design review before this stage begins.
- Every earlier XR Camp course relevant to your capstone's technology choices.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| VS Code and a local server | Building and testing the production application | Free |
| Git and a free Git hosting account (GitHub, or an equivalent available in mainland China, such as Gitee) | Version control and a public repository for Stage 5 | Free |
| A screen reader, and browser DevTools' device toolbar | Testing accessibility and responsiveness as you build | Free |

## What you will build

Stage 4 of the Professional Capstone: the **production build** of your capstone, following your Stage 2 design and Stage 3 prototype findings. This is the longest stage — 38 sessions — because building carefully takes longer than planning or prototyping, and rushing it undoes the value of the first three stages.

Rather than a second worked build (which would only repeat Stage 3's pattern at a larger scale), the reference solution in [`completed/`](completed/) is Ana's **filled-in production documentation**: her completed build checklist, a user guide, a README a stranger could follow, and a changelog kept across the build. [`completed/index.html`](completed/index.html) presents all four. The starter has the same four templates, with 8 TODOs, plus this stage's rubric.

## Folder guide

```text
04-capstone-production/
├── README.md
├── project.json
├── starter/
│   ├── index.html            # Start page: links to every template below
│   ├── build-checklist.md     # TODOs 1–3: your production build plan
│   ├── user-guide.md           # TODOs 4–5: instructions for the people who use it
│   ├── readme-template.md      # TODOs 6–7: a README a stranger could follow
│   ├── changelog.md            # TODO 8: a running log of what changed
│   └── rubric.md               # How this stage is assessed
├── completed/                 # Ana's filled-in production documents: open this last
├── challenges/                 # Three challenges: Foundation is required
├── tests/checklist.md
├── assets/
└── screenshots/
```

## Setup

1. Confirm Stage 3's prototype was approved, and gather its test log and design review notes — you will build on both.
2. Copy `starter/` into your capstone workspace.
3. Set up a Git repository for your production code now, even if you keep it private until Stage 5.
4. Read [`starter/rubric.md`](starter/rubric.md).

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; re-read your Stage 2 design and Stage 3 test log | A build plan grounded in what you already proved works |
| 2–3 | Step 1: the build checklist (TODOs 1–2) | A checklist broken into small, checkable tasks |
| 4 | Step 1, continued (TODO 3) | Tasks ordered so early ones unblock later ones |
| 5–20 | Step 2: build the core experience, one checklist item at a time | Each session ends with one more checked-off, visibly working item |
| 21 | Mid-build review: re-test against your Stage 2 accessibility and performance plans | A list of any regressions to fix before continuing |
| 22–30 | Step 2, continued: remaining checklist items | The full experience working end to end |
| 31 | Step 3: the user guide (TODOs 4–5) | Instructions a real user could follow unaided |
| 32 | Step 4: the README (TODOs 6–7) | A README a stranger could use to run your project locally |
| 33 | Step 5: the changelog (TODO 8) | A dated record of what changed, and why |
| 34 | Full accessibility pass: keyboard, screen reader, reduced motion, colour contrast | An accessibility pass with issues logged and fixed |
| 35 | Full performance pass: measure against your Stage 2 budget | A build within budget, or a documented plan to get there |
| 36 | Quality review against `tests/checklist.md` | A build ready for a final self-review |
| 37 | Fix anything the review found; request mentor approval | An approved production build |
| 38 | One challenge extension, then **Submitting your work** | A finished capstone application |

### Step 1: the build checklist (TODOs 1–3)

Open [`starter/build-checklist.md`](starter/build-checklist.md). Break your Stage 2 design into small, checkable tasks (TODO 1), grouped by area — scene, data, accessibility, performance (TODO 2) — and ordered so foundational tasks come before the tasks that depend on them (TODO 3). A checklist you can genuinely check off, item by item, keeps a 38-session build from feeling shapeless.

### Step 2: build

This is not a single walkthrough step: it is most of the stage. Work through your checklist, one item at a time, testing as you go the way Stage 3 taught you — keyboard, screen reader, reduced motion, and performance, applied continuously rather than saved for the end. Reuse the accessible-3D-page pattern and pinned library versions from Stage 3 and from `web3d-developer/07` wherever your capstone needs them.

### Step 3: the user guide (TODOs 4–5)

Open [`starter/user-guide.md`](starter/user-guide.md). Write instructions for the people who will actually use your capstone (TODO 4) — plain language, no assumed technical knowledge — and instructions for anyone who maintains it after you (TODO 5), including anything a maintainer would need to know that is not obvious from the code.

### Step 4: the README (TODOs 6–7)

Open [`starter/readme-template.md`](starter/readme-template.md). Write a README a stranger could use to get your project running locally from nothing (TODO 6), and a short section describing what technologies it uses and why (TODO 7). This is the same discipline as every `README.md` in this repository.

### Step 5: the changelog (TODO 8)

Open [`starter/changelog.md`](starter/changelog.md). Keep a dated entry for each meaningful change as you build, not reconstructed from memory at the end. A changelog kept honestly is often the fastest way to answer "what did I actually do in this stage?" when you write Stage 5's case study.

## Key code explained

- **Build checklist.** A production plan broken into small, ordered, checkable tasks — the difference between "build the app" and a plan you can actually track across 38 sessions.
- **User guide.** Instructions for the people who use your finished capstone, written in plain language with no assumed technical background.
- **README.** The first document anyone — a stranger, a future employer, your future self — reads to understand and run your project.
- **Changelog.** A dated, ongoing record of what changed and why, kept as you go.
- **Mid-build review.** A deliberate pause partway through a long build to re-test against earlier plans, catching regressions before they compound.

## 3D and XR accessibility

Everything from Stages 2 and 3 is now built at full scale: every scene needs `#scene-description`, an always-present 2D equivalent, a keyboard route for every interaction, a reduced-motion check before any animation, a working Pause button, and no unrequested camera motion. At this stage's scale, re-test after every significant addition — a new object, a new interaction, a new room — rather than waiting until the whole build is finished to check any of it.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every production page declares `lang="en"` and a `<title>` | 3.1.1, 2.4.2 | Assistive technology and browser tabs both need this |
| Every interactive control has a visible focus indicator | 2.4.7 Focus Visible | Keyboard users need to see where they are |
| Colour contrast meets 4.5:1 across the built application | 1.4.3 Contrast (Minimum) | Low-contrast text is unreadable for many users |
| Every form input has an explicit `type` and a visible label | 1.3.1, 4.1.2 | pa11y's checker requires a `type`; a visible label starts an accessible name |
| Status changes are announced through a live region | 4.1.3 Status Messages | Screen reader users need to know what changed without moving focus |

## Performance considerations

Re-measure draw calls, triangles, and page weight regularly through the build, not only once at the end — Stage 3 already gave you a working measurement method and a budget to check against. If you go over budget, decide deliberately what to simplify, using your Stage 1 "out of scope" list as the first place to look for cuts.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Building everything before testing anything | Bugs and accessibility issues compound and become expensive to isolate | Test after every checklist item, the way Stage 3 practised |
| Writing documentation only at the very end | Details are forgotten, and the README undersells real decisions made along the way | Update the changelog and README as you go |
| Ignoring the mid-build review | Regressions introduced early are only found once everything else depends on them | Stop at the planned checkpoint and re-test deliberately |
| Adding scope beyond Stage 1's plan because "it would be easy" | The stage runs out of sessions before the core experience is finished | Check new ideas against the Stage 1 "out of scope" list before starting them |
| Skipping the quality review because the build "looks done" | Issues a stranger would notice immediately go unnoticed by the builder | Work through `tests/checklist.md` fully before requesting approval |

## Troubleshooting

**I am running out of sessions.** Return to your build checklist and your Stage 1 scope. Cut the least essential item still unchecked, and note the cut in your changelog and your Stage 5 case study — an honest, documented cut is a normal part of shipping software.

**My performance budget keeps slipping as I add features.** Re-measure after every addition, not only at the end, so you catch the exact change that pushed you over budget.

**I don't know what belongs in the README versus the user guide.** The README is for someone setting up and running your code (a developer, a future you); the user guide is for someone using the finished experience (your capstone's real audience). They rarely overlap much.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: Follow your own README from a completely fresh folder, as if you were a stranger, and fix every step that did not work as written.
2. **[Creative](challenges/challenge-2.md)**: Add one production detail — a label, a description, an interaction — that reflects your own language or community, and confirm it reads clearly to someone outside it.
3. **[Explorer](challenges/challenge-3.md)**: Add a basic automated check (even a simple script that opens your page and checks for console errors) to your build process, and document how to run it.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of your finished application and your completed build checklist.
3. Keep your build checklist, user guide, README, and changelog in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: what did you cut from your original Stage 1 scope, and how did you decide?

## Further reading

- [MDN: Understanding client needs and writing documentation](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines) 
- [Keep a Changelog](https://keepachangelog.com/) 
- [W3C WAI: WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) 
- [docs/en/3d-assets-and-versions.md](../../docs/en/3d-assets-and-versions.md) 

## Women to Know

Jess Lee grew up in Hong Kong before studying computer science at Stanford. As a heavy user of the fashion web app Polyvore, she emailed its founder a detailed critique of the product in 2008, was hired, and rose to honorary co-founder and then CEO in 2012. Yahoo later acquired Polyvore, and in 2016 she joined Sequoia Capital as its first senior female US investing partner.

Lee's path started with a detailed, specific critique of a real product — the same close attention to what actually works, and what does not yet, that a long production stage like this one demands from you, checklist item by checklist item.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

**Keep a Changelog**, a widely used community convention (not a formal standards-body specification), sets out a simple, consistent format for the kind of changelog this stage asks you to keep. Alongside it, the **W3C WAI-ARIA Authoring Practices Guide** documents accepted, tested patterns for building accessible custom controls — worth checking against before inventing your own pattern from scratch.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
