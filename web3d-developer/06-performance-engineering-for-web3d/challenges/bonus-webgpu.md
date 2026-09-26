# Bonus challenge: WebGPU and TSL

**Optional.** Not required for this lesson or for submission. Roughly 45–60 minutes.

Try three.js's newer renderer and its node-based shading language, with a safety net: if a browser cannot run WebGPU, the exact same code keeps working.

## Task

1. Open [`completed/webgpu.html`](../completed/webgpu.html) through the local server and read it next to ["Going further: WebGPU"](../README.md#going-further-webgpu) in the README. Find the two things that make it a bonus, not a requirement: it is loaded from a separate page, not from `completed/index.html`, and it needs its own two import-map entries (`three/webgpu`, `three/tsl`).
2. Change the TSL material's colours. In the `tslMaterial.colorNode` line, swap `color(0x5b2a86)` and `color(0xd62f6b)` for two colours of your own, or change `heightFactor` to blend left-to-right (`positionLocal.x`) instead of bottom-to-top (`positionLocal.y`).
3. Change the pulse. `sin(time.mul(uniform(0.6)))` controls how fast the brightness pulses. Try a bigger or smaller number in `uniform(...)` and watch the effect speed up or slow down without touching any per-frame JavaScript — the pulse lives entirely in the node graph, not in the render loop.
4. Force the fallback on purpose. Add `forceWebGL: true` to the `WebGPURenderer` constructor's options object, reload the page, and confirm the status line now reports the WebGL 2 fallback even on a browser that does support WebGPU. This is the same code path a learner on an older browser hits automatically.
5. Undo step 4, and check `'gpu' in navigator` in your own browser's console on this page. Compare what it reports to what the page's own status line says once the renderer has actually tried to start — they can disagree, and the walkthrough explains why.

## Why this matters

WebGPU is the direction three.js's rendering is heading, but it is still new enough that not every learner's browser or device supports it. `WebGPURenderer`'s automatic fallback means you can write one scene, in one shading language, that runs everywhere — the same lesson in resilience as the render-on-demand loop and the LOD showcases earlier in this project, applied to a newer API instead of an older one.

## Done when

- [ ] You changed the TSL material's colours or blend axis and saw the change on screen.
- [ ] You changed the pulse speed and can explain, in one sentence, why that change needed no JavaScript render-loop code.
- [ ] You forced the WebGL 2 fallback with `forceWebGL: true` and watched the status line change to match.
- [ ] You can state, in your own words, why `'gpu' in navigator` is not enough on its own to know whether WebGPU will actually work.
