# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.
- [ ] All eight numbered TODOs are complete.

## Accessibility
- [ ] Every button's accessible name starts with its visible word ("Select: Jade stone").
- [ ] The keyboard can reach every interactive control, including Select, Grab, Play narration, Place marker, Pause, Reload, Enter VR, and Personalize.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences: the held exhibit's turning starts paused, and the Pause button always states what it will do next.
- [ ] `role="list"` is present on every list styled with `list-style: none`.

## Responsiveness
- [ ] The page works at 390 px and 1280 px.
- [ ] Nothing overflows horizontally at either width.

## Quality
- [ ] The browser console has no errors.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.
- [ ] `CHANGELOG.md` has a `1.0.0` entry.
- [ ] The README's testing matrix is filled in with what you actually tested.
- [ ] `node scripts/validate-projects.mjs` passes from the repository root.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is there and what they can do, and updates for selection, grab, marker placement, and VR status.
- [ ] Every 3D interaction — select, grab, place a marker — also works with the keyboard alone.
- [ ] With reduced motion turned on, the held exhibit's turning stays paused until Pause is pressed.
- [ ] The core content (exhibit list and transcript) still works when WebGL is unavailable (a 2D fallback).
- [ ] The camera never moves unless the learner moves it, or a headset does.
- [ ] Every XR action (select, grab, place) has an on-screen, keyboard-reachable alternative.
- [ ] The experience works seated: nothing requires standing, reaching high, or turning around.
- [ ] The reported play-space boundary (or the message that none was reported) is visible before entering VR.
- [ ] The caption bar switches from the DOM bar to the camera-attached HUD plane on entering VR, and back on leaving it.
- [ ] The Personalize feature never requests camera access before its consent button is clicked.
