# Challenge 3: Explorer

**Optional and advanced.** Roughly two hours.

Add machine-readable structured data and a written accessibility statement.

## Task

### Part A — Structured data

Search engines and assistive tools can understand your page better if you describe it in a format built for machines. Add a `<script type="application/ld+json">` block to your `<head>` using [schema.org](https://schema.org/) vocabulary — `Organization` or `LocalBusiness` suits a community page.

Include the name, address, telephone, and opening hours. Test it with the [Schema Markup Validator](https://validator.schema.org/).

Note what you are doing here: stating the same facts twice, once for people and once for machines. Consider what happens when the two fall out of step.

### Part B — Accessibility statement

Add `accessibility.html` describing, honestly:

- What you did to make the page accessible.
- How you tested it, and with what.
- What you know is still not right.
- How someone can report a problem to you.

## Why this matters

Part A is how the web became machine-readable, and it is the direct ancestor of the spatial and semantic data work in Phases 4 and 5.

Part B matters more. Many public bodies are legally required to publish an accessibility statement, and most such statements are dishonest — claiming full compliance where none exists. Writing an honest one, including the parts you did not manage, is a professional habit worth forming now. Nobody ships a perfectly accessible site. Saying so plainly is what separates a professional from a marketer.

## Done when

- [ ] The structured data passes the Schema Markup Validator with no errors.
- [ ] The facts in your structured data match the visible page exactly.
- [ ] `accessibility.html` exists, is linked from the footer, and names at least one real limitation.
- [ ] You tested with an actual screen reader and described what you found.
