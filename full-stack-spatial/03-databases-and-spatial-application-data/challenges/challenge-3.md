# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Let a scene's owner invite one other account as a **collaborator**, who can edit the scene's objects and annotations but never delete the scene or remove the owner's access — a genuinely new relationship this schema does not have yet.

## Task

1. Design a junction table, `scene_collaborators`, with a migration: `scene_id` and `user_id`, both foreign keys with `ON DELETE CASCADE`, and a composite primary key `(scene_id, user_id)` so the same person cannot be added twice. This is the standard way to model a many-to-many relationship (one scene can have many collaborators; one account can collaborate on many scenes) — neither `scenes` nor `users` alone can hold it.
2. Add `db.js` functions: `addCollaborator(sceneId, userId)`, `removeCollaborator(sceneId, userId)`, `listCollaborators(sceneId)`, and `isCollaborator(sceneId, userId)`.
3. Add a route (owner-only, CSRF-checked) to add a collaborator by username, and one to remove one.
4. Change the permission checks in `updateScene`, `addAnnotation`, and `removeAnnotation` (but deliberately **not** `removeScene`) to also allow a collaborator, not only the owner. Write down, in a comment, exactly why `removeScene` should stay owner-only even for this feature.
5. Add a small UI: a collaborator's username can be typed in and added by the owner; a collaborator sees an "Add" form for annotations and the transform controls enabled, but never a delete-scene button.
6. Add tests: a collaborator can edit objects and add annotations; a collaborator cannot delete the scene or add another collaborator; removing a collaborator's account (`DELETE /api/account`) removes their `scene_collaborators` rows without touching the scene itself.

## Why this matters

Almost every real spatial or collaborative application eventually needs more than one editor on the same piece of data — this is precisely the modelling problem a junction table and a slightly richer permission check exist to solve, and it is a direct, hands-on preview of the shared, multi-user rooms Course 5.4 builds next.

## Done when

- [ ] `scene_collaborators` exists, with both foreign keys set to `ON DELETE CASCADE`, and a composite primary key.
- [ ] A collaborator can edit a scene's objects and annotations, but cannot delete the scene or add another collaborator.
- [ ] Deleting a collaborator's account removes their `scene_collaborators` rows, but the scene and its other data are untouched.
- [ ] New tests cover all three permission boundaries above, and `node --test` passes.
