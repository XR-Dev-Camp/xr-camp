# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth object to the exhibit, on its own pedestal.

## Task

1. In `exhibit.js`, add a fourth entry to `ITEMS`: an `id`, a `name`, what it is `made` of, a museum-label `note`, and an `x` position (try `2.6`, so it stands past the jade stone).
2. Write a `build...()` function for it, using only primitives (`BoxGeometry`, `CylinderGeometry`, `SphereGeometry`, `ConeGeometry`, `TorusGeometry`), and add it to `BUILDERS`.
3. Choose its material like the other three: how rough or shiny is the real object? Is it a metal (`metalness` near 1) or not (`metalness` near 0)?
4. Check `describeExhibit()` in `describe.js`: it should already describe your new object, because it reads from `data.made` and `data.note`, not from a hand-written list. If it does not, that is a sign something is reading the old three objects by name instead of looping over `items`.
5. Click **Rebuild scene**. Your fourth object should reappear, and the Geometries and Textures counts in the Stats panel should return to the same numbers as before.

## Why this matters

Adding one object touches everything this lesson built: the data-driven `ITEMS` array, a primitive geometry and a material choice, the description that reads from the same data, and disposal. If your fourth object appears, describes itself correctly, and survives a rebuild without a memory leak, you understand how the four files fit together.

## Done when

- [ ] The fourth object stands on its own pedestal, built from primitives.
- [ ] Its material suits what it is made of.
- [ ] The scene description mentions it, without a special case written for it.
- [ ] Rebuild scene works, and the Stats panel's memory counts do not climb.
