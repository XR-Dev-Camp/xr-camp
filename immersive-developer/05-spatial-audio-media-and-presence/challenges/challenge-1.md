# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Give the story screen its own quiet spatial sound, separate from the three pedestals.

## Task

1. Generate a new short looping tone with the same Python technique from the README's "Media optimisation" section (`wave` and `numpy`, no recording needed), or reuse one of the existing files in `assets/`. Keep it under the 2 MB audio budget (the existing files are all well under 150 KB).
2. In `js/audio.js` (or a small new function beside it), create one more `THREE.PositionalAudio`, load your new sound into it, and attach it to the story screen's mesh (`storyScreen.mesh.add(sound)`, the same idea as TODO 2) instead of to a pedestal.
3. Add it to `playAll`/`pauseAll` (or wire a second small button) so it starts and stops with the existing "Start pedestal sounds" control, and update the scene description to mention it.

## Why this matters

`THREE.PositionalAudio` works the same way no matter what it is attached to: a pedestal, a screen, or any other object in the scene. Practising it on a second, different object is what makes the pattern stick, rather than only ever having seen it done once, on the three pedestals the lesson already built for you.

## Done when

- [ ] A fourth spatial sound plays from the story screen's position, distinct from the three pedestal sounds.
- [ ] It starts and stops with the same user-gesture rule as the others: nothing plays until a real click.
- [ ] The distance model select box changes how its volume falls off too.
- [ ] The scene description mentions it.
