# Web Components

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `web-components-05` · **Time:** about 10 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Build a reusable XR Camp lesson card or project viewer component.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain what **Web Components** are: your own HTML elements, built with standard browser features and no framework.
2. Define a **custom element** with a class and `customElements.define()`, and use its **lifecycle callbacks**: `constructor`, `connectedCallback`, and `attributeChangedCallback`.
3. Give an element private structure and styles with **shadow DOM** and a `<template>`, and let the page put its own content inside with **slots**.
4. Style a component from inside (`:host`, `::slotted()`, custom properties) and from outside (`::part()`).
5. Send information out of a component with a **custom event**, and explain `bubbles` and `composed`.
6. Keep a component accessible across the **shadow boundary**: real buttons, labels next to their controls, and a heading level the page can choose.
7. Use **progressive enhancement** with `:not(:defined)`, so content shows before the element is ready.
8. Write **documentation** that lets someone else use your component: attributes, slots, events, and parts.

## Prerequisites

- **Course 2.2: The DOM and Dynamic Interfaces** (building elements, events and bubbling, live regions). This lesson uses the same `data/catalog.json`.
- **Course 2.3: Application Architecture** (modules with one job, progressive enhancement).
- **Course 2.4: APIs, JSON, and Asynchronous Applications** helps: the page loads the catalog with `fetch` and `await`. The loading code is finished for you.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | The Elements panel (called Inspector in Firefox) shows shadow roots, and lets you change attributes live | Free |
| VS Code and a local server | Modules and `fetch` need `http://` | Free |
| A screen reader | Testing names, states, and announcements | Free |

Everything in this lesson works offline, except A-Frame in the 3D moment, which loads from `aframe.io`. If that address is slow or blocked where you are (for example, in mainland China), try the jsDelivr address listed in the repository's `versions.json`, or download `aframe.min.js` once, save it next to the page, and change the `src`.

## What you will build

The fifth part of **My XR Camp**: a **lesson card** you can use anywhere, as easily as a `<button>`:

```html
<lesson-card lesson-title="Web Components" minutes="600" status="ready" heading-level="3">
  <p slot="description">Build your own HTML elements.</p>
</lesson-card>
```

The card shows the title, the time in hours and sessions, the status in words, and your description. Its **Done** button tells the page when it is pressed, with an event called `lesson-toggle`. Then you use the card to show every lesson in the course catalog from Course 2.2, and save which ones are done, in the same place the Course 2.2 dashboard saves them.

In the 3D moment you build a second element, `<model-stage>`: a small 3D viewer, with Pause and Turn buttons, and a slot for its description.

The reference solution is in [`completed/`](completed/). The starter has the page, the data, and fourteen TODOs.

## Folder guide

