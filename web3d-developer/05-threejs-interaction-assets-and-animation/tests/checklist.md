# Project check

Work through this list before you submit.

## The exhibit
- [ ] The three primitives from 3.4 (clay pot, woven basket ring, jade stone) still stand on their pedestals, unchanged.
- [ ] Both `Fox.glb` and `CesiumMilkTruck.glb` load, fit their pedestals (not comically large, tiny, or floating), and play their own built-in animation.
- [ ] A loading bar and status text appear while a model is still loading, and disappear once it is ready.
- [ ] If a model's path is broken (try renaming its file temporarily), the exhibit shows a plain-language error for that one item and the rest of the exhibit keeps working.
- [ ] Clicking or tapping an item on the canvas selects it; its Select button also selects it; both update `#selection-info` the same way.
- [ ] "Reload exhibit" disposes and reloads everything; the Geometries count in the Stats panel returns to exactly the same number afterwards.
- [ ] The console shows no errors.

## Accessibility
- [ ] `#scene-description` names every item's state (loaded, loading, or failed), which one is selected, whether anything is animating, and how to look around — and it updates when any of these change.
- [ ] Tab reaches the 3D view and every Select button; the arrow keys orbit the view once it has focus.
- [ ] Every Select button's accessible name starts with the visible word "Select" (WCAG 2.5.3).
- [ ] The Pause button has a visible label, shows its state with `aria-pressed`, and its text says what it will do next; pausing stops both the jade stone and every loaded model's animation.
- [ ] With reduced motion switched on in the operating system, the exhibit loads already paused.
- [ ] The exhibit list and the attribution panel both exist as ordinary HTML, and work with WebGL disabled or unavailable.
- [ ] The camera never moves unless a person moves it: no automatic path, no auto-rotation.
- [ ] At 320 pixels wide, the page does not scroll sideways.

## Attribution and licensing
- [ ] `ATTRIBUTION.md` names both models, their authors, and their exact licences, matching each model's own `LICENSE.md` from the Khronos repository.
- [ ] The on-page attribution panel shows the same credit and licence information, with working links.
- [ ] Both `.glb` files stay under the 5 MB per-model asset budget.

## Quality
- [ ] `js/app.js` has no DOM text or button wiring; `js/main.js` has no three.js API calls.
- [ ] Every library loads at its pinned version (check the import map against `versions.json`).
- [ ] A geometry, material, or texture shared by more than one mesh (the milk truck's wheels) is disposed exactly once, not once per mesh that uses it.
- [ ] Code is formatted consistently and meaningfully named; comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description changes with every load, selection, and pause, and says what you would see and hear.
- [ ] Every 3D interaction (orbit, select, turn left, turn right, reset view, pause, reload) also works from the keyboard alone.
- [ ] Pausing stops the jade stone and both models' animations together; nothing else was ever moving.
- [ ] The exhibit list and attribution panel have the same information as the picture, so the project still works with WebGL disabled.
- [ ] The camera only moves when a person moves it: no forced path, no auto-rotation, no camera shake.
