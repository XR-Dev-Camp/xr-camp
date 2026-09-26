// describe.js: builds the scene's text description from the same ITEMS data
// the exhibit is built from (see exhibit.js), so the words can never fall
// out of sync with the picture. Carried over from 3.4 (Three.js Foundations).
//
// TODO 7: add a `presenting` parameter (a boolean) and change the last part
// of the description depending on it. While `presenting` is true, a headset
// has taken over the camera: do not tell a screen-reader user to drag the
// view or press arrow keys, because those buttons and that input are not
// what is moving the view any more. Say instead that turning their head
// looks around, and that the desktop view and its buttons are not visible
// while a headset is active. While `presenting` is false, keep the existing
// dragging/arrow-key/"the camera only moves when you move it" sentences.

export function describeExhibit({ items, animating }) {
  const parts = [
    'Three pedestals stand in a row: a clay pot on the left, a woven basket ring in the middle, and a jade stone on the right.',
  ];
  for (const { data } of items) {
    parts.push(`The ${data.name.toLowerCase()} is made of ${data.made}. ${data.note}`);
  }
  parts.push(animating
    ? 'The jade stone turns slowly on the spot.'
    : 'Animation is paused: nothing is turning right now.');
  parts.push('Drag the view, or focus it and press the arrow keys, to look around the exhibit. "Turn left" and "Turn right" below do the same without a mouse.');
  parts.push('The camera only moves when you move it.');
  return parts.join(' ');
}
