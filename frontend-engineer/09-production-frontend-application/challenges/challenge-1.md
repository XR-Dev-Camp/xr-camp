# Challenge 1: Foundation

A small required change that confirms you understood the core idea. About 45 minutes.

## Task

1. Choose one small piece of text the app does not yet show anywhere — for example, a short welcome sentence on the dashboard, or a label for the weather city select's helper text.
2. Add its key to all three locale files (`en.js`, `es.js`, `zh-Hans.js`), writing the Spanish and Chinese yourself (or with an AI assistant, logged honestly in `ai-log.md`) — a short, honest attempt is enough; it does not need to be perfect.
3. Use it in the page with `t('your.key')`, or `data-i18n="your.key"` if it never needs a parameter.
4. Switch languages with the language switcher, and confirm your new text changes too.

## Why this matters

Adding one new string by hand, end to end — key, three translations, and one place it is used — is the smallest unit of "multilingual-ready". If you can do it once, correctly, you can do it a hundred times, which is what a real application eventually needs.

## Done when

- [ ] The new key exists in all three locale files.
- [ ] It appears correctly in English, Spanish, and Simplified Chinese.
- [ ] `node scripts/validate-projects.mjs` still passes.
