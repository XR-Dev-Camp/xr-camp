# The Internet and the Web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `the-internet-and-the-web-03` · **Time:** about 5 hours · 7 sessions of 45 minutes · about 2 weeks at 4 sessions a week

---

> Create an interactive diagram explaining what happens when a user visits a website.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain the difference between the internet and the web.
2. Describe what clients, servers, and browsers each do.
3. Take a web address apart: scheme, domain, path, and query.
4. Explain what DNS and hosting are, in plain words.
5. Describe an HTTP request and response, and read common status codes.
6. Explain the difference between static and dynamic sites, and between frontend and backend.

## Prerequisites

- **Course 0.1: Welcome to XR Camp** and **Course 0.2: Computer Fundamentals.**

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | Viewing your diagram, and its developer tools | Free |
| A plain text editor | Writing your explanations | Free |

## What you will build

An interactive diagram of the nine steps between typing a web address and seeing the page, explained in your own words. It works as a plain list; with JavaScript, **Next** and **Previous** buttons walk through it one step at a time.

The reference solution in [`completed/`](completed/) is Ana's diagram. The structure and styling are done for you in the starter: your job is the understanding.

## Folder guide

```text
03-the-internet-and-the-web/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a diagram with 9 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder and rename it `how-the-web-works`.
2. Open `how-the-web-works/index.html` in your browser and your text editor.
3. Press **Next step** a few times. Each step has a heading and a `?` waiting for your explanation.

## The story

### The internet and the web are not the same thing

The **internet** is a global network of networks: cables under the sea, fibre under the streets, radio links to your phone, and the agreed rules (called protocols) that let any computer send a message to any other.

The **web** is one thing that runs on the internet: pages, joined by links, that you read in a browser. Email, video calls, and online games also use the internet without being the web. In Course 0.4 you saw when each was invented: the internet grew from the 1960s; the web arrived in 1989–1990.

### Clients, servers, and browsers

Every visit to a website is a conversation between two computers:

- The **client** asks. When you browse, the client is your **browser**: Chrome, Firefox, Edge, Safari.
- The **server** answers. It is a computer, often in a data centre, whose job is to send pages to anyone who asks.

"Server" describes a job, not a special kind of machine. In Phase 5 you will turn your own computer into one.

### Addresses, names, and numbers

Every computer on the internet has a numeric **IP address**, like `203.0.113.25`. People remember names better than numbers, so we use **domain names** like `example.org`. You can rent a domain name of your own from a company called a registrar.

The **Domain Name System (DNS)** is the internet's address book: it turns names into numbers. Your browser asks a DNS resolver, usually run by your internet provider, "what is the number for `example.org`?", and remembers the answer for a while.

**Hosting** means renting space on a server to keep your website's files, so it is online all the time. In Course 1.8 you will publish your own site for free.

### Requests and responses

The browser and the server talk using **HTTP**, the Hypertext Transfer Protocol. The browser sends a **request** ("GET me this page"), and the server sends back a **response**: a status code and the content. The `s` in `https` means the conversation is encrypted, so nobody between you and the server can read or change it.

| Status code | Meaning |
| --- | --- |
| `200` | OK: here is your page |
| `301` | Moved: the page lives at a new address |
| `404` | Not found |
| `500` | The server had a problem |

### Static and dynamic, frontend and backend

A **static** site is a set of files that are sent exactly as they are: the pages you have built so far are static. A **dynamic** site builds each page when you ask for it, often from a database: a social network shows everyone a different home page at the same address.

The **frontend** is everything that runs in the browser: HTML, CSS, JavaScript. The **backend** is everything that runs on the server: databases, accounts, saving your data. XR Camp teaches the frontend first (Phases 1–4), then the backend (Phase 5). A **web application** combines both.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read **The internet and the web** and **Clients, servers, and browsers**; TODO 1 | Your diagram open, with your name on it |
| 2 | Read **Addresses, names, and numbers**; TODOs 2–3 | Your own address, taken apart |
| 3 | TODO 4: steps 1–2 | The name becomes a number |
| 4 | Read **Requests and responses**; TODOs 5–6: steps 3–6 | The conversation between browser and server |
| 5 | Read **Static and dynamic**; TODOs 7–8: steps 7–9 | The whole journey |
| 6 | TODO 9, then [`tests/checklist.md`](tests/checklist.md) | A finished diagram |
| 7 | One challenge extension, then **Submitting your work** | Your diagram in your portfolio |

### Writing each step

For each step, write one or two sentences **in your own words**. Imagine explaining it to a friend who has never thought about it. If you can explain it simply, you understand it.

Then press **Next step** and **Previous step** to read your diagram the way a visitor will.

## Key code explained

**The buttons start hidden.** The `controls` element has the `hidden` attribute. The script removes it only after it has run. If JavaScript fails or is switched off, visitors see all nine steps as a normal list, and never see buttons that do nothing. This is called **progressive enhancement**: start with something that works, then improve it.

**`tabindex="-1"` and `focus()`.** When you press **Next step**, the script moves keyboard focus to the new step. A screen reader then reads it straight away. `tabindex="-1"` lets a list item receive focus from a script without adding it to the Tab order.

**`aria-live="polite"`.** The "Step 3 of 9" message is in a live region, so screen readers announce it when it changes.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Works without JavaScript | Good practice (not a WCAG rule) | Every visitor gets the full content. |
| Focus moves to the new step | 2.4.3 | Keyboard and screen-reader users are taken to what changed. |
| Colours are not the only way to tell the URL parts apart | 1.4.1 | Each part is also named in the list below it. |
| Disabled buttons are clearly disabled | 4.1.2 | They look different, and are marked `disabled`, so screen readers say so. |

## Performance considerations

The page has no images, and its CSS and script are inside the HTML file, so it loads in a single request: just the HTML. Count your own page's requests in Challenge 3, then compare with a big news site.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Saying "the internet" when you mean "the web" | Confusion later, with email, games, and apps | The web runs on the internet |
| Thinking a server is a special kind of computer | It sounds harder than it is | A server is any computer answering requests |
| Copying the guide's sentences | You finish without understanding | Write each step in your own words |

## Troubleshooting

**The buttons do not appear.** Check that you did not delete the `<script>` at the bottom, and that every `<li>` still has its closing `</li>`.

**Next step shows an empty box.** You deleted a step's text. Undo, or copy the step from the starter again.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: take apart five real web addresses.
2. **[Creative](challenges/challenge-2.md)**: trace the undersea cables that bring the internet to your country.
3. **[Explorer](challenges/challenge-3.md)**: count a real page's requests in your browser's developer tools.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your diagram at one step, and one with all steps showing.
3. Keep both in your learner journal. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which step surprised you most?

## Further reading

- [MDN: How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [MDN: What is a domain name?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name)

## Women to Know

**Hu Qiheng (胡启恒)** led the project that gave China its first full connection to the internet, on 20 April 1994. As vice president of the Chinese Academy of Sciences, she persuaded the US National Science Foundation to allow it. In 1997 she founded the China Internet Network Information Center (CNNIC), which manages China's `.cn` domain names: the same kind of address book you learned about in this lesson. She was inducted into the Internet Hall of Fame in 2013.

Every step in your diagram depends on networks being connected to each other. For hundreds of millions of people, that connection began with Hu Qiheng's work.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

HTTP is maintained by the **IETF** (Internet Engineering Task Force) and written up in documents called RFCs, which anyone can read. DNS is also an IETF standard, and **ICANN** coordinates domain names and IP addresses worldwide. You will meet these organisations again in Course 0.7.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
