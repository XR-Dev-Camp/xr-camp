# CSS Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `css-foundations-03` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Create a reusable visual system for the HTML project.

---

## Learning objectives

By the end of this project you will be able to:

1. Link a stylesheet to every page of a site, and explain why one stylesheet is better than many.
2. Select elements by type, class, ID, attribute, and state.
3. Explain the cascade, inheritance, and specificity, and predict which rule wins.
4. Choose colours that meet WCAG contrast, and check them.
5. Build a type scale and a spacing scale with custom properties and `rem` units.
6. Explain the box model, and use `box-sizing: border-box`.
7. Style links, tables, and forms without breaking their accessibility.
8. Make keyboard focus clearly visible everywhere.
9. Organise a stylesheet so someone else can understand it.

## Prerequisites

- **Course 1.1: HTML Foundations** and **Course 1.2: Accessible Forms.** You have the Riverside site (or your own) with a home page and a form page.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | Seeing and inspecting your styles | Free |
| A text editor | Writing CSS | Free |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Checking your colours | Free |

## What you will build

One stylesheet, `styles.css`, that styles every page of your site: your **visual system**. It defines your colours, type sizes, and spacing once, as named values, and uses them everywhere, so the whole site looks consistent and can be changed in one place.

The reference solution in [`completed/`](completed/) styles the Riverside site's home page, join page, and thank-you page.

## Folder guide

```text
03-css-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── styles.css       # Begin here: a stylesheet with 12 TODOs
│   ├── index.html       # The Riverside home page (from Course 1.1)
│   ├── join.html        # The join page (from Course 1.2)
│   ├── thanks.html
│   ├── centre.svg       # A drawing of the centre
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Work in your own site folder from Courses 1.1 and 1.2. If you prefer, copy this lesson's `starter` folder and work there instead.
2. Copy `starter/styles.css` into your site folder.
3. Open your home page in the browser. It still has no styles: that changes in the first step.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1 (TODO 1) | Every page linked to one stylesheet |
| 2 | Step 2: selectors | You can target any element |
| 3 | Step 3: the cascade and inheritance (TODO 2) | A styled page body |
| 4 | Step 4: specificity | You can predict which rule wins |
| 5 | Step 5: colour (TODO 4) | A palette as custom properties |
| 6 | Step 5: checking contrast | Every colour pair checked |
| 7 | Step 6: typography (TODOs 3 and 5) | A type scale and a font stack |
| 8 | Step 6: headings, links, line length | Readable text |
| 9 | Step 7: spacing (TODO 6) | A spacing scale |
| 10 | Step 8: the box model (TODO 7) | A centred layout |
| 11 | Step 9: borders and backgrounds (TODO 8) | A header band and navigation |
| 12 | Step 10: links and focus (TODOs 9 and 12) | Visible focus everywhere |
| 13 | Step 11: tables (TODO 10) | Styled opening hours |
| 14 | Step 12: forms (TODO 11) | A styled join page |
| 15 | Step 12, continued | Forms tested with the keyboard |
| 16 | Step 13: organising your stylesheet | A stylesheet someone else could read |
| 17 | The **3D moment** | 2D and 3D sharing one colour system |
| 18 | [`tests/checklist.md`](tests/checklist.md), zoom to 200% | A tested site |
| 19 | One challenge extension, then **Submitting your work** | A finished visual system |

### Step 1: one stylesheet for every page (TODO 1)

In the `<head>` of every page, add:

```html
<link rel="stylesheet" href="styles.css">
```

Reload. Nothing changes yet, because the stylesheet has no rules. But every page is now connected to it: change one file, and the whole site changes. That is why CSS lives in its own file.

### Step 2: selectors

A CSS rule has a **selector** (which elements) and **declarations** (what to change):

```css
h1 {
  color: #3f1d5e;
}
```

| Selector | Selects | Example |
| --- | --- | --- |
| Type | Every element of that kind | `h1`, `p`, `table` |
| Class | Elements with `class="card"` | `.card` |
| ID | The one element with `id="main"` | `#main` |
| Attribute | Elements with an attribute | `input[type="email"]` |
| Descendant | Elements inside other elements | `nav a` |
| Pseudo-class | Elements in a state | `a:hover`, `:focus-visible` |

