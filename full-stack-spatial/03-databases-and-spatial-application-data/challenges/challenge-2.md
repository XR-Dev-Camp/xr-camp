# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Replace one of the exhibit's three objects with something from your own culture, language, or community — and make every layer of the stack agree about it.

## Task

1. Pick a real object with meaning to you — a craft, an instrument, a food, a building — and give it a short, respectful description (one sentence is enough; write it the way "made" describes the clay pot, basket ring, and jade stone today).
2. Update `KNOWN_EXHIBITS` in `server/validation.js` and the `EXHIBITS` array in `js/scene.js` to replace one entry with your new exhibit's id and name.
3. In `js/scene.js`'s `buildMesh`, add a simple three.js geometry and colour for it — it does not need to be a realistic model; a recognisable stand-in shape is enough (see the existing three shapes for the level of detail expected).
4. Update `starter/index.html` and `completed/index.html`'s annotation `<select>` to match your new exhibit list.
5. If your object's name uses characters outside plain ASCII (accents, Chinese characters, or anything else `KNOWN_EXHIBITS`'s existing three names do not use), confirm it still displays correctly everywhere it appears — including the HTML overlay labels `scene.js` draws, not three.js's own text geometry (see the house style's note on why).
6. Save a scene that uses your new exhibit, reload the page, and load it back.

## Why this matters

XR Camp's exhibit is a placeholder for whatever a learner eventually builds — a museum from home, a family object, a piece of local craft. Changing the exhibit's contents end to end (validation, storage, and the 3D view) is a small rehearsal for the much larger version of the same change: building an entirely different exhibit on top of the same schema and permission rules this lesson already gave you.

## Done when

- [ ] Your new exhibit appears in the 3D view, the position/rotation table, and the annotation form.
- [ ] A scene using it validates, saves, and loads back correctly.
- [ ] Any non-ASCII text you added displays correctly in every browser you can test.
- [ ] `node scripts/validate-projects.mjs` still passes (pinned library versions and required files are unaffected by this change).
