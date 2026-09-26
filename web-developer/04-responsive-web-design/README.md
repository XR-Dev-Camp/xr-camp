# Responsive Web Design

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `responsive-web-design-04` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Build a responsive travel, cultural, community, or service website.

---

## Learning objectives

By the end of this project you will be able to:

1. Design mobile first, and explain why.
2. Use relative units (`rem`, `%`, `vw`, `ch`) instead of fixed sizes.
3. Lay out a row of items with flexbox, and a grid of cards with CSS grid.
4. Add layout for larger screens with media queries, without breaking smaller ones.
5. Make headings grow smoothly with `clamp()`.
6. Serve the right image size to each screen with `srcset` and `sizes`.
7. Make touch targets big enough for fingers.
8. Explain what container queries add, and use one.
9. Test a site at several widths and on real devices.

## Prerequisites

- **Course 1.3: CSS Foundations.** You have a site with one tokenised stylesheet.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | Device mode, to test widths | Free |
| A text editor | Writing CSS | Free |
| A phone, and if possible a tablet | Testing on real devices | Your own |

## What you will build

Your community site, responsive: one set of pages that works well on a 320-pixel phone, a tablet, and a wide desktop screen. The navigation wraps and is easy to tap, the programmes become a grid of cards, the "About" section sits in two columns on wide screens, the picture downloads at the right size, and the opening-hours table scrolls inside its own box instead of breaking the page.

The reference solution is in [`completed/`](completed/). The starter is the finished site from Course 1.3; use your own if you have one.

## Folder guide

```text
04-responsive-web-design/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── styles.css       # The Course 1.3 stylesheet, with a new section and TODOs
│   ├── index.html       # The home page, with 3 TODOs
│   ├── join.html, thanks.html
│   ├── centre-480.jpg, centre-960.jpg, centre-1440.jpg   # One picture, three sizes
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Work in your own site folder, or copy this lesson's `starter` folder.
2. Copy the three `centre-*.jpg` pictures into your site folder. If you use your own photo instead, save it at three widths (480, 960, and 1440 pixels) with any image editor, such as the free GIMP or your computer's built-in photo app.
3. Open your developer tools, and turn on **device mode**: **Ctrl + Shift + M** (on a Mac, **⌘ + Shift + M**) while the tools are open. In Firefox it is called **Responsive Design Mode**, and on a Mac the shortcut is **⌘ + Option + M**. You can now choose any screen width.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1 (TODO 1) | A list of what breaks at four widths |
| 2 | Step 2: mobile first and relative units | You can explain both |
| 3 | Step 3: fluid headings (TODO 2) | Headings that grow smoothly |
| 4 | Step 4: flexbox (TODO 3) | A navigation that wraps |
| 5 | Step 4, continued (TODO 4) | 44-pixel touch targets |
| 6 | Step 5: the cards' HTML (TODO 5) | Programmes as a list of cards |
| 7 | Step 6: grid (TODO 6) | A grid of cards |
| 8 | Step 6, continued: how auto-fill works | You can predict the columns |
| 9 | Step 7: container queries (TODO 7) | Cards that respond to their own width |
| 10 | Step 8: responsive images (TODO 8) | The right picture for each screen |
| 11 | Step 8, continued: checking which image loaded | Proof in the Network tab |
| 12 | Step 9: tables (TODOs 9–10) | A table that never breaks the page |
| 13 | Step 10: media queries (TODO 11) | Two columns on wide screens |
| 14 | Step 10, continued: the join page | A form that works at every width |
| 15 | Step 11: testing on real devices | A test log |
| 16 | Fixing what your test log found | A site that works everywhere |
| 17 | The **3D moment** | A 3D scene that adapts to the screen |
| 18 | [`tests/checklist.md`](tests/checklist.md) | A tested site |
| 19 | One challenge extension, then **Submitting your work** | A finished responsive site |

### Step 1: see what breaks (TODO 1)

Before changing anything, look at every page at **320**, **390**, **768**, and **1280** pixels wide in device mode. Write down everything that looks wrong: text too big, a row that does not fit, a table wider than the screen. That list is your to-do list for this lesson.

### Step 2: mobile first, and relative units

**Mobile first** means writing the styles for the smallest screen first, then **adding** layout for bigger screens with media queries. Small screens get the simplest page, which is also the fastest; nothing has to be undone.

Your site is already nearly mobile first: Course 1.3 used `rem`, `max-width`, and `max-width: 100%` on images. Relative units are the reason:

| Unit | Relative to | Good for |
| --- | --- | --- |
| `rem` | The reader's browser font size | Text and spacing |
| `%` | The containing box | Widths |
| `vw` | 1% of the window's width | Fluid sizes |
| `ch` | The width of the "0" character | Line length |

### Step 3: fluid headings (TODO 2)

```css
h1 { font-size: clamp(var(--step-3), 1.5rem + 3vw, var(--step-4)); }
```

`clamp(smallest, preferred, largest)`: the preferred size grows with the window, but never goes below the smallest or above the largest. The `rem` part means it still grows when the reader increases their text size.

### Step 4: flexbox (TODOs 3–4)

Flexbox lays items out in a **row** (or a column), and can wrap them onto new lines:

```css
nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-4);
}
```

`gap` spaces the items without margins. Delete the old `nav li` rule from section 5: flexbox replaces it.

Then make every link at least **44 by 44 CSS pixels**, so fingers can hit it (TODO 4). WCAG 2.2 requires at least 24 pixels; 44 is the widely recommended size, and much easier for everyone.

### Step 5: the cards' HTML (TODO 5)

Turn the two programme lists into one list of cards:

```html
<ul class="cards" role="list">
  <li class="card">
    <h3>Homework club</h3>
    <p>Weekdays after school.</p>
    <p class="tag">Children and young people</p>
  </li>
  <!-- one card for each programme -->
