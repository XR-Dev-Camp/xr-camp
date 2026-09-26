# Application Architecture and Maintainable Code

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `application-architecture-and-maintainable-code-03` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Refactor an intentionally poorly structured application.

---

## Learning objectives

By the end of this project you will be able to:

1. Recognise common **code smells**: unclear names, magic numbers, global variables, repeated code, and functions that do too many jobs.
2. **Refactor**: change how code is organised without changing what it does, one small step at a time.
3. Split an application into layers with clear jobs: **config**, **utilities**, **state** (a store), **components**, and one file that **wires** them together.
4. Write **pure functions**, and test them with a simple check page.
5. Keep state in one place, change it only through named actions, and update the page when it changes (**subscribe**).
6. Explain why `innerHTML` with user text is dangerous, and build elements safely instead.
7. Use **progressive enhancement**: the page is useful HTML first, and JavaScript adds the working parts.

## Prerequisites

- **Course 2.1: Modern JavaScript** (modules, `import` and `export`).
- **Course 2.2: The DOM and Dynamic Interfaces** (building elements, event delegation, focus management, live regions).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | Testing the old and new planner side by side | Free |
| VS Code and a local server | Modules need `http://` | Free |
| Git (from Course 1.8) | One commit per refactoring step, so you can always go back | Free |

## What you will build

The third part of **My XR Camp**: a **session planner**. Plan study sessions for the week, mark them done, and see how close you are to your weekly goal of four sessions.

The twist: the planner already works. It is in [`starter/old/`](starter/old/), and it is written badly on purpose, the way a lot of real code is: one-letter names, numbers with no names, everything global, HTML glued together in strings, and a hidden security problem. Your job is to **refactor** it into a clean, tested structure, so that it does exactly the same things, and is easy to read, change, and extend.

The reference solution is in [`completed/`](completed/). The starter has the old app (do not edit it), a `behaviour.md` to fill in (TODOs 1-2), and the new files with TODOs 3-13.

## Folder guide

```text
03-application-architecture-and-maintainable-code/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── old/index.html, old/app.js   # The tangled planner: compare against it
│   ├── behaviour.md     # What the old app does, and its smells: TODOs 1–2
│   ├── index.html       # The new page: TODO 11
│   ├── styles.css       # Finished
│   ├── check.html       # Tests for utils.js (finished)
│   ├── js/config.js     # TODO 3
│   ├── js/utils.js      # TODOs 4–5
│   ├── js/store.js      # TODOs 6–8
│   ├── js/components/   # TODOs 9–10
│   ├── js/main.js       # TODOs 12–13
│   └── 3d-moment.html   # A tangled 3D scene to refactor
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Make a new folder, `planner`, next to your `my-xr-camp` folder, and copy the starter's files into it.
2. Make it a Git repository and commit the untouched starter: `git init`, then `git add .` and `git commit -m "Starter"`. From now on, commit after every step. If a step goes wrong, you can go back.
3. Start your local server. Open `old/index.html` in one tab and `index.html` in another, each with its **Console** open.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; use the old planner, and list what it does (TODO 1) | A behaviour list |
| 2 | Step 1: code smells (TODO 2) | Eight smells, with line numbers |
| 3 | Step 2: plan the architecture | A drawing of the five layers |
| 4 | Step 3: config (TODO 3) | Every setting in one file |
| 5 | Step 4: pure functions (TODO 4) | `plural` and `describeMinutes` written; the console now names the next missing export |
| 6 | Step 4, continued (TODO 5) | Every check passes |
| 7 | Step 5: the store (TODO 6) | Saved sessions load, including old ones |
| 8 | Step 5, continued (TODOs 7–8) | Actions and subscribe |
| 9 | Step 6: components (TODOs 9–10) | Safe elements, no `innerHTML` |
| 10 | Step 7: progressive enhancement (TODO 11) | The form written in HTML |
| 11 | Step 8: wiring it together (TODO 12) | Adding sessions works |
| 12 | Step 8, continued (TODO 13) | Done and Delete work, with focus in the right place |
| 13 | Step 9: compare with the behaviour list | A refactor you can trust |
| 14 | The **3D moment** | A tidy 3D exhibit |
| 15 | [`tests/checklist.md`](tests/checklist.md) | A finished planner |
| 16 | One challenge extension, then **Submitting your work** | The third part of My XR Camp |

### Step 1: know what it does, then find the smells (TODOs 1–2)

**Refactoring** means changing the structure of code without changing its behaviour. So before you change anything, you need to know exactly what the behaviour is. Use the old planner for ten minutes, and write every behaviour you find in `behaviour.md`: what happens when you add a session, mark it done, delete it, reload, add an empty topic, reach four sessions.

Then read `old/app.js` and look for **code smells**: signs that code will be hard to change. You do not need to fix anything yet. Look for:

| Smell | In the old planner |
| --- | --- |
| Names that say nothing | `a`, `x`, `fn2`, `h`, `n`, `dn` |
| **Magic numbers**: values with no name | `45`, `4`, and the key `'xrc_s'` |
| Global variables anyone can change | `a` and `x`, used by every function |
| One function doing many jobs | `fn2` sorts, builds HTML, counts, calculates, and saves |
| Repeated code | The two loops in `fn2`; the list of days |
| Dead code | `x` is set, and never read |
| Comments that repeat the code | `// this function renders` |
| HTML built from strings | Every piece of the page is glued together in `innerHTML` |
| Positions used as identity | `tog(i)` and `del(i)` use array positions, which change when the list is sorted |

