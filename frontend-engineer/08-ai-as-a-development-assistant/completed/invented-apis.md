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

## Ana's check

### A. Loading

- **What MDN says:** `getItem` returns the value as a string, or `null` if
  the key does not exist. Not `undefined`.
- **Link:** [MDN: Storage.getItem()](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)
- **My prediction, then the Console:** I predicted `null`, because the
  planner's code uses `?? []`. `localStorage.getItem('no-such-key')` gave
  `null`. `JSON.parse(null)` also gave `null`, with no error: `JSON.parse`
  turns its argument into text first, and the text `"null"` is valid JSON.
  Then `?? []` gives an empty list.
- **Verdict:** **Wrong.** The planner's code works on purpose, not by
  accident. The suggested `raw === undefined` check would never be true, so
  it would be dead code. The `catch` is there for storage that is switched
  off, or saved text that is broken.

### B. Sorting

- **What MDN says:** `sort()` takes one optional argument, `compareFn`. It
  sorts the array **in place** and returns the same array. For a sorted
  copy, MDN points to `toSorted()`.
- **Link:** [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort),
  [MDN: Array.prototype.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- **My prediction, then the Console:** I predicted an error. There was
  none: `[3, 1, 2].sort((a, b) => a - b, { copy: true })` gave `[1, 2, 3]`.
  Then I tried `const days = [3, 1, 2]; days.sort((a, b) => a - b, { copy: true }); days`
  and `days` itself was sorted: no copy. JavaScript ignores extra
  arguments.
- **Verdict:** **Invented.** There is no `copy` option. The code would run
  without any error and sort the stored array, which is the exact bug we
  removed in Course 2.3. `toSorted(bySchedule)` is the real method, but
  `[...sessions].sort(bySchedule)` is already correct, so I changed nothing.

### C. Focus after Delete

- **What MDN says:** `focus()` exists, with two options, `preventScroll` and
  `focusVisible`. MDN has no `focusNext()` anywhere, on any element.
- **Link:** [MDN: HTMLElement.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
- **My prediction, then the Console:** `'focusNext' in HTMLElement.prototype`
  gave `false`. Calling it gave `TypeError: button.focusNext is not a
  function` (Chrome's wording; Firefox/Safari differ).
- **Verdict:** **Invented.** It does not exist. It also would not help:
  after Delete, the list is redrawn and the pressed button is gone, which
  is why `main.js` finds the next Delete button itself.

### D. Ids

- **What MDN says:** `randomUUID()` is "available only in secure contexts".
  MDN's secure contexts page lists `http://localhost` and `127.0.0.1` as
  potentially trustworthy, like `https://`.
- **Link:** [MDN: Crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID),
  [MDN: Secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts)
- **My prediction, then the Console:** on my local server,
  `window.isSecureContext` gave `true`, and `crypto.randomUUID()` gave a new
  id each time.
- **Verdict:** **Correct.** Three of four claims were wrong, and all four
  sounded equally sure.
