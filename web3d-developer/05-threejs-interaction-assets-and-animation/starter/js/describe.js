// describe.js: builds the scene's text description from the same items
// data the exhibit is built from (see exhibit.js), so the words can never
// fall out of sync with the picture. TODO 8 is in this file.

export function describeExhibit({ items, animating, selectedId }) {
  // TODO 8: Build one string from an array of sentences, then join(' ') it,
  // the same technique 3.4 used. Include, in order:
  //  1. A first sentence naming all five pedestals, left to right (clay
  //     pot, woven basket ring, jade stone, fox figure, Cesium milk truck).
  //  2. For each item in `items`: if `item.data.kind === 'model'`, say
  //     whether it is `'loading'`, `'error'` (include `item.error`), or
  //     otherwise loaded (use `item.data.note`); for the three primitives,
  //     say what they are made of and their note, exactly as 3.4 did.
  //  3. Whether anything is selected: find the item whose `data.id === selectedId`,
  //     and say its name if one is found, or that nothing is selected and
  //     how to select something, if not.
  //  4. Whether the jade stone and the loaded models are currently
  //     animating, based on `animating`.
  //  5. How to look around, and that the camera only moves when the
  //     learner moves it (comfort) — the same sentence 3.4 used.
  return '';
}
