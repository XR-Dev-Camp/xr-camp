// describe.js: builds the scene's text description from the same items
// data the exhibit is built from (see exhibit.js), so the words can never
// fall out of sync with the picture. Unchanged from 3.5, because the
// capstone's integration work does not change what the scene contains.

export function describeExhibit({ items, animating, selectedId }) {
  const parts = [
    'Five pedestals stand in a row: a clay pot, a woven basket ring, a jade stone, a fox figure, and a Cesium milk truck, left to right.',
  ];

  for (const item of items) {
    const { data } = item;
    if (data.kind === 'model') {
      if (item.status === 'loading') {
        parts.push(`The ${data.name.toLowerCase()} is still loading.`);
      } else if (item.status === 'error') {
        parts.push(`The ${data.name.toLowerCase()} could not be loaded: ${item.error}.`);
      } else {
        parts.push(`The ${data.name.toLowerCase()} has loaded. ${data.note}`);
      }
    } else {
      parts.push(`The ${data.name.toLowerCase()} is made of ${data.made}. ${data.note}`);
    }
  }

  const selected = items.find((item) => item.data.id === selectedId);
  parts.push(selected
    ? `The ${selected.data.name.toLowerCase()} is currently selected; its details are in the info panel below.`
    : 'Nothing is selected. Click an item, or use a Select button, to see its details in the info panel.');

  parts.push(animating
    ? 'The jade stone turns slowly, and any loaded model plays its own animation.'
    : 'Animation is paused: nothing is turning or playing right now.');

  parts.push('Drag the view, or focus it and press the arrow keys, to look around the exhibit. "Turn left" and "Turn right" below do the same without a mouse. The camera only moves when you move it.');

  return parts.join(' ');
}
