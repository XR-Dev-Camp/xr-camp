# Challenge 2: Creative

**Optional.** Roughly 60 minutes.

Write your own description of one model, in your own language, and show it when that model is selected.

## Task

1. Choose one of the exhibit's models (the fox, the milk truck, or your own from Challenge 1).
2. Write two or three sentences about it, in your own language, as if you were writing a museum label for it: what it might represent, what stands out about how it looks or moves, or what it reminds you of from your own culture or community. Keep an English gloss in a comment above it, so the reference solution's structure still helps future readers.
3. Add this text as a new field on that item's entry in `ITEMS` (for example, `personalNote`).
4. In `main.js`'s `selectItem()`, show this text in `#selection-info` alongside (not instead of) the model's existing `note` and `credit`, only when that specific item is selected.
5. Everything else — loading, raycasting, the Select buttons, the attribution panel — should keep working unchanged, because it reads from `ITEMS`, not from a hand-written case for one model.

## Why this matters

An attribution panel states facts a licence requires; your own note is a different kind of writing, closer to what a real museum's exhibit label does: connecting an object to a person looking at it. Both belong on the same page, and this challenge asks you to add the second kind without disturbing the first.

## Done when

- [ ] At least one model has a personal note, in your own language, shown only when it is selected.
- [ ] The note appears alongside the model's existing credit, not in place of it.
- [ ] Loading, selection, and attribution all still work unchanged for every item.
