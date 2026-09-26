# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Go further with one of texture compression or the merge-versus-instance trade-off — measured, not guessed.

## Task

Pick one:

**A. A real KTX2 conversion.** Working locally (this does not need to become part of the graded project, since it would add a binary asset file this repository does not need), install the free [KTX-Software](https://github.com/KhronosGroup/KTX-Software) tools, export one of your generated swatch canvases as a PNG, and convert it with `basisu` into a `.ktx2` file. Load it with `KTX2Loader` (the commented example in `js/textures.js` is your starting point) in a scratch copy of the page, and compare `renderer.info.memory.textures`' reported size, and the file's size on disk, against the original PNG. Write up what you measured.

**B. Push the merge-versus-instance trade-off.** Build a second version of the main grid's items using one merged geometry (like the floor) instead of three `InstancedMesh` batches, and measure `renderer.info.render.calls` and the time it takes to click "Rebuild" for both versions. Then make one pedestal type change colour on click, in both versions, and see which one makes that easy and which one makes it hard. Write down which approach you would choose, and why, for a hall where every pedestal needs to be independently recolourable.

## Why this matters

The README states rules of thumb — "instance once you have dozens", "merge when a transform never needs to change independently" — as guidance, not law. Testing one of them against your own measurements, on your own machine, is how a rule of thumb becomes something you actually understand rather than something you memorised.

## Done when

- [ ] You picked one path (A or B) and actually measured something, rather than reasoning about it in the abstract.
- [ ] You can state, in one or two sentences, what you measured and what it means for when you would choose one technique over the other.
- [ ] Nothing you changed for this challenge broke the required project — it lives in a scratch copy or a clearly separated experiment, not in `completed/`.
