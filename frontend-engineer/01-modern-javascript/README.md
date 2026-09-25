# Modern JavaScript

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `modern-javascript-01` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Build a modular data-driven web application.

---

## Learning objectives

By the end of this project you will be able to:

1. Split an application into ES modules that import and export what they need.
2. Explain scope: where a variable can be seen, and why `const` and `let` are safer than `var`.
3. Write arrow functions, default parameters, and callbacks.
4. Destructure objects and arrays to read the values you need.
5. Load data with `fetch`, `async`, and `await`, and explain what a Promise is.
6. Handle errors so that a failure shows a helpful message instead of a blank page.
7. Transform data with `map`, `filter`, and `reduce`, and write pure functions.
8. Read and write code that other people can understand.

## Prerequisites

- **Phase 1**, especially **Course 1.6: JavaScript Foundations** and **Course 1.7: Developer Tools.**

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | Running and debugging | Free |
| VS Code (recommended) | Writing modules | Free |
| A local server: VS Code's **Live Server** extension, or `python3 -m http.server` | **Required**: modules and `fetch` do not work from `file://` | Free |

## What you will build

The first part of **My XR Camp**, a learning dashboard you will keep building through Phase 2: a **course map** that shows every phase and lesson of XR Camp, with its time and whether it is ready, loaded from XR Camp's own course data. It has a "ready only" filter, a summary, and a friendly message with a **Try again** button when the data cannot load.

The code is split into four **modules**, each with one job:

| Module | Job |
| --- | --- |
| `js/format.js` | Turn numbers into words ("12 hours · 16 sessions") |
| `js/data.js` | Load the data, and calculate from it |
| `js/render.js` | Turn data into page elements |
| `js/main.js` | Start everything, and connect the pieces |

The reference solution is in [`completed/`](completed/). The starter has the finished HTML, CSS, and data, and the four modules with fourteen TODOs.

## Folder guide

```text
01-modern-javascript/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # The course map page (finished)
│   ├── styles.css
│   ├── data/catalog.json   # A snapshot of XR Camp's course data
│   ├── js/format.js, data.js, render.js, main.js   # Begin here: 14 TODOs
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder as `my-xr-camp`. You will keep adding to it in Courses 2.2, 2.5, 2.6, and 2.9.
2. Start a local server in that folder: in VS Code, open the folder and choose **Go Live**; or, in a terminal in that folder, run `python3 -m http.server 8000` and open `http://localhost:8000`.
3. Open the page and its **Console**. From now on, always open your projects through the server.

**Why a server?** For security, browsers do not let a page opened from `file://` import modules or fetch files. A local server makes your computer behave like a real website, which is also how your pages will run once published.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup and the local server; TODO 1 | A module that runs |
| 2 | Step 1: modules, `import`, and `export` | You can explain what a module is |
| 3 | Step 2: scope, `const`, and `let` | You can predict where a variable is visible |
| 4 | Step 3: arrow functions and default parameters (TODOs 2–3) | Two formatting functions |
| 5 | Step 4: destructuring (TODO 4) | `describeTime` |
| 6 | Step 5: Promises, `async`, and `await` | You can explain a Promise |
| 7 | Step 5, continued (TODO 5) | Data loaded with `fetch` |
| 8 | Step 6: `reduce` (TODOs 6 and 8) | Lessons grouped and counted |
| 9 | Step 6, continued: pure functions | Functions you can test in the console |
| 10 | Step 7: importing (TODO 7) | Modules connected |
| 11 | Step 8: rendering with `map` (TODOs 9–10) | One lesson on the page |
| 12 | Step 8, continued (TODO 11) | Every phase on the page |
| 13 | Step 9: starting the app (TODO 12) | A working course map |
| 14 | Step 10: errors (TODO 13) | A helpful error, and Try again |
| 15 | Step 10, continued: testing failures on purpose | A map that fails gracefully |
| 16 | Step 11: `filter` (TODO 14) | The "ready only" filter |
| 17 | Step 12: readable code, and a note on classes | Code a stranger could follow |
| 18 | The **3D moment**, then [`tests/checklist.md`](tests/checklist.md) | The course as a 3D landscape |
| 19 | One challenge extension, then **Submitting your work** | The first part of My XR Camp |

