# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Extend the hallucination check so it also flags a description that leaves out an exhibit that really is in the scene.

## Task

1. Open `server/ai.js`'s `checkDescriptionForHallucinations`. Right now it only checks one direction: an exhibit *mentioned* in the description that is *not* in the scene. Add the other direction: for every exhibit whose id **is** in `scene.objects`, check (case-insensitively, the same way the existing check does) whether its name appears anywhere in `description`. If it does not, push a softer warning, for example:
   ```js
   warnings.push(`Does not mention "${exhibit.name}", which is placed in this scene — check nothing was left out.`);
   ```
2. Keep this a warning, not a rejection: a description can reasonably paraphrase or group exhibits together ("all three pieces sit close together") without naming every one, so this check should inform a reviewer, not block them.
3. Add one assertion to `server/server.test.js`'s hallucination test (or a new test next to it) that a hand-written description missing a real exhibit produces this new warning.
4. Confirm the warning shows up in the browser: generate a draft for the seeded "Private draft: pot and basket only" scene (which places only two of the three exhibits) — the mock provider's own reply already mentions only what is there, so try editing the draft textarea by hand to remove one exhibit's name before checking the warning appears (there is no button for this; editing the textarea is enough to trigger it once you regenerate, or you can call the function directly in a scratch script).

## Why this matters

A hallucination check that only looks for things that should not be there misses the opposite failure: a model quietly leaving something out. Both are real risks with a language model summarising structured data, and a description missing an exhibit is just as likely to mislead someone who cannot see the scene as one that invents an extra one.

## Done when

- [ ] `checkDescriptionForHallucinations` warns about an exhibit that is in the scene but not mentioned in the description, in addition to the existing check.
- [ ] The new warning is a warning, not a rejection — a valid description can still be saved even if it triggers one.
- [ ] `node --test` passes, including a new assertion for this behaviour.
