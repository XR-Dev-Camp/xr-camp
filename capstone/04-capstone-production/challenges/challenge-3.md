# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a basic automated check to your build.

## Task

1. Write a small script (Node.js is fine, using only built-in modules or `playwright-core` if you already have it installed, as this repository's own test scripts do) that opens your production page and checks for console errors.
2. Document how to run it in your README, under a "Testing" section.
3. Run it once, and note the result in your changelog.

## Why this matters

A single automated check that catches "the page throws an error" costs little to write and can catch a real regression before you notice it by hand. This is a small first step toward the kind of testing professional teams rely on.

## Done when

- [ ] A script exists that opens the production page and reports console errors.
- [ ] The README documents how to run it.
- [ ] It has been run at least once, with the result logged.
