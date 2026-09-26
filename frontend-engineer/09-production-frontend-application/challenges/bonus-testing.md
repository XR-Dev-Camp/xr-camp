# Bonus challenge: automated tests

An optional extension for learners who want to go further. Not required for this lesson or for submission. About 60–90 minutes. Needs [Node.js](https://nodejs.org/).

`check.html` (Step 16) proves `utils.js` works with no framework at all — that is deliberate, so every learner can check pure functions with nothing to install. This bonus adds what a real production app usually adds next: a real test runner, and a browser-automated check of the app itself, both wired into `completed/package.json`.

## Task

1. Read [`completed/tests/unit/utils.test.js`](../completed/tests/unit/utils.test.js) next to `check.html` and `js/utils.js`. Same functions, same idea — a real assertion library instead of hand-written `assert`-style checks.
2. Read [`completed/tests/e2e/main-flow.spec.js`](../completed/tests/e2e/main-flow.spec.js). It drives a real browser: switches to the Planner view using only the keyboard, then adds a session and checks it appears — see ["Going further: automated tests"](../README.md#going-further-automated-tests) in the README for why the keyboard step matters here.
3. In your own copy, `cd completed` (or your own finished project's folder), then `npm install`.
4. Run `npm run test:unit`. All tests should pass.
5. Make sure the course's local server is running (see the lesson's "Setup"), then run `npm run test:e2e`. It should pass too.
6. Break something on purpose: change `fraction()` in `js/utils.js` to divide the wrong way round, and re-run `npm run test:unit` — watch it fail and read the diff. Put it back afterwards.
7. Add one more unit test of your own, for a function this file does not yet cover (`phaseProgress()` is a good candidate — it needs a small fake catalog).
8. Add one more Playwright check to the same test, or a new one: switch to the Weather view by keyboard and confirm a day's forecast row is visible. Then run `npm run test:e2e` again.
9. When you are done, delete `node_modules` (it is already in `.gitignore` and must never be committed) before you commit or submit your project.

## Why this matters

`check.html` scales to one file. A real app grows dozens of modules and several user flows, and a person clicking through all of them by hand before every change quietly stops happening — which is exactly when a keyboard-only regression (a focus step that quietly breaks, like the one this test checks) goes unnoticed the longest. A test suite that runs in seconds is what makes checking "did I break anything?" cheap enough to actually do, every time.

## Done when

- [ ] `npm run test:unit` passes, and you understand what each test in `utils.test.js` checks.
- [ ] `npm run test:e2e` passes, with the local server running.
- [ ] You watched a unit test fail on purpose, then put the code back.
- [ ] You added one unit test and one Playwright check of your own.
- [ ] `node_modules` is not committed (check `git status` before you submit).
