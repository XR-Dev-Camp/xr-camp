// scene-describe.js: builds the scene's text description from the same
// items data the exhibit is built from, so the words can never fall out of
// sync with the picture (WCAG 1.1.1, 1.3.1). Trimmed from Course 3.5's
// version: this lesson's scene has no selection, so that part is dropped;
// everything else is the same idea.

export function describeExhibit({ items, animating, offline }) {
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

  parts.push(animating
    ? 'The jade stone turns slowly, and any loaded model plays its own animation.'
    : 'Animation is paused: nothing is turning or playing right now.');

  parts.push(offline
    ? 'This scene is running with no network connection, from its offline-downloaded bundle.'
    : 'This scene is running online. Download it for offline use from the bundle list.');

  parts.push('Drag the view, or focus it and press the arrow keys, to look around. "Turn left" and "Turn right" below do the same without a mouse. The camera only moves when you move it.');

  return parts.join(' ');
}
