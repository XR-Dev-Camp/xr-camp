# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Add a fourth exhibit of your own — from your own language, culture, or community — and confirm both AI features handle it correctly.

## Task

1. Pick one small object meaningful to you, your culture, or your community (a musical instrument, a textile pattern, a food vessel, a tool — anything you can describe in a sentence or two). Add it to `server/exhibits.js`'s `EXHIBITS` array with a new id and name.
2. Give it a simple three.js mesh in `js/scene.js`'s `buildMesh`, and add a matching pedestal-and-mesh pair the way the existing three do (reuse the existing loop in `createScene` — you should not need to change much beyond `buildMesh` and the client-side `EXHIBITS` your `main.js` already imports from `scene.js`, plus this new entry in `server/exhibits.js`).
3. Add an entry for it in `server/db.js`'s `seedIfEmpty` seed data, in at least one seeded scene, with a short annotation describing it in your own words (in English for this required file; feel free to also try it in your own language in a scene you create by hand through the UI).
4. Generate a description for that scene, and search for your new exhibit by name. Confirm: the draft mentions it correctly (and the hallucination check does not flag it as absent when it is really there, or present when it is not); search finds a scene that contains it when you search for a word from its name or your annotation.
5. If your exhibit's name uses a script A-Frame's default font cannot draw (accented Latin characters, Chinese, or anything else non-ASCII) — this project uses three.js text via HTML overlays already, so it should work, but confirm nothing renders as a missing-glyph box.

## Why this matters

An AI feature built from a fixed, English-only example set can look like it "just works" purely because the example never tests it against anything unfamiliar. Adding an exhibit that matters to you is a real test of whether `sceneDataForPrompt`, the hallucination check, and the search prompt actually generalise — or whether something in this lesson quietly assumed there would only ever be a clay pot, a basket, and a jade stone.

## Done when

- [ ] A fourth exhibit exists in `server/exhibits.js`, `js/scene.js`, and at least one seeded scene.
- [ ] Generating a description for a scene containing it produces an accurate draft, with no incorrect hallucination warning.
- [ ] Searching for it in plain language finds the scene it is in.
- [ ] Its name displays correctly in the browser, in whatever script you chose.
