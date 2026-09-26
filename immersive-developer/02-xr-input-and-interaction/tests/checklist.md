# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Accessibility
- [ ] Every button has useful, visible text that starts with what it does.
- [ ] The keyboard can reach every interactive control.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences.

## Responsiveness
- [ ] The page works at mobile width.
- [ ] Nothing overflows horizontally.

## Quality
- [ ] The browser console has no errors, on the desktop view.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is there, what input is connected, and what they can do, and updates when any of that changes.
- [ ] Every 3D interaction also works with the keyboard or a 2D button alone: the in-world menu's three actions, direct grab, and AR placement each have a working non-XR equivalent.
- [ ] With reduced motion turned on, animation stops, and none of this lesson's own interactions (lift, place) introduce continuous motion of their own.
- [ ] The core content still works when WebGL is unavailable (a 2D fallback).
- [ ] The camera never moves unless the learner moves it, on a screen, in a headset, or in AR.
- [ ] Enter VR shows a controller model and, on a hand-tracking-capable device, a tracked hand.
- [ ] The in-world menu can be pressed by pointing a ray (controller or hand) at it.
- [ ] The jade stone can be grabbed directly (squeeze on a controller, or a pinch near it with a tracked hand) and returns to its pedestal on release.
- [ ] A short haptic pulse occurs on supported controllers when a menu button or the jade stone is selected; nothing depends on it being felt.
- [ ] Entering VR disables the Enter AR button, and entering AR disables the Enter VR button, since only one WebXR session can run at a time.
- [ ] AR hit-test placement shows a reticle on a detected surface and places the object where selected; where AR or hit-test is unsupported, the status message says so and points to "Place object (2D)".
- [ ] The experience works seated, and nothing requires standing, reaching high, or turning around.
