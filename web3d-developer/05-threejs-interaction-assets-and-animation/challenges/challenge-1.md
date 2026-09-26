# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a third real glTF model to the exhibit, on its own pedestal.

## Task

1. Browse the [Khronos glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models) repository and choose a model under 1 MB (check its `glTF-Binary` folder's file size on GitHub before downloading).
2. Open its `LICENSE.md` file and read it in full. Note the exact licence (CC0, CC BY, or something else) and the artist's name.
3. Download its `.glb` file into `assets/`, and check `assets/` still stays well under this project's budgets (see [`docs/en/3d-assets-and-versions.md`](../../../docs/en/3d-assets-and-versions.md)).
4. Add a sixth entry to `ITEMS` in `exhibit.js`: an `id`, a `name`, `kind: 'model'`, its `file` path, an `x` position past the milk truck (try `5.2`), a `note`, and `credit`, `licenseUrl`, `licenseLabel`, and `sourceUrl` built from what its `LICENSE.md` actually says — do not copy this project's Fox or milk truck credit text and change only the name.
5. Add its credit line to `ATTRIBUTION.md`.
6. Reload the page. Your third model should appear on its own pedestal, load correctly, be selectable by click and by its own Select button, and appear in the attribution panel, all without a special case written for it anywhere in the code.

## Why this matters

Every other item in this project is data-driven: `describeExhibit()`, `renderItemList()`, `renderAttribution()`, and the Select buttons all read from `ITEMS`, not from a hand-written list of "the fox and the truck". Adding a sixth item correctly, with nothing else written by hand, is the proof that this project's separation of data from code actually works, not just for the two items it shipped with.

## Done when

- [ ] A third model stands on its own pedestal, loads correctly, and is selectable.
- [ ] Its licence and credit, read from its actual `LICENSE.md`, appear on the page and in `ATTRIBUTION.md`.
- [ ] No function anywhere was changed to add a special case for this model by name.
