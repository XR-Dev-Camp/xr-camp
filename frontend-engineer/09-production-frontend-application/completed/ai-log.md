# My AI-use log

Everything I used an AI assistant for while building My XR Camp 1.0,
including the answers I did not use. An honest log is part of the work (see
Course 2.8). This is a filled-in example: yours will name your own choices.

## My rules

1. Never paste secrets (passwords, API keys, tokens) into a prompt.
2. Never paste another person's personal data into a prompt.
3. Only share code I have the right to share.
4. Follow my school or workplace's AI rules, if it has any.
5. Log every conversation I use for real work, not just the ones that go well.
6. Only keep code I can explain myself, line by line.
7. One question, or one small piece of code, per prompt: easier to check.

## My assistant

- **Assistant:** a general-purpose AI coding assistant.
- **Kind:** a large language model, used through a chat or editor integration.
- **Why:** it is fast at drafting repetitive code (like a locale file with
  many similar keys) and at explaining error messages, so I can spend my
  time on decisions it cannot make for me, like what the app should do.
- **What its terms say about my data:** I read the assistant's terms before
  using it. I assumed prompts could be reviewed for safety, so I never
  pasted secrets or anyone else's personal data (see My rules, above).

## Log

| Date | Assistant | What I asked for | What I shared | What I kept | Minutes |
| --- | --- | --- | --- | --- | --- |
| 2026-09-20 | (assistant) | Explain the difference between `localStorage` "storage" events and a custom event, for cross-tab sync | Two short code snippets, no project data | The explanation; I wrote `progress-store.js`'s listener myself | 10 |
| 2026-09-22 | (assistant) | A first draft of Spanish strings for `es.js`, from my English list of keys | The English key list only | A draft, which I then reviewed myself, word by word, and flagged in the README as needing native review | 35 |
| 2026-09-24 | (assistant) | Why does `Intl.PluralRules` choose "one" for some counts and not others in Chinese? | The question only | An explanation; I decided myself to keep Chinese plurals to a single "other" form | 15 |
| 2026-09-25 | (assistant) | Review my `sw.js` fetch handler for a bug where offline navigation showed the browser's own error page | The file, with no project-identifying comments removed (it already had none) | One fix: awaiting `caches.match('offline.html')` inside the `catch` block | 20 |

About 80 minutes of AI use in total. About a third of that time was
reviewing and correcting what it suggested, especially the draft translations.
