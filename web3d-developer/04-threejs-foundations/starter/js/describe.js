// describe.js: builds the scene's text description from the same ITEMS data
// the exhibit is built from (see exhibit.js), so the words can never fall
// out of sync with the picture. Same idea as 3.1's concepts lab, applied to
// a scene that has a camera the learner can move and an animation that can
// be paused. TODO 16 is in this file.

export function describeExhibit({ items, animating }) {
  // TODO 16: Build one string from an array of sentences, then join(' ') it.
  // Include, in order:
  //  1. What is on the three pedestals, left to right.
  //  2. For each item in `items`, a sentence built from its `data`: what it
  //     is made of (data.made) and its note (data.note). Do not hand-write
  //     these facts again here — read them from `data`, the same object
  //     exhibit.js built the mesh from, so the words can never say
  //     something the scene does not show.
  //  3. Whether the jade stone is turning right now, based on `animating`.
  //  4. How to look around: dragging, the arrow keys once the exhibit has
  //     focus, or the "Turn left" / "Turn right" buttons.
  //  5. That the camera only moves when the learner moves it (comfort).
  return '';
}
