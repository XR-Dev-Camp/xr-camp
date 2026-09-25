# Challenge 3: Explorer

**Optional stretch.** Roughly 60–90 minutes.

Set a trap: ask several assistants about an API that does not exist, and see which ones tell you so.

## Task

1. Install a local model runner, Ollama or LM Studio, and download one small open-weight model. Check first that you have enough free disk space: models are often several gigabytes.
2. Choose three assistants: the local model, and two hosted ones (at least one from a different group in Step 2, if you can reach it).
3. Ask each one the same **leading question**, one that assumes something false:
   - "How do I use `element.focusNext()` to move focus after deleting an item?"
   - "What does the `copy` option of `Array.prototype.sort` do?"
4. Then ask a **neutral** question about the same thing: "Is there a DOM method that moves focus to the next focusable element?"
5. For each answer, record: did it say the API does not exist? Did it invent a signature? Did it suggest something real instead? Check every real API it suggested on MDN.
6. Compare the local model with the hosted ones on correctness, speed, and what you had to share.

## Why this matters

A question that assumes something false often gets an answer that plays along. Knowing this changes how you ask: neutral questions first, and "does this exist?" before "how do I use it?". Running a local model also shows you the trade-off between privacy and quality for yourself.

## Done when

- [ ] Three assistants, including one local model, each asked the same two leading questions and one neutral one.
- [ ] A table of results: which invented, which refused, which corrected you.
- [ ] Every real API they suggested is checked on MDN.
- [ ] Three sentences on what you will do differently when you ask.
