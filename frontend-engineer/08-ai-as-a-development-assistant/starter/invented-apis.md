# Practice: spot the invented API

> **A made-up example.** XR Camp wrote the "AI answer" below for practice.
> It contains mistakes on purpose, of the kind real assistants make. It is
> not the output of any real product. Do not copy its code into your planner.

## The question

> Can `store.js` and `main.js` in my planner be simpler? Here are the
> `load` function, `getSessions`, and the Delete part of the click listener.

## The "AI answer"

> Good news: your code is well organised! Here are four suggestions.
>
> **A. Loading.** On a first visit, `localStorage.getItem(STORAGE_KEY)`
> returns `undefined`, so `JSON.parse` throws a `SyntaxError`, and your
> `catch` quietly saves you. That only works by accident. Check first:
>
> ```js
> const raw = localStorage.getItem(STORAGE_KEY);
> if (raw === undefined) return [];
> ```
>
> **B. Sorting.** `[...sessions].sort(bySchedule)` makes an unnecessary
> copy. `sort` has a `copy` option that returns a sorted copy and leaves
> the original alone:
>
> ```js
> return sessions.sort(bySchedule, { copy: true });
> ```
>
> **C. Focus after Delete.** Counting buttons with `indexOf` is fragile.
> Every element has a `focusNext()` method that moves focus to the next
> focusable element, just like pressing Tab:
>
> ```js
> button.focusNext();
> ```
>
> **D. Ids.** Keep `crypto.randomUUID()`. It only works in a secure
> context: pages served over `https://`, or from your own computer on
> `localhost` or `127.0.0.1`. On a plain `http://` page from anywhere else,
> it may be missing, so use `https://` when you publish the planner.

## Your check

<!-- TODO 6: for each claim, find the method or behaviour on MDN
     (developer.mozilla.org). Write what MDN says in your own words, link
     the exact page, and give a verdict: correct, wrong, or invented.
     If it is wrong, write what is true, and what would happen if you used
     the suggested code in the planner. -->

<!-- TODO 7: test each claim in the Console of planner/index.html, and
     write your prediction BEFORE you press Enter. Some tests:
       'focusNext' in HTMLElement.prototype
       localStorage.getItem('no-such-key')
       JSON.parse(null)
       [3, 1, 2].sort((a, b) => a - b, { copy: true })
       window.isSecureContext                                     -->

### A. Loading

- **What MDN says:**
- **Link:**
- **My prediction, then the Console:**
- **Verdict:**

### B. Sorting

- **What MDN says:**
- **Link:**
- **My prediction, then the Console:**
- **Verdict:**

### C. Focus after Delete

- **What MDN says:**
- **Link:**
- **My prediction, then the Console:**
- **Verdict:**

### D. Ids

- **What MDN says:**
- **Link:**
- **My prediction, then the Console:**
- **Verdict:**
