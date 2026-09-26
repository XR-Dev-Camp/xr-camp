# Rubric: the Phase 4 capstone

Work through this after [`brief.md`](brief.md) and before you submit. Each row is met or not met; there are no partial scores. All eight rows must be met for the capstone to count as complete — this is a required project, not an optional challenge.

| # | Requirement | Met when |
| --- | --- | --- |
| 1 | Enter VR | The button requests an `immersive-vr` session only where supported, disables the mouse-orbit view while presenting, and reports a play-space boundary (or says plainly that none was reported). |
| 2 | Select and grab | Every exhibit can be selected and picked up by a controller ray and squeeze in VR, and by a Select and a Grab button on a screen, reachable by Tab. |
| 3 | Placed marker | A marker can be placed by an on-screen button, standing in for AR hit-test placement. |
| 4 | Captions anchored to the visitor | The current caption is readable as a fixed DOM bar on a screen, and as a HUD plane attached to the camera (not to a point in the 3D world) while in VR. |
| 5 | Personalize consent | The camera-based Personalize feature only requests access after an explicit click on a labelled consent button, after reading an explanation of exactly what it does; it never runs on page load. |
| 6 | Transcript and scene description | The transcript lists every exhibit's caption before any narration has played; `id="scene-description"` updates for selection, grab, marker, and VR state, from the same data the scene itself uses. |
| 7 | Testing matrix | The README records what the capstone was tested on: desktop, phone, an emulator, and a headset if one was available. |
| 8 | Release notes | `CHANGELOG.md` has a `1.0.0` entry describing what the capstone ships. |

## Also checked (not scored per row, but required)

- No console errors on the completed page.
- No horizontal overflow at 390 px or 1280 px.
- Reduced motion is respected: the held exhibit's turning starts paused when the operating system asks for it, and the Pause button always says what it will do next.
- The camera never moves unless the learner moves it, or a headset does.
- The 2D twin and transcript work with WebGL 2 unavailable (the 3D-only controls hide instead of breaking).
- `node scripts/validate-projects.mjs` passes from the repository root.
