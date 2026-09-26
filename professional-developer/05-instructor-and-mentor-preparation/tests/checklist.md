# Project check

Work through this list before you submit.

## Choosing and scoping
- [ ] You chose exactly one main deliverable: a short lesson in `starter/lesson-template/`, or a mentor plan from `starter/mentor-plan-template.md`.
- [ ] If you wrote a lesson, its topic is small enough for one to three 45-minute sessions, and every session ends in something visible.
- [ ] Learning objectives are specific and checkable ("place a shape and set its colour"), not vague ("understand 3D").

## Accessible and inclusive teaching
- [ ] Every learner-facing sentence is short, plain English, matching this course's own voice.
- [ ] Any worked example or completed page has a text alternative that does not depend on seeing an image or a 3D scene.
- [ ] Low-bandwidth needs are addressed: no required video call, no asset over the budgets in `docs/en/3d-assets-and-versions.md`, everything works offline once downloaded.
- [ ] A code of conduct and a real reporting path are named, and at least one sentence says what happens if someone reports harm.
- [ ] Feedback guidance is specific and kind, not just "be nice": it names what to say when work is wrong and when it is right.

## Contributing back
- [ ] The lesson or plan names `.github/CONTRIBUTING.md` as where a finished lesson gets contributed.
- [ ] It correctly names at least two of CONTRIBUTING.md's ten pull-request requirements (readable, modular, documented, tested, accessible, performant, localized, secure, pinned, within budget).

## Structure
- [ ] `starter/index.html` and `completed/index.html` each have one clear `<h1>` and a logical heading order.
- [ ] Every internal link actually resolves; nothing points to a file that does not exist.

## Accessibility
- [ ] `completed/index.html` and, if you wrote a lesson, its own `completed/index.html`, pass a WCAG 2.2 AA check (for example, `pa11y`).
- [ ] The keyboard can reach every link and button.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] Every list styled with `list-style: none` has `role="list"`.

## Responsiveness
- [ ] Every page works at mobile width.
- [ ] Nothing overflows horizontally.

## Quality
- [ ] The browser console has no errors on any completed page.
- [ ] Comments explain intent, not syntax.
- [ ] No invented facts appear anywhere; anything uncertain is phrased cautiously or left out.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md). They apply to any 3D page your own lesson adds, and to Ana's example lesson in `completed/example-lesson/completed/index.html`.

- [ ] An element with `id="scene-description"` describes the scene and what a learner can do in it, and stays accurate.
- [ ] Every 3D interaction also has a real `<button>` a keyboard user can reach and activate.
- [ ] Anything that animates starts paused under `prefers-reduced-motion`, and a visible **Pause animation** button with `aria-pressed` controls it.
- [ ] The scene's information also exists as ordinary HTML text or a list, so it works with WebGL disabled.
- [ ] The camera never moves unless the learner moves it.
