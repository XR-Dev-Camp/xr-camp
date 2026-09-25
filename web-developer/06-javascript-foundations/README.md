# JavaScript Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `javascript-foundations-06` · **Time:** about 16 hours · 22 sessions of 45 minutes · about 6 weeks at 4 sessions a week

---

> Build an interactive dashboard or information explorer.

---

## Learning objectives

By the end of this project you will be able to:

1. Connect a JavaScript file to a page, and use the browser console to test and debug.
2. Store information in variables, and choose the right type: text, number, true or false, array, or object.
3. Write functions that take inputs and return results.
4. Make decisions with `if` and comparisons, and repeat work with loops.
5. Find elements on the page, create new ones, and change their text.
6. Respond to events: typing, choosing, clicking, and submitting.
7. Save small amounts of information in the browser with `localStorage`.
8. Read an error message and find the line that caused it.

## Prerequisites

- **Courses 1.1–1.5.** You have an accessible, styled, responsive site.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its console | Running and debugging JavaScript | Free |
| A text editor (VS Code recommended) | Writing JavaScript | Free |
| A local server, such as VS Code's Live Server extension (optional) | Some browsers limit `localStorage` for files opened directly | Free |

## What you will build

A **programme explorer** for your community site: visitors search the programmes as they type, filter by who they are for and whether they are free, and save the ones they like to a list that is still there the next time they visit. The result count is announced to screen readers, and everything works with the keyboard.

The reference solution is in [`completed/`](completed/). The starter has the finished HTML page, and a JavaScript file with twelve TODOs that you complete one idea at a time.

## Folder guide

```text
06-javascript-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── explorer.js      # Begin here: a script with 12 TODOs
│   ├── index.html       # The explorer page (finished)
│   ├── styles.css       # The site's stylesheet, with explorer styles added
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your site folder as `explorer`, or copy its three files into your site.
2. Add a link to the explorer in your site's navigation.
3. Open `index.html` in your browser, then open the **console**: press **F12** (on a Mac, **⌘ + Option + J** in Chrome, **⌘ + Option + K** in Firefox), and choose **Console**. Keep it open for the whole lesson.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1 (TODO 1) | Your first message in the console |
| 2 | Step 2: values and variables | You can store and change information |
| 3 | Step 3: arrays and objects (TODO 2) | Your programmes as data |
| 4 | Step 3, continued: reading data in the console | You can find any value |
| 5 | Step 4: finding elements (TODO 3) | The page's controls in variables |
| 6 | Step 5: functions | You can write and call a function |
| 7 | Step 6: creating elements (TODO 4) | A function that builds a card |
| 8 | Step 6, continued | One card on the page |
| 9 | Step 7: loops (TODO 5) | Every programme on the page |
| 10 | Step 8: template literals (TODO 6) | A result count |
| 11 | Step 9: decisions (TODO 7) | A function that decides what matches |
| 12 | Step 9, continued: `filter` | Results that follow the filters |
| 13 | Step 10: events (TODO 8) | Results that update as you type |
| 14 | Step 10, continued: the submit button and focus | A keyboard-friendly form |
| 15 | Step 11: the empty state (TODO 9) | A helpful message when nothing matches |
| 16 | Step 12: buttons with state (TODO 10) | Save buttons that remember |
| 17 | Step 13: localStorage (TODO 11) | Saves that survive a reload |
| 18 | Step 13, continued: `try...catch` | A page that works even when storage does not |
| 19 | Step 14: the saved list (TODO 12) | A finished explorer |
| 20 | Step 15: debugging, and the **3D moment** | Your first 3D event |
| 21 | [`tests/checklist.md`](tests/checklist.md) | A tested explorer |
| 22 | One challenge extension, then **Submitting your work** | Your explorer in your portfolio |

### Step 1: connect the script (TODO 1)

The page loads the script with:

```html
<script src="explorer.js" defer></script>
```

`defer` means "run this after the page's HTML has been read", so every element the script looks for already exists.

In `explorer.js`, write:

```js
console.log('The explorer is connected.');
```

Save, reload, and look in the console. `console.log` is the most useful debugging tool you have: use it to check what any value is, at any moment.

### Step 2: values and variables

A **variable** is a name for a value:

```js
const centreName = 'Riverside';   // text: a string, in quotes
const programmesCount = 8;        // a number
let isOpenToday = true;           // true or false: a boolean
isOpenToday = false;              // let can change; const cannot
```

Use `const` unless the value needs to change; then use `let`. Type these in the console and press Enter to see each one.

### Step 3: arrays and objects (TODO 2)

An **array** is a list, in square brackets. An **object** groups named values, in curly braces. The explorer's data is an array of objects:

```js
const programmes = [
  { id: 'homework', name: 'Homework club', audience: 'children', free: true },
  { id: 'english', name: 'English conversation practice', audience: 'adults', free: true },
];

