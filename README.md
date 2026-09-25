# XR Camp Projects

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

The public workshop for [XR Camp](https://xrcamp.dev) — starter code, reference solutions, challenges, and technical documentation for every project in the curriculum.

> **Everything is here, and everything is free.**
>
> This repository is the whole of XR Camp: the lessons, the starter code, the reference solutions, and the challenges. There are no accounts to create and nothing to pay. Download it, fork it, and build.

---

## Who XR Camp is for

XR Camp is **completely free, for everyone**. There are no fees, no paywalls, and no paid tiers.

It is built first for **women in Latin America and China** who want to become web, 3D, and immersive developers, including women who have never written code. Lessons are written in English, Spanish, and Simplified Chinese. They are created by women experts and by male allies committed to women's empowerment.

---

## How to use this repository

You do not need to understand Git to start. Pick the workflow that matches where you are.

| Level | What you do here |
| --- | --- |
| **Preface** | View examples in the browser. Download single files. |
| **Beginner** | Download a ZIP, edit locally, create a repository, commit, publish with GitHub Pages. |
| **Intermediate** | Clone, branch, open issues, submit pull requests, review code, resolve conflicts. |
| **Advanced** | Package management, automated tests, CI, releases, dependency and security checks, deployment environments. |

GitHub itself is part of the curriculum. Each phase asks a little more of you.

---

## Course map

Each folder corresponds to one phase of the curriculum. Each subfolder is one course project.

| Folder | Phase | Projects | Sessions | At 4 sessions a week |
| --- | --- | --- | --- | --- |
| [`preface/`](preface/) | Phase 0 — Welcome to the Future | 9 | 64 | about 4 months |
| [`web-developer/`](web-developer/) | Phase 1 — Become a Web Developer | 9 | 144 | about 8 months |
| [`frontend-engineer/`](frontend-engineer/) | Phase 2 — Become a Frontend Engineer | 9 | 145 | about 8 months |
| [`web3d-developer/`](web3d-developer/) | Phase 3 — Become a Web3D Developer | 7 | 138 | about 8 months |
| [`immersive-developer/`](immersive-developer/) | Phase 4 — Become an Immersive Developer | 6 | 111 | about 6 months |
| [`full-stack-spatial/`](full-stack-spatial/) | Phase 5 — Become a Full-Stack Spatial Developer | 8 | 155 | about 9 months |
| [`professional-developer/`](professional-developer/) | Phase 6 — Become a Professional Developer | 5 | 73 | about 4 months |
| [`capstone/`](capstone/) | Phase 7 — Professional Capstone | 5 | 95 | about 6 months |

Time is planned in **45-minute sessions**, because that is what fits around work, study, and family. Every project README shows its time the same way, for example: *about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week*. Every phase ends with its own certificate, so you do not need to finish the whole programme to have something real.

A machine-readable index of every project lives in [`catalog.json`](catalog.json).

### Project status

Each `project.json` has a `status`:

| Status | Meaning |
| --- | --- |
| `draft` | Being written. Never shown to learners. |
| `review` | Complete in English; awaiting review and translation. |
| `published` | Complete in all three languages. |

CI refuses to mark a project `review` or `published` while it still contains placeholder text.

---

## Anatomy of a project

```text
01-html-foundations/
├── README.md            # English project guide
├── README.es.md         # Spanish guide (complete, not a summary)
├── README.zh-Hans.md    # Simplified Chinese guide
├── project.json         # Metadata: status, time, and accessibility checks
├── starter/             # Where you begin
├── completed/           # Reference solution
├── challenges/          # Foundation · Creative · Explorer
├── tests/checklist.md   # Self-review before you submit
├── assets/
├── screenshots/
├── LICENSE
└── ATTRIBUTION.md
```

Open `starter/` and build. Use `completed/` only after you have made a genuine attempt — reading the answer first costs you the lesson.

---

## Accessibility

Every project in this repository must be usable with a keyboard, work with a screen reader, meet WCAG 2.2 AA contrast, expose visible focus, and respect reduced-motion preferences. 3D and XR enhancements must never block access to the core content.

Each project ships a `tests/checklist.md`. Completing it is part of the project, not an optional extra.

Automated tools cannot see inside a 3D scene, so every 3D and XR project also carries manual checks: a text description of the scene, keyboard controls, a way to stop motion, a 2D fallback, and no forced camera movement. See [`docs/en/xr-accessibility.md`](docs/en/xr-accessibility.md).

3D libraries are pinned to exact versions in [`versions.json`](versions.json), and assets have size budgets so that lessons work on phones and slow connections. See [`docs/en/3d-assets-and-versions.md`](docs/en/3d-assets-and-versions.md).

---

## What is not here

XR Camp has no accounts and collects no learner data. Nothing in this repository should ever contain secrets, credentials, or anyone's personal information.

If you find any of that committed here, please report it privately rather than opening a public issue. See [`SECURITY.md`](SECURITY.md).

---

## Contributing

Contributions are welcome from learners, instructors, and the wider community. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) first.

## Licensing

This repository uses separate licenses for code and for instructional content.

- **Code** — [`LICENSE-CODE`](LICENSE-CODE)
- **Curriculum, documentation, diagrams, transcripts** — [`LICENSE-CONTENT`](LICENSE-CONTENT) (CC BY-NC-SA 4.0)
- **Commercial and institutional use** — [`COMMERCIAL_USE.md`](COMMERCIAL_USE.md)
- **Third-party material** — [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) and [`ATTRIBUTION.md`](ATTRIBUTION.md)
