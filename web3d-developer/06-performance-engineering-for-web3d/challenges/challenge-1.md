# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth wing to the hall, lazy-loaded like the other three.

## Task

1. In `js/hall.js`, add a new entry to the `WINGS` array: a name, an `x`/`z` position far enough from the main grid and the other wings that it feels like its own space, and a `rows`/`cols` size.
2. Add a matching "Go to: ..." travel destination in `js/main.js` so the new wing is reachable by keyboard, the same way the other six destinations are.
3. Add a line for it in `renderList()` in `js/main.js`, so it appears in the always-present "Everything in the hall" list.
4. Load the page, travel to your new wing, and confirm in the Stats panel that "Wings currently loaded" increases when you arrive and decreases again once you travel back to the main grid.
5. Confirm the scene description mentions the new, correct wing count.

## Why this matters

Adding a new destination to a scene that already lazy-loads should be a small, mechanical change — a new entry in a list of data, not a new copy of the loading and disposal logic. If step 4 works without touching `createWingManager`, that is proof the lazy-loading system you built in Step 8 actually generalises, rather than having been wired by hand for exactly three wings.

## Done when

- [ ] A fourth wing exists in `WINGS`, with its own position and size.
- [ ] It has a working "Go to..." button and a line in the 2D list.
- [ ] The Stats panel's "Wings currently loaded" count rises and falls correctly as you travel to and from it.
- [ ] No existing wing, showcase, or the main grid changed behaviour.
