# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Add a profile field of your own choosing, private by default.

## Task

1. Pick one small, optional field that means something to you: a display name in your own language, a short "about me," a pronoun, or a link to something you made. Add it to the account object in `store.js` (a new key next to `privacySharesSettings`), defaulting to an empty string or `false` when an account is created.
2. Add a route (or extend `updatePrivacy` into a more general `updateProfile`) that lets the signed-in account change only *its own* field — reuse the ownership pattern from Step 12 (`auth.account.id`, never a body-supplied id) and the CSRF check from Step 8.
3. Decide, and write down in a comment, whether your new field is private by default (like `privacySharesSettings`) or public by default (like the username) — and make sure `exportAccount()` and, if it is private, `listSharedAccounts()` treat it accordingly.
4. Add it to the account form or the privacy section in `index.html`, with a visible label, and wire it up in `js/main.js`.

## Why this matters

Every account system eventually grows fields beyond "username and password" — and every one of those fields needs the same question asked and answered on purpose: who can see this, by default? Deciding that deliberately, for a field that means something to you, is more memorable than reading the rule in the abstract.

## Done when

- [ ] Your new field round-trips through save and reload, for your own account only.
- [ ] You can state, in one sentence, why you chose public or private by default.
- [ ] `node --test` still passes, with at least one new test for the field.
