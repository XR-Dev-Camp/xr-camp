# Project check

Work through this list before you submit.

## Prototype plan
- [ ] The plan names the two or three riskiest things this prototype must prove.
- [ ] The prototype's scope is clearly smaller than the full capstone.

## Working prototype
- [ ] The scene renders without console errors.
- [ ] `#scene-description` matches what the 3D view currently shows.
- [ ] A 2D list or table shows the same information as the 3D scene, always.
- [ ] Every 3D interaction has a working keyboard route.
- [ ] Animation checks `prefers-reduced-motion` and a Pause button works.
- [ ] No camera motion happens that the visitor did not ask for.
- [ ] No sound plays automatically.

## Testing
- [ ] A keyboard-only walkthrough is logged in `test-log.md`.
- [ ] A screen reader walkthrough is logged.
- [ ] Draw calls and triangles are measured against the Stage 2 budget.
- [ ] A localisation-readiness check confirms no visible text is hard-coded outside the data.

## Design review
- [ ] The prototype was shown to a mentor or peer.
- [ ] Feedback and the resulting changes (or reasons not to change) are recorded.

## Quality
- [ ] The browser console has no errors on `starter/index.html` or `completed/index.html`.
- [ ] The page has no horizontal overflow at 390px or 1280px width.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Scene description read aloud by a screen reader makes sense on its own.
- [ ] Tabbing through the page reaches every control in a sensible order.
- [ ] Reduced motion, tested via the browser's emulation or the OS setting, stops the animation before it starts.
- [ ] Comfort: the camera never moves unless the visitor moved it.
