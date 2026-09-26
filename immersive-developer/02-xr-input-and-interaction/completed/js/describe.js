// describe.js: builds the scene's text description from the same ITEMS data
// the exhibit is built from (see exhibit.js), so the words can never fall
// out of sync with the picture. Carried over from 4.1, extended for TODO 7:
// the description now also says what a learner can point at, grab, or place,
// and with what - a controller, a tracked hand, or the 2D buttons - since
// that answer changes with every input source this lesson adds.

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

  // TODO 7: the same facts, worded for whichever way the learner is looking
  // and interacting right now. A screen-reader user relying on this
  // paragraph should never be told about a headset, a controller, or a hand
  // that is not actually active, and should always be told which input is
  // in use once one is.
  if (presenting) {
    parts.push('You are viewing the lab in VR. Turn your head to look around; the desktop view and its buttons are not visible while a headset is active.');
    if (inputKind === 'hand') {
      parts.push('A tracked hand is in use: point your index finger at a menu button and pinch to press it, or pinch while your hand is near the jade stone to pick it up.');
    } else if (inputKind === 'controller') {
      parts.push('A controller is in use: point it at a menu button and pull the trigger to press it, or hold the grip button near the jade stone to pick it up.');
    } else {
      parts.push('Waiting for a controller or a tracked hand to connect.');
    }
    parts.push(grabbing ? 'The jade stone is currently held, away from its pedestal.' : 'The jade stone is resting on its pedestal.');
  } else {
    parts.push('Drag the view, or focus it and press the arrow keys, to look around. "Turn left" and "Turn right" below do the same without a mouse. The menu’s three actions - Pause, Rebuild, and Reset view - also exist as ordinary buttons below, so nothing here needs a headset or a controller.');
    parts.push('The camera only moves when you move it.');
    parts.push(grabbing
      ? 'The jade stone is currently lifted, away from its pedestal, using the "Lift jade stone" button.'
      : 'The jade stone is resting on its pedestal.');
  }

  parts.push(placed
    ? 'A jade stone has also been placed as a separate object, either in AR or with "Place object (2D)".'
    : 'No object has been placed with AR or "Place object (2D)" yet.');

  return parts.join(' ');
}