### Step 1: modules

In Course 1.6, all your code was in one file. That is fine for 150 lines; it is painful for 1,500. **Modules** split code into files, each with one job. A module chooses what to share with `export`, and other modules take it with `import`:

```js
// format.js
export const hours = (minutes) => Math.round(minutes / 60);

// main.js
import { hours } from './format.js';
```

The page loads only the starting module, with `<script type="module" src="js/main.js">`. The browser follows the `import`s and loads the rest. Modules are **deferred** automatically, and each has its own scope: nothing leaks out unless you export it.

### Step 2: scope

A variable is visible only inside the block (`{ ... }`) where it was created:

```js
const phase = 1;
if (phase > 0) {
  const message = 'Not the first phase';
  console.log(message);   // fine
}
console.log(message);     // ReferenceError: message is not defined
```

Use `const` by default, and `let` when the value must change. You will see `var` in old code: it ignores blocks, which causes surprising bugs. Do not use it.

### Step 3: arrow functions and default parameters (TODOs 2–3)

```js
export const hours = (minutes) => Math.round(minutes / 60);

export const plural = (count, one, many = `${one}s`) => (count === 1 ? one : many);
```

An **arrow function** is a shorter way to write a function. If its body is one expression, that value is returned automatically. A **default parameter** (`many = ...`) is used when the caller leaves it out. `condition ? a : b` chooses between two values.

A function passed to another function to call later is a **callback**. You have used them since Course 1.6: `addEventListener('click', changeColour)`.

### Step 4: destructuring (TODO 4)

Destructuring takes values out of an object or array into variables, in one line:

```js
const { minutes, sessions } = lesson;          // same as lesson.minutes, lesson.sessions
const [first, second] = lessons;               // the first two items

export const describeTime = ({ minutes, sessions }) =>
  `${hours(minutes)} hours · ${sessions} sessions`;
```

Destructuring in the parameter list shows, at a glance, exactly what a function needs.

### Step 5: Promises, async, and await (TODO 5)

Loading a file takes time. JavaScript does not stop and wait: `fetch` immediately returns a **Promise**, an object that says "I will have the answer later". `await` pauses **this function** (not the page) until the answer arrives:

```js
export async function loadCatalog(url = 'data/catalog.json') {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load the course data (${response.status}).`);
  }
  return response.json();
}
```

`await` only works inside an `async` function (or at the top level of a module). Notice the check: `fetch` only fails on network errors. A missing file still "succeeds", with the status 404, so you must check `response.ok` yourself.

### Step 6: reduce, and pure functions (TODOs 6 and 8)

`reduce` walks through an array and builds **one** result from it: a total, or an object:

```js
export function totals(lessons) {
  return lessons.reduce(
    (sum, { minutes, status }) => ({
      minutes: sum.minutes + minutes,
      ready: sum.ready + (status === 'ready' ? 1 : 0),
    }),
    { minutes: 0, ready: 0 },        // the starting value
  );
}
```

`format.js`'s functions and `totals` are **pure**: the same input always gives the same output, and they change nothing else. Pure functions are the easiest to test (`totals([...])` in the console) and to trust.

### Step 7: importing (TODO 7)

Import only what each module needs, with paths that start with `./`, and include `.js`. Test your functions straight away in `main.js` with `console.log`.

### Step 8: rendering with map (TODOs 9–11)

`map` turns each item of an array into something else, and returns a new array:

```js
list.append(...lessons.map(renderLesson));
```

`...` (spread) passes the array's items to `append` one by one. `render.js` never fetches or stores anything: it only turns data into elements. Keeping those jobs apart is what makes each module easy to change.

### Step 9: starting the app (TODO 12)

`main.js` connects everything: load the data, calculate, render. Show "Loading the course map…" first, in the `#summary` live region, so people know something is happening.

### Step 10: errors (TODO 13)

Every network request can fail: no signal, a typo in a file name, a server that is down. Wrap the loading in `try...catch`, and show a message that says what happened and what to do, with a **Try again** button:

```js
try {
  catalog = await loadCatalog();
  draw();
} catch (error) {
  map.replaceChildren(renderError(error.message, start));
}
```

