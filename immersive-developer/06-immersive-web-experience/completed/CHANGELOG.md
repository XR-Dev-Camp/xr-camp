# Changelog

All notable changes to this project are documented here, following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2026-09-26

### Added

- Enter VR, reused from 4.1: an `immersive-vr` session request, comfort (the mouse-orbit view turns off while presenting), and a play-space boundary report.
- Selecting, grabbing, and placing a marker, reused from 4.2, each with an on-screen, Tab-reachable equal to its controller-ray, squeeze, or AR hit-test route.
- The 4.4 accessibility and ethics fixes: captions anchored to the visitor rather than to a point in the world, a full keyboard route through every control, and a Personalize feature that explains itself before ever asking for camera access, and stops the camera immediately after checking it.
- Positional audio and captions, reused from 4.5: one procedurally generated sound per pedestal, a caption bar, and a transcript that is complete before any narration has played.
- A scene description built from one shared state object, so selection, grab, marker, and VR status can never disagree with what a screen reader hears.

### Known limitations

- Play-space boundary reporting depends entirely on what the connected headset's browser reports; this was not tested on real XR hardware, only through feature detection and a fallback message (see the README's testing matrix).
- The controller ray and squeeze-grab code (`js/interact.js`) was written against the WebXR Device API's documented behaviour but not exercised on a physical headset for this release.
