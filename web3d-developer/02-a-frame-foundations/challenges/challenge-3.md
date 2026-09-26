# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a short video clip of your own.

## Task

1. Choose a short clip that matters to you (an object from home, a place, a family video), a few seconds long, kept well under the 10 MB video budget in [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md). Save it as `.mp4` in your own `assets/` folder.
2. Add it to `<a-assets>` as a `<video>`, muted (autoplay in a scene requires it) and `playsinline`, then show it with `<a-video src="#your-clip" width="..." height="..." position="..."></a-video>`, sized so it does not overlap the other panels.
3. Add a matching entry to `exhibitData`, so it gets a "Look at" button and a 2D list entry like everything else.
4. Because `<a-video>` itself has no caption support, add captions where the 2D fallback can show them: either a plain HTML `<video>` element elsewhere on the page with a `<track kind="captions" src="your-captions.vtt" srclang="en">`, or a short written transcript in the exhibit list's description for that stop.
5. Decide whether the video should autoplay in the 3D scene. If it has sound, treat it exactly like Step 7's audio: no autoplaying sound, ever (WCAG 1.4.2). A silent, looping visual is acceptable to autoplay; sound is not.

## Why this matters

Video is the one asset type this lesson deliberately ships without, because a required video file is also a required asset someone has to make or find, and this lesson could not choose one for every learner. Adding your own is a small, realistic version of the choice every A-Frame project eventually faces: pull in a real media asset, and decide, deliberately, how it behaves and how it stays accessible.

## Done when

- [ ] A short video of your own plays in the 3D room through `<a-video>`.
- [ ] It has a "Look at" button and a 2D list entry.
- [ ] It has captions or a transcript available in 2D.
- [ ] If it has sound, it does not autoplay.
