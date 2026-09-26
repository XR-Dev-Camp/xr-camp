# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Make the interaction lab speak in your own words, and choose your own object to grab and place.

## Task

1. Rewrite the menu's three button labels (in `menu.js`), and the status messages `controllers.js`, `ar.js`, and `main.js` announce, in your own language, dialect, or community's way of speaking. `drawButtonTexture()` already draws its labels with `<canvas>`, so any script or accented character you write works exactly as typed - unlike A-Frame's default text, which drops accents and all Chinese.
2. Change which exhibit item can be grabbed and placed: instead of the jade stone, use the clay pot or the woven basket ring (or swap in an object of your own, following exhibit.js's ITEMS pattern). Update `getGrabTarget`, `createPlacement`'s stand-in mesh, and every message that currently names "the jade stone".
3. Optionally, change the placed object's colour or shape to something meaningful to you or your community.

## Why this matters

An interaction lab that only speaks one language, and only lets you hold one specific object, quietly tells everyone else this was not built with them in mind. Small as they are, these changes are the difference between a lesson you followed and a project that is genuinely yours.

## Done when

- [ ] The menu, and every status message this lesson added, reads in your own words.
- [ ] A different exhibit item can be grabbed (directly) and placed (with AR or "Place object (2D)"), and every message naming it is consistent.
- [ ] Everything still works: no console errors, and every 2D/keyboard alternative still functions.
