# Build checklist

## Tasks

- [x] Build the room shell (floor, walls, lighting rig) from the Stage 2 scene graph.
- [x] Load the three primitive-built objects (pot, basket, jade stone) with correct positions from the spatial layout.
- [x] Wire up look-around and select-object keyboard controls.
- [x] Build the scene description and 2D twin list from the Stage 2 data model.
- [x] Add the reduced-motion check and Pause button for the jade stone's rotation.
- [x] Write the user guide, README, and changelog.
- [x] Run a full accessibility and performance pass.

## Grouped by area

### Scene / core experience

- [x] Room shell and lighting
- [x] Three exhibit objects, positioned per the spatial layout
- [x] Look-around and select-object controls

### Data

- [x] `data/exhibits.json` matching the Stage 2 data model, with `title.en` / `description.en` fields ready for future translation

### Accessibility

- [x] Scene description and 2D twin kept in sync from one data source
- [x] Full keyboard route for every interaction
- [x] Reduced-motion check and Pause button

### Performance

- [x] Draw calls and triangles measured and kept within the Stage 2 budget for three primitive objects

## Order of work

1. Room shell and lighting (nothing else can be tested without it).
2. One exhibit object end to end, including its keyboard route and description — proving the whole pattern once, small, as Stage 3 did.
3. The remaining two objects, reusing the same pattern.
4. Documentation, then a full accessibility and performance pass.
