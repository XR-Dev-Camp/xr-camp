# Project check

Work through this list before you submit.

## The concepts lab
- [ ] The stone moves in x, y, and z, and the values shown match the sliders.
- [ ] Turning the table turns everything on it, including the stone while it is a child.
- [ ] Unticking "The stone is a child of the table" does not make the stone jump.
- [ ] The perspective and orthographic cameras both work, and field of view changes the picture.
- [ ] Ambient light, sunlight direction, and the lamp all change the picture.
- [ ] Basic, Lambert, and Standard materials look different; roughness and metalness change Standard.
- [ ] Reset everything restores the starting scene.
- [ ] The scene draws only when something changes (no animation loop).
- [ ] The console shows no errors.

## The comparison
- [ ] The exhibit works in three.js and A-Frame, with the same positions and colours.
- [ ] Your `analysis.md` has both tables filled in, with measured download sizes.
- [ ] You chose a technology for the virtual exhibit, and gave reasons.
- [ ] Every library is loaded at its pinned version.

## Accessibility
- [ ] Every control has a visible label, and every slider shows its value.
- [ ] Everything works with the keyboard alone.
- [ ] At 320 pixels wide, the page does not scroll sideways.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The lab's scene description changes with every control, and says what you would see.
- [ ] The scene graph list matches the scene, including after re-parenting the stone.
- [ ] Every comparison page has a scene description.
- [ ] Nothing moves on its own, and no camera moves unless you change a control.