And one smell that is also a **bug**: try adding a session with the topic `<b>Hello</b>`. The old app does not show the text you typed: it turns it into bold HTML. That is how cross-site scripting attacks work, and Course 5.5 returns to it.

### Step 2: plan the architecture

**Architecture** is how you divide a program into parts, and how those parts talk to each other. A good rule: every file has **one job**, and you can say it in one sentence.

```text
config.js          Settings: the days, 45 minutes, a goal of 4, the storage key
utils.js           Pure functions: plural, describeMinutes, bySchedule, sessionLabel
store.js           The state, and the only code that changes it or saves it
components/        Build elements from data; never change the state
main.js            Connects the page's elements and events to the store
```

Arrows go one way. `main.js` uses the store and the components; the components use utilities; everything can read config. Nothing points back at `main.js`. When you want to know "where does this happen?", the structure tells you.

Draw this on paper, with arrows, and keep it beside you while you work.

### Step 3: config (TODO 3)

Give every magic number a name, in one file:

```js
export const SESSION_MINUTES = 45;
export const WEEKLY_GOAL = 4;
```

Now "change the weekly goal to five" is a one-line change, and the name explains what 4 meant. Keep the storage key the same as the old app's: people using the old planner have sessions saved under it.

### Step 4: pure functions and a check page (TODOs 4–5)

A **pure function** gives the same output for the same input, and changes nothing else: no DOM, no storage, no global variables. Pure functions are the easiest code to test, because a test is just "give it this, expect that".

`check.html` is a tiny test page. It calls your functions and compares the answers:

```js
check('1 hour 30 minutes', describeMinutes(90), '1 hour 30 minutes');
```

Open it before you write TODO 4: the console says `utils.js` has no such export. Write `plural` and `describeMinutes`, reload, and watch the error change: now it names `bySchedule`. When TODO 5 is done too, every line appears, and should say PASS. This is how professional teams work: small functions, checked automatically, so a later change that breaks one is caught at once.

Notice `describeMinutes(0)` gives "0 minutes", where the old app said "0 hours 0 minutes". That is a **deliberate change**, not an accident: write it in the "Deliberate changes" section of `behaviour.md`.

### Step 5: the store (TODOs 6–8)

The **store** holds the state, and it is the only code allowed to change it. Everyone else asks:

- `getSessions()` gives a sorted **copy**. The old app sorted the real array inside its drawing function, so the button positions are only correct by coincidence: any change that reorders the array without redrawing would make `tog(i)` change the wrong session.
- Three **actions**, `addSession`, `toggleSession`, and `removeSession`, are the only ways to change it. Each one ends with `commit()`: save, then tell everyone.
- `subscribe(listener)` lets other code say "tell me when anything changes".

Every session gets an **id** from `crypto.randomUUID()`. Actions use ids, never positions, so sorting or deleting can never make you change the wrong session.

**Data lives longer than code.** The old app saved `{ d, t, w, done }`. Your `upgrade` function reads both the old shape and the new one, so a learner's saved plan survives the refactor:

```js
day: saved.day ?? saved.d,
```

### Step 6: components (TODOs 9–10)

A **component** here is a function that takes data and returns elements. It never changes the state, and it never adds listeners: it only builds.