`role="alert"` on the error box makes screen readers announce it immediately. Test it: rename `catalog.json` for a moment, reload, then rename it back and press Try again.

### Step 11: filter (TODO 14)

When "ready only" changes, draw again with `catalog.lessons.filter(...)`, and hide phases with nothing to show. The data was loaded once; drawing again is instant.

### Step 12: readable code, and classes

Read your modules as if you had never seen them:

- **Names** say what things are (`loadCatalog`, not `getData2`).
- **Functions** do one thing, and are short.
- **Comments** explain *why*, not *what*: the code already says what.

You will also meet **classes** in other people's code: `class Lesson { constructor(title) { this.title = title; } }`. They bundle data and the functions that work on it. A-Frame components and three.js objects, in Phase 3, are built this way. For data like ours, plain objects and functions are simpler, and enough.

## Key code explained

**`<script type="module">`.** Enables `import` and `export`, gives the file its own scope, and defers it.

**`groups[lesson.phase] ??= []`.** `??=` assigns only if the left side is `null` or `undefined`: "create the list the first time you need it".

**`response.ok`.** True for statuses 200–299. Always check it after `fetch`.

**`role="alert"` and `role="status"`.** Both are live regions: `alert` interrupts, for errors; `status` waits politely, for updates.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html) once your modules work. It imports **your** `data.js`, and builds a 3D landscape from the same course data: one column per phase, one block per lesson, purple when the lesson is ready. The scene description is generated from the data too, so it always matches the scene.

That is the idea of this lesson in one picture: once your data and your logic live in modules, the same code can feed a list, a chart, or a 3D world.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Loading, results, and errors are announced | 4.1.3 | `role="status"` and `role="alert"`. |
| Status is shown in words, not only colour | 1.4.1 | "Ready" and "Coming soon" badges. |
| Each phase is a section named by its heading | 1.3.1 | Screen-reader users can jump between phases. |
| The checkbox has a label | 1.3.1, 3.3.2 | Clicking the words ticks it. |
| The 3D landscape has a description generated from the data | 1.1.1 | The words always match the scene. |

## Performance considerations

The course data is about 16 KB, and it is loaded once; filtering redraws from memory. Modules load in parallel, and the browser caches them. In Course 2.9 you will see how tools combine many modules into one file for production.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Opening the page from `file://` | "CORS" errors, and nothing loads | Use a local server |
| `import { hours } from './format'` | The browser cannot find the file | Include `.js` |
| Forgetting `export` | `does not provide an export named` | Export what other modules need |
| Using `await` outside an `async` function | `SyntaxError` | Mark the function `async` |
| Not checking `response.ok` | A 404 page is read as data, and `json()` fails | Check, and throw a clear error |
| One huge `main.js` again | Modules in name only | One job per module |

## Troubleshooting

**The console says "CORS" or "blocked".** You opened the page from `file://`. Use your local server's address.

**`Failed to resolve module specifier`.** Module paths must start with `./` or `../` (or be a full URL).

**`Unexpected token '<'` when reading JSON.** The server sent an HTML page, usually a 404 page, instead of your data. Check the path.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: a search box that filters lessons by title.
2. **[Creative](challenges/challenge-2.md)**: your own data: a map of your study plan or your community's activities.
3. **[Explorer](challenges/challenge-3.md)**: load two files at once with `Promise.all`.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your course map, one of its error message, and one of the 3D landscape.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: which module would you change if the data moved to a different address, and why only that one?

## Further reading

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Women to Know

**Joyee Cheung** grew up in Guangzhou, and is a member of the Node.js Technical Steering Committee and a committer to V8, the JavaScript engine inside Chrome and Node.js. She led the work on `require(esm)`, which lets older Node.js code load ES modules: the same `import` and `export` you used in this lesson.

Modules only help if old code and new code can work together. Making that possible in one of the world's most used JavaScript platforms is careful, patient work, and much of it was hers.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

ES modules, `async`/`await`, destructuring, and arrow functions all arrived in **ECMAScript** editions from 2015 onwards, agreed by TC39. Every proposal goes through public stages, from an idea (stage 0) to finished (stage 4), on GitHub, where anyone can read the discussion. `fetch` itself is not ECMAScript: it is the WHATWG's **Fetch Standard**.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
