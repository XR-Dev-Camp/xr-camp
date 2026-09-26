# Testing, Launch, and Presentation

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `capstone` · **Lesson:** `testing-launch-and-presentation-05` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Release the capstone, public repository, case study, and presentation.

---

## Learning objectives

By the end of this project you will be able to:

1. Run a final release test pass across accessibility, performance, and functionality.
2. Publish a public code repository with a clear, honest README.
3. Write a case study that explains what you built, why, and what you learned.
4. Prepare a short presentation of your capstone for a non-technical audience.
5. Run a retrospective on your own five-stage process.
6. Identify a real or realistic next step for the project after XR Camp.
7. Present your finished work with confidence, grounded in evidence from Stages 1–4.

## Prerequisites

- **Stage 7.4: Capstone Production.** You need an approved, tested production build before this stage begins.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Your Git hosting account from Stage 4 | Publishing your public repository | Free |
| A text editor | Writing the case study and presentation outline | Free |
| Any free slide tool, or plain Markdown, for your presentation | You do not need paid presentation software | Free |

## What you will build

Stage 5 of the Professional Capstone, the final stage: **release** your capstone publicly, write a **case study**, prepare a **presentation**, and run a **retrospective** on the whole five-stage process.

The reference solution in [`completed/`](completed/) is Ana's filled-in release checklist, case study, presentation outline, and retrospective for the Aurora Community Museum exhibit — the capstone followed across all five stages of this course. [`completed/index.html`](completed/index.html) presents all four, alongside links back to every earlier stage. The starter has the same four templates, with 8 TODOs, plus this stage's rubric.

## Folder guide

```text
05-testing-launch-and-presentation/
├── README.md
├── project.json
├── starter/
│   ├── index.html            # Start page: links to every template below
│   ├── release-checklist.md   # TODOs 1–2: the final test pass and release steps
│   ├── case-study.md           # TODOs 3–5: what you built, why, and what you learned
│   ├── presentation-outline.md # TODOs 6–7: a short presentation plan
│   ├── retrospective.md        # TODO 8: looking back across all five stages
│   └── rubric.md               # How this stage is assessed
├── completed/                 # Ana's filled-in release materials: open this last
├── challenges/                 # Three challenges: Foundation is required
├── tests/checklist.md
├── assets/
└── screenshots/
```

## Setup

1. Confirm Stage 4's production build passed its quality checklist and mentor review.
2. Copy `starter/` into your capstone workspace.
3. Read [`starter/rubric.md`](starter/rubric.md).

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; gather your Stage 1–4 documents in one place | Everything you need for the case study, ready to hand |
| 2 | Step 1: the release checklist, part 1 (TODO 1) | A final test pass plan covering accessibility, performance, and function |
| 3 | Step 1, continued (TODO 2) | Release steps: repository, README, licence, live link |
| 4–5 | Run the final test pass | Every item on the release checklist checked and any issues fixed |
| 6 | Publish the public repository | A public, working repository link |
| 7 | Step 2: the case study, part 1 (TODO 3) | A clear statement of the problem and who it was for |
| 8 | Step 2, continued (TODO 4) | What you built, and what you deliberately left out |
| 9 | Step 2, continued (TODO 5) | What you learned, including at least one honest struggle |
| 10 | Step 3: the presentation outline, part 1 (TODO 6) | A structure for a short, non-technical presentation |
| 11 | Step 3, continued (TODO 7) | Slides or notes, practised at least once out loud |
| 12 | Step 4: the retrospective (TODO 8) | A look back across all five stages: what changed, what you would do differently |
| 13 | Present to a mentor, peer, or group | Feedback recorded from a real presentation |
| 14 | [`tests/checklist.md`](tests/checklist.md); fix anything it finds | A release ready for final sign-off |
| 15 | Request final mentor approval | An approved, released capstone |
| 16 | One challenge extension, then **Submitting your work** | A completed Professional Capstone |

### Step 1: the release checklist (TODOs 1–2)

Open [`starter/release-checklist.md`](starter/release-checklist.md). List every test you will run one final time before release (TODO 1) — the same accessibility and performance checks from every earlier stage, run once more against the finished build — and every release step (TODO 2): a public repository, a clear README, a licence file, and a working live link.

### Step 2: the case study (TODOs 3–5)

Open [`starter/case-study.md`](starter/case-study.md). Write the problem and audience (TODO 3, drawing directly on your Stage 1 brief), what you built and what you deliberately left out (TODO 4, drawing on your Stage 1 scope and Stage 4 changelog), and what you learned (TODO 5) — including at least one honest struggle, not only successes. A case study that only lists successes reads as marketing, not as evidence of real work.

### Step 3: the presentation outline (TODOs 6–7)

Open [`starter/presentation-outline.md`](starter/presentation-outline.md). Plan a short presentation (five to seven minutes is typical) for a non-technical audience: the problem, a demonstration or screenshots, what you learned, and what comes next (TODO 6). Then prepare your actual slides or speaking notes, and practise saying them aloud at least once before presenting for real (TODO 7).

