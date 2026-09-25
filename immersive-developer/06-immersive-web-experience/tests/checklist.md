# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Accessibility
- [ ] Images include useful alternative text.
- [ ] The keyboard can reach every interactive control.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences.

## Responsiveness
- [ ] The page works at mobile width.
- [ ] Nothing overflows horizontally.

## Quality
- [ ] The browser console has no errors.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is there and what they can do.
- [ ] Every 3D interaction also works with the keyboard alone.
- [ ] With reduced motion turned on, animations and automatic camera movement stop.
- [ ] The core content still works when WebGL is unavailable (a 2D fallback).
- [ ] The camera never moves unless the learner moves it.
- [ ] Every XR action has an alternative input: controller, hand, gaze, or on-screen button.
- [ ] The experience works seated, and nothing requires standing, reaching high, or turning around.
