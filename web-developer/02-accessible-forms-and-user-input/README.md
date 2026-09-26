# Accessible Forms and User Input

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `web-developer` · **Lesson:** `accessible-forms-and-user-input-02` · **Time:** about 7 hours · 10 sessions of 45 minutes · about 3 weeks at 4 sessions a week

---

> Build an accessible registration and feedback form.

---

## Learning objectives

By the end of this project you will be able to:

1. Build a form where every field has a visible, programmatically linked label.
2. Choose the right input type and `autocomplete` value for each piece of information.
3. Group related choices with `<fieldset>` and `<legend>`, and use radio buttons, checkboxes, and select menus correctly.
4. Mark required fields clearly, in words as well as in code.
5. Use the browser's built-in validation, and explain its limits.
6. Collect only the data you need, and explain how you will use it.
7. Complete and submit a form using only the keyboard.

## Prerequisites

- **Course 1.1: HTML Foundations.** You built the Riverside Community Centre site (or your own), and this form joins it.
- **Course 0.8: Ethics, Accessibility, Privacy, and Responsible AI.** You know what data minimisation and real consent mean.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | Testing your form | Free |
| A text editor | Writing HTML | Free |
| A screen reader: NVDA (Windows), VoiceOver (macOS, iOS), or TalkBack (Android) | Hearing your form | Free |

## What you will build

A **Join a programme** page for your community site, with two forms:

1. A **registration form**: name, email, an optional phone number, a choice of programme, a preferred day, access needs, and an unticked newsletter box, with a plain-language note on how the information is used.
2. A **feedback form**: a rating in words and an optional comment.

Like Course 1.1, the page has no CSS yet: Course 1.3 styles it.

The reference solution is in [`completed/`](completed/). In your own site, save the page as `join.html`, next to your home page, and link to it from your navigation.

## Folder guide

```text
02-accessible-forms-and-user-input/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Begin here: a page with 9 TODOs
│   ├── thanks.html      # The page your forms send people to
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy `starter/index.html` into your Course 1.1 site folder and rename it `join.html`. Copy `starter/thanks.html` there too.
2. Add a "Join a programme" link to the navigation on your home page.
3. Open `join.html` in your browser and your text editor.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1 (TODOs 1–2) | A form with one labelled field |
| 2 | Step 2 (TODO 3) | Email and phone, with hints |
| 3 | Step 3 (TODO 4) | A programme choice with radio buttons |
| 4 | Step 4 (TODO 5) | A select menu and a text area |
| 5 | Step 5 (TODO 6) | Required fields and built-in validation |
| 6 | Step 6 (TODO 7) | Your privacy note and submit button |
| 7 | Step 7 (TODO 8) | A feedback form |
| 8 | Step 8 (TODO 9), keyboard and screen-reader test | A tested, working page |
| 9 | The **3D moment** | Form controls that shape a 3D object |
| 10 | [`tests/checklist.md`](tests/checklist.md), a challenge, and **Submitting your work** | A finished page |

### Step 1: labels (TODOs 1–2)

```html
<form action="thanks.html" method="get">
  <fieldset>
    <legend>About you</legend>
    <p>
      <label for="name">Full name (required)</label><br>
      <input id="name" name="name" type="text" autocomplete="name" required>
    </p>
  </fieldset>