Open your browser's developer tools (**F12**), choose **Elements** (or **Inspector** in Firefox), and click any element: the **Styles** panel shows every rule that applies to it.

### Step 3: the cascade and inheritance (TODO 2)

**Cascading** Style Sheets are named after the way rules combine: many rules can apply to one element, and the browser decides which wins.

**Inheritance:** some properties, such as `color`, `font-family`, and `line-height`, pass down from an element to everything inside it. Set them once, on `body`, and the whole page follows.

Do TODO 2. Start with `box-sizing: border-box` on every element: you will see why in Step 8.

### Step 4: specificity

When two rules set the same property on the same element, the more **specific** selector wins:

- An ID (`#main`) beats a class (`.card`), which beats a type (`p`).
- If two selectors are equally specific, the one that comes **later** wins.

```css
p { color: black; }
.note { color: purple; }   /* wins on <p class="note">: a class beats a type */
```

Prefer classes and types, and avoid IDs in CSS: very specific rules are hard to override later. In your developer tools, rules that lost are shown crossed out.

### Step 5: colour and contrast (TODO 4)

Define your colours once, as **custom properties** (also called CSS variables), on `:root`, the whole document:

```css
:root {
  --color-text: #1b1b1f;
  --color-bg: #fdfcf8;
  --color-primary: #5b2a86;
}

body {
  color: var(--color-text);
  background: var(--color-bg);
}
```

Now check every pair of text and background colours with the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). WCAG 2.2 asks for:

- **4.5:1** for normal text;
- **3:1** for large text, and for things like input borders and focus outlines that people need to see.

Write each ratio in a comment next to the colour. A colour that fails can still be used for decoration, but never as the only way to see something.

### Step 6: typography (TODOs 3 and 5)

- **Font stack:** a list of fonts, the first available one wins. Include system fonts for Chinese (`"PingFang SC"`, `"Microsoft YaHei"`), so Chinese text looks right on every device.
- **`rem` units:** `1rem` is the reader's own browser font size. Sizes in `rem` grow when people increase their text size; sizes in `px` do not.
- **A type scale:** each size is a fixed ratio bigger than the last, here 1.25. Headings follow the scale, so the page looks designed rather than random.
- **Line length:** long lines are tiring to read. Limit text to about 65 characters wide with `max-width: 65ch`.
- **Line height:** about 1.5 to 1.6 for body text.

Remember Course 1.1: headings are chosen for **structure**. CSS decides their size. Never pick `<h4>` because it looks smaller.

### Step 7: spacing (TODO 6)

Add a spacing scale, `--space-1` to `--space-6`, and use only those values for `margin` and `padding`. A few consistent sizes make a page feel calm; many random ones make it feel messy.

### Step 8: the box model (TODO 7)

Every element is a box made of four layers: **content**, **padding** (inside space), **border**, and **margin** (outside space). Your browser's developer tools draw it for any element you select.

By default, `width` sets only the content, so adding padding makes a box wider than you asked for. `box-sizing: border-box`, which you added in Step 3, makes `width` include the padding and border. That is why almost every stylesheet starts with it.

Now centre your content: a `max-width` and `margin: 0 auto` on `header`, `main`, and `footer`.

### Step 9: borders and backgrounds (TODO 8)

Give the header a background band and a border, and show the navigation list in a row with `display: inline-block` on its items. (In Course 1.4 you will make it responsive with flexbox.)

Make images and video never wider than their container: `max-width: 100%; height: auto`.

### Step 10: links and focus (TODOs 9 and 12)

- Keep link **underlines**: they tell people what is clickable without relying on colour.
- Make `:visited` links look different.
- Make keyboard **focus** clearly visible on everything: a thick outline in a colour with at least 3:1 contrast. `:focus-visible` shows it for keyboard users without drawing a ring on every mouse click.
- Hide the skip link off-screen, and bring it back when it has focus.

**Never** write `outline: none` without a better replacement. It makes your site unusable with a keyboard.

### Step 11: tables (TODO 10)

`border-collapse: collapse`, padding in every cell, a styled `<caption>`, and a background on the header row. The HTML structure from Course 1.1 stays exactly as it was: CSS changes only the look.

### Step 12: forms (TODO 11)

