# Challenge 2: Creative

**Optional.** Roughly 60 minutes.

Your own data: a map of your study plan, or of your community's activities.

## Task

1. Write your own JSON file in the same shape: `phases` (or groups) and items with a title, minutes, sessions, and a status.
2. It could be your XR Camp study plan with your own target dates, or your community's weekly activities.
3. Point `loadCatalog` at your file: `loadCatalog('data/my-plan.json')`.
4. Check the JSON is valid: a missing comma breaks it. Your error message will tell you.

## Why this matters

Because `render.js` and `format.js` never mention XR Camp, they work with any data of the same shape. Code that depends only on the shape of data, not on where it came from, can be reused.

## Done when

- [ ] Your page shows your own data, grouped and totalled.
- [ ] A broken JSON file shows your error message, not a blank page.
