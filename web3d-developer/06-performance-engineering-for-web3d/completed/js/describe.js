// describe.js: builds the scene's text description from the same numbers
// the hall is built from (see hall.js), so the words can never fall out of
// sync with the picture.

export function describeHall({ mainCount, heroCount, wingCount, activeWings, animating }) {
  const parts = [
    `A hall of ${mainCount} pedestals stands in a grid at the centre, each holding a clay pot, a woven basket ring, or a jade stone.`,
    `${heroCount} larger showcase pieces stand further out, one at each compass point: north, south, east, and west. Seen from a distance they simplify to a plain block; walk closer and they switch to full detail.`,
    `${wingCount} small wings sit beyond the showcases and only load once you get close: right now ${activeWings} of them ${activeWings === 1 ? 'is' : 'are'} in memory.`,
  ];
  parts.push(animating
    ? 'The showcase pieces turn slowly on the spot.'
    : 'Animation is paused: nothing is turning right now.');
  parts.push('Drag the view, or focus it and press the arrow keys, to look around. The buttons below jump straight to any showcase or wing, and do the same turning as dragging, without a mouse.');
  parts.push('The camera only moves when you move it, or when you ask it to travel.');
  return parts.join(' ');
}