</ul>
```

It is still a list, so most screen readers announce "list, 6 items". The cards will use `list-style: none`, and Safari then stops treating the `<ul>` as a list. `role="list"` keeps it a list for everyone. Grid will change only how it looks.

### Step 6: grid (TODO 6)

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: var(--space-3);
}
```

Read it from the inside out: each column is **at least 15rem, and shares the spare space equally** (`1fr`); **fit as many columns as possible** (`auto-fill`). One card per row on a phone, two on a tablet, three on a wide screen, with no media query at all. `min(100%, 15rem)` stops a card overflowing a very narrow phone.

### Step 7: container queries (TODO 7)

A **media query** asks about the window. A **container query** asks about the box something is in, so a card can change its layout depending on how wide the **card** is, wherever it is placed.

```css
.card { container-type: inline-size; }

@container (min-width: 22rem) {
  .tag { position: absolute; top: var(--space-3); right: var(--space-3); }
}
```

When a card is wide enough inside (for example, one card per row on a large phone turned sideways), the tag moves to the corner. Make the window narrower and wider and watch it move. Container queries work in all current major browsers; in an older browser the card simply keeps its phone layout, which is fine.

### Step 8: responsive images (TODO 8)

A phone does not need a 1440-pixel picture. Give the browser choices, and let it pick:

```html
<img src="centre-960.jpg"
     srcset="centre-480.jpg 480w, centre-960.jpg 960w, centre-1440.jpg 1440w"
     sizes="(min-width: 48rem) 28rem, 100vw"
     alt="The centre's front entrance, with a step-free ramp beside the main doors."
     width="800" height="450">
```

- `srcset` lists the files and their real widths.
- `sizes` says how wide the picture will be shown: 28rem on wide screens, the full window width otherwise.
- The browser combines that with the screen's pixel density and downloads **only one** file.

Check it: in the **Network** tab, reload at different widths and look at which picture loaded.

### Step 9: tables (TODOs 9–10)

A table cannot squeeze much. Put it in a box that scrolls sideways on its own, so the page does not:

```html
<div class="table-wrap" role="region" aria-labelledby="hours-caption" tabindex="0">
  <table>
    <caption id="hours-caption">Opening hours during term time</caption>
```

`tabindex="0"` lets keyboard users reach the box and scroll it with the arrow keys; `role="region"` and the label tell screen readers what it is.

### Step 10: media queries (TODO 11)

For layouts that only make sense on wide screens, add a media query:

