// describe.js: builds the scene's text description from the same ITEMS data
// the exhibit is built from (see exhibit.js), so the words can never fall
// out of sync with the picture. Carried over from 4.1; TODO 7 extends it to
// describe what a learner can point at, grab, or place, and with what.

export function describeExhibit({ items, animating, presenting, inputKind, grabbing, placed }) {
  const parts = [
    'Three pedestals stand in a row: a clay pot on the left, a woven basket ring in the middle, and a jade stone on the right. A small three-button menu floats between you and the pedestals.',
  ];
  for (const { data } of items) {
    parts.push(`The ${data.name.toLowerCase()} is made of ${data.made}. ${data.note}`);
  }
  parts.push(animating
    ? 'The jade stone turns slowly on the spot.'
    : 'Animation is paused: nothing is turning right now.');

  // TODO 7: describe the current way of interacting, so a screen-reader user
  // gets the same information a sighted learner sees. Using the `presenting`,
  // `inputKind` ('hand', 'controller', or null), `grabbing`, and `placed`
  // parameters above:
  //
  // - If `presenting` is true: say the learner is in VR and can look around
  //   by turning their head. Then, depending on `inputKind`:
  //   - 'hand': explain pointing the index finger at a menu button and
  //     pinching to press it, or pinching near the jade stone to grab it.
  //   - 'controller': explain pointing it and pulling the trigger to press a
  //     button, or holding the grip button near the jade stone to grab it.
  //   - null: say the page is waiting for a controller or tracked hand.
  //   Add one more sentence saying whether the jade stone is currently held
  //   (`grabbing`) or resting on its pedestal.
  // - If `presenting` is false: keep 4.1's own wording (dragging, arrow
  //   keys, "Turn left"/"Turn right"), add that the menu's three actions
  //   also exist as ordinary buttons on this page, and add the same
  //   held-or-resting sentence as the VR branch, worded for "Lift jade
  //   stone" instead of a grip or a pinch (`grabbing` applies here too: the
  //   2D button sets it exactly as a real grab does).
  //
  // Either way, finish with one sentence saying whether a jade stone has
  // been placed with AR or "Place object (2D)" (`placed`).

  return parts.join(' ');
}
