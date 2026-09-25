# 3D and XR accessibility

Automated accessibility tools such as pa11y read the page's HTML. A 3D scene is drawn onto a `<canvas>`, and to those tools a canvas is one blank rectangle. A scene with no description, no keyboard route, and a spinning camera can pass CI with a perfect score.

So every 3D and XR lesson carries **manual** checks. They are declared in `project.json`, repeated in the lesson's `tests/checklist.md`, and required by `scripts/validate-projects.mjs` for any project whose `technologies` include A-Frame, Three.js, WebXR, or X3D/X3DOM.

## Required for every 3D project

| Check id | Requirement | WCAG 2.2 | How to meet it |
| --- | --- | --- | --- |
| `scene-description` | A text description of what the scene contains and what the learner can do in it | 1.1.1 | An element with `id="scene-description"` near the scene. Update it whenever the scene changes. CI checks that it exists in `completed/index.html`. |
| `keyboard-3d` | Every 3D interaction also works from the keyboard | 2.1.1 | A-Frame's `wasd-controls` covers movement. For selection, pair every 3D target with a real `<button>`, or make objects reachable with Tab and activatable with Enter. |
| `reduced-motion-3d` | Animation and automatic camera movement stop when the system asks for reduced motion, and a visible control can pause them | 2.2.2, 2.3.3 | Check `matchMedia('(prefers-reduced-motion: reduce)')`. Provide a **Pause animation** toggle button with `aria-pressed`. CI checks that `completed/index.html` references `prefers-reduced-motion`. |
| `2d-fallback` | The core content still works when WebGL or XR is unavailable | 1.3.1, 4.1.2 | The lesson's information lives in HTML; the 3D scene enhances it. Test with WebGL disabled. |
| `comfort` | The camera never moves unless the learner moves it | 2.3.3 | No forced camera paths, no auto-rotation of the viewpoint, no camera shake. Move objects, not the viewer. |

## Additionally required for WebXR projects

| Check id | Requirement | How to meet it |
| --- | --- | --- |
| `xr-input-alternatives` | Every XR action has an alternative input: controller, hand, gaze, or an on-screen button | Never require one specific input device. Test with the WebXR emulator and with a single controller. |
| `xr-seated-mode` | The experience works seated, with no standing, reaching high, or turning around | Keep interactive objects within reach of a seated person and in front of them. Offer snap turning. |

## Why these rules exist

- **Blind and low-vision learners** get nothing from a canvas without a description.
- **Motion sensitivity** (vestibular disorders, migraine, and simple motion sickness) is common, and VR makes it worse. Forced camera movement is the most frequent cause.
- **Many XR Camp learners use a phone**, sometimes an old one, sometimes without WebGL support. The 2D fallback is not an edge case.
- **Not everyone can stand, reach, or hold two controllers.** Seated, single-input use should be the default design.

## Further reading

- [W3C: XR Accessibility User Requirements](https://www.w3.org/TR/xaur/)
- [W3C: Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [XR Access](https://xraccess.org/)
