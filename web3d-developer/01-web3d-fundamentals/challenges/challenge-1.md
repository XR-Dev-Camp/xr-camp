# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth object to the concepts lab, and give learners control of it.

## Task

1. Add a small bowl or a book to the table (any geometry: `SphereGeometry` cut in half, a flat `BoxGeometry`, a `TorusGeometry`). Give it a `name`, so it appears in the scene graph list.
2. Make it a child of the table, so it turns with it.
3. Add a labelled slider, in a new fieldset, that changes its colour's lightness from dark to light. Use `material.color.setHSL(hue, saturation, lightness)`, with numbers from 0 to 1.
4. Update the scene description to mention the new object, its position, and how light or dark it is in words ("dark", "medium", "light"), not only numbers.
5. Check that **Reset everything** resets it too.

## Why this matters

Adding one object touches every idea in the lesson: geometry, material, the scene graph, a control, and the description. If you can do this without breaking anything, you understand how the lab fits together.

## Done when

- [ ] The new object sits on the table and turns with it.
- [ ] Its slider has a visible label and shows its value.
- [ ] The description and the scene graph list include it.
- [ ] Reset restores it.