```text
05-web-components/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # The lesson cards page: TODO 1
│   ├── js/lesson-card.js  # Your custom element: TODOs 2–8
│   ├── styles.css       # Finished, except TODO 9
│   ├── js/main.js       # Loads the catalog (finished): TODOs 10–11
│   ├── js/data.js, js/format.js, js/progress.js   # Finished
│   ├── data/catalog.json  # The same data as Course 2.2
│   ├── components.md    # The documentation: TODO 12
│   ├── 3d-moment.html   # The 3D viewer page (finished)
│   └── js/model-stage.js  # The 3D viewer element: TODOs 13–14
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Make a new folder, `lesson-cards`, next to your `my-xr-camp` folder, and copy the starter's files into it. Make it a Git repository and commit the untouched starter.
2. Start your local server, and open `index.html` with the **Elements** panel and the **Console** open.
3. If you use the same server and address for your Course 2.2 dashboard, the two pages share your progress: a lesson marked done on one is done on the other.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: an element the browser does not know (TODO 1) | Your card in the HTML, shown as plain text |
| 2 | Step 2: define it (TODO 2) | The browser knows `<lesson-card>` |
| 3 | Step 3: a template, a shadow root, and slots (TODOs 3–4) | Your paragraphs inside the card's structure |
| 4 | Step 4: styles inside the shadow (TODO 5) | A card in XR Camp's colours |
| 5 | Step 5: attributes (TODO 6) | Title, time, and status from attributes |
| 6 | Step 5, continued: heading levels (TODO 7) | An attribute changed in the Elements panel updates the card |
| 7 | Step 6: a real button and a custom event (TODO 8) | `lesson-toggle` in the Console |
| 8 | Step 7: styling from outside, and before it is defined (TODO 9) | A themed badge, and a card that reads well without JavaScript |
| 9 | Step 8: cards from the catalog (TODOs 10–11) | Every Phase 2 lesson as a card; Done is saved and announced |
| 10 | Step 9: test accessibility across the shadow boundary | A card that works with a keyboard and a screen reader |
| 11 | Step 10: document it (TODO 12) | `components.md`, tested by following it |
| 12 | The **3D moment** (TODOs 13–14) | A 3D viewer in your own element |
| 13 | [`tests/checklist.md`](tests/checklist.md) | A finished lesson card |
| 14 | One challenge extension, then **Submitting your work** | The fifth part of My XR Camp |

### Step 1: an element the browser does not know (TODO 1)

In `index.html`, write your first card, straight into the HTML (TODO 1 shows how). Then reload.

The browser does not know `<lesson-card>` yet, and it does not complain: an unknown element with a hyphen in its name is treated as a plain element, a little like a `<span>`, and the paragraphs inside it show as ordinary text. Look in the Elements panel: the tag is there, with its attributes.

This is the first good thing about Web Components. Your content is in the HTML from the start. JavaScript will improve it, but it does not create it.

### Step 2: define it (TODO 2)

A **custom element** is a class that extends `HTMLElement`, registered under a name:

```js
export class LessonCard extends HTMLElement { }
customElements.define('lesson-card', LessonCard);
```

The name **must contain a hyphen**. Built-in elements never have one, so your element can never clash with a future `<card>` in HTML. In the Console, type `customElements.get('lesson-card')`: it returns your class. Every `<lesson-card>` on the page is now "upgraded" to an instance of it.

**Web Components** is not one feature: it is an umbrella name for several standard features that work together. This lesson uses three: custom elements, shadow DOM, and the `<template>` element.

### Step 3: a template, a shadow root, and slots (TODOs 3–4)

A `<template>` holds HTML that is not shown, and not run. You copy it for each card. TODO 3 writes the card's structure: an `<article>`, a heading, a line for the time, a badge, two slots, and a button.

Then, in the constructor (TODO 4), you give the element a **shadow root**, and put the copy inside it:

```js
const root = this.attachShadow({ mode: 'open' });
root.append(template.content.cloneNode(true));
```

The **shadow DOM** is a small, private DOM tree attached to your element. The page's CSS does not reach into it, and `document.querySelector` does not find things inside it. The page's content, the paragraphs you wrote in Step 1, is the **light DOM**. It stays where it is.

A **slot** is a hole in the shadow DOM where light-DOM content is shown:

- `<slot name="description">` shows the child with `slot="description"`.
- `<slot>` with no name (the **default slot**) shows every other child.
- Whatever is inside a `<slot>` is its **fallback**: "No description yet." shows only when nothing is slotted.

Reload. Your paragraphs now appear inside the card's structure. In the Elements panel, open `#shadow-root (open)` and find the slots.

### Step 4: styles inside the shadow (TODO 5)

A `<style>` inside the shadow root styles only the shadow root. Nothing leaks in, and nothing leaks out: your `.badge` class cannot clash with a `.badge` on the page.

Three things are special:

- **`:host`** is the element itself, seen from inside. `:host([done])` matches when the card has the `done` attribute.
- **Custom properties cross the boundary.** They are inherited, like `color` and `font-family`. So `var(--color-primary, #5b2a86)` inside the card uses the page's purple, and falls back to the same colour on a page without XR Camp's tokens.
- **Ordinary page rules do not.** The page's `button { … }` and `:focus-visible { … }` rules stop at the boundary, so the card must style its own button and its own focus outline.

`::slotted(p)` styles the page's paragraphs in a slot, but only a little: the page's own styles still apply to them, because they are still in the page.

### Step 5: attributes (TODOs 6–7)

Attributes are how HTML configures an element. List the ones you care about, and the browser calls you whenever one changes:

```js
static observedAttributes = ['lesson-title', 'minutes', 'status', 'done', 'heading-level'];

attributeChangedCallback() {
  this.#render();
}
```

`#render()` reads the attributes and puts text into the shadow DOM, always with `textContent`. It runs when the card is added to the page (`connectedCallback`), and after every change. Try it: in the Elements panel, double-click `status="coming-soon"` and change it to `ready`. The badge changes at once. Or, in the Console:

```js
document.querySelector('lesson-card').setAttribute('minutes', '90');
```