### Step 4: the retrospective (TODO 8)

Open [`starter/retrospective.md`](starter/retrospective.md). Look back across all five stages: what took longer than planned, what your mentor's feedback changed, and what you would do differently starting a new capstone today. Be specific — "communicate better" teaches you less than "I should have shown my wireframes to a real user before Stage 3, not after."

## Key code explained

- **Release checklist.** The final, one-time test pass and publication steps that turn a finished build into a released project.
- **Case study.** A written account of what you built, why, and what you learned — evidence of your process, not only your result.
- **Presentation outline.** A short, structured plan for explaining your work to people who were not there while you built it.
- **Retrospective.** A deliberate, honest look back at your own process, aimed at what you would do differently next time.
- **Public repository.** Your capstone's code, published where others can read, run, and learn from it, under the licences this repository already uses.

## 3D and XR accessibility

Run the full manual 3D/XR accessibility checklist from `docs/en/xr-accessibility.md` one final time against your released build: scene description, keyboard route, reduced motion, a 2D fallback, and comfort. This is the last chance to catch a regression before the link goes out publicly in your case study and presentation.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The released repository's README states the licence clearly | Good practice | Anyone reusing or learning from the code needs to know the terms |
| The final release passes every accessibility check from Stages 2–4 once more | Multiple (see earlier stages) | A regression introduced late in Stage 4 must not reach the public release |
| `completed/index.html` declares `lang="en"` | 3.1.1 Language of Page | Assistive technology needs to know which language rules to apply |
| Presentation slides or notes use readable contrast and plain language | 1.4.3, Good practice | A presentation is also a public-facing document |

## Performance considerations

Run one final performance measurement against your Stage 2 budget before publishing the live link. A capstone that was within budget in Stage 4 but has since grown (a forgotten debug feature, an unoptimised asset) should be caught here, not by its first real visitor.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Publishing without a final test pass | A regression from late in Stage 4 reaches real visitors | Run the full release checklist once more before publishing |
| Writing a case study with no honest struggles | Reads as marketing, and misses the chance to show real learning | Include at least one genuine difficulty and how you handled it |
| Presenting without practising aloud | The presentation runs long, or key points are missed | Practise at least once, ideally to another person |
| Skipping the retrospective because the project is "done" | The same avoidable mistakes repeat in the next project | Write specific, actionable notes — the retrospective is for your next capstone, not just this one |
| A public repository with no README or licence | No one else can understand or reuse the work | Publish both, following this repository's own pattern |

## Troubleshooting

**I am not sure what to include in the case study's "what I learned" section.** Look at your changelog and design review notes from Stages 3–4: the most honest learning usually shows up there first, as a fix you had to make.

**My presentation is running long.** Cut detail, not structure: keep the problem, the demonstration, one honest learning, and next steps, and move any remaining detail to your case study instead.

**I don't have a real next step for the project.** A realistic, modest next step — "add Spanish and Chinese translations," "test with five real users" — is enough. It does not need to be a guaranteed plan.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: Present your capstone to someone who has never seen it, timed, and record what questions they asked afterward.
2. **[Creative](challenges/challenge-2.md)**: Write your case study's opening paragraph so it clearly reflects your own voice, language background, or community, rather than a generic template tone.
3. **[Explorer](challenges/challenge-3.md)**: Write a short "if I had one more stage" plan: the single most valuable thing you would build next, and why.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your published public repository and your presentation's title slide.
3. Keep your release checklist, case study, presentation outline, and retrospective in your learner journal and portfolio. Share them with other developers (see [where to share your work](../../docs/en/community.md)) — this is your capstone's public record.
4. Journal question: looking back across all five stages, what is the one decision you are proudest of, and the one you would make differently?

## Further reading

- [Keep a Changelog: Releasing](https://keepachangelog.com/) 
- [MDN: Publishing your website](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website) 
- [W3C WAI: Involving Users in Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/involving-users/) 
- [Choose a License](https://choosealicense.com/) 

## Women to Know

Yasodara Córdova is a Brazilian technologist who, as a project leader with W3C Brasil (NIC.br), was named co-chair of the W3C's Data on the Web Best Practices Working Group, whose recommendation was published in 2017. She later directed Operação Serenata de Amor, a civic-technology project that used machine learning and open data to monitor Brazilian politicians' public spending.

Serenata de Amor only mattered once it was released: a working, public tool that let anyone inspect its findings and its open-source code. That is the last step of this stage, too — not just building something, but publishing it where it can be checked, used, and learned from by others.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Choosing an open-source licence for your public repository (this course itself uses separate code and content licences, in `LICENSE-CODE` and `LICENSE-CONTENT`) is a standards-adjacent decision worth making deliberately: the Open Source Initiative maintains the definitions most free licences are checked against, so a released capstone should name its licence clearly rather than leave it unstated.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
