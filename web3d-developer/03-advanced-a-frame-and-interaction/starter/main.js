// XR Camp · Advanced A-Frame and Interaction · starter
//
// This file does five jobs. Each one starts as a small placeholder below, so
// the page runs while you work: when you reach a TODO, replace its
// placeholder with the real version. (Look at completed/main.js only after
// you have tried each TODO yourself.)
//   1. Describe the exhibits as data (exhibitData).
//   2. Register the interactive-exhibit component: schema, init, update,
//      tick, remove, and events (TODOs 2, 3, 5, 8, 9, 11, 16, 17).
//   3. selectExhibit(id): the one function every input calls.
//   4. Build the 2D list, the "Select" buttons, and wire the info panel,
//      input-mode, and pause controls.
//   5. Detect WebGL and show the no-WebGL message when it is missing.

// --- 1. The exhibits, as data ---------------------------------------------

// TODO 1: fill this array with one object per exhibit stop. Each needs an
// "id" that matches an entity id in index.html, a "label", a "description",
// an "action" ("turn", "lift", or "none"), and "hasAudio" (true only for the
// chime bell). You need three: woven-panel (turn), story-lantern (lift, a
// new entity you will also add in index.html), and chime-bell (turn, audio).
const exhibitData = [];

// --- 2. The custom component: interactive-exhibit -------------------------

