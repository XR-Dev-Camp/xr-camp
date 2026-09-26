# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Support gaze-only input, and compare three.js's placeholder hand models against its real ones.

## Task

1. Add dwell-time selection for `targetRayMode === 'gaze'` input sources (cardboard-style viewers with no buttons at all): in `controllers.js`, track how long a gaze ray has continuously hit the same menu button (using `renderer.xr`'s own per-frame updates, or `app.onXRFrame`), and after roughly 1.5 continuous seconds, trigger that button's action automatically, the same way `onSelectStart` does for a real select event. Show a filling highlight on the button as the dwell progresses, so gaze users get the same visual feedback a controller's flash gives.
2. In `buildHandModel()`, try passing `'boxes'` or `'spheres'` instead of `'mesh'` to `handModelFactory.createHandModel()`. Compare: what loads faster, what looks better, and whether either changes how easy the menu is to point at.
3. Read three.js's `XRHandModelFactory.js` source (in `node_modules` if you installed it, or on GitHub, pinned to r186) far enough to explain, in your own words, what `'mesh'` does differently from `'boxes'`.

## Why this matters

Gaze-only headsets exist, and are often the cheapest ones available: designing only for controllers and hands leaves out real learners. Reading a library's actual source, rather than guessing from its name, is also a skill this course keeps coming back to (see 4.1's Explorer challenge).

## Done when

- [ ] A gaze input source (`targetRayMode === 'gaze'`) can select a menu button by dwelling on it, with a visible filling highlight while it dwells.
- [ ] The hand model can be switched to `'boxes'` or `'spheres'`, and you can say what changed.
- [ ] You can explain, in one or two sentences, what `XRHandModelFactory`'s `'mesh'` option does that `'boxes'` does not.
