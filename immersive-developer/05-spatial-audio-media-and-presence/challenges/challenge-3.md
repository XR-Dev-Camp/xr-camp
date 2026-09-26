# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Compare this lesson's canvas-driven story screen with a real video, using `THREE.VideoTexture`.

## Task

1. Find or make a short, small video clip of your own (a few seconds is enough), self-made or CC0-licensed, well under the 10 MB video budget in [`docs/en/3d-assets-and-versions.md`](../../../docs/en/3d-assets-and-versions.md). Add it to `assets/`, and credit it in `ATTRIBUTION.md` if it is not entirely your own.
2. Create a hidden `<video>` element in `index.html`, with `muted`, `loop`, `playsinline`, and its own `<track kind="captions">` pointing at a WebVTT file with cues that match your clip.
3. In a copy of `video.js`, replace the canvas and `THREE.CanvasTexture` with `new THREE.VideoTexture(videoEl)` as the plane's map. Read three.js's own source for `VideoTexture` (`src/textures/VideoTexture.js` at the pinned r186 tag) first, and note in a comment what it checks before deciding to update, compared with the manual `texture.needsUpdate = true` this lesson's `drawFrame()` sets by hand.
4. Reuse `captions.js` unchanged, pointed at your new `<video>` element instead of `guide-audio`, to prove the same caption-reading code works for both a `<video>` and an `<audio>` element.

## Why this matters

`CanvasTexture` and `VideoTexture` are close relatives: both put a changing image onto a three.js material, and this lesson deliberately built its own `drawFrame()` so you would learn exactly how a texture gets "told" to update. Reading `VideoTexture`'s own source afterwards shows you the same idea, done automatically, inside a real library.

## Done when

- [ ] A real video plays on the story screen instead of the generated canvas animation.
- [ ] Its own captions and transcript work through the same `captions.js` functions, unchanged.
- [ ] You can explain, in your own words, what `VideoTexture` checks each frame that `CanvasTexture` cannot.
- [ ] The new asset is credited in `ATTRIBUTION.md` and within budget.
