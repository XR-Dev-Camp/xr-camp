// describe.js: builds the scene's text description from the same ITEMS data
// the exhibit is built from (see exhibit.js), so the words can never fall
// out of sync with the picture. Same idea as 3.1's concepts lab, applied to
// a scene that has a camera the learner can move and an animation that can
// be paused.

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
