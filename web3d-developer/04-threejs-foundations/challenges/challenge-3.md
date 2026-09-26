# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Render on demand, instead of every frame.

## Task

This exhibit uses `renderer.setAnimationLoop()`, which draws continuously, because the jade stone animates and `OrbitControls`'s damping needs a frame to ease to a stop after every drag. But when the animation is paused and the camera has settled, nothing is changing, and every one of those frames is wasted GPU work, the same point 3.1's concepts lab made about rendering on demand.

1. Add a `needsRender` flag (or similar) to `app.js`.
2. Give `OrbitControls` a `'change'` event listener that sets it to `true` whenever the camera moves.
3. Change `tick()` so that, when the animation is paused *and* nothing has requested a render, it skips calling `render()` — but still calls `controls.update()`, so damping keeps working the moment a drag starts again.
4. Reset `needsRender` to `false` right after a frame that did render.
5. Add a line to the Stats panel showing whether the current frame drew or skipped, and watch it settle to "skipped" a second or two after you stop dragging with the animation paused.

## Why this matters

Real three.js applications rarely have everything moving all the time. Knowing how to render only when something has actually changed is a meaningful battery and performance win, especially on phones, and it is the same trade-off you will meet again in 3.6.

## Done when

- [ ] With the animation paused and the camera still, the exhibit renders far fewer than 60 frames a second.
- [ ] Dragging, using the arrow keys, or the "Turn left" / "Turn right" buttons all still work immediately.
- [ ] Resuming the animation goes back to drawing every frame, because something is moving again.
