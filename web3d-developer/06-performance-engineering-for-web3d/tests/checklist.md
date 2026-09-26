# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Performance
- [ ] The main grid draws as a small, fixed number of draw calls, not one per pedestal or item.
- [ ] The floor is a single merged mesh.
- [ ] Textures are shared: the same colour and label never generates a second texture.
- [ ] Shadows are limited to the floor and the four showcases.
- [ ] Clicking "Rebuild hall" (or "Rebuild main grid") returns the Geometries and Textures counts to the same numbers every time.
- [ ] Renders per second falls to near 0 once the camera is still and animation is paused.
- [ ] You measured your own before/after numbers and wrote them down as "on my machine".

## Accessibility
- [ ] Images and generated textures include useful alternative text where relevant.
- [ ] The keyboard can reach every interactive control, including every "Go to..." travel button.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences.

## Responsiveness
- [ ] The page works at mobile width.
- [ ] Nothing overflows horizontally.

## Quality
- [ ] The browser console has no errors.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is there and what they can do, including how many wings are currently loaded.
- [ ] Every 3D interaction — looking around, travelling to a showcase or wing, pausing, rebuilding — also works with the keyboard alone.
- [ ] With reduced motion turned on, the showcases start paused, and "Go to..." buttons jump the camera instantly instead of gliding.
- [ ] A showcase visibly switches to its low-detail stand-in once the camera is far enough away (`THREE.LOD`).
- [ ] A wing builds itself once the camera travels close, and frees itself once the camera moves away again.
- [ ] The core content still works when WebGL is unavailable (a 2D fallback listing the main grid, every showcase, and every wing).
- [ ] The camera never moves unless the learner moves it, drags it, or clicks a travel button.
