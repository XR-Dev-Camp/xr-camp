// describe.js: builds the scene's text description from the same data the
// exhibit, the pedestal sounds, and the story screen are built from, so the
// words can never fall out of sync with what is actually happening. Carried
// over from 4.1 (WebXR Foundations).
//
// TODO 10: add four parameters -- `soundsOn` (boolean), `distanceModel`
// (string), and `caption` (string, may be empty) -- alongside the existing
// `items`, `animating`, and `presenting`. After the existing sentences,
// push two more:
// 1. If `soundsOn` is true: a sentence saying each pedestal now plays its
//    own quiet, looping sound, and naming the current `distanceModel`
//    (for example: `Move around the exhibit to hear how the "inverse"
//    distance model changes the balance between them.`). If false: a
//    sentence inviting the learner to press "Start pedestal sounds".
// 2. If `caption` is non-empty: a sentence saying the screen above the
//    exhibit currently shows that exact caption text. If empty: a sentence
//    saying the screen is blank until the audio guide starts.
// Also update the `animating` sentence to mention the story screen keeps
// changing colour while animating, and is frozen on one frame while paused
// (it is not only the jade stone any more).

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

  if (presenting) {
    parts.push('You are viewing the exhibit in VR. Turn your head to look around; the desktop view and its buttons are not visible while a headset is active.');
  } else {
    parts.push('Drag the view, or focus it and press the arrow keys, to look around the exhibit. "Turn left" and "Turn right" below do the same without a mouse.');
    parts.push('The camera only moves when you move it.');
  }

  return parts.join(' ');
}
