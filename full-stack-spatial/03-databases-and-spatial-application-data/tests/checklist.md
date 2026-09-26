# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure and one clear main heading.
- [ ] The page language is identified (`<html lang="en">`).
- [ ] `node scripts/validate-projects.mjs` passes from the repository root.

## Database
- [ ] `node server/inspect-db.js` shows `users`, `scenes`, `scene_objects`, `annotations`, and `_migrations`, with four applied migrations.
- [ ] Every foreign key SQLite reports (`PRAGMA foreign_key_list`) is `ON DELETE CASCADE`.
- [ ] Deleting an account (via the UI or `DELETE /api/account`) removes every scene, scene object, and annotation it owned — check with `node server/inspect-db.js` before and after.
- [ ] `node server/backup.js` produces a new `.sqlite` file under `server/data/backups/`, and it can be opened and queried on its own.
- [ ] No query anywhere in `server/` builds SQL with string concatenation or a template literal — every value travels through a `?` placeholder.

## Permissions
- [ ] Signed out, or signed in as someone else, a private scene answers 404, never 403.
- [ ] Signed in as someone else, a public scene can be viewed but not edited, deleted, or annotated.
- [ ] Every route that changes something checks the CSRF token before it does anything else.

## Accessibility
- [ ] Every position and rotation can be changed with the keyboard alone.
- [ ] The scene description and the position/rotation table always match the 3D view.
- [ ] Annotations exist as real, readable text (`#annotation-list`), not only as markers over the canvas.
- [ ] The keyboard can reach every interactive control, in a sensible order.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The exhibit respects `prefers-reduced-motion`, and the Pause button works regardless of that preference.

## Responsiveness
- [ ] The page works at mobile width (390px) and no wider layout (1280px) overflows horizontally.

## Quality
- [ ] The browser console has no errors on the completed page.
- [ ] `node --test` (from `starter/server` or `completed/server`) passes.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Every exhibit's position and rotation in the 3D view matches the numbers shown in the table beneath it.
- [ ] Turning an object with the rotation input turns the correct exhibit, by the correct amount, in the correct direction.
- [ ] An annotation marker appears near the exhibit it is attached to, and disappears when the marker's exhibit is not currently visible from the camera.
- [ ] With `prefers-reduced-motion: reduce` set at the operating-system level, the jade stone does not turn on page load.
- [ ] The Pause/Resume animation button's label and `aria-pressed` state always match what the scene is actually doing.
