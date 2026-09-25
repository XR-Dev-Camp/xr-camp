# Ana's pull request (example)

This is the description Ana wrote for her pull request, following the
repository's template. Title: **Describe the 3D scene for screen-reader users**

---

## What does this change?

Adds a paragraph with `id="scene-description"` before the 3D scene in
`3d/index.html`. It names the three shapes, their colours, and their order,
left to right, and says which ones move.

## Why?

Fixes #1

A screen-reader user heard the page's heading and then nothing about the
scene. Now they hear the same information a sighted visitor sees.

## How did you test it?

- [x] I opened the page in a browser, and it works.
- [x] I used it with the keyboard only.
- [x] The browser console shows no errors.
- [x] I listened with NVDA: the description is read after the heading.

## Screenshots

Not needed: the change is text above the scene.

---

## What the review said

**Lucía** (requested changes):

> Nice! One thing: the description says "the shapes turn" but the green ball
> does not move. Could you say which ones turn? Suggestion:
> "The box and the cone turn slowly."

**Ana**: "Good catch, thank you. Fixed in the second commit."

**Lucía** (approved): "Looks good to me."

Merged with **Squash and merge**, so `main` has one clear commit:
`Describe the 3D scene for screen-reader users (#9)`.
