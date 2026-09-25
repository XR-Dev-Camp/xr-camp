# Challenge 3: Explorer

**Optional stretch.** Roughly 60–90 minutes.

Render a card's shadow root with **no JavaScript at all**, using declarative shadow DOM.

## Task

1. Declarative shadow DOM lets you write a shadow root straight into the HTML, with a `<template shadowrootmode="open">` as the element's first child. The browser attaches it while reading the page. It is part of the HTML Standard and supported in current versions of the major browsers. Write one card this way:

   ```html
   <lesson-card lesson-title="Web Components" minutes="600" status="ready">
     <template shadowrootmode="open">
       <style>/* the card's styles */</style>
       <article part="card">
         <h3 part="heading">Web Components</h3>
         …
         <slot name="description"></slot>
       </article>
     </template>
     <p slot="description">Build your own HTML elements.</p>
   </lesson-card>
   ```

2. Turn JavaScript off (or comment out the script), and reload. The card is fully styled, and its slots work. What is missing?
3. Now make the class work with it. In the constructor, use the root that is already there, if there is one, and only copy the template when there is none:

   ```js
   const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
   if (!root.hasChildNodes()) root.append(template.content.cloneNode(true));
   ```

   Turn JavaScript back on: the button now works, with no flash of different content.
4. In your journal, answer: when would you write the shadow root in HTML, and when would you let JavaScript build it? Think about slow connections, and about how much HTML you repeat for every card.

## Why this matters

Declarative shadow DOM lets a server send finished components as plain HTML, so they appear before any JavaScript runs. It is progressive enhancement taken one step further, and it is how some frameworks render web components on the server.

## Done when

- [ ] One card renders, styled, with JavaScript off.
- [ ] With JavaScript on, the same card's Done button works and fires `lesson-toggle`.
- [ ] Cards created by `main.js` still work exactly as before.
- [ ] Your journal has your answer to step 4.
