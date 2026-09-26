# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Accessibility
- [ ] `#scene-description` accurately names every shape, its colour, and its rough position.
- [ ] The keyboard can reach and activate the highlight button and the motion button.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The 2D shape list matches the scene exactly, and stays present even with the canvas hidden.

## Responsiveness
- [ ] The page works at mobile width.
- [ ] Nothing overflows horizontally.

## Quality
- [ ] The browser console has no errors.
- [ ] Comments explain intent, not syntax.
- [ ] No invented facts appear anywhere.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../../../docs/en/xr-accessibility.md).

- [ ] `id="scene-description"` exists near the scene and is kept accurate.
- [ ] Every 3D interaction (highlighting a shape, pausing the animation) also works as a real, labelled `<button>`.
- [ ] The cylinder's rotation starts paused when the system prefers reduced motion, and the Pause animation button correctly reflects and controls that state (`aria-pressed`).
- [ ] The scene's information also exists as ordinary HTML (the shape list), so it works with WebGL disabled.
- [ ] The camera never moves; there is no `look-controls` or `wasd-controls` enabled.
