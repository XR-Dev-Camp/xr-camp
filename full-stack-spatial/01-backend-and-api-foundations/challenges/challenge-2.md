# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Customize the project so it reflects your own interests, community, or language.

## Task

1. In `js/scene.js`, replace one or more entries in `EXHIBITS` with an object that means something to you (a food, a building, an instrument, a symbol from your own culture or community) — you only need to change its name, its `made` description, and its colour; the geometry can stay a simple shape.
2. Add a camera preset of your own to `CAMERA_PRESETS` (a fifth option, alongside `front`/`left`/`right`/`close`), with a name in your own language, and wire it into the radio buttons in `index.html` and the `CAMERA_PRESETS` list in `validation.js` and `js/main.js`.
3. Write your new exhibit's description entirely in your own language inside `updateDescription()`, or add a short bilingual version.
4. Update `ATTRIBUTION.md` if you used any reference image or fact you did not make up yourself (a plain colour and shape you invented needs no credit).

## Why this matters

An API that only ever saves someone else's three objects teaches the mechanics, but not why they might matter to you. Renaming one exhibit and adding one camera angle touches the same validation, storage, and rendering code as the lesson itself — just pointed at something personal.

## Done when

- [ ] At least one exhibit and one camera preset are your own, end to end (saved, loaded, and shown correctly).
- [ ] `node --test` still passes, updated for your new preset's name.
- [ ] The 2D exhibit list and the 3D view still agree with each other.
