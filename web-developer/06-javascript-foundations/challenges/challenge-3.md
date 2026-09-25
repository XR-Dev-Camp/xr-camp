# Challenge 3: Explorer

**Optional.** Roughly 45 minutes.

Sort the results by day or by name.

## Task

1. Add a labelled `<select id="sort">` to the filters, with the options "Name (A to Z)" and "Day".
2. Give each programme a `dayOrder` number (Monday is 1, Sunday is 7; "Weekdays" is 1).
3. Before drawing the cards, sort the filtered array:

   ```js
   found.sort((a, b) => a.name.localeCompare(b.name));   // by name
   found.sort((a, b) => a.dayOrder - b.dayOrder);         // by day
   ```

4. `localeCompare` sorts text by language rules, so accented letters sort sensibly. The order depends on the language, so pass one: `a.name.localeCompare(b.name, 'es')`, or `'zh'` for Chinese.

## Why this matters

Sorting is one of the most common things people want from a list, and `sort` with a comparison function is one of the most useful tools in JavaScript.

## Done when

- [ ] The sort control is labelled and works with the keyboard.
- [ ] Both orders are correct, and the filters still work.