programmes.length;       // 2: how many
programmes[0];           // the first one (counting starts at 0)
programmes[0].name;      // 'Homework club'
```

Add your own programmes, in exactly the same shape. The shape matters: every object must have the same property names.

### Step 4: finding elements (TODO 3)

```js
const results = document.querySelector('#results');
```

`document` is the page. `querySelector` takes a **CSS selector**, the same kind you wrote in Course 1.3, and returns the first matching element. Find each control you need, and keep it in a `const`.

### Step 5: functions

A **function** is a named piece of work you can run again and again. It can take inputs (parameters) and give back a result (`return`):

```js
function describe(programme) {
  return `${programme.name} is on ${programme.day}.`;
}

describe(programmes[0]);   // 'Homework club is on Weekdays.'
```

### Step 6: creating elements (TODO 4)

```js
function createCard(programme) {
  const card = document.createElement('li');
  card.className = 'card';

  const heading = document.createElement('h3');
  heading.textContent = programme.name;

  card.append(heading);
  return card;
}
```

Use `textContent` for text, never `innerHTML`. `textContent` always treats text as text; `innerHTML` treats it as HTML, and in Phase 5 you will see how that lets attackers inject code.

Test it: `results.append(createCard(programmes[0]))` in the console.

### Step 7: loops (TODO 5)

A `for...of` loop runs the same code for every item in an array:

```js
for (const programme of programmes) {
  results.append(createCard(programme));
}
```

Put it inside a function called `showResults()`, and start it with `results.replaceChildren()`, which empties the list, so the cards are never drawn twice.

### Step 8: template literals (TODO 6)

Backticks let you put values inside text with `${ }`:

```js
count.textContent = `Showing ${found.length} of ${programmes.length} programmes.`;
```

`#count` has `role="status"`, so screen readers announce the new text whenever it changes.

### Step 9: decisions (TODO 7)

`if` runs code only when something is true. Comparisons give true or false: `===` (equals), `!==` (does not equal), `>`, `<`. Combine them with `&&` (and), `||` (or), and `!` (not).

```js
function matches(programme) {
  if (freeCheckbox.checked && !programme.free) return false;
  if (audienceSelect.value !== 'all' && programme.audience !== audienceSelect.value) return false;
  return true;
}

const found = programmes.filter(matches);
```

`filter` runs your function on every item, and keeps the ones where it returned `true`.

For the search box, make both the search words and the programme's text lower case (`toLowerCase()`), and check with `includes()`, so "English" and "english" both match.

### Step 10: events (TODO 8)

An **event** is something that happens: a key pressed, a box ticked, a button clicked. `addEventListener` runs your function when it happens:

```js
filters.addEventListener('input', showResults);
```

One listener on the whole form catches changes in every control inside it. Then handle the **Show results** button: the `submit` event would normally reload the page, so call `event.preventDefault()`, show the results, and move focus to the count so keyboard users hear the result.

### Step 11: the empty state (TODO 9)

When nothing matches, an empty page is confusing. Say so, and suggest what to try: "No programmes match. Try fewer words, or a different audience."

### Step 12: buttons with state (TODO 10)

Each card gets a **Save** button. It is a toggle, so it uses `aria-pressed`, as in Course 0.1:

```js
button.setAttribute('aria-pressed', 'false');
button.dataset.id = programme.id;     // becomes data-id="homework"
```

When it is clicked, add the programme's `id` to a `savedIds` array, or remove it if it is already there, and update `aria-pressed`. The stylesheet shows a tick on pressed buttons: more than colour.

### Step 13: saving in the browser (TODO 11)

`localStorage` keeps text in this browser, even after the page closes. Arrays are not text, so turn them into text with `JSON.stringify`, and back with `JSON.parse`:

```js
try {
  localStorage.setItem('riverside-saved-programmes', JSON.stringify(savedIds));
} catch (error) {
  console.warn('Could not save programmes:', error);
}
```

Storage can be switched off, full, or blocked in private windows. `try...catch` means that if it fails, the explorer still works, just without remembering. Always plan for the thing that can fail.

`localStorage` is only in this browser, on this device, and it is not private from other people who use the same browser. Never store passwords or personal information in it. The page says "Saved in this browser only": honest, and true.

### Step 14: the saved list (TODO 12)