</form>
```

The `for` on the label must match the `id` on the input. That link does three things: a screen reader announces "Full name, required, edit text"; clicking the label puts the cursor in the field, which gives people with shaky hands a bigger target; and voice-control users can say "click Full name".

**Placeholder text is not a label.** It disappears when you type, is usually too pale to read, and screen readers do not treat it as a label. Always use a real `<label>`.

### Step 2: the right type for each field (TODO 3)

| Information | `type` | `autocomplete` | What it gives people |
| --- | --- | --- | --- |
| Name | `text` | `name` | The browser can fill it in |
| Email | `email` | `email` | A keyboard with `@` on phones; a format check |
| Phone | `tel` | `tel` | A number keypad on phones |

`autocomplete` lets the browser fill in what the person has typed before. That saves everyone time, and it matters especially for people with memory or motor difficulties.

Add a short **hint** explaining why you ask, and link it with `aria-describedby`, so screen readers read it after the label:

```html
<span id="phone-hint">Only if you would like a text reminder before each session.</span>
<input id="phone" name="phone" type="tel" autocomplete="tel" aria-describedby="phone-hint">
```

### Step 3: choices (TODO 4)

A group of related choices needs a `<fieldset>`, and a `<legend>` that asks the question. Screen readers announce the legend when you move into the group, and some repeat it with each option: "Which programme would you like to join? Homework club, radio button, 1 of 5".

Radio buttons that share a `name` form one group: only one can be chosen, and the arrow keys move between them.

### Step 4: menus and longer answers (TODO 5)

- Use a **`<select>`** when there are many options and people choose one. Put a neutral option first ("No preference"), so nobody is forced into a choice they did not make.
- Use a **`<textarea>`** for answers longer than one line.

### Step 5: required fields and validation (TODO 6)

Add `required` to the fields that must be filled in, and say so **in words** in the label: "(required)". Colour or an asterisk alone is not enough.

Now press the submit button with the form empty. The browser stops the form, moves focus to the first problem, and shows a message. With `type="email"`, it also checks the email looks like an email. This is **built-in validation**: free, fast, and accessible.

It has limits: the messages are the browser's, in the browser's language, and they disappear quickly. In Challenge 3 you will build an error summary that stays on the page.

### Step 6: privacy and consent (TODO 7)

Ask yourself, for every field: **does the centre really need this?** It needs a name and a way to reach you. It does not need a date of birth or an ID number.

- The phone number is optional, and the hint says why it is asked.
- Access needs are optional, and the hint says "only share what you are comfortable sharing".
- The newsletter box is **unticked**. Ticked by default is not consent.
- The `<details>` element holds a short, honest note: what is collected, why, how long it is kept, who can see it, and how to ask for it to be deleted.

### Step 7: a feedback form (TODO 8)

Build the second form. Give the rating **words** ("Excellent" to "Very poor"), not only numbers or stars, so the meaning is clear to everyone. Use `maxlength` on the comment box, and say the limit in the hint.

### Step 8: send it, and look (TODO 9)

Fill in and send the registration form. Look at the thank-you page's web address: your answers are in it, after the `?`. That is what `method="get"` does. It is fine for this practice form, and never acceptable for real personal information: real forms use `method="post"` and a server, which you will build in Phase 5.

Then test like a professional:

1. **Keyboard only:** complete and send both forms without a mouse. Tab moves between fields; Space ticks boxes; arrow keys move between radio buttons.
2. **Screen reader:** turn one on and listen to every field. Does each one say what it is and what it needs?
3. **Zoom to 200%:** does everything still fit?

## Key code explained

**`for` and `id`.** Two attributes, one link: the most important line of code in any form.

**`fieldset` and `legend`.** A question and its answers, kept together for everyone.

**`aria-describedby`.** Links extra help to a field, so it is read after the label. It points to an `id`, like `for` does.

**`autocomplete`.** Uses standard tokens (`name`, `email`, `tel`, `street-address`, and more), listed in the HTML standard. They are in English even on a page in another language.

**`<button type="submit">`.** A real button: reachable with Tab, pressed with Enter or Space. Never a `div` pretending to be one, like the one in Course 0.8.

## 3D moment

Open [`starter/3d-moment.html`](starter/3d-moment.html). The same form controls you just built (a select menu, a colour picker, and a slider) now change a 3D object: its shape, colour, and size. As they change, the scene description updates too, and is announced.

Look at the script at the bottom: every control fires an `input` event when it changes. You will write code like this yourself in Course 1.6. For now, notice the idea: **forms are how people talk to software**, whether that software is a registration list or a 3D world.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every field has a visible, linked label | 1.3.1, 3.3.2, 4.1.2 | People know what each field is for. |
| Related choices use `fieldset` and `legend` | 1.3.1 | The question is read with each answer. |
| Required fields are marked in words | 3.3.2 | Not by colour or a symbol alone. |
| Personal fields use `autocomplete` | 1.3.5 | Browsers and assistive tools can fill them in. |
| Errors are identified, with a message | 3.3.1 | People know what went wrong. |
| Nothing already entered has to be typed again | 3.3.7 | Redundant entry is a WCAG 2.2 criterion. |
| Everything works with the keyboard | 2.1.1 | Many people never use a mouse. |

## Performance considerations

Forms made of plain HTML are fast, work on the oldest phones, and keep working when JavaScript fails. The built-in validation you used needs no code at all. Add JavaScript to a form only when HTML cannot do the job.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Using placeholder text instead of a label | The label disappears as people type | Always a visible `<label>` |
| `for` and `id` do not match | The field has no name for screen readers | Check the spelling of both |
| Radio buttons with different `name`s | More than one can be chosen | One shared `name` per group |
| Marking required fields only in red or with `*` | People who cannot see colour miss it | Write "(required)" |
| Asking for data "just in case" | Risk, and less trust | Ask only for what you need |
| Ticking the newsletter box for people | Not real consent | Leave it unticked |

## Troubleshooting

**Clicking the label does not put the cursor in the field.** The label's `for` does not match the field's `id`.

**The form sends even though a field is empty.** Check that `required` is on the field itself, and that the field is inside the `<form>`.

**The browser's error message is in another language.** Built-in messages use the browser's language, not your page's. Challenge 3 shows how to write your own.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a date field and a second menu, correctly labelled.
2. **[Creative](challenges/challenge-2.md)**: translate your form, including its hints and privacy note.
3. **[Explorer](challenges/challenge-3.md)**: build an error summary that stays on the page.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your form, and one of the browser stopping an empty form.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which field did you decide *not* to ask for, and why?

## Further reading

- [W3C: Forms tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [MDN: Web forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)
- [MDN: The `autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)
- [GOV.UK Design System: Question pages](https://design-system.service.gov.uk/patterns/question-pages/)

## Women to Know

**Talita Pagani** is a Brazilian UX and web-accessibility specialist. During her master's degree in computer science, she created **GAIA**, an open set of 28 recommendations for designing web interfaces that are accessible to autistic people. She has been a member of W3C Brasil's Web Accessibility Expert Group.

Forms are where many people get stuck: unclear questions, surprising errors, and too much at once. GAIA's recommendations for clear language and predictable behaviour are the same choices you made in this lesson.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Forms are defined in the **HTML Living Standard** (WHATWG), including every `type` and `autocomplete` token. WCAG 2.2 added a criterion called **Redundant Entry** (3.3.7): do not make people type the same information twice in one process.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