AFRAME.registerComponent('interactive-exhibit', {
  // TODO 2: write the schema. Three properties: "exhibitId" (a string),
  // "action" (a string, default "turn", oneOf ['turn', 'lift', 'none']),
  // and "selected" (a boolean, default false). Read the README's "Step 2"
  // before writing this: schema properties are how HTML attributes like
  // interactive-exhibit="exhibitId: story-lantern; action: lift" become
  // this.data inside the component.
  schema: {},

  // TODO 3: write init(). It runs once, when the component attaches. Bind
  // and add three event listeners to this.el: 'click' (calls
  // selectExhibit(this.data.exhibitId)), 'mouseenter' (highlights the
  // exhibit, e.g. this.el.setAttribute('material', 'emissive', '#5b2a86')),
  // and 'mouseleave' (clears it, emissive '#000000'). Store the bound
  // functions on `this` so remove() (TODO 17) can find the exact same
  // function reference to remove.
  init() {
    // placeholder: does nothing yet
  },

  // TODO 5: write update(oldData). Compare this.data.selected to
  // oldData.selected; if they are equal, return early (nothing changed). If
  // the exhibit just became selected: toggle a CSS class ("is-selected") on
  // this.el for a visual hook, emit a bubbling custom event
  // ("exhibit-selected", with { id: this.data.exhibitId } as detail, and
  // `true` as the third argument so it bubbles to <a-scene>), and call
  // this.playAction() (TODO 9/11, already written below).
  update(oldData) {
    // placeholder: does nothing yet
  },

  // TODO 16: write tick(time). Only while this.data.selected is true AND
  // window.__reducedMotion is false, set this.el.object3D.scale to a value
  // that gently oscillates with Math.sin(time / 260) (try amplitude 0.04
  // around 1). Otherwise (not selected, or reduced motion), reset the scale
  // to (1, 1, 1) so nothing is left mid-pulse.
  tick(time) {
    // placeholder: does nothing yet
  },

  // TODO 17: write remove(). Undo everything init() did: remove all three
  // event listeners (the exact function references you stored on `this`),
  // remove any "animation__turn" or "animation__lift" attribute this
  // component may have set, and reset object3D.scale to (1, 1, 1). Test it
  // with a quick script in the browser console: call
  // document.querySelector('#woven-panel').removeAttribute('interactive-exhibit')
  // and confirm clicking it no longer does anything.
  remove() {
    // placeholder: does nothing yet
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

  // TODO 9 (turn) and TODO 11 (lift): write playAction(). If
  // this.data.action is 'none', return. If window.__reducedMotion is true,
  // apply the finished state in one frame with no animation component at
  // all: for 'turn', this.el.object3D.rotation.y += Math.PI (radians); for
  // 'lift', this.el.object3D.position.y += 0.3. Otherwise, use the
  // animation component: for 'turn', setAttribute('animation__turn', {
  // property: 'rotation', to: '<x> <y+180> <z>', dur: 700, easing:
  // 'easeOutQuad' }) reading the current rotation with
  // this.el.getAttribute('rotation'); for 'lift', setAttribute
  // ('animation__lift', { property: 'position', to: '<x> <y+0.3> <z>',
  // dur: 500, dir: 'alternate', loop: 1, easing: 'easeInOutQuad' }) reading
  // the current position with this.el.getAttribute('position').
  playAction() {
    // placeholder: does nothing yet
  },
});

// --- 3. The one function every input calls ---------------------------------

// TODO 6: write selectExhibit(id). Loop over exhibitData; for each item, find
// its entity (document.querySelector('#' + item.id)) and, if it exists, call
// el.setAttribute('interactive-exhibit', 'selected', item.id === id). This
// one function is called from two places: interactive-exhibit's onClick
// (a raycaster hit, from a mouse, a finger, or a VR controller's trigger
// through laser-controls) and every keyboard "Select" button (TODO 7). Both
// doors, one room.
function selectExhibit(id) {
  // placeholder: does nothing yet
}

// --- 4. Building the 2D twin, and the info panel ----------------------------

// TODO 4 note: index.html's #camera needs a cursor component
// (cursor="rayOrigin: mouse; fuse: false") and a raycaster
// (raycaster="objects: .interactive; far: 20"). That is an HTML change, not
// a JavaScript one: make it there, then come back here.

function buildExhibitList() {
  // placeholder: does nothing yet
}

// TODO 7: write buildSelectButtons(). Read #select-buttons, clear it, and
// for each item in exhibitData append an <li><button> pair: button id
// `select-${item.id}`, text `Select: ${item.label}`, aria-pressed="false" to
// start, and a click listener that calls selectExhibit(item.id) — the same
// function the 3D exhibits call.
function buildSelectButtons() {
  // placeholder: does nothing yet
}

function setSelectPressedState(activeId) {
  for (const item of exhibitData) {
    const button = document.querySelector(`#select-${item.id}`);
    if (button) button.setAttribute('aria-pressed', String(item.id === activeId));
  }
}

// TODO 12: write updateInfoPanel(item). Set #scene-description's text to
// `Selected: ${item.label}. ${item.description}`, set #status's text to
// `Selected exhibit: ${item.label}.` (a role="status" live region, so a
// screen reader announces it), call setSelectPressedState(item.id), and
// show or hide #chime-button depending on item.hasAudio (see its starting
// hidden attribute in index.html).
function updateInfoPanel(item) {
  // placeholder: does nothing yet
}

// TODO 8: write wireSceneEvents(). Get #exhibit-scene and add an event
// listener for "exhibit-selected" (the event TODO 5's update() emits).
// Inside the listener, find the matching item in exhibitData by
// evt.detail.id, and call updateInfoPanel(item). This is the one place in
// the whole lesson that listens for that event: every exhibit's component
// emits it, but only the scene needs to react.
function wireSceneEvents() {
  // placeholder: does nothing yet
}

// TODO 13: write wireChimeButton(). Get #chime-button and #chime-bell. On
// click, if bell.components.sound exists, call
// bell.components.sound.playSound(), set the button's aria-pressed to
// "true" and its text to something like "Playing chime...", then add a
// once-only listener for the bell's "sound-ended" event that sets
// aria-pressed back to "false" and restores the "Play chime" text.
function wireChimeButton() {
  // placeholder: does nothing yet
}

// TODO 14: write wireInputModeToggle(). Get #gaze-toggle and #camera. On
// click, read the button's current aria-pressed, flip it, update the
// button's text, and call camera.setAttribute('cursor', { rayOrigin: ...,
// fuse: ..., fuseTimeout: 1200 }): rayOrigin 'entity' and fuse true when
// gaze mode is now on, rayOrigin 'mouse' and fuse false when it is off. Read
// the README's note on the accessibility trade-off before you decide the
// default.
function wireInputModeToggle() {
  // placeholder: does nothing yet
}

// TODO 18: write wirePauseButton(). Get #pause-toggle. On click, read its
// aria-pressed, flip it, update its text, and set window.__reducedMotion:
// true when now paused, otherwise back to
// matchMedia('(prefers-reduced-motion: reduce)').matches (so a real
// reduced-motion preference is not overridden by un-pausing).
function wirePauseButton() {
  // placeholder: does nothing yet
}

// --- 5. No WebGL: the room still has to work --------------------------------

function hasWebGL() {
  return true; // placeholder: always says WebGL is available
}

function checkWebGL() {
  // placeholder: does nothing yet
}

// --- Start -------------------------------------------------------------------

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
