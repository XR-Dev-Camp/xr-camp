# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Make the planner yours, by changing only `config.js`, and one thing more.

## Task

1. In `config.js`, set your real weekly goal and session length. Does everything else follow, including the summary sentence and the time total?
2. Does your week start on Monday or Sunday? Change `DAYS` to match, and update the `<option>`s in `index.html`.
3. Show the day names and times in your language, using the browser's built-in `Intl` API, so no translation list is needed:

   ```js
   new Intl.DateTimeFormat('es', { weekday: 'long' }).format(someDate)
   new Intl.DateTimeFormat('zh-Hans', { hour: 'numeric', minute: '2-digit' }).format(someDate)
   ```

   Keep the English day names as the stored values (so sorting still works), and translate only what is shown. Which file is the right place for that: `utils.js`, a component, or `main.js`? Write down why.
4. Set `<html lang>` to match the language you show.

## Why this matters

Settings in one place, and formatting kept separate from data, are what make an app easy to translate. Course 6.2 builds on exactly this.

## Done when

- [ ] Your own goal, session length, and first day of the week, all from `config.js`.
- [ ] Days and times shown in your language, with the stored data unchanged.
- [ ] Old saved sessions still load and sort correctly.
