# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth shape, fully in the same accessible pattern as the other three.

## Task

1. Add one more primitive shape to the scene (for example an `<a-cone>`), with its own position and colour.
2. Add it to the highlight cycle in `script.js`'s `shapes` array, so the "Highlight next shape" button reaches it too.
3. Add a matching line to the "shapes, in words" list.
4. Update `#scene-description` so it mentions all four shapes.

## Why this matters

A pattern that only works for exactly three items is not really a pattern yet. Adding a fourth shape without breaking the highlight cycle, the 2D list, or the scene description proves the format generalises, which is exactly what you want from your own lesson's worked example.

## Done when

- [ ] A fourth shape appears in the scene, the highlight cycle, the 2D list, and the scene description.
- [ ] The highlight button still correctly names the next shape after cycling through all four.
