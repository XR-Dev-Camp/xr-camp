# Changelog

All notable changes to this capstone exhibit are recorded here, newest first. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 1.0.0

First release of the Phase 3 capstone exhibit.

### Added
- All five exhibits from 3.1-3.5 (clay pot, woven basket ring, jade stone, fox figure, Cesium milk truck) on one page, each with its own pedestal, built-in animation where it has one, and raycasting selection.
- An info panel that opens for the selected exhibit, with its material or credit, and, for a loaded model, a link to its source and full licence.
- A performance budget check (20 draw calls, 25,000 triangles) shown live next to the Stats panel, so the budget is not only a number in this README.
- A 2D twin of the exhibit: an always-present list with the same names and notes as the 3D view (WCAG 1.3.1), not only a fallback for when WebGL is unavailable.
- A standalone attribution page (`attribution.html`) alongside the on-page attribution list and `ATTRIBUTION.md`.
- A keyboard route into every interaction: Select buttons for choosing an exhibit, Turn left/right and Reset view for looking around, and Pause/Resume for animation.

### Known limitations
- The performance budget was measured on one machine (see the README); a slower device may show higher numbers for the same scene.
- Hand tracking, controllers, and other XR input are out of scope for this capstone; Phase 4 adds them.

### Accessibility
- `id="scene-description"` describes the scene from the same data it is built from.
- Reduced motion is respected: animation starts paused when the operating system asks for less motion, and the Pause button always says what it will do next.
- The camera never moves unless the learner moves it.
