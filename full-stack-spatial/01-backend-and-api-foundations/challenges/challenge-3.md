# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a settings history the server keeps, and an "undo" route.

## Task

1. In `store.js`, add `appendHistory(settings)`, writing each saved settings object (with a timestamp) as one line of JSON to a second file, `data/history.jsonl` (the "JSON Lines" format: one complete JSON value per line, so you can append without re-reading or re-parsing the whole file).
2. Call it from `putSettings()` in `routes.js`, after a successful save, without slowing down or failing the response if it errors (log it instead).
3. Add `GET /api/settings/history`, returning the last 20 entries (newest first) as a JSON array.
4. Add `POST /api/settings/undo`, which reads the history, restores the second-most-recent entry (the one before the current settings), saves it as the current settings, and returns it with `200`. Return `409 Conflict` if there is nothing to undo to.
5. Add tests for all three new behaviours.

## Why this matters

Keeping a history of changes, and being able to undo one, is a pattern you will meet again once real users can make mistakes (Course 5.3 for saved scenes, Course 5.5 for security incidents). Doing it here, on your own file-backed store, is a safe place to feel the trade-offs: what to keep, for how long, and what "undo" should even mean when two people might be editing at once (a question Course 5.4 returns to).

## Done when

- [ ] Every successful `PUT /api/settings` appends one line to `data/history.jsonl`.
- [ ] `GET /api/settings/history` returns entries newest-first, and never more than 20.
- [ ] `POST /api/settings/undo` restores the previous settings, and a second call in a row (with nothing older to restore) returns 409, not a crash.
- [ ] `node --test` passes, including tests for all three new routes.
