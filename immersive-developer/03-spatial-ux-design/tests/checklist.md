# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure.
- [ ] The page language is identified.
- [ ] There is one clear main heading.

## Accessibility
- [ ] Every button, checkbox, and radio has a clear, unique accessible name.
- [ ] The keyboard can reach every interactive control, including the waypoint buttons, the lock-mode radios, and the goal form.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The experience respects reduced-motion preferences: no fade, no vignette, and no smooth interpolation when it is turned on.
- [ ] `#move-status` and `#xr-status` are live regions (`role="status"`) that announce changes without moving focus.

## Responsiveness
- [ ] The page works at mobile width (390px) with no horizontal overflow.
- [ ] The page also works at 1280px with no horizontal overflow.

## Quality
- [ ] The browser console has no errors on either `starter/` or `completed/`.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.
- [ ] `design-rationale.md` is filled in with your own answers, not the template prompts.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] A text description of the scene (`id="scene-description"`) tells a screen-reader user what is in the room, how far the current waypoint is from the kiosk, its angular size in degrees, and how the goals panel is locked.
- [ ] Every 3D interaction (teleporting, switching lock mode) also works with the keyboard alone, through the buttons, radios, and checkbox — no dragging or clicking inside the canvas is required for anything.
- [ ] With reduced motion turned on, teleporting is an instant cut: no fade, no vignette, and smooth movement is skipped entirely.
- [ ] The core content (progress, phases, goals) still works and is fully readable when WebGL is unavailable (the 2D fallback lists).
- [ ] The camera never moves unless the learner chooses a waypoint, drags the view, or uses the arrow keys.
- [ ] Teleporting works the same way while presenting in VR as it does on the desktop view (the movement rig, not just the camera, moves).
- [ ] The experience works seated: every waypoint and panel stays within a comfortable, forward-facing, reachable view, with no requirement to stand, reach high, or turn all the way around.
- [ ] The personal-space ring never has a panel or marker placed inside it.
