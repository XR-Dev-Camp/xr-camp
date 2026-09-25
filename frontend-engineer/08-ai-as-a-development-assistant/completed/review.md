# My AI-assisted code review

By Ana. The code is my session planner from Course 2.3.

## Scope

- **Code:** `planner/js/store.js` and `planner/js/main.js`
- **About:** 165 lines
- **Assistant:** a hosted assistant, on its free tier (see `ai-log.md`)
- **I will not paste:** my saved sessions, or anything from my browser's
  storage. The code has no secrets and no personal data in it.

## My explanation, before asking

`store.js` keeps the list of sessions in one variable, and it is the only
file that changes it or saves it. Other files read a sorted copy with
`getSessions()`, change it only through `addSession`, `toggleSession`, and
`removeSession`, and hear about changes with `subscribe()`. Every action
ends with `commit()`, which saves and then calls every listener.

`main.js` finds the page's elements, listens for the form and the buttons,
and moves focus and announces what happened. It holds no data of its own.

When someone presses **Done**: the click reaches the one listener on
`#lists`; it finds the button's `data-action` and the session's `data-id`;
`toggleSession(id)` flips `done` and commits; `commit` saves and calls
`render`, which redraws both lists; then `main.js` focuses the same
session's button in its new list, and announces the move.

**My questions:**

1. In `bySchedule`, why does `||` work for "day first, then time"?
2. What does `subscribe` return, and why would anyone want it?

## Review items

Verdicts: **accepted** (checked and used as it was), **changed** (used
after fixing or adapting it), or **rejected** (wrong, invented, or not
right for this code, and I can show why).

### Item 1: how `||` sorts by day, then time

- **What I asked:** Explain the line with `||` in `bySchedule`, step by
  step, with an example. Do not rewrite the code.
- **What it said:** The subtraction compares the positions of the two days
  in `DAYS`. If the days are different, the result is not zero, so `||`
  returns it and the times are never compared. If the days are the same,
  the result is `0`, which counts as false, so `||` returns the time
  comparison from `localeCompare` instead.
- **What I checked:** I predicted that Monday 19:00 compared with Monday
  09:00 gives a positive number, so 09:00 comes first. In the Console,
  `bySchedule({ day: 'Monday', time: '19:00' }, { day: 'Monday', time: '09:00' })`
  gave `1`. The checks in `check.html` agree.
