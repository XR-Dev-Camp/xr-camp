# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Reskin the hall so its three item types, and the words describing them, reflect your own culture, community, or language.

## Task

1. In `js/hall.js`, replace the three entries in `ITEM_TYPES` — their `name` and `color` — with three objects from your own culture or community. Keep the `id` values as they are (`clay-pot`, `basket-ring`, `jade-stone`), since other code refers to them, or rename them consistently everywhere they appear if you prefer.
2. Update the notes in `describe.js` and the list rows built in `main.js` so the scene description and the 2D list describe your objects accurately, not the originals.
3. If you write in a language other than English, that is welcome here — the numbered TODOs and code comments can stay in English, but the learner-facing text (the scene description, the 2D list, the page's own headings) can be in your language.
4. Update `ATTRIBUTION.md` if you use any new colours or shapes you consider your own creative work, following the project's existing format.

## Why this matters

The exhibit hall has followed the same three objects since Phase 3 began. Replacing them with something that means something to you is a chance to check that nothing in this lesson secretly depends on exactly "clay pot, basket ring, jade stone" — a well-built system should not care what its data represents.

## Done when

- [ ] `ITEM_TYPES` names your own three objects, with your own colours.
- [ ] The scene description and 2D list describe them accurately.
- [ ] The hall still passes every check in `tests/checklist.md`.
