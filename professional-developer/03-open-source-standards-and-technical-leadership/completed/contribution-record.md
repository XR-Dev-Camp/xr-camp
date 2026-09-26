# Contribution record

## What I contributed

A documentation pull request to `mdn/content`, the public repository behind MDN Web Docs: it added a short accessibility note to the WebXR Device API landing page, pointing out that a WebXR experience needs a 2D, non-headset way to convey the same information, and linking to WAI-ARIA's `aria-describedby`. Filed against a real, existing MDN page; the exact wording was refined during review before it merged.

## Why I chose it

While researching this course's own explainer, the MDN page for WebXR had no mention of accessibility at all. `mdn/content` labels many issues "good first issue," and documentation fixes are a well-scoped way to make a first real contribution: the change is small, reviewable in minutes, and does not require deep familiarity with the project's build system.

## What made it a good issue (or a good pull request)

Followed Step 4's checklist: the pull request's description named the exact page and section changed, showed the before-and-after wording directly (not just "fixed a typo"), stayed to one focused change, and a search of open issues and pull requests first confirmed no one had already proposed the same note.

## What happened next

A maintainer asked for one change: to link the specific ARIA specification section rather than the general WAI-ARIA homepage, so a reader would not have to search. That was a fair request, made the note more useful, and the pull request merged the same week.

## What I would do differently

Would have searched MDN's own accessibility style guide before writing the first draft; the requested change would have been there from the start instead of costing a review round trip.
