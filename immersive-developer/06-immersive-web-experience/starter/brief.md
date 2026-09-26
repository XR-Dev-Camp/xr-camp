# Brief: the Phase 4 capstone

Phase 4 has taken one exhibit — the three.js scene from web3d-developer/04-threejs-foundations — and given it a headset (4.1), a way to point, grab, and place things (4.2), a repaired accessibility and ethics pass (4.4), and a voice (4.5). This capstone asks you to combine all four into one page that works with a headset and without one.

## What to deliver

A single page, continuing the three.js exhibit, with:

1. **Enter VR** (4.1): a button that requests an `immersive-vr` session only where supported, with comfort (the mouse-orbit view turns off while a headset is presenting) and a reported play-space boundary.
2. **Input, with a 2D equal for each** (4.2): selecting an exhibit, picking one up (a squeeze in VR, a Grab button on a screen), and placing a marker (a 2D stand-in for AR hit-test placement), every one of them reachable by Tab and Enter alone.
3. **The accessibility and ethics fixes, kept** (4.4): captions anchored to the visitor, not to a point in the world; a full keyboard route; and a camera-based "Personalize" feature that explains itself before it ever asks for permission, and never stores or shows what the camera sees.
4. **Spatial audio and captions** (4.5): each pedestal's own positional sound, a caption that names what is playing, and a transcript with every exhibit's line, present whether or not anything has been played yet.
5. **A scene description** (`id="scene-description"`), built from the same state as everything else, so it can never fall out of sync.
6. **A 2D twin**: the exhibit list, always present, carrying the same facts as the 3D view (WCAG 1.3.1).
7. **A testing matrix and release notes**: a table in the README recording what you tested it on, and a `CHANGELOG.md` with a `1.0.0` entry.

## What is already done for you

Every subsystem this capstone combines is already finished and working in the starter: `js/app.js` (the scene and pedestals), `js/exhibit.js` (the exhibit data), `js/describe.js` (the scene description builder), `js/xr.js` (4.1's Enter VR and boundary reporting), `js/interact.js` (4.2's controller ray, squeeze-grab, and marker placement), `js/presenter.js` (4.4's avatar and fixed camera-consent flow), and `js/audio-captions.js` (4.5's positional audio, caption HUD, and transcript builder). Your job in this capstone is integration, not building any of these from nothing: eight numbered TODOs, four in `index.html` and four in `js/main.js`, connect them. See [`../README.md`](../README.md) for the full walkthrough.

## How you will be assessed

See [`rubric.md`](rubric.md).
