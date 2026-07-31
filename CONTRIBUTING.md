# Contributing to XR Camp Projects

Learners, instructors, and community members are all welcome here. Many of the people reading this are contributing to an open source project for the first time — that is expected, and it is one of the reasons this repository exists.

Please read [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) before participating.

---

## Ways to contribute

| Contribution | Skill needed |
| --- | --- |
| Report a typo, broken link, or confusing instruction | None |
| Improve a project README | Writing |
| Add or refine a translation | Bilingual fluency |
| Fix an accessibility defect in a completed project | HTML/ARIA |
| Add a screenshot or demo | Basic Git |
| Propose a new challenge exercise | Teaching sense |
| Improve a reference solution | Relevant technology |

Opening a clear issue is a real contribution. You do not need to write code.

---

## Before you open a pull request

Every pull request must satisfy all eight of these. Reviewers will check each one.

- [ ] **Readable** — another engineer can follow it five years from now.
- [ ] **Modular** — no tight coupling; clear interfaces.
- [ ] **Documented** — purpose, inputs, outputs, dependencies, accessibility notes, examples, testing instructions.
- [ ] **Tested** — the project's `tests/checklist.md` passes.
- [ ] **Accessible** — keyboard, screen reader, contrast, visible focus, reduced motion.
- [ ] **Performant** — no gratuitous payload; assets optimized.
- [ ] **Localized** — learner-facing strings changed in `README.md` are flagged for `README.es.md` and `README.zh-Hans.md`.
- [ ] **Secure** — no secrets, credentials, tokens, personal data, or private URLs.

Avoid premature optimization. Avoid clever code. Prefer the version a beginner can read.

---

## Project structure rules

If you add a project, it must match the standard anatomy exactly:

```text
NN-course-slug/
├── README.md  README.es.md  README.zh-Hans.md
├── project.json
├── starter/  completed/
├── challenges/  tests/  assets/  screenshots/
├── LICENSE  ATTRIBUTION.md
```

`project.json` is consumed directly by the xrcamp.dev platform. Its `lessonId` **must** match the lesson ID used in the private curriculum, progress tracking, certificates, and translation files. A mismatched ID silently breaks the learner's link from lesson to project. CI validates this — see [`.github/workflows/validate.yml`](.github/workflows/validate.yml).

---

## Accessibility is not optional

A pull request that adds an inaccessible interface will not be merged, regardless of how good it looks. If you are unsure how to fix an accessibility issue, open the pull request anyway and ask — that is a teaching opportunity, not a failure.

3D and XR enhancements must never prevent access to the core content. Every project must remain usable with a keyboard and conventional 2D controls wherever feasible.

---

## Translations

We maintain one repository with parallel documentation rather than separate per-language repositories. Translate the complete document, not a summary. Code stays technically identical across languages; learner-facing text and code comments may be localized.

Files marked `<!-- TODO: translate -->` are awaiting a translator. Claiming one in an issue before you start avoids duplicated effort.

---

## Using AI assistance

AI may assist you. It may not replace your understanding.

Every AI-assisted contribution must be reviewed, explained, tested, and documented by you. If you cannot explain what the code does and why, it will not be merged. Please note AI assistance in your pull request description — this is normal practice here, not something to hide.

---

## Reporting security or privacy problems

Do not open a public issue. See [`SECURITY.md`](SECURITY.md).
