# Project check

Work through this list before you submit.

## The exhibit
- [ ] The canvas fills its box, resizes without stretching, and the picture is not blurry on a high-density screen.
- [ ] The clay pot, woven basket ring, and jade stone all stand on their own pedestals, with materials that suit what they are made of.
- [ ] Dragging the view orbits the camera smoothly, with damping easing it to a stop.
- [ ] The camera cannot get uncomfortably close, drift too far away, dip below the floor, or climb over the exhibit.
- [ ] The jade stone turns at the same visible speed regardless of frame rate.
- [ ] Reset view returns the camera to its starting position.
- [ ] Rebuild scene rebuilds the exhibit, and the Stats panel's Geometries and Textures counts return to the same numbers afterwards.
- [ ] The console shows no errors.

## Accessibility
- [ ] `#scene-description` names all three objects, what each is made of, whether the animation is running, and how to look around, and it updates when you pause or reset the view.
- [ ] Tab reaches the 3D view, and the arrow keys orbit it once it has focus.
- [ ] "Turn left" and "Turn right" do the same as dragging, from a button alone.
- [ ] The Pause button has a visible label, shows its state with `aria-pressed`, and its text says what it will do next.
- [ ] With reduced motion switched on in the operating system, the exhibit loads already paused.
- [ ] The exhibit list above the 3D view has every object's name, material, and note, and works with WebGL disabled or unavailable.
- [ ] The camera never moves unless a person moves it: no automatic path, no auto-rotation.
- [ ] At 320 pixels wide, the page does not scroll sideways.

## Quality
- [ ] `js/app.js` has no DOM text or button wiring; `js/main.js` has no three.js API calls.
- [ ] Every library loads at its pinned version (check the import map against `versions.json`).
- [ ] Code is formatted consistently and meaningfully named; comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description changes with every control, and says what you would see and hear.
- [ ] Every 3D interaction (orbit, turn left, turn right, reset view) also works from the keyboard alone.
- [ ] Pausing stops the jade stone; nothing else was ever moving.
- [ ] The exhibit list has the same information as the picture, so it still works with WebGL disabled.
- [ ] The camera only moves when a person moves it: no forced path, no auto-rotation, no camera shake.
