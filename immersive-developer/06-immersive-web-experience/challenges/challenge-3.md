# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Replace the 2D "Place marker" stand-in with a real `immersive-ar` hit-test session, on a phone or headset that supports it.

## Task

1. Read the WebXR Device API's hit-test explainer (linked in the README's Further reading).
2. In a new `js/ar.js`, request an `immersive-ar` session with `requiredFeatures: ['hit-test']`, following the same "request only from a real click" rule `js/xr.js` already follows for VR.
3. Create an `XRHitTestSource` from the viewer reference space, and on each frame, use its result to move a reticle mesh across whatever real surface the camera sees.
4. On a screen tap (or an XR `select` event), place the same marker `js/interact.js` already creates, at the reticle's reported position, instead of at the fixed spot.
5. Keep the existing "Place marker" button as the 2D/keyboard equal for anyone without AR hardware — do not remove it.
6. Test on a real AR-capable device if you have access to one; if not, say so honestly in `CHANGELOG.md`, exactly as this capstone's own `1.0.0` entry does for its own untested hardware paths.

## Why this matters

Hit-test AR is the one piece of 4.2 this capstone's reference solution replaced with a 2D stand-in, because it needs hardware most learners do not have. Building the real version, and being honest about what you could and could not test, is what 4.6's testing-matrix habit is for.

## Done when

- [ ] `js/ar.js` requests a real `immersive-ar` session with hit-test on supporting hardware.
- [ ] The existing "Place marker" button still works as a 2D/keyboard equal.
- [ ] `CHANGELOG.md` states plainly what was, and was not, tested on real hardware.
