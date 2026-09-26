# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth column to `scenes` with a new migration, and put it to use: a view counter that goes up every time someone other than the owner loads a public scene.

## Task

1. Write a new migration, `server/migrations/005_add_view_count.sql`:
   ```sql
   ALTER TABLE scenes ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0;
   ```
   Adding a column to an existing table is still a migration, run once, in order, exactly like creating a table — this is why the migration runner numbers files instead of only listing table names.
2. In `db.js`, add `incrementViewCount(id)` (a prepared `UPDATE scenes SET view_count = view_count + 1 WHERE id = ?`), and include `view_count` (as `viewCount`, converted the way every other column already is) in `rowToScene`.
3. In `routes.js`'s `getScene`, call `incrementViewCount(sceneId)` only when the viewer is **not** the owner — an owner opening their own scene while editing it should not inflate the count.
4. Show the count in the client: add a "Viewed N times" line near `#current-scene-owner` in `js/main.js`, using the `viewCount` field the API now returns.
5. Run `node --test` and add one assertion: viewing a public scene as a different account increases `view_count` by exactly one, and viewing it again as the owner does not change it at all.

## Why this matters

Real applications add columns to tables that already have data in them far more often than they create brand-new tables. A migration that only ever runs `CREATE TABLE` is an easy trap to fall into; this challenge forces the more common case — `ALTER TABLE` against a schema (and, if you have been testing by hand, real rows) that already exists.

## Done when

- [ ] `005_add_view_count.sql` runs cleanly against a database that already has scenes in it (test by running the server once before adding this migration, then again after).
- [ ] Viewing a public scene as someone other than its owner increases `view_count`; viewing it as the owner never does.
- [ ] The count is visible in the exhibit's UI.
- [ ] `node --test` passes, including your new assertion.
