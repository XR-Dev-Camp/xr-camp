# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a sixth exhibit that uses a three.js technique this capstone does not otherwise cover, and measure its cost.

## Task

1. Add one more exhibit using a technique from earlier in Phase 3 that the reference solution does not use on its own exhibits — for example, `THREE.LOD` from 3.6 to swap a simpler shape in at a distance, or a second animation track played back with a different `AnimationAction` blend weight.
2. Give it a pedestal, an info-panel entry, and a place in the scene description and the 2D twin, exactly like the other five.
3. Measure its cost with `renderer.info` before and after adding it (3.6's method), and add a row to the README's performance table showing the difference "on my machine."
4. If the new exhibit changes the draw call or triangle count enough to threaten the 20-call / 25,000-triangle budget, either optimise it (reuse a 3.6 technique) or write, in `CHANGELOG.md`, a clear note raising the budget and why.

## Why this matters

Publishing a capstone is also making a judgment call about performance: not every new feature is free, and a professional project states its cost instead of hiding it. This challenge is the same discipline 3.6 taught, applied to something you built yourself.

## Done when

- [ ] A sixth exhibit exists, fully wired into the info panel, the description, and the 2D twin.
- [ ] Its measured cost is documented in the README, stated as numbers, "on my machine."
- [ ] The performance budget check still reports correctly, whether the exhibit is within budget or the budget was deliberately raised and explained.
