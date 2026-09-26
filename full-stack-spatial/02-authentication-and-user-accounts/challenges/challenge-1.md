# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a password-strength hint that never blocks a long-enough password.

## Task

1. In `js/main.js`, add a `<p>` (with an `id`, and `aria-live="polite"`) under the register form's password field, and update its text on every `input` event: something like "9 more characters needed" while the password is too short, and "Long enough" once it reaches `MIN_PASSWORD_LENGTH` (10). Read the length client-side; do not call the server for this.
2. The hint must never disable or block the submit button, and must never claim a password is "weak" for lacking a symbol or a number — this course's rule (Step 3 in the README) is length only, following NIST SP 800-63B. A 24-character passphrase with no symbol at all must show "Long enough."
3. Keep the existing server-side check in `validateCredentials()` exactly as it is: this hint is a courtesy for the learner filling in the form, never a replacement for the check that actually decides whether a password is accepted.
4. Make sure the hint's wording still makes sense to someone using a screen reader: it should not rely on colour alone to say "not yet long enough" versus "long enough."

## Why this matters

A password rule a learner cannot see until they submit the form is a rule that wastes their time, one attempt at a time. A rule that *pretends* to require more than it actually does (or than research supports) trains people to write predictable, hard-to-remember passwords for no real security gain. This challenge is the smallest version of a real, common product decision: tell the truth about the requirement, as early as possible, in as few words as possible.

## Done when

- [ ] The hint updates as you type, without submitting the form.
- [ ] A 24-character passphrase with no symbols shows "Long enough."
- [ ] The submit button is never disabled by this hint.
- [ ] `node --test` still passes unchanged.