- **Source:** [MDN: Logical OR (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR),
  [MDN: String.prototype.localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
- **Verdict:** accepted
- **What I learned:** `||` returns one of its values, not just `true` or
  `false`. That is what makes the one-line "this, or else that" work.

### Item 2: what `subscribe` returns

- **What I asked:** What does `subscribe` return, and why would anyone
  want it?
- **What it said:** A function that removes the listener again. Code that
  stops needing updates, like a part of the page that is removed, calls it
  so it is no longer told about changes.
- **What I checked:** I predicted that after `stop()`, adding a session
  would log nothing. In the Console on the planner page:
  `const store = await import('./js/store.js')`, then
  `const stop = store.subscribe((s) => console.log('Now', s.length))`.
  Adding a session logged `Now 3`. After `stop()`, adding another logged
  nothing.
- **Source:** my Console test; [MDN: Set.prototype.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete)
- **Verdict:** accepted
- **What I learned:** the planner never calls it, because the page lasts as
  long as the planner. It is ready for the day part of the page can close.

### Item 3: "`toggleSession` crashes on an unknown id"

- **What I asked:** Review `store.js`: possible bugs, security problems,
  and unclear code, each with how confident you are.
- **What it said:** "High confidence: if `toggleSession` gets an id that
  does not exist, `find` returns `undefined` and `session.done` throws a
  `TypeError`. Add a check and throw a clear error."
- **What I checked:** MDN confirms `find` returns `undefined` when nothing
  matches, so the crash is real in general. But in my planner, every id
  comes from a `data-id` on a list item that `render` drew from the store a
  moment before. I could not make it happen. With two tabs open, each tab
  has its own copy in memory, so the id still exists there.
- **Source:** [MDN: Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find);
  reading `main.js` and `session-item.js`
- **Verdict:** rejected, for this code
- **What I learned:** a finding can be true and still not matter here. My
  two-tab test showed something it did not mention: two open tabs save over
  each other's changes. I noted it for later.

### Item 4: "XSS in `announce`"

- **What I asked:** Is there any risk of cross-site scripting (XSS) in
  `main.js`?
- **What it said:** "Yes: `announce` puts the topic into the page with a
  template literal, so a topic like `<img src=x onerror=alert(1)>` would
  run."
- **What I checked:** `announce` sets `status.textContent`. I added a
  session with that exact topic. No alert, and the text appeared exactly
  as typed, in the list and in the announcement.
- **Source:** [MDN: Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent),
  [MDN: innerHTML, security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations)
- **Verdict:** rejected
- **What I learned:** a template literal only builds a string. The danger
  is where the string goes: `innerHTML` reads it as HTML, `textContent`
  never does.

### Item 5: "use `toSorted`"

- **What I asked:** (the same review of `store.js`)
- **What it said:** "`getSessions` can be shorter:
  `return sessions.toSorted(bySchedule);`"
- **What I checked:** MDN: `toSorted` is real, returns a new sorted array,
  and is Baseline, in all major browsers since July 2023. So it would work
  for me. But older phones and browsers can run the planner's modules and
  still not have `toSorted`, and some XR Camp learners use them.
  `[...sessions].sort(bySchedule)` does the same job everywhere.
- **Source:** [MDN: Array.prototype.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- **Verdict:** rejected, for now
- **What I learned:** ask "does it exist?" and then "since when, and where?".
  Baseline answers the second question.

### Item 6: checks near one hour

- **What I asked:** Write two checks for `describeMinutes`, for 59 and 60
  minutes, in the style of `check.html`.
- **What it said:**
  `check('59 minutes', describeMinutes(59), '59 minutes');` and
  `check('exactly 1 hour', describeMinutes(60), '1 hour 0 minutes');`
- **What I checked:** before running, I read `describeMinutes`: for 60,
  `minutes` is 0 and `hours` is not, so no minutes part. I predicted
  `'1 hour'`. `check.html` said FAIL for the second check: "Expected
  "1 hour 0 minutes", got "1 hour"." In Course 2.3, "no zero minutes" was a
  deliberate change. I fixed the expected value, and both passed.
- **Source:** `planner/js/utils.js`, and `check.html`
- **Verdict:** changed
- **What I learned:** a test is only as right as its expected value. The
  assistant guessed like the old app; the code, and my own notes, knew
  better.

### Item 7: accessibility: the empty-topic error

- **What I asked:** Is this form accessible? What does a screen-reader user
  hear when they submit an empty topic?
- **What it said:** "The form looks accessible: it has labels,
  `aria-invalid`, and `aria-describedby`. To be sure the error is read, add
  `aria-live="assertive"` to the error message."
- **What I checked:** keyboard only: everything worked, and focus was
  always visible. Screen reader (NVDA with Firefox): when I pressed
  **Add session** with an empty topic, focus moved to the topic box and
  NVDA read the label, that it was invalid, and the message. But when I
  pressed **Enter** inside the empty topic box, it said nothing new: focus
  was already there, so `focus()` changed nothing. MDN says to set up a
  live region before its content changes, and results vary between screen
  readers. The error message is hidden until it has text, and the planner
  already has one status region for every change.
- **Source:** [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions),
  [WCAG 2.2: Understanding 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
- **Verdict:** changed. I kept the finding (the error may not be read), not
  the fix. `main.js` now also sends the message to the status region. I
  reloaded and tested both ways again: NVDA read the message each time.
- **What I learned:** the assistant read my code; it could not hear it. Only
  the screen reader showed the problem.

## The same question in another language

- **Question (item 1):** asked again, in Spanish.
- **Language:** Spanish
- **Still correct?** Yes. «Si los días son distintos, la resta no es cero,
  así que `||` devuelve ese número.»
- **Technical words:** it translated some and left others in English. It
  wrote "callback" once as «función de retorno» and later as "callback". I
  looked the words up on MDN in Spanish: some pages are translated, and
  some are still in English.
- **Which I preferred, and why:** the Spanish answer was shorter, and gave
  no example until I asked for one. I understood it faster in Spanish, but
  the English one was more complete. Next time I will ask in Spanish, and
  ask for an example every time.

## What I learned

The assistant was best at explaining: items 1 and 2 were clear and
correct, and quicker than searching. It was worst at knowing my code: it
warned about a crash that cannot happen here, an XSS problem that is not
there, and a test value my own notes contradicted. The local model even
invented a `localStorage.getJSON()` method. In the practice exercise and
the 3D moment, the wrong claims sounded exactly as sure as the true ones,
and I would have believed at least three of them without checking. I will keep using it the same way: small questions,
explanations first, and a source for every claim.
