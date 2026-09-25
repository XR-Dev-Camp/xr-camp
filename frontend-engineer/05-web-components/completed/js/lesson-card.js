// lesson-card.js: <lesson-card>, a reusable, accessible card for one lesson.
//
// Everything the card needs is inside this file: its structure, its styles,
// and its behaviour. Any page can use it with one import and one tag.
// The documentation is in ../components.md.

import { describeMinutes } from './format.js';

const STATUS_WORDS = { ready: 'Ready', 'coming-soon': 'Coming soon' };

// --- The template: the card's structure, written once, copied per card. ----
// innerHTML is safe here: this is our own fixed markup, with no user text in
// it. Every title and number is added later with textContent.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* :host is the <lesson-card> element itself, seen from inside. */
    :host { display: block; }
    :host([hidden]) { display: none; }

    /* Custom properties (var(--...)) are inherited, so the page's colours
       reach inside the shadow root. Each has a fallback, so the card still
       looks right on a page without the XR Camp tokens. Ordinary selectors
       from the page do NOT reach in, which is why buttons and focus
       outlines are styled again here. */
    article {
      height: 100%;
      padding: var(--space-3, 1rem);
      background: var(--color-surface, #ffffff);
      border: 1px solid var(--color-line, #c9c4d4);
      border-left: 6px solid var(--color-line, #c9c4d4);
      border-radius: var(--radius, 0.5rem);
    }
    :host([done]) article { border-left-color: var(--color-ready, #1d6b4f); }

    h2, h3, h4, h5, h6 {
      margin: 0 0 0.25rem;
      font-size: 1.15rem;
      line-height: 1.25;
      color: var(--color-primary-dark, #3f1d5e);
    }
    .meta { margin: 0; color: var(--color-muted, #4a4a55); font-size: 0.95rem; }

    /* Status in words, with a border: never colour alone (WCAG 1.4.1). */
    .badge {
      display: inline-block;
      margin: var(--space-2, 0.5rem) 0;
      padding: 0 var(--space-2, 0.5rem);
      border: 2px solid;
      border-radius: var(--radius, 0.5rem);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-muted, #4a4a55);
    }
    :host([status="ready"]) .badge { color: var(--color-ready, #1d6b4f); }

    /* ::slotted() styles the page's elements placed in a slot. */
    ::slotted(p) { margin: 0 0 var(--space-2, 0.5rem); }

    button {
      font: inherit;
      margin-top: var(--space-2, 0.5rem);
      padding: var(--space-2, 0.5rem) var(--space-3, 1rem);
      color: var(--color-primary-dark, #3f1d5e);
      background: var(--color-surface, #ffffff);
      border: 2px solid var(--color-primary, #5b2a86);
      border-radius: var(--radius, 0.5rem);
      cursor: pointer;
    }
    button[aria-pressed="true"] {
      color: #ffffff;
      background: var(--color-ready, #1d6b4f);
      border-color: var(--color-ready, #1d6b4f);
    }
    button:focus-visible { outline: 3px solid var(--color-focus, #d62f6b); outline-offset: 3px; }
    .tick { display: none; }
    button[aria-pressed="true"] .tick { display: inline; }
  </style>

  <article part="card">
    <h3 part="heading"></h3>
    <p class="meta" part="meta"></p>
    <span class="badge" part="badge"></span>
    <slot name="description"><p>No description yet.</p></slot>
    <slot></slot>
    <!-- The label and the control live together, inside the shadow root.
         aria-labelledby cannot point across the shadow boundary, so the
         button carries its own name, set in #render(): "Done: Web
         Components". The visible word comes first (WCAG 2.5.3). -->
    <button type="button" part="button" aria-pressed="false"><span class="tick" aria-hidden="true">✓ </span>Done</button>
  </article>
`;

export class LessonCard extends HTMLElement {
  // The browser calls attributeChangedCallback only for these attributes.
  static observedAttributes = ['lesson-title', 'minutes', 'status', 'done', 'heading-level'];

  // # makes a field private: code outside the class cannot touch it.
  #heading;
  #meta;
  #badge;
  #button;

  constructor() {
    super();
    // mode: 'open' lets page code and developer tools look inside with
    // element.shadowRoot. It is not a security feature either way.
    const root = this.attachShadow({ mode: 'open' });
    root.append(template.content.cloneNode(true));

    this.#heading = root.querySelector('[part="heading"]');
    this.#meta = root.querySelector('.meta');
    this.#badge = root.querySelector('.badge');
    this.#button = root.querySelector('button');

    this.#button.addEventListener('click', () => this.#toggleFromButton());
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    // Rendering is cheap (a few textContent changes), so any change to any
    // observed attribute simply renders again.
    this.#render();
  }

  // --- Properties that mirror attributes ("reflection"). --------------------
  // card.done = true and <lesson-card done> mean the same thing.
  get done() {
    return this.hasAttribute('done');
  }

  set done(value) {
    this.toggleAttribute('done', Boolean(value));
  }

  get lessonTitle() {
    return this.getAttribute('lesson-title') ?? 'Untitled lesson';
  }

  // --- Private helpers. -------------------------------------------------------
  #toggleFromButton() {
    this.done = !this.done;
    // Fired from the button, deep inside the shadow root:
    // - bubbles: true lets it travel up through the parents.
    // - composed: true lets it cross the shadow boundary into the page.
    // Outside, event.target is "retargeted" to the <lesson-card> itself,
    // so the page never sees the card's private insides.
    this.#button.dispatchEvent(new CustomEvent('lesson-toggle', {
      bubbles: true,
      composed: true,
      detail: { lessonId: this.getAttribute('lesson-id'), title: this.lessonTitle, done: this.done },
    }));
  }

  // Headings must fit the page's outline (WCAG 1.3.1), and the card cannot
  // know where it will be used, so the page chooses: heading-level="2" to "6".
  #headingLevel() {
    const level = Number(this.getAttribute('heading-level'));
    return Number.isInteger(level) && level >= 2 && level <= 6 ? level : 3;
  }

  #render() {
    const tag = `h${this.#headingLevel()}`;
    if (this.#heading.localName !== tag) {
      const heading = document.createElement(tag);
      heading.setAttribute('part', 'heading');
      this.#heading.replaceWith(heading);
      this.#heading = heading;
    }

    const minutes = Number(this.getAttribute('minutes'));
    const status = this.getAttribute('status') === 'ready' ? 'ready' : 'coming-soon';

    this.#heading.textContent = this.lessonTitle;
    this.#meta.textContent = minutes > 0 ? describeMinutes(minutes) : 'Time not set yet';
    this.#badge.textContent = STATUS_WORDS[status];
    this.#button.setAttribute('aria-label', `Done: ${this.lessonTitle}`);
    this.#button.setAttribute('aria-pressed', String(this.done));
  }
}

// A custom element's name must contain a hyphen, so it can never clash with
// a future built-in element. define() throws if the name is already taken,
// so we check first: the file is then safe to import twice.
if (!customElements.get('lesson-card')) {
  customElements.define('lesson-card', LessonCard);
}