Style the join page: fieldsets, legends, labels, fields, and the button. Keep field borders at least 3:1 against their background, make radio buttons and checkboxes a little larger, and use `font: inherit` so fields use your font. Then complete the form with the keyboard again: every field must still show focus.

### Step 13: organising your stylesheet

Order your stylesheet from general to specific: tokens, base, typography, layout, components, states. Put a short comment above each section. In six months, you (or someone else) will need to find things quickly.

## Key code explained

**`:root` and `var()`.** `:root` is the whole document; custom properties defined there are available everywhere. `var(--color-primary)` uses one. Change it once, and every use changes.

**`*, *::before, *::after { box-sizing: border-box; }`.** Applies to every element, including decorative ones added by CSS.

**`nav a[aria-current="page"]`.** Selects the link to the current page using the same attribute screen readers use. One source of truth for both.

**`a[href="#main"]:first-child`.** Selects the skip link without adding a class: an attribute selector plus a structural pseudo-class.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html). It frames a 3D scene inside your styled page, and the scene's shapes read their colours from your custom properties, with a few lines of JavaScript (`getComputedStyle`). Change `--color-primary` in `styles.css`, reload, and the page **and** the 3D scene change together.

The shapes use the tokens `--color-primary`, `--color-accent`, and `--color-primary-dark`, set in each shape's `data-token` attribute. If your tokens have different names, change those attributes to match.

That is what a visual system is for: one set of decisions, shared by everything you build, in 2D and in 3D.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Text contrast at least 4.5:1 | 1.4.3 | Readable for people with low vision, and in sunlight. |
| Focus outlines and field borders at least 3:1 | 1.4.11 | People must see where they are and what they can use. |
| Focus is always visible | 2.4.7 | Keyboard users need to know where they are. |
| Links are not identified by colour alone | 1.4.1 | Keep underlines. |
| Text resizes to 200% without loss | 1.4.4 | Use `rem`, not fixed pixel heights. |
| Content reflows at narrow widths | 1.4.10 | `max-width: 100%` on images; no fixed widths. |

## Performance considerations

One stylesheet, cached by the browser after the first page, styles the whole site. System fonts load instantly, work offline, and include Chinese characters: a downloaded web font with Chinese can be several megabytes.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| `outline: none` | Keyboard users cannot see where they are | A clearer focus style, never none |
| Colours chosen without checking contrast | Text some people cannot read | Check every pair |
| Styling by ID everywhere | Rules that are impossible to override | Classes and types |
| Sizes in `px` for text | Text that does not grow with the reader's settings | `rem` |
| Choosing heading levels for size | A broken page outline | Choose by structure, size with CSS |
| A new colour or spacing value every time | A messy, inconsistent site | Use your tokens |

## Troubleshooting

**My styles do nothing.** Check the `<link>` is in the `<head>`, the file is named exactly `styles.css`, and it is in the same folder as the page. In developer tools, the **Network** tab shows whether it loaded.

**A rule is crossed out in developer tools.** Another rule is more specific, or comes later. The panel shows which one won.

**`var(--my-colour)` does nothing.** Check the spelling, including the two hyphens, and that it is defined on `:root`.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: a dark theme, by changing only your custom properties.
2. **[Creative](challenges/challenge-2.md)**: a palette from your own culture or place, with every pair checked.
3. **[Explorer](challenges/challenge-3.md)**: follow the reader's system settings: dark mode and reduced motion.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of your home page and join page, at normal size and at 200% zoom.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: which colour did you have to change after checking its contrast?

## Further reading

- [MDN: CSS styling basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)
- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [MDN: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)
- [W3C: Understanding contrast (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

## Women to Know

**Chen Hui Jing (陈慧晶)** is a self-taught designer and developer, born in Malaysia and working in Singapore, who writes and speaks about CSS for writing systems beyond English, especially vertical Chinese and East Asian typesetting with `writing-mode` and logical properties. She co-founded the Talk.CSS meetup.

The web was first built around English, written left to right. Chen Hui Jing's work shows what CSS can do when it takes every language seriously, including the ones many XR Camp learners speak.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

CSS is written by the W3C's **CSS Working Group**, in many separate modules (Selectors, Cascade, Color, Fonts, and more) that can move forward at different speeds. That is why there is no "CSS4": each module has its own level.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
