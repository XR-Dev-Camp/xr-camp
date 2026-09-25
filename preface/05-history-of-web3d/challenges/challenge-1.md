# Challenge 1: Foundation

**Required.** Roughly 30 minutes.

Change the box to a sphere in all three tools.

## Task

1. In `examples/x3dom.html`, replace `<box size="1.5 1.5 1.5"></box>` with `<sphere radius="0.9"></sphere>`.
2. In `examples/aframe.html`, change `a-box` to `a-sphere` in both the opening and closing tags, and add `radius="0.8"`.
3. In `examples/three.html`, replace `new THREE.BoxGeometry(1, 1, 1)` with `new THREE.SphereGeometry(0.7, 32, 16)`.
4. Update the `scene-description` in all three pages: it is a sphere now.
5. Reload the lab. In your journal, note how many things you had to change in each tool.

## Why this matters

The same change, three different amounts of work. Noticing that is how you start choosing tools for good reasons rather than out of habit.

## Done when

- [ ] All three examples show a sphere.
- [ ] All three descriptions say "sphere".
- [ ] Your journal compares the effort in each tool.
