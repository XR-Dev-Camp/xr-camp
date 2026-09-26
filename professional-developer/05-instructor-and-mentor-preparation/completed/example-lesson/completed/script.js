// Shapes and Colour - reference solution behaviour.
//
// Two small pieces of interaction, kept deliberately simple for a first
// lesson: a keyboard-reachable way to highlight each shape in turn, and a
// slow rotation that respects the learner's reduced-motion preference.

(function () {
  const shapes = [
    { el: document.getElementById('box'), name: 'red box', color: '#a4133c' },
    { el: document.getElementById('sphere'), name: 'blue sphere', color: '#1d4ed8' },
    { el: document.getElementById('cylinder'), name: 'gold cylinder', color: '#c9a227' },
  ];

  const highlightBtn = document.getElementById('highlight-btn');
  const status = document.getElementById('status');
  let current = -1;

  // Turn one shape white so it stands out visually, and put its real
  // colour back on every other shape. The colour swap alone would not
  // reach a screen reader, which is why the status line below matters.
  function setHighlight(index) {
    shapes.forEach((shape, i) => {
      shape.el.setAttribute('color', i === index ? '#ffffff' : shape.color);
    });
  }

  highlightBtn.addEventListener('click', () => {
    current = (current + 1) % shapes.length;
    setHighlight(current);

    const shape = shapes[current];
    const next = shapes[(current + 1) % shapes.length];
    status.textContent = 'Highlighting: the ' + shape.name + '.';
    highlightBtn.textContent = 'Highlight next shape: ' + next.name;
  });

  // Reduced motion: start paused if the system asks for it, and let the
  // learner change their mind either way with a visible, labelled button.
  const cylinder = document.getElementById('cylinder');
  const motionBtn = document.getElementById('motion-btn');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = prefersReducedMotion;

  function updateMotionButton() {
    motionBtn.setAttribute('aria-pressed', String(paused));
    motionBtn.textContent = paused ? 'Resume animation' : 'Pause animation';
  }
  updateMotionButton();

  motionBtn.addEventListener('click', () => {
    paused = !paused;
    updateMotionButton();
  });

  // A plain requestAnimationFrame loop, not the a-frame animation component:
  // it makes "paused" a single boolean this file fully controls.
  let lastTime = null;
  function tick(time) {
    if (lastTime === null) lastTime = time;
    const delta = time - lastTime;
    lastTime = time;
    if (!paused && cylinder.object3D) {
      cylinder.object3D.rotation.y += delta * 0.0007;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
