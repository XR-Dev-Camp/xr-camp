# The Document Object Model and Dynamic Interfaces

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `the-document-object-model-and-dynamic-interfaces-02` · **Time:** about 10 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Create an accessible interactive learning dashboard.

---

## Learning objectives

By the end of this project you will be able to:

1. Describe the DOM as a tree of objects, and move around it with `closest`, `querySelector`, and `children`.
2. Create, change, and remove elements, attributes, and classes.
3. Explain how events bubble, and use one listener for many elements (event delegation).
4. Keep an application's state in one place, and update the page when it changes.
5. Update only what changed, so keyboard focus and screen readers are not disturbed.
6. Move focus deliberately when content is added or removed.
7. Announce changes with live regions.

## Prerequisites

- **Course 2.1: Modern JavaScript.** You built the course map with modules.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | The Elements panel (called Inspector in Firefox) shows the DOM live | Free |
| VS Code and a local server | Modules need `http://` | Free |
| A screen reader | Testing focus and announcements | Free |

## What you will build

The second part of **My XR Camp**: a **learning dashboard**. Tick each lesson as you finish it, and watch your progress for each phase and overall. A **Next up** card shows the next ready lesson. A **My goals** list lets you add and remove your own learning goals. Everything is saved in this browser, and everything works with the keyboard and a screen reader.

The reference solution is in [`completed/`](completed/). The starter has the page, the styles, the data, and `state.js` finished; `dashboard.js` and `main.js` have ten TODOs. Each function in `dashboard.js` starts as a small placeholder, so the page runs while you work: when you reach its TODO, replace the placeholder with your real function.

## Folder guide

```text
02-the-document-object-model-and-dynamic-interfaces/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css, data/catalog.json   # Finished
│   ├── js/format.js, js/data.js    # From Course 2.1
│   ├── js/state.js      # Progress and goals, saved in the browser (finished)
│   ├── js/dashboard.js  # Building and updating elements: TODOs 3–6 and 8
│   ├── js/main.js       # Events and focus: TODOs 1–2, 7, 9–10
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the starter's files into your `my-xr-camp` folder from Course 2.1. The new files are `js/state.js`, `js/dashboard.js`, and the new `index.html` and `styles.css`.
2. Start your local server, and open the page with its **Elements** panel (called **Inspector** in Firefox) and **Console** open.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: the DOM tree (TODOs 1–2) | You can find any element in the tree |
| 2 | Step 2: state (read `state.js`) | You can explain where progress lives |
| 3 | Step 3: building elements (TODO 3) | Every phase on the page |
| 4 | Step 3, continued (TODOs 4–5) | Overall progress and Next up |
| 5 | Step 4: events and bubbling | You can explain delegation |
| 6 | Step 4, continued (TODO 7) | Ticks are saved; overall progress and Next up update |
| 7 | Step 5: update only what changed (TODO 6) | Each phase's bar updates too, and focus stays on the checkbox |
| 8 | Step 6: live regions | Every change is announced |
| 9 | Step 7: a dynamic form (TODOs 8–9) | Adding goals |
| 10 | Step 8: focus management (TODO 10) | Removing goals, with focus in the right place |
| 11 | Step 9: test with keyboard and screen reader | A tested dashboard |
| 12 | The **3D moment** | A control panel for a 3D scene |
| 13 | [`tests/checklist.md`](tests/checklist.md) | A finished dashboard |
| 14 | One challenge extension, then **Submitting your work** | The second part of My XR Camp |

### Step 1: the DOM tree (TODOs 1–2)

When the browser reads your HTML, it builds the **Document Object Model**: a tree of objects, one for every element, attribute, and piece of text. JavaScript never changes your HTML file; it changes this tree, and the browser redraws the page.

In the Elements panel, click the arrows to open and close branches. Every element has a **parent**, and most have **children**. Useful ways to move around the tree:

| Code | Finds |
| --- | --- |
| `document.querySelector('#map')` | The first element matching a selector |
| `element.querySelectorAll('.lesson')` | Every match inside an element |
| `element.closest('.phase')` | The nearest ancestor matching a selector (or itself) |
| `element.children`, `element.parentElement` | Direct children, direct parent |

### Step 2: state

The dashboard's **state** is everything it needs to remember: which lessons are done, and your goals. It lives in one object, in `state.js`, which is also the only module that talks to `localStorage`. In `state.js`, `read()` builds an object with this shape, filled from what was saved:

```js
{ done: new Set(), goals: [] }
```

A `Set` is a collection with no duplicates, and a fast `has` check: perfect for "is this lesson done?". When the state changes, the page must change to match, and the rest of this lesson is about doing that well.

### Step 3: building elements (TODOs 3–5)

You know `createElement`, `textContent`, and `append` from Course 1.6. Three more things you need:

- **Attributes:** `element.setAttribute('aria-labelledby', id)`, or properties like `box.checked = true`.
- **Classes:** `element.className = 'phase'`, or `element.classList.add('selected')`, `.remove`, `.toggle`.
- **Data attributes:** `row.dataset.lessonId = lesson.id` becomes `data-lesson-id="…"`: a way to store which piece of state an element belongs to.

Every checkbox's label includes its lesson's title, so each has a unique name: "Done: HTML Foundations", not fifty-eight checkboxes all called "Done". A `<progress>` element shows each bar, always with its value in words beside it.

### Step 4: events and bubbling (TODO 7)

When you tick a checkbox, the `change` event starts at the checkbox, then **bubbles** up: to its list item, its list, its section, `#map`, and all the way to the document. So one listener on `#map` hears every checkbox inside it, including ones added later:

```js
map.addEventListener('change', (event) => {
  const box = event.target;                    // the element that changed
  if (box.type !== 'checkbox') return;
  const row = box.closest('[data-lesson-id]');
  setDone(row.dataset.lessonId, box.checked);
});
```

This is **event delegation**: one listener instead of fifty-eight, and it keeps working when elements are added or removed.

### Step 5: update only what changed (TODO 6)

The simplest way to update a page is to redraw everything. But redrawing destroys the checkbox you just ticked, and creates a new one. Keyboard focus is lost, and a screen-reader user is thrown back to the top of the page.

So update **only what changed**: this phase's progress bar, the overall progress, and Next up. The checkbox is not rebuilt, and focus stays exactly where the learner left it.

```js
section.querySelector('.progress').replaceWith(progress(done, lessons.length, label));
```

### Step 6: live regions

A sighted user sees the progress bar move. A screen-reader user needs to hear it. One polite live region announces every change:

```html
<p id="status" role="status" class="visually-hidden"></p>
```

`visually-hidden` hides it from sight but not from screen readers. Keep announcements short: "HTML Foundations marked as done."

### Step 7: a dynamic form (TODOs 8–9)

Adding a goal: prevent the form's reload, check the text is not empty, add it to the state, append **one** new list item, clear the input, and keep focus in the input so the learner can add another straight away.

Each goal's Remove button shows the word "Remove", and has `aria-label="Remove goal: Finish Phase 1"`, so a screen-reader user hears which goal it removes.

### Step 8: focus management (TODO 10)

When you remove a goal, the button that had focus disappears. The browser then drops focus to the top of the page, and a keyboard user loses their place. So move focus deliberately:

```js
const buttons = goalList.querySelectorAll('.remove');
const target = buttons[index] ?? buttons[index - 1] ?? goalInput;
target.focus();
```

The next goal's button, or the previous one if it was the last, or back to the input if the list is empty. `??` picks the first value that exists.

### Step 9: test with keyboard and screen reader

- Tick and untick lessons with **Space**. Does focus stay put? Is each change announced?
- Add three goals with **Enter**. Remove the middle one, then the last, then the first. Where does focus go each time?
- Reload: is everything still there?

## Key code explained

**`event.target` and `closest`.** `target` is the element where the event started; `closest` climbs up from it to the element you care about.

