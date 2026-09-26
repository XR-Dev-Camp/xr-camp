# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth "Look at" stop, built from a primitive.

## Task

1. Add a new primitive to the room (a cylinder, a cone, a sphere, or another box), with its own `id`, positioned somewhere in the room that is not already crowded.
2. Add one entry to `exhibitData` in `main.js` for it: an `id` matching the entity's, a short `label`, and a `description`.
3. Confirm that, without any other change, it now appears in the 2D list **and** gets its own "Look at" button. If it does not, check that its `id` matches exactly.
4. Click (or Tab to and press Enter on) its new button, and confirm the camera turns to face it.
5. Update `#scene-description`'s starting text to mention it.

## Why this matters

Because the list, the buttons, and the "Look at" behaviour are all built from one array, adding a stop should take one new entity and one new object in `exhibitData`, nothing more. If you found yourself editing the list or the buttons by hand, something earlier in the lesson is still hard-coded rather than data-driven, and is worth revisiting.

## Done when

- [ ] A fourth primitive sits in the room, with its own `id`.
- [ ] It has an entry in `exhibitData`, and appears in the list and the buttons automatically.
- [ ] Its "Look at" button turns the camera to face it.
- [ ] `#scene-description`'s starting text mentions it.
