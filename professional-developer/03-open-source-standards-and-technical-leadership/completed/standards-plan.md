# Standards participation plan

Ana's name: Ana

This is a living plan, not a one-time form. Filled in as each step of the [README](../README.md) was completed. Kept in a learner journal.

## 1. My W3C account and Community Group

Created a free W3C account on 3 March (via https://www.w3.org/account/request/). Chose the **Immersive Web Community Group**: it is where early, pre-standardisation work on WebXR and related APIs happens, before anything moves to a chartered Working Group.

## 2. Why this group

XR Camp's whole Phase 4 (Immersive Developer) is built on WebXR, and every "scene-description" pattern taught since Phase 1 exists because a screen reader cannot see inside a 3D canvas. The Immersive Web Community Group is where people who care about exactly that problem — making immersive content usable by everyone, not only by people who can see and use a headset comfortably — discuss it before it becomes a spec.

## 3. My explainer

See [`explainer-draft.md`](explainer-draft.md) for the full document, written with the real [W3C TAG explainer template](https://w3ctag.github.io/explainer-explainer/).

In one sentence: it proposes a small, optional HTML pattern for machine-readable scene descriptions, so a screen reader, a search engine, or a translation tool could all read the same text alternative a 3D page already needs for accessibility.

## 4. My planned spec issue

Repository: `immersive-web/webxr` (the public GitHub repository the Immersive Web Community Group uses for the WebXR Device API).

Title: "Clarify recommended practice for exposing a text alternative alongside an XR session"

Body (draft): "The spec does not currently recommend a pattern for keeping a text description of a scene in sync with what a WebXR session shows. Beginner developers I have taught default to inconsistent, ad hoc solutions (see attached examples). Could the spec's non-normative 'Best Practices' section link to existing patterns, such as ARIA live regions or an `aria-describedby` scene summary? Happy to draft a pull request with examples if that would help." This was filed as a real issue; see the contribution record below for what happened to a related, smaller issue filed first.

## 5. My contribution record

See [`contribution-record.md`](contribution-record.md) for the real, filed contribution this plan is built around.

## 6. Reviewing someone else's work

Reviewed a documentation pull request on the `mdn/content` repository that added an example for the `prefers-reduced-motion` media feature. Left this comment: "The code example is correct, but the surrounding paragraph says the media feature 'disables' animation — could it say 'requests that non-essential motion be reduced' instead? A user can still have `prefers-reduced-motion: reduce` set and expect essential motion (like a loading spinner) to keep running. Happy to suggest the wording change as a diff if useful." The author updated the wording the same day.

## 7. Running a small open-source project

The imagined project is `scene-description-lint`: a small command-line tool that checks a folder of HTML files for the pattern every XR Camp 3D lesson uses (an element with `id="scene-description"` next to any `<a-scene>` or Three.js canvas), and reports any 3D page missing one. `GOVERNANCE.md` names two roles (maintainer, contributor) and a lightweight approval rule: small fixes need one maintainer approval, new checks need a short written proposal first. The licence chosen, recorded in [`mini-project/decision-record-0001-choose-a-licence.md`](mini-project/decision-record-0001-choose-a-licence.md), is **MIT**: permissive enough that any XR Camp learner's project, whatever licence it eventually uses, can run the tool without a licence conflict.

## 8. Technical leadership: mentoring

The first thing I would explain to someone joining `scene-description-lint` is the "why", not the "how": read `docs/en/xr-accessibility.md` first, so a check makes sense before its code does. On a first pull request, I would leave at least one comment that names something done well, ask questions instead of giving instructions where the direction is a matter of taste, and always explain the reason behind a requested change, the way the `mdn/content` reviewer's own good reviews do for me.
