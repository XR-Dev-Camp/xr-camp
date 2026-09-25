# Challenge 1: Foundation

**Required.** Roughly 30 minutes.

A "Clear filters" button.

## Task

1. Add a second button to the filters form: `<button type="button" id="clear">Clear filters</button>`. It is `type="button"`, so it does not submit the form.
2. When it is clicked, empty the search box, set the audience back to "all", untick "Free only", call `showResults()`, and move focus back to the search box.
3. Check it with the keyboard and a screen reader.

## Why this matters

Filters that are hard to undo leave people stuck with no results. Resetting everything, and putting focus somewhere sensible, is a small kindness that makes an interface feel trustworthy.

## Done when

- [ ] One press resets every control and shows every programme.
- [ ] Focus moves to the search box.
