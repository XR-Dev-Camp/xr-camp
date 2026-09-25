# Project check

Work through this list before you submit.

## Modules
- [ ] The page loads only `js/main.js`; everything else is imported.
- [ ] Each module has one job, and exports only what others need.
- [ ] No `var`; `const` by default, `let` only where values change.
- [ ] `format.js` and the calculation functions are pure.

## Behaviour
- [ ] The course map shows every phase and lesson, with times and status.
- [ ] The summary shows totals calculated with `reduce`.
- [ ] "Ready only" filters the lessons and hides empty phases.
- [ ] With the data file missing, a clear error and a Try again button appear, and Try again works.
- [ ] The console shows no errors.

## Accessibility
- [ ] Loading, the summary, and errors are announced by a screen reader.
- [ ] Status badges use words, not only colour.
- [ ] Each phase is a section with a heading.
- [ ] The 3D landscape's description matches the scene.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description (`id="scene-description"`) is generated from the data, and matches the scene.
- [ ] The course map (2D) gives the same information as the 3D landscape.
- [ ] Nothing in the scene moves on its own, and the camera never moves unless you move it.