```css
@media (min-width: 48rem) {
  #about {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

Use `min-width`, so the rules **add** to the mobile layout. Choose breakpoints where your content breaks, not where a particular phone ends.

### Step 11: testing on real devices

Device mode is a good start, but real phones are different: real fingers, real sunlight, slow connections. Open your site on every device you can borrow, and keep a test log: device, browser, what worked, what did not. Also try:

- **Zoom to 200%** on a computer.
- **Landscape** on a phone.
- The biggest **text size** in your phone's settings.

## Key code explained

**`repeat(auto-fill, minmax(min(100%, 15rem), 1fr))`.** The most useful line in CSS grid: responsive columns with no media queries.

**`container-type: inline-size`.** Makes an element a container that its children can query by width.

**`aspect-ratio`** (in the 3D moment): keeps a box's shape as its width changes: `4 / 3`, `1 / 1`, `16 / 9`.

**`min()`, `max()`, and `clamp()`.** CSS can compare values: the smaller, the larger, or a value between two limits.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html): a small 3D model of the centre. On a phone, the scene fills the width in a 4:3 shape; on a wide screen, it sits beside the text as a square. The layout is the same CSS grid you used for the cards, and `aspect-ratio` keeps the scene's shape at every width. A 3D scene is just another box in your layout.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| No sideways scrolling at 320 pixels wide, except inside tables | 1.4.10 | People who zoom to 400% get a 320-pixel page. |
| Text can grow to 200% | 1.4.4 | `rem` and `clamp()` with a `rem` part. |
| Targets at least 24 pixels; we use 44 | 2.5.8 | Easier to tap for everyone. |
| Works in portrait and landscape | 1.3.4 | Some people cannot turn their device. |
| Scrollable table box can be reached with the keyboard | 2.1.1 | `tabindex="0"` and a label. |
| Content order makes sense without the layout | 1.3.2 | Grid changes only how it looks, not the HTML order. |

## Performance considerations

Responsive images are the biggest performance win in this lesson: a phone downloading the 480-pixel picture instead of the 1440-pixel one saves most of the image's data. Grid and flexbox cost nothing to download. The 3D moment's A-Frame library is about 1.3 MB of code (about 350 KB after compression), which is why the 3D stays on its own page.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Designing for desktop, then squeezing | Overrides everywhere, and a slow phone page | Mobile first, then add |
| Fixed widths in pixels | Sideways scrolling on phones | `max-width`, `%`, and grid |
| Breakpoints for specific phones | Breaks on the next phone | Break where your content breaks |
| Changing the HTML order to change the layout | Confusing order for screen readers | Keep the HTML order; move with CSS |
| Tiny links close together | People tap the wrong one | 44-pixel targets with a gap |
| `display: block` on a `<table>` | Screen readers may lose the table | Wrap it in a scrolling box |

## Troubleshooting

**The page still scrolls sideways on a phone.** In device mode, find the element wider than the screen: open the Elements panel and hover over elements until one sticks out. Usually it is an image without `max-width: 100%`, or a fixed width.

**The browser always loads the biggest image.** Your screen may have a high pixel density, which is correct. Check `sizes`: if it is missing, the browser assumes the image fills the whole window.

**My container query does nothing.** The container needs `container-type: inline-size`, and the query must be about the container, not the window.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: a navigation that collapses into a "Menu" button on small screens.
2. **[Creative](challenges/challenge-2.md)**: a device test log from three real devices.
3. **[Explorer](challenges/challenge-3.md)**: turn the join form into two columns on wide screens, without changing its reading order.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of your home page at 320, 768, and 1280 pixels wide.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: what broke at 320 pixels that you did not expect?

## Further reading

- [MDN: Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox)
- [MDN: CSS grid layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids)
- [MDN: Responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)
- [MDN: Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)

## Women to Know

**Rachel Andrew** is a British web developer, writer, and speaker who has been a member of the W3C's CSS Working Group. Her site Grid by Example collected small, clear examples of CSS grid layout, and helped a generation of developers learn it when it was new.

The grid you used for the programme cards is a standard: someone had to argue for it, explain it, and teach it. Much of that explaining was done by Rachel Andrew.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Flexbox, grid, media queries, and container queries are all separate modules written by the W3C's CSS Working Group. `srcset` and `sizes` are part of the HTML Living Standard. Every major browser implements them the same way because they are standards: that is what makes "one site for every screen" possible.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
