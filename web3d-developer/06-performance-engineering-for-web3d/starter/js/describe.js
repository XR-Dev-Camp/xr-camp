// describe.js: builds the scene's text description from the same numbers
// the hall is built from (see hall.js), so the words can never fall out of
// sync with the picture.

export function describeHall({ mainCount, heroCount, wingItemCount, animating }) {
  const parts = [
    `A hall of ${mainCount} pedestals stands in a grid at the centre, each holding a clay pot, a woven basket ring, or a jade stone.`,
    `${heroCount} larger showcase pieces stand further out, one at each compass point: north, south, east, and west.`,
    `Three small wings, holding ${wingItemCount} more pedestals between them, sit beyond the showcases: a textiles wing and a ceramics wing to the east, and a stone wing to the west.`,
  ];
  parts.push(animating
    ? 'The showcase pieces turn slowly on the spot.'
    : 'Animation is paused: nothing is turning right now.');
  parts.push('Drag the view, or focus it and press the arrow keys, to look around. The buttons below jump straight to any showcase or wing, and do the same turning as dragging, without a mouse.');
  parts.push('The camera only moves when you move it.');
  return parts.join(' ');
}
