# Challenge 3: Explorer

**Optional.** Roughly 45 minutes.

Follow the reader's system settings: dark mode and reduced motion.

## Task

1. Add a media query that switches your tokens to dark values when the reader's device is in dark mode:

   ```css
   @media (prefers-color-scheme: dark) {
     :root {
       --color-text: #f1edf7;
       --color-bg: #16121f;
       /* ...your other dark values... */
     }
   }
   ```

2. Add a hover transition to your buttons, then turn it off for people who ask for less motion:

   ```css
   button { transition: background-color 0.2s; }

   @media (prefers-reduced-motion: reduce) {
     * { transition: none !important; animation: none !important; }
   }
   ```

3. Switch your device between light and dark mode, and turn on "reduce motion" in its settings, to test both.

## Why this matters

People choose these settings for good reasons: light sensitivity, migraines, vestibular disorders, saving battery. Respecting them is one line of CSS each, and it is the same `prefers-reduced-motion` setting your 3D scenes respect.

## Done when

- [ ] Your site switches to dark colours when the device is in dark mode, and passes contrast.
- [ ] Transitions stop when reduced motion is on.