Write `showSaved()`, which lists the saved programmes, or says "Nothing saved yet" when there are none. Call it when the page loads, and after every save.

### Step 15: reading errors

Every developer's code breaks. When it does, the console shows a red message with the **file name and line number**. Read it slowly:

| Error | Usually means |
| --- | --- |
| `Uncaught SyntaxError: Unexpected token` | A missing bracket, comma, or quote, near that line |
| `Uncaught TypeError: Cannot read properties of null` | `querySelector` found nothing: check the selector and the `id` |
| `Uncaught ReferenceError: x is not defined` | A spelling mistake, or a variable used before it was created |

Click the file name in the console to jump to the line. Then use `console.log` just before it to see what the values really are.

## Key code explained

**`programmes.filter(matches)`.** Passes the function itself, without `()`, so `filter` can call it once for each programme.

**`results.replaceChildren()`.** Removes everything inside an element in one step.

**`button.dataset.id`.** Reads and writes `data-id`. Custom data attributes let you store the information your script needs directly on the element.

**`role="status"` with `tabindex="-1"`.** The count is announced when it changes, and the script can move focus to it after the form is submitted.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html). A paper lantern hangs in a night sky. Click it, or press the button, and it changes colour, and a screen reader announces the new colour.

Read the script: it is the same event listener you wrote today, on a 3D object. `cursor="rayOrigin: mouse"` lets mouse clicks reach the 3D scene; one function, `changeColour`, is called by both the click and the button, so the keyboard and the mouse can do exactly the same thing. That rule, **every 3D interaction has a keyboard route**, is one you will follow for the rest of XR Camp.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every control has a label | 1.3.1, 3.3.2 | Search, filter, and checkbox all say what they are. |
| Results and "nothing found" are announced | 4.1.3 | Screen-reader users know the filter worked. |
| Save buttons are real buttons with `aria-pressed` | 4.1.2 | Their state is announced: "pressed" or "not pressed". |
| Saved state is shown by more than colour | 1.4.1 | A tick, not only a colour change. |
| Everything works with the keyboard | 2.1.1 | Including the Show results button and every Save button. |
| No change of context while typing | 3.2.2 | Results update in place; focus does not jump. |

## Performance considerations

The explorer draws at most a few dozen cards, so redrawing them all on every keystroke is instant. With thousands of items you would wait until the person stops typing before redrawing, a technique called debouncing, which you will meet in Phase 2. The script is a few kilobytes, with no library to download.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Script in `<head>` without `defer` | `querySelector` returns `null` | `defer`, or the script at the end of `<body>` |
| `=` instead of `===` in an `if` | It changes the value instead of comparing | `===` to compare |
| `innerHTML` for text | A security risk with real data | `textContent` |
| Forgetting `replaceChildren()` | Cards appear twice | Empty the list first |
| `localStorage` without `try...catch` | The page breaks in private windows | Always wrap it |
| Moving focus on every keystroke | Screen readers lose their place | Announce with a live region; move focus only on submit |

## Troubleshooting

**Nothing happens, and the console is empty.** Check the `<script>` tag's `src` matches the file name exactly, and that you saved the file.

**`Cannot read properties of null`.** A selector found nothing. Compare the `#id` in your script with the `id` in the HTML, letter by letter.

**Saves disappear after a reload.** Open the console: a warning means storage is blocked. Some browsers limit it for files opened directly; try a local server.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: a "Clear filters" button.
2. **[Creative](challenges/challenge-2.md)**: labels and messages in your own language.
3. **[Explorer](challenges/challenge-3.md)**: sort the results by day or by name.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your explorer with a filter on, and one of the console with no errors.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: what was the first error you got, and how did you fix it?

## Further reading

- [MDN: JavaScript first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)
- [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Women to Know

**Loiane Groner** is a Brazilian software engineer and educator, from Espírito Santo and now based in Florida. She wrote the book *Learning JavaScript Data Structures and Algorithms*, and creates popular free programming courses in Portuguese. She is a Google Developer Expert in Web Technologies, a Microsoft MVP, and a Java Champion.

Free courses in your own language, from someone who started where you are: that is how many developers in Latin America learned. The arrays, objects, and loops in this lesson are exactly the foundations her book builds on.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

JavaScript's official name is **ECMAScript**, maintained by Ecma International's committee TC39, with a new edition every year. `querySelector`, `createElement`, and events are not part of ECMAScript: they come from the **DOM Standard** (WHATWG), and `localStorage` from the HTML Living Standard. JavaScript is the language; the browser's standards give it the page.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
