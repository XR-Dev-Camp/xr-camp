# Components

Two custom elements for My XR Camp. Each one is a single JavaScript module: import it once, then use the tag like any HTML element.

---

## `<lesson-card>`

<!-- TODO 12: Document your card, so someone who has never seen your code
     can use it in five minutes. Fill in every section below. Use tables,
     like the <model-stage> documentation further down. Test it: give it to
     a friend (or read it tomorrow), and follow it exactly. -->

A card for one lesson. (Say in one or two sentences what it shows and what it does.)

### Usage

(A short HTML example, and a short JavaScript example with createElement.)

### Attributes

(Every attribute: its values, its default, and what it does. Say why it is called `lesson-title`, not `title`.)

### Properties

(`done` and `lessonTitle`.)

### Slots

(The `description` slot and the default slot. What shows when the description slot is empty?)

### Events

(`lesson-toggle`: when it fires, what is in `event.detail`, whether it bubbles and is composed. Does it fire when code sets `done`?)

### Parts

(Every `part`, and a `::part()` example.)

### Custom properties

(Which tokens the card uses, and what happens when the page does not define them.)

### Accessibility

(Headings, the button's name and state, status in words, and what the page must do itself.)

---

## `<model-stage>`

A small 3D viewer, made with A-Frame: one primitive shape that turns slowly, with Pause, Turn left, and Turn right buttons.

### Usage

```html
<script src="https://aframe.io/releases/1.8.0/aframe.min.js"></script>
<script type="module" src="js/model-stage.js"></script>

<model-stage shape="torus" color="#5b2a86" label="3D view: a purple ring">
  <p slot="description" id="scene-description">A purple ring floats at eye level …</p>
</model-stage>
```

Load A-Frame before the module.

### Attributes

| Attribute | Values | Default | What it does |
| --- | --- | --- | --- |
| `shape` | `box`, `sphere`, `torus`, `cone`, `cylinder`, `dodecahedron` | `box` | The shape of the model. Changes at once. |
| `color` | Any CSS colour | `#5b2a86` | The model's colour. Changes at once. |
| `label` | Text | "3D view" | The scene's accessible name. Read once, when the element is added. |

### Slots

| Slot | What goes in it |
| --- | --- |
| `description` | A paragraph describing the scene in words, with an `id`. The scene points to it with `aria-describedby`. It is the text alternative, and the 2D equivalent, of the scene. |

There is no shadow root, so this is not a real `<slot>`: the element finds its child with `slot="description"` and leaves it where you wrote it.

### Why no shadow root?

A-Frame expects its scene to be in the main document. It adds its styles to the page's `<head>`, and parts of it look for elements with `document.querySelector()`, which cannot see inside a shadow root. So a scene inside a shadow root may not render or size correctly. `<model-stage>` builds its buttons and its scene as ordinary children instead. The trade-off: page styles can reach its insides, so its styles live in `styles.css`.

### Events

None.

### Accessibility

- Starts paused if the device asks for reduced motion, and pauses if that setting is turned on later.
- **Pause animation** is a toggle button (`aria-pressed`).
- **Turn left** and **Turn right** turn the model 15 degrees, and announce the new angle in a live region.
- The camera never moves.
- Keep the description true: if you change `shape` or `color`, change the description too.
