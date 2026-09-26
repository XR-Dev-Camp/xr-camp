# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified (`<html lang="en">`).
- [ ] There is one clear main heading.

## Accessibility
- [ ] Every control (talk, captions, pause, ask a question, camera consent, mute, block, enter VR) is an ordinary `<button>` reachable by Tab.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] Turning on "reduce motion" in your OS settings starts the presenter's animation paused.
- [ ] The transcript list uses `role="list"` and reads correctly with `list-style: none`.
- [ ] Status regions (`#visitor-status`, `#camera-status`, `#xr-status`) update without the learner needing to move focus to notice.

## Responsiveness
- [ ] The page works at 390px and at 1280px wide.
- [ ] Nothing overflows horizontally at either width.

## Quality
- [ ] The browser console has no errors on `completed/index.html`.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## Ethics and consent
- [ ] The camera is never requested until "Turn on camera personalization" is clicked.
- [ ] The privacy notice is visible before that button can be reached.
- [ ] Declining camera personalization still leaves every other part of the talk fully usable.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is there and what they can do.
- [ ] Every 3D interaction also works with the keyboard alone.
- [ ] With reduced motion turned on, animations stop; the camera never moves on its own regardless.
- [ ] The core content (transcript, answer, consent panel, visitor controls) still works when WebGL is unavailable (a 2D fallback).
- [ ] The camera never moves unless the learner moves it.
- [ ] Captions stay visible after turning the view away from the presenter.
- [ ] The visitor stops at a comfortable distance instead of approaching indefinitely, and "Mute visitor" and "Block visitor" both work.
- [ ] Every XR action has an alternative input: controller, hand, gaze, or an on-screen button.
- [ ] The experience works seated, and nothing requires standing, reaching high, or turning around.
