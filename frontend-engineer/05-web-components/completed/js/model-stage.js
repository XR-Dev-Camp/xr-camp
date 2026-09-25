// model-stage.js: <model-stage>, a small 3D viewer wrapped in your own element.
//
//   <model-stage shape="torus" color="#5b2a86" label="3D view: a purple ring">
//     <p slot="description" id="scene-description">A purple ring ...</p>
//   </model-stage>
//
// WHY THERE IS NO SHADOW ROOT HERE
// <lesson-card> keeps its insides in a shadow root. This element does not.
// A-Frame expects its scene to be part of the main document: it adds its
// styles to the page's <head>, and parts of it look for elements with
// document.querySelector(), which cannot see inside a shadow root. A scene
// placed in a shadow root may not render or size correctly. So <model-stage>
// builds its scene in the LIGHT DOM, as ordinary children of the element.
//
// Without a shadow root, <slot> does not exist, so we copy the idea by hand:
// the element looks for its child with slot="description", keeps it where
// the author put it, and points the scene at it with aria-describedby. That
// also works because everything is in one document: ids can be referenced.
//
// Load A-Frame (a classic script) BEFORE this module.

const SHAPES = {
  box: { primitive: 'box', width: 0.8, height: 0.8, depth: 0.8 },
  sphere: { primitive: 'sphere', radius: 0.5 },
  torus: { primitive: 'torus', radius: 0.45, radiusTubular: 0.12 },
  cone: { primitive: 'cone', radiusBottom: 0.5, radiusTop: 0, height: 1 },
  cylinder: { primitive: 'cylinder', radius: 0.4, height: 0.9 },
  dodecahedron: { primitive: 'dodecahedron', radius: 0.5 },
};
const TURN_STEP = 15;        // degrees per press of Turn left / Turn right
const TURN_SPEED = 20;       // degrees per second while animating

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// A-Frame component: turn slowly around the vertical axis, unless paused.
// A-Frame calls tick() once per frame, only while the scene is running.
AFRAME.registerComponent('stage-turn', {
  schema: { paused: { default: false } },
  tick(time, delta) {
    if (this.data.paused) return;
    this.el.object3D.rotation.y += THREE.MathUtils.degToRad(TURN_SPEED) * (delta / 1000);
  },
});

function makeButton(text) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  return button;
}

export class ModelStage extends HTMLElement {
  static observedAttributes = ['shape', 'color'];

  #model;
  #pauseButton;
  #status;
  #paused = reducedMotion.matches;

  connectedCallback() {
    // connectedCallback runs again if the element is moved in the page.
    // Build only once.
    if (this.#model) return;

    const controls = document.createElement('div');
    controls.className = 'stage-controls';
    this.#pauseButton = makeButton('Pause animation');
    const left = makeButton('Turn left');
    const right = makeButton('Turn right');
    controls.append(this.#pauseButton, left, right);

    this.#status = document.createElement('p');
    this.#status.setAttribute('role', 'status');
    this.#status.className = 'visually-hidden';

    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('xr-mode-ui', 'enabled: false');
    scene.setAttribute('loading-screen', 'enabled: false');
    // The scene is one picture: a name from the label attribute, and a
    // longer description from the slotted paragraph.
    scene.setAttribute('role', 'img');
    scene.setAttribute('aria-label', this.getAttribute('label') ?? '3D view');
    const description = this.querySelector('[slot="description"]');
    if (description?.id) scene.setAttribute('aria-describedby', description.id);

    // A fixed camera: nothing moves the viewer, only the object turns.
    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    camera.setAttribute('position', '0 1.6 0');
    camera.setAttribute('look-controls', 'enabled: false');
    camera.setAttribute('wasd-controls', 'enabled: false');

    const sky = document.createElement('a-sky');
    sky.setAttribute('color', '#eef4ff');
    const floor = document.createElement('a-plane');
    floor.setAttribute('rotation', '-90 0 0');
    floor.setAttribute('width', '10');
    floor.setAttribute('height', '10');
    floor.setAttribute('color', '#dcd6e6');

    this.#model = document.createElement('a-entity');
    this.#model.setAttribute('position', '0 1.5 -2.5');
    this.#model.setAttribute('rotation', '20 0 0');   // tilted, so its shape reads well

    scene.append(camera, sky, floor, this.#model);
    this.append(controls, scene, this.#status);
    this.#updateModel();
    this.#updatePause();

    this.#pauseButton.addEventListener('click', () => {
      this.#paused = !this.#paused;
      this.#updatePause();
    });
    left.addEventListener('click', () => this.#turn(TURN_STEP, 'left'));
    right.addEventListener('click', () => this.#turn(-TURN_STEP, 'right'));

    // If the learner turns on "reduce motion" while the page is open, stop.
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        this.#paused = true;
        this.#updatePause();
      }
    });
  }

  attributeChangedCallback() {
    if (this.#model) this.#updateModel();
  }

  #updateModel() {
    const shape = SHAPES[this.getAttribute('shape')] ?? SHAPES.box;
    this.#model.setAttribute('geometry', shape, true);   // true: replace, do not merge
    this.#model.setAttribute('material', { color: this.getAttribute('color') ?? '#5b2a86' });
  }

  #updatePause() {
    this.#pauseButton.setAttribute('aria-pressed', String(this.#paused));
    this.#model.setAttribute('stage-turn', { paused: this.#paused });
  }

  // Keyboard route to the same thing a drag would do: turn the object.
  #turn(degrees, direction) {
    const rotation = this.#model.object3D.rotation;
    rotation.y += THREE.MathUtils.degToRad(degrees);
    const facing = Math.round(((THREE.MathUtils.radToDeg(rotation.y) % 360) + 360) % 360);
    this.#status.textContent = `Turned ${direction}. Now at ${facing} degrees.`;
  }
}

if (!customElements.get('model-stage')) {
  customElements.define('model-stage', ModelStage);
}
