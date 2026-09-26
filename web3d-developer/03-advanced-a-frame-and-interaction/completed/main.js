// XR Camp · Advanced A-Frame and Interaction · reference solution
//
// This file does five jobs, in this order:
//   1. Describe the room's exhibits as data (exhibitData), once, so the 2D
//      list, the "Select" buttons, and the info panel can never disagree.
//   2. Register the interactive-exhibit component: the lesson's custom
//      A-Frame component (schema, init, update, tick, remove, and events).
//   3. selectExhibit(id): the ONE function every input calls — a mouse
//      click, a finger tap, a VR controller's trigger (through
//      laser-controls), and every keyboard "Select" button. No input has
//      its own copy of "what happens when you choose an exhibit."
//   4. Build the 2D list, the "Select" buttons, and wire the input-mode and
//      pause controls.
//   5. Detect WebGL, same as 3.2.

// --- 1. The exhibits, as data ------------------------------------------

const exhibitData = [
  {
    id: 'woven-panel',
    label: 'Woven-pattern pedestal',
    description: 'The pedestal from the exhibit’s first room. Selecting it turns it half a turn, driven by the animation component.',
    action: 'turn',
    hasAudio: false,
  },
  {
    id: 'story-lantern',
    label: 'Story lantern',
    description: 'A new stop for this lesson. Selecting it lifts it, then lowers it again, the animation component’s second job.',
    action: 'lift',
    hasAudio: false,
  },
  {
    id: 'chime-bell',
    label: 'Chime bell',
    description: 'Selecting it turns it slightly and reveals a "Play chime" button. The chime is positional audio: it comes from the bell’s own position in the room, and it never plays until you press the button.',
    action: 'turn',
    hasAudio: true,
  },
];

// --- 2. The custom component: interactive-exhibit -----------------------
//
// Every exhibit stop in this room shares one component instead of one-off
// scripts, so adding a fourth stop (Challenge 1) means writing HTML, not
// more JavaScript.
AFRAME.registerComponent('interactive-exhibit', {
  // schema: the properties this component reads from its HTML attribute,
  // e.g. interactive-exhibit="exhibitId: story-lantern; action: lift".
  schema: {
    exhibitId: { type: 'string' },
    action: { type: 'string', default: 'turn', oneOf: ['turn', 'lift', 'none'] },
    selected: { type: 'boolean', default: false },
  },

  // init(): runs once, when the component is first attached. It only sets
  // up listeners here; it never touches the entity's transform, because
  // update() (not init()) is where schema-driven changes belong.
  init() {
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    // 'click' is emitted by the cursor component on a raycaster hit
    // (a mouse click, a tap, or a VR controller's trigger through
    // laser-controls) — one event, three input devices.
    this.el.addEventListener('click', this.onClick);
    this.el.addEventListener('mouseenter', this.onMouseEnter);
    this.el.addEventListener('mouseleave', this.onMouseLeave);
  },

  // update(oldData): runs once at startup and again every time a schema
  // property changes (from a click, a keyboard button, or dev-tools). It
  // only reacts to what changed, not to every property every time.
  update(oldData) {
    if (this.data.selected === oldData.selected) return;

    this.el.classList.toggle('is-selected', this.data.selected);

    if (this.data.selected) {
      // A custom event, with a payload, bubbling up to <a-scene>. main.js
      // never has to know which entity fired it: it just listens once, on
      // the scene, for "exhibit-selected".
      this.el.emit('exhibit-selected', { id: this.data.exhibitId }, true);
      this.playAction();
    }
  },

  // tick(time): runs every rendered frame. Reduced motion turns this off
  // entirely, and it only runs at all while this exhibit is selected, so it
  // never costs anything for the two exhibits that are not.
  tick(time) {
    if (!this.data.selected || window.__reducedMotion) {
      if (this.pulsing) {
        this.el.object3D.scale.set(1, 1, 1);
        this.pulsing = false;
      }
      return;
    }
    this.pulsing = true;
    const scale = 1 + Math.sin(time / 260) * 0.04;
    this.el.object3D.scale.set(scale, scale, scale);
  },

  // remove(): runs when the component (or its entity) is removed. Every
  // listener init() added is removed here, and any animation attribute this
  // component started is cleared, so nothing keeps running on a detached
  // entity. TODO 17 in the starter exercises this directly, by removing and
  // re-adding an exhibit from a button.
  remove() {
    this.el.removeEventListener('click', this.onClick);
    this.el.removeEventListener('mouseenter', this.onMouseEnter);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);
    this.el.removeAttribute('animation__turn');
    this.el.removeAttribute('animation__lift');
    this.el.object3D.scale.set(1, 1, 1);
  },

  onClick() {
    selectExhibit(this.data.exhibitId);
  },

  onMouseEnter() {
    this.el.setAttribute('material', 'emissive', '#5b2a86');
    this.el.setAttribute('material', 'emissiveIntensity', 0.35);
  },

  onMouseLeave() {
    this.el.setAttribute('material', 'emissive', '#000000');
  },

  // Reduced motion gets the finished state in one frame, with no animation
  // component at all: there is nothing decorative here to play.
  playAction() {
    if (this.data.action === 'none') return;

    if (window.__reducedMotion) {
      if (this.data.action === 'turn') {
        this.el.object3D.rotation.y += Math.PI; // 180 degrees, in three.js radians
      } else if (this.data.action === 'lift') {
        this.el.object3D.position.y += 0.3;
      }
      return;
    }

    if (this.data.action === 'turn') {
      this.el.setAttribute('animation__turn', {
        property: 'rotation',
        to: `${this.el.getAttribute('rotation').x} ${this.el.getAttribute('rotation').y + 180} ${this.el.getAttribute('rotation').z}`,
        dur: 700,
        easing: 'easeOutQuad',
      });
    } else if (this.data.action === 'lift') {
      const pos = this.el.getAttribute('position');
      this.el.setAttribute('animation__lift', {
        property: 'position',
        to: `${pos.x} ${pos.y + 0.3} ${pos.z}`,
        dur: 500,
        dir: 'alternate',
        loop: 1,
        easing: 'easeInOutQuad',
      });
    }
  },
});

