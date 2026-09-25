# Components

Two custom elements for My XR Camp. Each one is a single JavaScript module: import it once, then use the tag like any HTML element.

---

## `<lesson-card>`

A card for one lesson: its title, its time, its status, a description, and a **Done** button. Its structure and styles live in a shadow root, so page styles cannot break it by accident.

### Usage

```html
<script type="module" src="js/lesson-card.js"></script>

<lesson-card lesson-id="fe-05-web-components" lesson-title="Web Components"
             minutes="600" status="ready" heading-level="3">
  <p slot="description">Build your own HTML elements.</p>
  <p>Includes a 3D moment.</p>
</lesson-card>
```

From JavaScript:

```js
const card = document.createElement('lesson-card');
card.setAttribute('lesson-title', 'Web Components');
card.setAttribute('minutes', '600');
card.done = true;
list.append(card);
```

### Attributes

| Attribute | Values | Default | What it does |
| --- | --- | --- | --- |
| `lesson-title` | Text | "Untitled lesson" | The card's heading, and part of the button's name. |
| `minutes` | A whole number | none | Shown as "About 10 hours · 14 sessions of 45 minutes". |
| `status` | `ready` or `coming-soon` | `coming-soon` | Shown as a badge, in words. |
| `heading-level` | `2` to `6` | `3` | Which heading element the title uses. Choose the level that fits your page's outline. |
| `done` | Present or absent (boolean) | absent | Whether the lesson is done. The button shows it with `aria-pressed`. |
| `lesson-id` | Text | none | Your own id for the lesson, sent back in the `lesson-toggle` event. |

Every attribute can change at any time; the card updates at once.

Why `lesson-title`, not `title`? `title` is a global HTML attribute: on any element it adds a tooltip, and it can become part of the element's accessible description. A custom element should not reuse built-in attribute names for something else.

### Properties

| Property | Type | What it does |
| --- | --- | --- |
| `done` | Boolean | Reads or sets the `done` attribute. |
| `lessonTitle` | String, read-only | The title, or "Untitled lesson". |

### Slots

| Slot | What goes in it |
| --- | --- |
| `description` | A short description, usually one `<p slot="description">`. If empty, the card says "No description yet." |
| (default) | Anything else, below the description: a link, a note, a list. |

Content in slots stays in the page (the light DOM), so it is visible before the element is defined, and your page's styles still apply to it.

### Events

| Event | When | `event.detail` | Bubbles | Composed |
| --- | --- | --- | --- | --- |
| `lesson-toggle` | The learner presses Done | `{ lessonId, title, done }` | Yes | Yes |

The event is not fired when you set `done` from code, only when the learner uses the button. Outside the card, `event.target` is the `<lesson-card>`.

```js
document.addEventListener('lesson-toggle', (event) => {
  console.log(event.detail.title, event.detail.done);
});
```

### Parts

Style these from your page with `::part()`:

| Part | Element |
| --- | --- |
| `card` | The `<article>` around everything |
| `heading` | The title heading |
| `meta` | The time line |
| `badge` | The status badge |
| `button` | The Done button |

```css
lesson-card::part(badge) { text-transform: uppercase; }
```

### Custom properties

The card uses the XR Camp tokens when the page defines them, and sensible fallbacks when it does not: `--color-surface`, `--color-line`, `--color-ready`, `--color-primary`, `--color-primary-dark`, `--color-muted`, `--color-focus`, `--space-2`, `--space-3`, `--radius`.

### Accessibility

- The title is a real heading; choose its level with `heading-level`.
- Done is a real `<button>` with `aria-pressed`. Its name is "Done: " and the title, so ten cards do not give ten buttons called "Done", and the visible word comes first.
- Status is written in words, never shown by colour alone.
- `aria-labelledby` and `aria-describedby` cannot point from inside the card to elements outside it, or the other way round. Keep labels next to their controls.
- Announcing changes is the page's job: listen for `lesson-toggle` and write to your live region.

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
