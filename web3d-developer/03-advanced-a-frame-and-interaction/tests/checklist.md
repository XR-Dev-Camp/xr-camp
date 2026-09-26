# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Interaction
- [ ] Every exhibit has `class="interactive"` and an `interactive-exhibit` attribute.
- [ ] Clicking or tapping an exhibit selects it, turns or lifts it, and updates the info panel.
- [ ] Every 3D interaction has a "Select" button that calls the exact same `selectExhibit()` function.
- [ ] The gaze cursor toggle switches the camera's `cursor` component between mouse and fuse/gaze mode.
- [ ] `laser-controls` is present on two hand entities, with `raycaster="objects: .interactive"`.

## Accessibility
- [ ] Images include useful alternative text.
- [ ] The keyboard can reach every interactive control, including every "Select" button.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences.
- [ ] `#status` (role="status") announces the newly selected exhibit.
- [ ] The chime never plays until "Play chime" is pressed.

## Responsiveness
- [ ] The page works at mobile width.
- [ ] Nothing overflows horizontally.

## Quality
- [ ] The browser console has no errors.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) updates to describe the selected exhibit.
- [ ] Every 3D interaction (select, play chime, change input mode) also works with the keyboard alone.
- [ ] With reduced motion turned on, the turn and lift become instant, and the idle pulse stops.
- [ ] The Pause button stops the idle pulse by hand, independent of the reduced-motion setting.
- [ ] The core content still works when WebGL is unavailable (a 2D fallback).
- [ ] The camera never moves unless the learner moves it.
- [ ] `laser-controls` responds to a virtual VR controller in the Immersive Web Emulator.
- [ ] Every exhibit is reachable from a seated position: nothing sits above a comfortable seated reach or requires standing or walking.