Why `lesson-title` and not `title`? `title` is a **global attribute**: on any element, it shows a tooltip, and screen readers can read it. Do not reuse built-in attribute names for your own meaning.

**Heading levels (TODO 7).** A heading must fit the page's outline (WCAG 1.3.1), but the card cannot know where it will be used: under an `<h2>`, its title should be an `<h3>`; in a sidebar under an `<h3>`, an `<h4>`. So the page chooses, with `heading-level="3"`, and `#render()` swaps in the right element when it changes.

### Step 6: a real button and a custom event (TODO 8)

The card's button is a real `<button>`: it can be reached with Tab, pressed with Enter or Space, and because of `aria-pressed`, a screen reader says whether it is pressed. Never make a clickable `<div>`.

When it is pressed, the card flips its `done` attribute, then tells the page with a **custom event**:

```js
this.#button.dispatchEvent(new CustomEvent('lesson-toggle', {
  bubbles: true,
  composed: true,
  detail: { lessonId, title, done },
}));
```

- `bubbles: true` lets it travel up through the parents, so one listener can hear every card (event delegation, from Course 2.2).
- `composed: true` lets it cross out of the shadow root. Try `composed: false`: the page hears nothing.
- `detail` carries the data.

Outside the card, `event.target` is the `<lesson-card>`, not the button. The browser **retargets** events that leave a shadow root, so the page never sees the card's private insides.

`done` is also a **property** that mirrors the attribute: `card.done = true` adds `done`, and `card.done` reads it. Setting it from code does not fire the event; only the learner's action does. That way, the page cannot accidentally hear its own changes.

### Step 7: styling from outside, and before it is defined (TODO 9)

**Parts.** The card chooses which pieces the page may style, by giving them a `part` attribute. The page styles them with `::part()`:

```css
lesson-card::part(badge) { text-transform: uppercase; }
```

Try `lesson-card article { … }`: nothing happens. Only the parts are public. This is a promise to the people who use your card: you can change everything else later without breaking their pages.

**Progressive enhancement.** Until `customElements.define()` runs, the element is **not defined**, and `:not(:defined)` matches it. That moment is short on a fast connection, and long on a slow one, or forever if the script fails. Style it as a plain card, and show its title from the attribute:

```css
lesson-card:not(:defined)::before { content: attr(lesson-title); font-weight: 700; }
```

Comment out the `<script>` tag and reload: the card still has its title and description. There is no Done button, and that is fine: it is an improvement, not the content.

### Step 8: cards from the catalog (TODOs 10–11)

`main.js` already loads `data/catalog.json` and fills the **Phase** list. TODO 10 makes one card per lesson, exactly as you would write it in HTML:

```js
const card = document.createElement('lesson-card');
card.setAttribute('lesson-title', lesson.title);
card.setAttribute('minutes', lesson.minutes);
```

Notice what `main.js` does **not** do: it never touches `card.shadowRoot`. It sets attributes, adds children, and listens for events: the same three things you do with any built-in element. That is what makes the card reusable.

TODO 11 adds **one** listener on `<main>` for `lesson-toggle`. It hears the card you wrote in HTML and every card added later. It saves the change with `setDone()`, and announces it in the live region: "Marked as done: Modern JavaScript."

`progress.js` uses the same key, `my-xr-camp-progress`, and the same shape as the Course 2.2 dashboard, and keeps the dashboard's goals. Data that outlives one page is a promise too.

### Step 9: test accessibility across the shadow boundary

Shadow DOM changes one important thing: **ids do not cross the boundary**. `aria-labelledby`, `aria-describedby`, and `<label for>` inside the card cannot point to an element on the page, and the page cannot point inside the card. So:

- **Keep the label and the control together.** The button's name is set inside the card: `aria-label="Done: Modern JavaScript"`. Ten cards do not give ten buttons called just "Done", and the visible word comes first, so a speech-input user can say "click Done" (WCAG 2.5.3).
- **Use real elements** inside the shadow root: `<article>`, a real heading, a real `<button>`. Screen readers read the shadow DOM and the slotted content together, as one page.
- **Announcements belong to the page.** The card fires an event; the page's single live region speaks.

Test it: Tab through every card; press Enter and Space; reload and check Done is remembered. In your browser's accessibility tree (in the developer tools), check each card's heading level, and each button's name and pressed state. Then try a screen reader, and listen to the headings list.

### Step 10: document it (TODO 12)