// --- 3. The one function every input calls -------------------------------

// A raycaster click on a 3D exhibit and a keyboard press on its "Select"
// button both end here, with the same line of code. This is what "the same
// select-exhibit code path" means in this lesson: not two implementations
// that produce the same result, but one implementation with two doors into
// it.
function selectExhibit(id) {
  for (const item of exhibitData) {
    const el = document.querySelector(`#${item.id}`);
    if (el) el.setAttribute('interactive-exhibit', 'selected', item.id === id);
  }
}

// --- 4. Building the 2D twin, and the info panel --------------------------

function buildExhibitList() {
  const list = document.querySelector('#exhibit-list');
  list.innerHTML = '';
  for (const item of exhibitData) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.label}.</strong> ${item.description}`;
    list.append(li);
  }
}

function buildSelectButtons() {
  const container = document.querySelector('#select-buttons');
  container.innerHTML = '';
  for (const item of exhibitData) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `select-${item.id}`;
    button.textContent = `Select: ${item.label}`;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => selectExhibit(item.id));
    li.append(button);
    container.append(li);
  }
}

function setSelectPressedState(activeId) {
  for (const item of exhibitData) {
    const button = document.querySelector(`#select-${item.id}`);
    if (button) button.setAttribute('aria-pressed', String(item.id === activeId));
  }
}

function updateInfoPanel(item) {
  const description = document.querySelector('#scene-description');
  const status = document.querySelector('#status');
  const chimeButton = document.querySelector('#chime-button');

  description.textContent = `Selected: ${item.label}. ${item.description}`;
  status.textContent = `Selected exhibit: ${item.label}.`;
  setSelectPressedState(item.id);

  if (item.hasAudio) {
    chimeButton.hidden = false;
    chimeButton.setAttribute('aria-pressed', 'false');
    chimeButton.textContent = '▶ Play chime';
  } else {
    chimeButton.hidden = true;
  }
}

// The scene-level listener: registered once, reacts to every exhibit's
// "exhibit-selected" event because custom events bubble up through the
// entity tree to <a-scene> by default (the third argument to el.emit()
// above, "true", is what turns bubbling on).
function wireSceneEvents() {
  const scene = document.querySelector('#exhibit-scene');
  scene.addEventListener('exhibit-selected', (evt) => {
    const item = exhibitData.find((entry) => entry.id === evt.detail.id);
    if (item) updateInfoPanel(item);
  });
}

function wireChimeButton() {
  const button = document.querySelector('#chime-button');
  const bell = document.querySelector('#chime-bell');

  button.addEventListener('click', () => {
    if (!bell.components.sound) return;
    bell.components.sound.playSound();
    button.setAttribute('aria-pressed', 'true');
    button.textContent = '♪ Playing chime…';
    // A short, one-shot sound: return the button to its resting label once
    // playback ends, instead of leaving it stuck on "playing".
    bell.addEventListener('sound-ended', () => {
      button.setAttribute('aria-pressed', 'false');
      button.textContent = '▶ Play chime';
    }, { once: true });
  });
}

// --- Input mode: mouse/tap cursor, or gaze with fuse ----------------------
//
// Accessibility trade-off, spelled out for the learner in the README and
// here in the control's own hint text: gaze selection needs no pointer or
// controller at all, which helps when neither is available, but it forces
// everyone to hold still for a fixed time. That is hard for anyone who
// cannot hold their gaze steady, and it removes the choice to take longer.
// Mouse/tap selection has no such wait, so it stays the default.
function wireInputModeToggle() {
  const button = document.querySelector('#gaze-toggle');
  const camera = document.querySelector('#camera');

  button.addEventListener('click', () => {
    const gazeOn = button.getAttribute('aria-pressed') === 'true';
    const next = !gazeOn;
    button.setAttribute('aria-pressed', String(next));
    button.textContent = next
      ? '◉ Gaze cursor: on (looking away cancels)'
      : '○ Use gaze cursor (dwell 1.2s to select)';
    camera.setAttribute('cursor', {
      rayOrigin: next ? 'entity' : 'mouse',
      fuse: next,
      fuseTimeout: 1200,
    });
  });
}

// --- Pause: stops the only thing that ever moves on its own ---------------
//
// Nothing in this room animates by itself; every animation here is a direct
// reply to a selection. The one exception is tick()'s idle pulse on the
// currently selected exhibit, so that is what Pause controls.
function wirePauseButton() {
  const button = document.querySelector('#pause-toggle');
  button.addEventListener('click', () => {
    const paused = button.getAttribute('aria-pressed') === 'true';
    const next = !paused;
    button.setAttribute('aria-pressed', String(next));
    button.textContent = next ? '▶ Resume idle animation' : '⏸ Pause idle animation';
    window.__reducedMotion = next ? true : matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
}

// --- 5. No WebGL: the room still has to work ------------------------------

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function checkWebGL() {
  if (hasWebGL()) return;
  document.querySelector('#canvas-box').hidden = true;
  document.querySelector('#no-webgl-message').hidden = false;
}

// --- Start -----------------------------------------------------------------

function init() {
  buildExhibitList();
  buildSelectButtons();
  wireSceneEvents();
  wireChimeButton();
  wireInputModeToggle();
  wirePauseButton();
  checkWebGL();
}

init();
