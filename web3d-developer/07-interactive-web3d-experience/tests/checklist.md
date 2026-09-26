# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Capstone deliverables (see rubric.md)
- [ ] 3 to 5 exhibits are visible, each distinct.
- [ ] The info panel opens with the right details for every exhibit, including credit and licence for a loaded model.
- [ ] The 2D twin list is present at all times, not only when WebGL is unavailable.
- [ ] The performance budget numbers update live and state whether the exhibit is within budget.
- [ ] The attribution page and `ATTRIBUTION.md` both credit every third-party asset.
- [ ] `CHANGELOG.md` has a `1.0.0` entry.

## Accessibility
- [ ] Images and models have useful alternative text or description.
- [ ] The keyboard can reach every interactive control, with a visible focus outline.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences.

## Responsiveness
- [ ] The page works at mobile width (390 px).
- [ ] Nothing overflows horizontally at 390 px or 1280 px.

## Quality
- [ ] The browser console has no errors.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.
- [ ] `node scripts/validate-projects.mjs` passes.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is there and what they can do, and it changes as the exhibit does.
- [ ] Every 3D interaction — selecting, looking around, pausing, reloading — also works with the keyboard alone.
- [ ] With reduced motion turned on, animations stop, and the jade stone and every loaded model start paused.
- [ ] The core content (names, materials, notes, attribution) still works when WebGL is unavailable (the 2D twin).
- [ ] The camera never moves unless the learner moves it.
