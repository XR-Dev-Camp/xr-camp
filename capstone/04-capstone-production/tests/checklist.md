# Project check

Work through this list before you submit.

## Build checklist
- [ ] Every planned task is checked off, or explicitly cut with a reason recorded.
- [ ] Tasks were ordered so foundational work came before work that depended on it.

## Documentation
- [ ] The user guide is written in plain language, with no assumed technical knowledge.
- [ ] The README lets a stranger set up and run the project from nothing (Challenge 1).
- [ ] The changelog has dated entries reflecting real progress, not written all at once at the end.

## Accessibility
- [ ] A full keyboard-only walkthrough works across the whole application.
- [ ] A full screen reader walkthrough works across the whole application.
- [ ] Colour contrast meets WCAG 2.2 AA throughout.
- [ ] Every form input has an explicit `type` and a visible label.
- [ ] Reduced motion is respected everywhere the build animates anything.

## Performance
- [ ] The build was measured against the Stage 2 performance budget.
- [ ] Any overage was deliberately addressed, or documented as a known limitation.

## Quality
- [ ] The browser console has no errors anywhere in the production build.
- [ ] No horizontal overflow at 390px or 1280px width.
- [ ] Mentor approval is recorded before Stage 5 begins.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Every scene in the finished build has a scene description matching what it currently shows.
- [ ] Every 3D interaction added since Stage 3 also has a working keyboard route.
- [ ] No camera motion happens anywhere that the visitor did not ask for.
