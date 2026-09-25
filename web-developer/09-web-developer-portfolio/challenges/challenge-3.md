# Challenge 3: Explorer

**Optional.** Roughly 45 minutes.

A lightweight mode without pictures, or a print stylesheet. Choose one.

## Option A: a lightweight mode

For people on slow or expensive mobile data.

1. Make a copy of your home page called `light.html`. Remove every `<img>`, and the `<script>` tag.
2. Keep everything else: the words, the links, the headings, and the stylesheet.
3. At the top of `index.html`, add a link: "Using slow or expensive data? Read the lightweight version." Add a link back from `light.html` to the full version.
4. In the Network tab, compare how much each page downloads, and write both numbers in your journal.

## Option B: a print stylesheet

For people who print your portfolio, or save it as a PDF to send to someone.

1. At the end of `styles.css`, add a `@media print { }` block.
2. Inside it: hide the navigation, the skip link, the filter, and the "See my projects" button; set the text to black and the background to white; and stop cards splitting across two pages with `break-inside: avoid;`.
3. Links do not work on paper, so show each link's address after it:

   ```css
   .links a::after {
     content: " (" attr(href) ")";
   }
   ```

4. Check it with your browser's print preview.

## Why this matters

Not everyone reads your portfolio the way you do. Some people pay for every megabyte; some people print things out to read them carefully. Designing for how people really read is the same skill as accessibility.

## Done when

- [ ] **Option A:** `light.html` has all the words and links and no pictures, the two versions link to each other, and you recorded both page sizes.
- [ ] **Option B:** print preview shows no navigation or buttons, black text on white, no cards split across pages, and every project link's address.