**`element.replaceWith(newElement)`.** Swaps one element for another in the tree, in place.

**`crypto.randomUUID()`** (in `state.js`). Gives each goal a unique id, so removing one never removes another with the same text.

**`??` (nullish coalescing).** `a ?? b` is `a`, unless `a` is `null` or `undefined`, then `b`.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html): a 2D control panel for a 3D scene. Add boxes, spheres, and cones; select one (it turns gold); remove them. The panel is the source of truth: one array of shapes, drawn twice, as buttons and as 3D objects.

Look at how focus is handled: after selecting, focus returns to the redrawn button; after removing, it moves to the next shape, or back to **Add shape**. And the scene description lists every shape, left to right, so the 3D scene is never the only place the information lives. A panel like this is how you will make 3D and XR scenes keyboard-accessible in Phases 3 and 4.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Focus stays in a logical place after every change | 2.4.3 | Keyboard and screen-reader users keep their place. |
| Every checkbox and button has a unique, descriptive name | 2.4.6, 4.1.2 | "Done: HTML Foundations", "Remove goal: …". |
| Changes are announced | 4.1.3 | Status messages reach screen-reader users. |
| Progress is shown in words as well as bars | 1.1.1 | "3 of 9 done (33%)". The words go beyond the minimum, and help everyone. |
| Everything works with the keyboard | 2.1.1 | Space, Enter, Tab. |

## Performance considerations

Updating only what changed is not just better for focus: it is faster. Redrawing 58 lessons on every tick is quick on a laptop, and noticeably slower on an old phone; replacing one progress bar is instant everywhere. Event delegation also means one listener instead of dozens.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Redrawing everything on every change | Focus jumps to the top | Update only what changed |
| One listener per checkbox | Lost when elements are redrawn | Delegate to a parent |
| Removing the focused element and doing nothing | Focus falls to the page | Move focus deliberately |
| Every button called "Remove" | Screen-reader users cannot tell them apart | `aria-label` with the item's name |
| State kept in the DOM (reading ticks back from the page) | The page and the data disagree | One state object; the page shows it |

## Troubleshooting

**`does not provide an export named`** (Chrome and Edge; Firefox says `doesn't provide an export named`, Safari says `Importing binding name '…' is not found`). A function in `dashboard.js` is missing, or not exported: perhaps you deleted a placeholder before writing its TODO. The browser names only one missing export at a time, and while the error is there, nothing on the page runs.

**Ticking a box does nothing.** Check your listener is on `#map`, and that it checks `event.target.type`, not `event.type`.

**Focus goes to the top after removing a goal.** You removed the element, but did not call `focus()` on something else afterwards.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: a "Show only lessons not done yet" filter that keeps focus sensible.
2. **[Creative](challenges/challenge-2.md)**: a personal touch: notes on each lesson.
3. **[Explorer](challenges/challenge-3.md)**: reorder goals with Move up and Move down buttons.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your dashboard with some progress, and one of the 3D control panel.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: where did focus go the first time you removed a goal, before you managed it?

## Further reading

- [MDN: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN: Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- [W3C: Developing a keyboard interface (ARIA Authoring Practices)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

## Women to Know

**Ire Aderinokun** is a Nigerian front-end developer, born in Lagos and largely self-taught, and a Google Developer Expert in Web Technologies. On her blog, bitsofco.de, she explains HTML, CSS, and JavaScript fundamentals clearly, including a well-known article, "What, exactly, is the DOM?". She also organised Frontstack, a front-end engineering conference in Nigeria.

The DOM confuses many beginners because it looks like your HTML but is not the same thing. Explaining that difference well, and for free, is exactly the kind of teaching that helps self-taught developers everywhere.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The DOM is defined by the WHATWG's **DOM Standard**: the tree, events, bubbling, `querySelector`, and `closest`. Every browser implements the same standard, which is why the same dashboard works in all of them. The ARIA roles and properties you used, such as `role="status"` and `aria-label`, come from the W3C's **WAI-ARIA** specification.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
