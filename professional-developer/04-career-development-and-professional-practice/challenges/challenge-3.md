# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add `schema.org` structured data to your CV page, and check that it validates.

## Task

1. Read the [schema.org `Person`](https://schema.org/Person) type reference once, in full, before writing anything.
2. Add a `<script type="application/ld+json">` block to the `<head>` of your `index.html`, describing yourself as a `Person`: at minimum `name`, `jobTitle`, `email`, and a `knowsAbout` list drawn from your real skills table.
3. Keep every value truthful and consistent with the visible page; structured data that contradicts what a visitor can see is worse than none at all.
4. Validate your markup with a JSON syntax check (any JSON validator, or your browser's console with `JSON.parse`) and, if you have internet access to a public validator, a schema.org-aware one.
5. Write two or three sentences in your journal on what a search engine, or another tool, could now do with your page that it could not before.

## Why this matters

A CV that only humans can read is fine for a direct message, but structured data lets other software — a search engine, a job-matching tool, or your own future scripts — understand a page's facts without guessing. It is the same idea behind the `aria-*` attributes and semantic HTML this course has taught throughout: making meaning explicit, for a different kind of reader.

## Done when

- [ ] A valid `application/ld+json` block exists in `index.html`'s `<head>`.
- [ ] Every value in it is truthful and matches the visible page.
- [ ] The JSON is syntactically valid, checked with a real validator.
