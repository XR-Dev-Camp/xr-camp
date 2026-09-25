# Challenge 2: Creative

**Optional.** Roughly 45 minutes.

Labels and messages in your own language.

## Task

1. Make a copy of the explorer in your language: translate the labels, options, and headings in the HTML, and set `lang`.
2. In `explorer.js`, put every message people see in one object at the top:

   ```js
   const text = {
     showing: (found, total) => `Mostrando ${found} de ${total} programas.`,
     none: 'Ningún programa coincide. Prueba con menos palabras.',
     save: (name) => `Guardar ${name}`,
   };
   ```

   and use it everywhere instead of writing messages inside the functions.
3. Translate your programme data too.

## Why this matters

When every message lives in one place, translating the whole explorer means editing one object. That is the idea behind the internationalisation you will build in Course 6.2.

## Done when

- [ ] Every visible word, including announced messages, is in your language.
- [ ] Every message comes from the `text` object.
