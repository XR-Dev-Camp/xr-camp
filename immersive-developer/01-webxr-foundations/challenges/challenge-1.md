# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a second, independent way to start VR: an "Enter VR" option that also appears in the scene description area, for a learner who tabs through the page in a different order.

## Task

1. In `completed/index.html` (or your own working copy of the starter), add a second button, `id="xr-button-secondary"`, near the scene description heading, with the same visible text as the main Enter VR button ("Enter VR").
2. In `main.js`, once `supportsImmersiveVR()` resolves true, unhide this second button too, and give it the same click behaviour as the first: clicking either button should start or end the same session.
3. Keep both buttons' text and `aria-pressed`-style wording in sync: when one becomes "Exit VR", so should the other.
4. Test with the checklist's VR section, using the Immersive Web Emulator if you do not have a headset.

## Why this matters

Real pages are read in different orders by different people: someone using a screen reader, someone who only uses Tab, and someone scanning visually with a mouse may each meet your controls in a different sequence. Giving an important action more than one predictable, consistently worded entry point is good practice for exactly this reason, the same idea as offering "Turn left" as a button and as an arrow key.

## Done when

- [ ] Two buttons can both start and end the same VR session.
- [ ] Both buttons always show the same text as each other.
- [ ] `tests/checklist.md` still passes in full.
