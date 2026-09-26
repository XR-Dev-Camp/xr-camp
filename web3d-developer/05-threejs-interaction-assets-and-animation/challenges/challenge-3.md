# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Let a learner choose which animation clip plays, for a model that has more than one.

## Task

1. In the browser console, once the fox has loaded, log `app.items.find(i => i.data.id === 'fox').mixer._actions` (or add a temporary `console.log(gltf.animations.map(c => c.name))` inside `loadModels()`). The real `Fox.glb` file this project already downloads ships three clips: `Survey`, `Walk`, and `Run`, even though `loadModels()` only ever plays `gltf.animations[0]`.
2. Change `loadModels()` (or a new function it calls) to keep every clip a model has, not only the first, on the `item` object (for example, `item.clips = gltf.animations`).
3. When the fox is selected, show a small set of buttons in `#selection-info` (or a new element), one per clip name, that calls `mixer.clipAction(clip).play()` for the chosen one. Stop the previous action first (`item.action.stop()`), or cross-fade between them (`newAction.crossFadeFrom(item.action, 0.3)`), so two clips never drive the same skeleton at once.
4. Give these buttons the same accessible-name pattern this project already uses elsewhere: `"Play: Survey"`, `"Play: Walk"`, `"Play: Run"`.
5. Respect the Pause button and reduced motion exactly as before: whichever clip is currently chosen should still freeze when `animating` is false.

## Why this matters

A real glTF model very often ships several animation clips for one skeleton — an idle pose, a walk, a run, a wave — and a real application has to decide, or let the user decide, which one plays and when. This challenge is a small, safe place to meet that decision for the first time, before 3.7's capstone asks you to make it for real content of your own choosing.

## Done when

- [ ] The fox's three real clips (`Survey`, `Walk`, `Run`) are all reachable from the page, not only the first one.
- [ ] Choosing a different clip stops or cross-fades the previous one, so the model never looks broken.
- [ ] Pause and reduced motion still freeze whichever clip is currently playing.