A component other people cannot figure out is not reusable. Write `components.md` for someone who has never seen your code: a short example, then a table for each of **attributes**, **properties**, **slots**, **events**, and **parts**, then the custom properties it uses, and what the page must do for accessibility. The `<model-stage>` section is already written, as an example.

Test it the only way that counts: follow it exactly, on a new, empty page. Where you had to look at the code, the documentation is missing something.

## Key code explained

**`#heading`, `#render()`.** A `#` makes a field or method **private**: code outside the class cannot read or call it. The page can only use what you chose to make public: attributes, `done`, `lessonTitle`, the event, and the parts.

**`static observedAttributes`.** The browser reads this once, when you define the element. Attributes not in the list never call `attributeChangedCallback`.

**`template.content.cloneNode(true)`.** A template's content is a document fragment. `cloneNode(true)` makes a deep copy, so each card gets its own.

**`attachShadow({ mode: 'open' })`.** Open means page code can reach in with `card.shadowRoot`, which is useful for testing. It is encapsulation for styles and structure, not a security feature.

**`if (!customElements.get('lesson-card'))`.** Defining the same name twice throws an error. The check makes the module safe to import from more than one file.

**`import './lesson-card.js'`** at the top of `main.js`, with no names: it runs the module, which defines the element, before any code below sets `card.done`. If you set a property on an element before it is defined, the value hides the class's `done` setter later.

## 3D moment

Open [`completed/3d-moment.html`](completed/3d-moment.html). The whole viewer is one tag:

```html
<model-stage shape="torus" color="#5b2a86" label="3D view: a purple ring">
  <p slot="description" id="scene-description">A purple ring, like a thick bracelet, …</p>
</model-stage>
```

