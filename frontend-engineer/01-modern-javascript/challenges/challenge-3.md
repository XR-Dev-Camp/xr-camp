# Challenge 3: Explorer

**Optional.** Roughly 45 minutes.

Load two files at once with `Promise.all`.

## Task

1. Create `data/notes.json`: an object whose keys are lesson ids and whose values are your own notes, for example `{ "web-01-html-foundations": "Loved the alt text exercise." }`.
2. Load both files at the same time:

   ```js
   const [catalog, notes] = await Promise.all([
     loadCatalog(),
     loadCatalog('data/notes.json'),
   ]);
   ```

3. Show each lesson's note under its title, when there is one.
4. What happens if `notes.json` is missing? Make the map still work, without notes.

## Why this matters

`await` one after the other waits for each file in turn; `Promise.all` waits for both together, which is faster. Deciding which data is essential and which is optional is a real design decision.

## Done when

- [ ] Both files load together, and notes appear under their lessons.
- [ ] Without `notes.json`, the map still works.
