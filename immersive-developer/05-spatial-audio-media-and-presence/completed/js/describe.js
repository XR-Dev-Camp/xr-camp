// describe.js: builds the scene's text description from the same data the
// exhibit, the pedestal sounds, and the story screen are built from, so the
// words can never fall out of sync with what is actually happening. Carried
// over from 4.1 (WebXR Foundations), extended for TODO 10: the description
// now also says whether the pedestal sounds are playing, which distance
// model is chosen, and what the story screen currently shows.

export function describeExhibit({ items, animating, presenting, soundsOn, distanceModel, caption }) {
  const parts = [
    'Three pedestals stand in a row: a clay pot on the left, a woven basket ring in the middle, and a jade stone on the right.',
  ];
  for (const { data } of items) {
    parts.push(`The ${data.name.toLowerCase()} is made of ${data.made}. ${data.note}`);
  }
  parts.push(animating
    ? 'The jade stone turns slowly on the spot, and the small screen above the exhibit keeps changing colour.'
    : 'Animation is paused: the jade stone has stopped turning, and the screen above the exhibit is frozen on one frame.');

  if (presenting) {
    parts.push('You are viewing the exhibit in VR. Turn your head to look around; the desktop view and its buttons are not visible while a headset is active.');
  } else {
    parts.push('Drag the view, or focus it and press the arrow keys, to look around the exhibit. "Turn left" and "Turn right" below do the same without a mouse.');
    parts.push('The camera only moves when you move it.');
  }

  // TODO 10: describe the new spatial audio and media layer. soundsOn and
  // distanceModel come from main.js's own state (nothing here reads three.js
  // or the Web Audio API directly); caption comes from captions.js's
  // cuechange listener, so this sentence always matches whatever the
  // caption paragraph and the story screen currently show.
  parts.push(soundsOn
    ? `Each pedestal now plays its own quiet, looping sound. Move around the exhibit to hear how the "${distanceModel}" distance model changes the balance between them.`
    : 'The three pedestals can each play a quiet sound of their own. Press "Start pedestal sounds" to hear them, and to try changing how their volume falls off with distance.');

  parts.push(caption
    ? `The screen above the exhibit shows the audio guide's captions. It currently reads: "${caption}"`
    : 'A small screen above the exhibit shows the audio guide’s captions once you start it. It is blank right now.');

  return parts.join(' ');
}
