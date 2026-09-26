# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Spatial audio
- [ ] No sound plays until you press "Start pedestal sounds" or the audio guide's own play button.
- [ ] Each pedestal's sound gets louder as you move the view closer to it, and quieter as you move away.
- [ ] Switching the distance model (linear, inverse, exponential) changes how quickly the volume falls off.
- [ ] Pressing "Start pedestal sounds" again pauses every sound, including the audio guide.

## Media and captions
- [ ] The story screen above the exhibit keeps changing while animation is playing.
- [ ] The caption paragraph updates as the audio guide plays, matching what the screen shows.
- [ ] The transcript lists every caption, and is there whether or not you have played the audio guide.
- [ ] The `<track>` element's captions come from `assets/captions.vtt`, one shared file.

## Accessibility
- [ ] Images and icons include useful alternative text, or are marked decorative.
- [ ] The keyboard can reach every interactive control, including the audio guide's native player.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences: the jade stone and the story screen both start paused, or stop, when reduced motion is on.

## Responsiveness
- [ ] The page works at mobile width (390px) and desktop width (1280px).
- [ ] Nothing overflows horizontally at either width.

## Quality
- [ ] The browser console has no errors on the completed page.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is there, whether the pedestal sounds and audio guide are playing, and what the story screen currently shows.
- [ ] Every 3D interaction, including starting and pausing sound, also works with the keyboard alone.
- [ ] With reduced motion turned on, the jade stone's spin and the story screen's animation both stop; sound is unaffected, since reduced motion is about movement, not audio.
- [ ] The core content (the exhibit list, captions, and transcript) still works when WebGL is unavailable (a 2D fallback).
- [ ] The camera never moves unless the learner moves it.
- [ ] Every XR action has an alternative input: controller, hand, gaze, or on-screen button.
- [ ] The experience works seated, and nothing requires standing, reaching high, or turning around.
