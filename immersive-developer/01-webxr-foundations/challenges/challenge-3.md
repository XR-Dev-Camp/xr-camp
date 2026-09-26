# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Compare your own hand-written session code against three.js's ready-made `VRButton`, and try feature-detecting `immersive-ar` alongside `immersive-vr`.

## Task

1. Read `three/addons/webxr/VRButton.js` (fetch it from `https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/webxr/VRButton.js`, or find it inside the pinned package). Import `{ VRButton }` in a copy of `main.js`, and add `document.body.append(VRButton.createButton(app.renderer))` alongside your own button. Compare: what does `VRButton` do that your `xr.js` does not (hint: read its `sessiongranted` handling), and what does it do that this lesson chose to do differently, and why (hint: look at `stylizeElement`)?
2. Write a second feature-detection function, `supportsImmersiveAR()`, alongside `supportsImmersiveVR()` in `xr.js`, checking `navigator.xr.isSessionSupported('immersive-ar')` the same way. Show a short, separate status line reporting whether AR is available too, without building an AR session yet: full AR placement is 4.2's topic.
3. In your journal, note which of Chrome, Firefox, Safari, and your phone's own browser reported `true` for each mode when you tested. Support changes over time and by device, so treat your own results as a snapshot of one day, not a permanent fact.

## Why this matters

Reading a library's own source, rather than only its documentation, is a skill that keeps working long after any one version of three.js is gone: it is how you will answer "does this really do what I think it does?" for the rest of your career. Comparing two implementations of the same idea, one written for you and one you understand line by line, is one of the fastest ways to notice what a shortcut is quietly deciding on your behalf.

## Done when

- [ ] Both `VRButton`'s button and your own appear on the page, and either one can start the same kind of session.
- [ ] `supportsImmersiveAR()` exists and reports a result without crashing on a browser that lacks `navigator.xr` entirely.
- [ ] Your journal states what you tested it on and what you found, without claiming it as universally true.