`<model-stage>` builds an A-Frame scene from its `shape` and `color` attributes (no model files: A-Frame's primitive shapes), adds **Pause animation**, **Turn left**, and **Turn right** buttons, and keeps your description paragraph as the scene's text alternative. Change `shape` in the Elements panel, and the model changes, through `attributeChangedCallback`, exactly like the card.

But this element has **no shadow root**, on purpose. A-Frame expects its scene to be part of the main document: it adds its styles to the page's `<head>`, and parts of it look for elements with `document.querySelector()`, which cannot see into a shadow root. A scene inside a shadow root may not render or size correctly. So `<model-stage>` builds its buttons and scene as ordinary children, in the light DOM, and explains why in a comment at the top of `model-stage.js`.

Without a shadow root, `<slot>` does nothing, so the element copies the idea: it finds its child with `slot="description"` and leaves it where you wrote it. And because everything is in one document, the scene **can** point to it: `role="img"`, a name from `label`, and `aria-describedby="scene-description"` (TODO 13). Choosing no shadow root is a real decision you will meet again: when a library needs the main document, work with it.

TODO 14 wires the buttons. The viewer starts paused if the device asks for reduced motion, and pauses if that setting is turned on while the page is open. Turn left and Turn right move the model 15 degrees and announce the new angle: a keyboard route for what would otherwise need a mouse drag. The camera never moves.

The description is written by you, not generated, so keep it true: if you change the shape, change the words.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The card's title is a real heading, at a level the page chooses | 1.3.1, 2.4.6 | Headings make a page's outline, and screen-reader users move by them. |
| Done is a real `<button>`, with `aria-pressed` | 2.1.1, 4.1.2 | It works with a keyboard, and its state is announced. |
| Each button's name includes the lesson: "Done: Web Components" | 2.4.6, 4.1.2 | Ten cards do not give ten buttons with the same name. |
| The visible word starts each button's name | 2.5.3 | Speech-input users can say "click Done". |
| Status is shown in words, with a border, not by colour alone | 1.4.1 | Colour is not the only way to tell ready from coming soon. |
| Focus is visible inside the card | 2.4.7 | Page focus styles do not cross the shadow boundary, so the card has its own. |
| Changes are announced by the page's live region | 4.1.3 | "Marked as done: Web Components." |
| The 3D scene has a text description, and can be paused | 1.1.1, 2.2.2 | The words carry everything the picture shows; movement is never forced. |
| The 3D model can be turned with buttons | 2.1.1 | Every 3D interaction has a keyboard route. |

## Performance considerations

Every card clones the same template, which is faster than building each one from a string, and browsers can usually reuse the parsed styles for the identical `<style>` in every clone. (To share one stylesheet for sure, use a constructable stylesheet with `adoptedStyleSheets`.) `#render()` only changes a few `textContent` values, so rendering again after every attribute change is cheap.

Custom elements need no framework: `lesson-card.js` is a few kilobytes, and the browser already knows how to run it.

A-Frame's `tick` runs once per frame, only while the scene is running. When the viewer is paused, `stage-turn` returns straight away and the model stops turning.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| A name with no hyphen: `customElements.define('lessoncard', …)` | An error: "not a valid custom element name" | Always include a hyphen |
| Adding attributes or children in the `constructor` | An error when the element is created with `createElement` | Build the shadow root in the constructor; read attributes in `connectedCallback` and `attributeChangedCallback` |
| Forgetting `observedAttributes` | Changing an attribute does nothing | List every attribute you react to |
| Using `title` as your own attribute | A tooltip appears over the whole card | Use a name of your own: `lesson-title` |
| An event fired from inside the shadow root without `composed: true` | The page never hears it | `bubbles: true, composed: true` (or dispatch it on the element itself) |
| `aria-labelledby` pointing across the shadow boundary | The label is ignored: the button gets a different name (just its own text), or none | Keep the label and the control together, inside |
| Expecting page CSS to style the insides | Nothing changes | Custom properties in, `::part()` from outside |
| A `<div>` with a click listener as the button | No keyboard, no role, no state | A real `<button>` |
| Putting an A-Frame scene inside a shadow root | The scene may not render or size correctly | Build it in the light DOM |

## Troubleshooting

**The card shows only my paragraphs, as plain text.** The element is not defined. Look for the first error in the Console, and check that `main.js` imports `./lesson-card.js`.

**An error saying the name "lesson-card" has already been used (Chrome) or has already been defined (Firefox).** The element was defined twice. Use the `customElements.get()` check.

**An error containing `The result must not have attributes` (Chrome and Edge; Safari: `must not have attributes`).** Your constructor adds an attribute, or a child, to the element itself. Move that work to `connectedCallback`.

**The title never appears.** The attribute name must match exactly: `lesson-title`, not `lessonTitle`.

**The card does not update when I change an attribute.** `observedAttributes` must be `static`, and must list that attribute.

**My description shows twice, or not at all.** Check the spelling: `slot="description"` on the paragraph, and `<slot name="description">` in the template.

**The page does not hear `lesson-toggle`.** Check `bubbles: true` and `composed: true`, and that you listen for exactly `lesson-toggle`.

**Done is not remembered.** Check that each card has a `lesson-id`, and that you use the local server (`http://`), not a file opened directly.

**The 3D scene is empty.** A-Frame must load before `model-stage.js`. Keep the A-Frame `<script>` above the module.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a new attribute and a new part to the card, and update the documentation.
2. **[Creative](challenges/challenge-2.md)**: make a card for something from your own community, with the card's words in your language.
3. **[Explorer](challenges/challenge-3.md)**: render a card with no JavaScript at all, using declarative shadow DOM.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your lesson cards, and one of the 3D viewer.
3. Keep them, and your `components.md`, in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which part of the card is public, and which is private? Why does that difference matter to the people who use it?

## Further reading

- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [MDN: Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [MDN: Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- [MDN: Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)
- [MDN: ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
- [WHATWG HTML Standard: Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html)
- [A-Frame 1.8.0 documentation](https://aframe.io/docs/1.8.0/introduction/)

## Women to Know

**Monica Dinculescu** was a senior engineer at Google for about eight years, until 2021, where she worked on Polymer, web components, and Chrome. She gave many talks on building and styling web components, at the Polymer Summit, Chrome Dev Summit, and Google I/O, and at Google I/O 2018 she unveiled the PWA Starter Kit, built with web components. Later, in Google Brain, she worked on Magenta, making generative music and art with machine learning.

Styling components, with `:host`, custom properties, and parts, is one of the hardest things in this lesson to get right, and it was a subject of her talks. Her path, from browser engineering to music and art made with code, shows that front-end skills can take you to surprising places.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

**Web Components** is an umbrella name, not one specification. Custom elements, `<template>`, and `<slot>` are defined in the WHATWG's **HTML Standard**, and shadow trees, slot assignment, and composed events in the WHATWG's **DOM Standard**. `::part()` comes from the W3C's CSS Working Group. Because they are standards built into every modern browser, a `<lesson-card>` you write today works in any framework, or none, and keeps working when frameworks change.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
