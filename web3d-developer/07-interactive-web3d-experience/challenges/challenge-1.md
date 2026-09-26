# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Finish the six numbered TODOs so the info panel and the performance budget check both work.

## Task

1. In `starter/index.html`, complete TODO 1: add the `#info-panel` container inside "3. Info panel".
2. In `starter/index.html`, complete TODO 2: add the `#budget-calls`, `#budget-triangles`, and `#budget-result` elements inside "5. Performance budget".
3. In `starter/js/main.js`, complete TODO 3: write `renderInfoPanel(item)`.
4. Complete TODO 4: call it from `selectItem()`.
5. Complete TODO 5: add the `BUDGET` constant and the live comparison inside `updateStats()`.
6. Complete TODO 6: clear the info panel when the exhibit reloads.
7. Work through [`../tests/checklist.md`](../tests/checklist.md), including the "3D and XR (manual)" section.

## Why this matters

An exhibit that only a mouse-and-pointer user can explore, or that never says whether it is fast enough to ship, is not ready to publish. The info panel and the budget check are this capstone's own contribution on top of 3.1-3.6's engine: small, but they are what turns a working demo into a project someone else could read, trust, and reuse.

## Done when

- [ ] Selecting any exhibit opens its info panel with the right details.
- [ ] The performance budget numbers update live and say whether the exhibit is within budget.
- [ ] Every item in [`../tests/checklist.md`](../tests/checklist.md) is checked.
- [ ] The browser console shows no errors.
