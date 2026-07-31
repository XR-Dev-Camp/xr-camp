# ADR 0001 — Public/private repository split

**Status:** Accepted
**Date:** 2026-07-30
**Applies to:** `xrcamp-projects` (public), `xrcamp-platform` (private)

---

## 1. Problem statement

XR Camp must publish practical course materials openly — this is core to its mission as an open education programme — while operating a private learning platform holding learner accounts, progress, assessments, and certificates. A single repository cannot serve both without either leaking private data or withholding materials that should be public.

## 2. Constraints

1. Learner personal data, progress, and journals must never be public.
2. Assessment answer keys must not be public, or assessment becomes meaningless.
3. Starter and completed project code must be public and forkable — learners are explicitly taught to fork, publish, and showcase it.
4. Instructor videos are the programme's principal production investment and remain platform-only.
5. The platform must resolve a lesson to its project code without hard-coded URLs scattered through the interface.
6. Materials must remain reachable where GitHub is unreliable or blocked, including mainland China — a stated launch market.

## 3. Alternatives considered

**A. Single public monorepo.** Simplest to operate; violates constraints 1, 2, and 4 outright. Rejected.

**B. Single private repo, publish via export.** Full control, one source of truth. But the export pipeline becomes a permanent maintenance burden, learners cannot open pull requests against materials, and the public artefact has no real commit history — losing much of its teaching value, since Git collaboration is itself part of the curriculum. Rejected.

**C. Two repositories, linked by stable identifiers.** Public projects repo; private platform repo. The platform stores a `lessonId` and resolves the project through metadata. Recommended.

**D. Two repositories with the public one vendored as a submodule.** Adds Git submodule complexity — a well-known source of contributor confusion — for no benefit the metadata contract does not already provide. Rejected.

## 4. Recommended solution

Option C.

- `xrcamp-projects` (public): starter code, reference solutions, challenges, technical documentation, screenshots, assets, translations.
- `xrcamp-platform` (private): PWA, CMS, authentication, learner data, quizzes, progress, certificates, analytics, administration, payments.

The join is `lessonId`, carried in each project's `project.json` and mirrored in the platform's lesson metadata. No GitHub URL is hard-coded in the interface; the platform composes URLs from `repository` + `path`.

## 5. Tradeoffs

Gained: a genuinely open public artefact learners can fork and contribute to; a hard security boundary that is structural rather than procedural; independent release cadence.

Given up: single-source-of-truth simplicity. Two repositories can drift — a lesson can reference a project that has been renamed. This is the principal cost, and it is why `scripts/validate-projects.mjs` runs in CI and why identifier stability is treated as a contract rather than a convention.

## 6. Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Private material committed publicly | High | Gitleaks in CI; `SECURITY.md` reporting path; no learner data ever enters this repo's toolchain |
| `lessonId` drift between repos | Medium | CI validation; IDs treated as immutable once published |
| Project renamed, breaking platform links | Medium | Directory names are part of the contract; renames require a redirect entry |
| GitHub unreachable in a launch market | Medium | Mirror hosting for demos; vendored dependencies; offline downloads via the platform |

## 7. Future scalability

The metadata contract admits additional consumers without change — a public project catalogue, a mobile client, partner institutions. A second public repository (for example, instructor-facing materials) can join the same scheme by adopting `catalog.json`.

## 8. Migration strategy

Identifiers are immutable once a cohort has begun. To rename a project after publication: keep the original directory with a `MOVED.md` pointer, add the new one, and carry the original `lessonId` forward. Never reissue a retired `lessonId` — certificates reference them.

## 9. Accessibility impact

Neutral to positive. The split lets accessibility gates run in public CI against every reference solution, where results are visible to contributors and learners. Auditing in a private repository would hide both the checks and the failures.

## 10. Educational impact

Strongly positive, and the deciding factor. Learners work in a real public repository with real issues, pull requests, reviews, and CI. GitHub stops being a file host and becomes part of the curriculum — which is the stated intent of the programme's Git and open source courses.