```js
const text = document.createElement('span');
text.textContent = sessionLabel(session);   // text stays text
```

`textContent` treats everything as text, so `<b>Hello</b>` appears exactly as typed. That fixes the security bug from Step 1. Write it in "Deliberate changes".

Each button has `data-action="toggle"` or `data-action="delete"`, and the list item has `data-id`. That is all `main.js` needs to know which button was pressed, for which session.

### Step 7: progressive enhancement (TODO 11)

The old app built its whole form from a JavaScript string. If the script failed, the page was empty. **Progressive enhancement** means starting with plain, meaningful HTML, and letting JavaScript add to it:

- The heading, the explanation, and the two list headings are in `index.html`.
- The form is written in HTML too, with real `<label>`s, but has the `hidden` attribute. `main.js` removes it when everything has loaded, so the form never appears without working.
- A `<noscript>` message explains what is missing if JavaScript is off.

Written in HTML, the form is also easier to read and to check for accessibility than the same form inside a string.

### Step 8: wiring it together (TODOs 12–13)

`main.js` is the only file that knows about this page's elements. It does three things:

1. **Draw**: `render(sessions)` fills both lists and the summary. `subscribe(render)` means it runs after every action, automatically.
2. **Listen**: one `submit` listener for the form, and one delegated `click` listener for every button in both lists (as in Course 2.2).
3. **Look after the user**: move focus, show errors, and announce changes.

`alert('Error!')` is gone. An empty topic now shows a message next to the field, marks the field `aria-invalid="true"`, and puts focus back in it (Course 1.2).

In Course 2.2 you updated only what changed. Here, the whole list redraws after every action, which is simpler, but it destroys the button that had focus. So `main.js` puts focus back deliberately: after **Done**, on the same session's button in its new list, found by its id; after **Delete**, on the next Delete button, the previous one, or the topic box. Both approaches are valid; for a short list, the simpler one is fine, as long as you manage focus.

### Step 9: compare with the behaviour list

Go back to `behaviour.md` and test every line in both planners, side by side. Every behaviour must match, except the deliberate changes you listed. Beyond the "0 minutes" wording and the security fix, `completed/` also makes small, deliberate changes you may notice: it refuses a topic of only spaces, its goal-reached message is worded differently, empty lists say "Nothing here yet.", and buttons and status announcements gained accessibility labels. These are improvements, not bugs, so add them to your own "Deliberate changes" list rather than treating them as mismatches. This is the moment a refactor becomes trustworthy.

Then read your new code as a stranger would. Could someone find where the weekly goal is set in ten seconds? Where sessions are saved? What happens when Delete is pressed?

## Key code explained

**`subscribe` returns a function.** `const stop = subscribe(render)` starts listening; calling `stop()` later stops it. This "observer" pattern is how most frontend frameworks tell the page that state changed.

**`[...sessions].sort(bySchedule)`.** `sort` changes the array it is called on. Copying first (`[...sessions]`) keeps the stored order untouched.

**`a || b` inside `bySchedule`.** If the days are different, their difference is not zero, so it is used. If it is zero (same day), `||` moves on to compare times.

**`try { … } catch { … }`** with no `(error)`: modern JavaScript lets you leave it out when you do not need it.

**`data-action` and `closest('button[data-action]')`.** The HTML says what each button does; one listener reads it. Adding a new kind of button does not need a new listener.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html): three objects on pedestals, turning slowly. It works, but its script is tangled: the same six lines copied three times, positions typed by hand, one-letter names, and a `setInterval` that asks to run every 16 milliseconds, and keeps running even when the tab is hidden (the browser only slows it down).

Now open [`completed/3d-moment.html`](completed/3d-moment.html). The same scene, refactored:

- **Config**: `EXHIBITS` is an array of data (name, shape, colour). Adding a fourth object is one line, and its position, its pedestal, and its description all follow.
- **Components**: `pedestal` builds a base and an object; `turntable` makes something turn. Each is an A-Frame component with one job. You will write many more in Phase 3.
- **Motion in one place**: the `motion` object starts paused if the learner asked their device to reduce motion, and the **Pause animation** button changes it. `turntable` checks it every frame.
- **The description is built from the same data** as the scene, so they can never disagree.

