// lesson-card.js: <lesson-card>, a reusable, accessible card for one lesson.
//
// Everything the card needs will live in this file: its structure, its
// styles, and its behaviour. Any page can then use it with one import and
// one tag.

import { describeMinutes } from './format.js';

const STATUS_WORDS = { ready: 'Ready', 'coming-soon': 'Coming soon' };

// The template: the card's structure, written once, copied for every card.
// innerHTML is safe here: this is our own fixed markup, with no user text.
// Titles and numbers are added later, with textContent.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* TODO 5: Style the card from the inside.
       - :host { display: block; } and :host([hidden]) { display: none; }
         (:host is the <lesson-card> element itself, seen from inside.)
       - article: padding, background, a 1px border, a 6px left border,
         border-radius. Use the page's tokens WITH fallbacks, for example
         var(--color-surface, #ffffff). Custom properties are inherited, so
         they reach inside; ordinary page selectors do not.
       - :host([done]) article: left border in var(--color-ready, #1d6b4f).
       - h2, h3, h4, h5, h6: no top margin, font-size 1.15rem, dark purple.
       - .meta: muted colour. .badge: inline-block, 2px border, bold, small;
         :host([status="ready"]) .badge in the "ready" green.
       - ::slotted(p) { margin: 0 0 0.5rem; }
       - button: font: inherit, padding, a 2px purple border, white
         background; button[aria-pressed="true"] filled green with white
         text; button:focus-visible with a 3px outline in --color-focus.
         The page's own button and :focus-visible rules do NOT reach in.
       - .tick { display: none; } and show it when the button is pressed. */
  </style>

  <!-- TODO 3: Write the card's structure:
       - <article part="card"> around everything
       - <h3 part="heading"></h3>   (empty: filled from lesson-title)
       - <p class="meta" part="meta"></p>
       - <span class="badge" part="badge"></span>
       - <slot name="description"><p>No description yet.</p></slot>
         (the <p> inside is the fallback, shown when the slot is empty)
       - <slot></slot>   (the default slot, for anything else)
       - <button type="button" part="button" aria-pressed="false">, with
         <span class="tick" aria-hidden="true">✓ </span>Done inside. -->
`;

// TODO 2: Write the class, and register it.
// - export class LessonCard extends HTMLElement { ... }
// - At the bottom of the file, define the element, only if it is not
//   defined yet:
//     if (!customElements.get('lesson-card')) customElements.define('lesson-card', LessonCard);
// The name MUST contain a hyphen. Why? Write your answer in your journal.
//
// Inside the class, step by step:
//
// TODO 4: constructor(): call super() first. Then
//   const root = this.attachShadow({ mode: 'open' });
//   root.append(template.content.cloneNode(true));
// Keep references to the heading, .meta, .badge and button in private
// fields (#heading, #meta, #badge, #button), and listen for the button's
// click: this.#button.addEventListener('click', () => this.#toggleFromButton());
// (Until TODO 8, write an empty #toggleFromButton() {} method.)
//
// TODO 6: Attributes.
// - static observedAttributes = ['lesson-title', 'minutes', 'status', 'done', 'heading-level'];
// - connectedCallback() and attributeChangedCallback() both call this.#render().
// - get lessonTitle(): the lesson-title attribute, or 'Untitled lesson'.
// - #render(): put lessonTitle in the heading (textContent), describeMinutes()
//   in .meta (or 'Time not set yet' if minutes is missing), the words from
//   STATUS_WORDS in the badge (anything but 'ready' counts as 'coming-soon'),
//   and set the button's aria-label to `Done: ${this.lessonTitle}` and its
//   aria-pressed to String(this.done).
//
// TODO 7: Heading level. The card cannot know where it will be used, so
// the page chooses with heading-level="2" to "6" (default 3).
// - #headingLevel(): return the attribute as a number if it is a whole
//   number from 2 to 6; otherwise 3.
// - At the start of #render(): if this.#heading.localName is not
//   `h${level}`, create the right heading, give it part="heading", and
//   swap it in with this.#heading.replaceWith(newHeading).
//
// TODO 8: Done, and the custom event.
// - get done(): this.hasAttribute('done')
// - set done(value): this.toggleAttribute('done', Boolean(value))
// - #toggleFromButton(): flip this.done, then dispatch from the BUTTON:
//     this.#button.dispatchEvent(new CustomEvent('lesson-toggle', {
//       bubbles: true, composed: true,
//       detail: { lessonId: this.getAttribute('lesson-id'), title: this.lessonTitle, done: this.done },
//     }));
//   Try it with composed: false first. Does the page still hear it?
