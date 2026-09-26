# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth button to the in-world menu, wired the same way as the other three.

## Task

1. In `menu.js`, add a fourth button to `buildMenu()`: label it "Turn left" (or your own wording), give it `userData.action = 'turnLeft'`, and place it so all four buttons still fit comfortably in a row (adjust the `x` positions, and widen the group if needed).
2. In `main.js`, extend `onMenuAction(action)` with a case for `'turnLeft'` that calls `app.controls.rotateLeft(Math.PI / 8)`, the same call the page's own "Turn left" button already makes.
3. Test it: in VR (or the Immersive Web Emulator), point at the new button and select it. The view should rotate exactly as "Turn left" does on the desktop.

## Why this matters

Every menu button follows the same three-part pattern: a labelled mesh with an action name, a raycast hit in `controllers.js`, and a case in `onMenuAction`. Adding a fourth button on your own confirms you understand that pattern well enough to extend it, not just read it.

## Done when

- [ ] A fourth button appears in the in-world menu, clearly labelled and not overlapping the others.
- [ ] Selecting it (in VR, or the emulator) rotates the view the same way the page's "Turn left" button does.
- [ ] No console errors appear, in VR or on the desktop view.
