// describe.js: builds the scene's text description from the same ITEMS data
// the exhibit is built from (see exhibit.js), so the words can never fall
// out of sync with the picture. Carried over from 3.4 (Three.js Foundations),
// extended for TODO 7: the description now also says whether the exhibit is
// currently being viewed through a VR headset, since that changes what
// "looking around" means (turning your head, not dragging the view).

export function describeExhibit({ items, animating, presenting }) {
  const parts = [
    'Three pedestals stand in a row: a clay pot on the left, a woven basket ring in the middle, and a jade stone on the right.',
  ];
  for (const { data } of items) {
    parts.push(`The ${data.name.toLowerCase()} is made of ${data.made}. ${data.note}`);
  }
  parts.push(animating
    ? 'The jade stone turns slowly on the spot.'
    : 'Animation is paused: nothing is turning right now.');

  // TODO 7: the same facts, worded for whichever way the learner is looking
  // right now. A screen-reader user relying on this paragraph should never
  // be told about dragging or arrow keys while a headset has taken over the
  // camera, and should never be told about a headset when none is active.
  if (presenting) {
    parts.push('You are viewing the exhibit in VR. Turn your head to look around; the desktop view and its buttons are not visible while a headset is active.');
  } else {
    parts.push('Drag the view, or focus it and press the arrow keys, to look around the exhibit. "Turn left" and "Turn right" below do the same without a mouse.');
    parts.push('The camera only moves when you move it.');
  }
  return parts.join(' ');
}
