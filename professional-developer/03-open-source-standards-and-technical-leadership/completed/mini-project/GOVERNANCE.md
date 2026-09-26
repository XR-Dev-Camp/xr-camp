# Governance

This describes how decisions get made in `scene-description-lint`, a small open-source project designed for this course (an idea, not a shipped tool; the governance still has to be real thinking).

## What this project does

Checks a folder of HTML files for the pattern XR Camp's 3D lessons use — a text element with `id="scene-description"` beside any `<a-scene>` or 3D canvas — and reports any 3D page missing one.

## Roles

**Maintainer:** can merge pull requests, set the roadmap, and add or change what the tool checks for. **Contributor:** can open issues and pull requests, and review other people's pull requests, but cannot merge their own.

## How decisions get made

A small change (a false-positive fix, a clearer error message) needs one maintainer's approval and can merge the same day. A bigger change (a new rule, a change to what counts as a "pass") needs a short written proposal first — a paragraph in an issue describing the problem and the proposed rule — open for at least a few days for comment, the same pattern this course's own explainer step teaches for standards work.

## Becoming a maintainer

Two or three well-reviewed pull requests, plus at least one thoughtful review left on someone else's pull request, are enough to be invited. This mirrors a Community Group: participation, not tenure, earns trust.

## Stepping back

If the one maintainer becomes unreachable for more than two months, the most active contributor may ask, in an issue, for maintainer access; if no one objects within two weeks, access transfers. Naming this rule now, before it is ever needed, is what keeps a small project from simply stalling the day its one maintainer disappears.