A-Frame calls `tick` once per frame, and only while the scene is running, so there is no timer left running in a hidden tab. Try adding a fourth exhibit to each version, and compare how many lines you had to change.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The form has visible labels, written in HTML | 1.3.1, 3.3.2 | Every field has a name. |
| Errors appear in text next to the field, not in `alert()` | 3.3.1 | The message stays visible while the learner fixes it. |
| Focus goes somewhere sensible after Done and Delete | 2.4.3 | Redrawing a list must not lose the learner's place. |
| Every button's name includes its session | 2.4.6, 4.1.2 | "Delete: CSS grid", not ten buttons called "Delete". |
| The visible word starts each button's name | 2.5.3 | Speech users can say "click Delete". |
| Changes are announced | 4.1.3 | Status messages reach screen-reader users. |
| The 3D scene can be paused, and respects reduced motion | 2.2.2 | Movement is never forced on anyone. (Respecting reduced motion is good practice beyond WCAG.) |

## Performance considerations

The old 3D script ran a timer about 60 times a second, and kept it running forever, even in a hidden tab (where the browser slows it down but never stops it), and changed three attributes as text each time. The refactored `turntable` changes a number directly (`object3D.rotation.y`) inside A-Frame's own frame loop, which the browser slows down or stops when the tab is hidden. Clean structure and good performance often arrive together: when each job has one place, it is easier to see what is wasteful.

Redrawing a whole list is fine for a few dozen items. If a list could grow to thousands, you would go back to updating only what changed (Course 2.2).

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Refactoring and adding features at the same time | When something breaks, you cannot tell which change did it | Refactor first, commit, then change behaviour |
| Big steps with no commits | One mistake and you must start again | Commit after every TODO |
| Changing the storage key or data shape | Learners lose their saved sessions | Keep the key; upgrade old data when you load it |
| Components that change the state | Two places change the same data, and they disagree | Components only build; actions change |
| Using array positions as identity | The wrong session is deleted after sorting | Use ids |
| `innerHTML` with anything a user typed | Their text becomes HTML, or script | `textContent` and `createElement` |

## Troubleshooting

**`does not provide an export named`.** A TODO in that file is not finished yet, or you forgot `export`.

**`Cannot read properties of null (reading 'addEventListener')`** (Firefox: `form is null`). `main.js` looked for an element that is not in `index.html` yet. Finish TODO 11, and check the ids match exactly.

**My old sessions disappeared.** Check `STORAGE_KEY` is `'xrc_s'`, and that `upgrade` reads `saved.d`, `saved.t`, and `saved.w`.

**`crypto.randomUUID is not a function`.** It only works on secure pages: `https://`, or `http://localhost` and `http://127.0.0.1`. If you opened the planner through a network address (like `http://192.168.1.5`), use `localhost` instead.

**The form never appears.** `main.js` stopped before its last line. Look for the first error in the Console.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a feature to the clean version (edit a session's topic) and count how many files you touch.
2. **[Creative](challenges/challenge-2.md)**: make the planner yours: your own settings, and the days and times in your language.
3. **[Explorer](challenges/challenge-3.md)**: add undo to the store, using its actions.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your planner, and one of `check.html` with every check passing.
3. Keep them, and your filled-in `behaviour.md`, in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: which smell in the old app surprised you most, and how would you explain it to a friend?

## Further reading

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: Progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- [Wikipedia: Pure function](https://en.wikipedia.org/wiki/Pure_function)
- [MDN: innerHTML, security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations)
- [A-Frame: Writing a component](https://aframe.io/docs/1.8.0/introduction/writing-a-component.html)

## Women to Know

**Estefany Aguilar** is a senior frontend developer and teacher based in Medellín, Colombia. She has taught about 20 courses on Platzi, in Spanish, including CSS architecture, design systems, and a professional technical test, and she is a former organiser of CSS Conf Colombia, and has run workshops for the MedellínCSS community.

Architecture and design systems are how teams keep code tidy as it grows: the same idea as this lesson's config, store, and components. Learning it in your own language, from someone in your own region, makes it far easier to picture yourself doing it.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The modules you split the planner into use the **ECMAScript** standard, published by Ecma International's TC39 committee: `import`, `export`, and `const` are all defined there. `crypto.randomUUID()` comes from the W3C's **Web Cryptography API**, and `textContent` and `replaceChildren` from the WHATWG's **DOM Standard**. Because they are standards, the same clean structure works in every modern browser, with no framework to install.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
