# Challenge 3: Explorer

An optional advanced extension for learners who want to go further. About 60–90 minutes.

## Task

The 3D moment currently encodes one number (lessons done) as one shape property (column height). Add a **second** encoding of information already in `phaseProgress()`'s rows, using a second visual property — for example, colour intensity for how close a phase is to finished, or a small marker above any phase that is 100% done.

Rules:

- Do not add a single new fact anywhere that is not already in the rows `phaseProgress()` returns.
- `#scene-description` must describe the new encoding too, in words, built from the same data.
- The 2D table twin must show the same information the new encoding shows.
- The camera stays fixed, and nothing animates, for the same reasons as before.

Then, in a short paragraph in your journal, explain the trade-off: what does the second encoding make easier to see at a glance, and what does it cost (more to describe, more to keep in sync, more to test)?

## Why this matters

This is what frameworks like Redux's "one store, many views" and observable data-visualisation libraries are built around: real applications tend to grow more views of the same data over time, not more copies of the data itself. Adding a second view without touching the data, and keeping every view honest about what the others show, is a small rehearsal of that discipline.

## Done when

- [ ] A second encoding exists, built only from data `phaseProgress()` already returns.
- [ ] `#scene-description` and the table twin both reflect it.
- [ ] `tests/checklist.md`'s "3D and XR (manual)" section still passes.
- [ ] Your journal has the trade-off paragraph.
