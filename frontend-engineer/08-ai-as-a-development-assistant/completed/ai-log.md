# My AI-use log

Everything I used an AI assistant for in this project, including the answers
I did not use. An honest log is part of the work.

## My rules

1. I never paste passwords, API keys, tokens, private keys, or `.env` files.
2. I never paste personal data: names, emails, phone numbers, addresses, or
   anyone's saved sessions, including my own.
3. I only paste code I have the right to share: my own planner. Not a
   classmate's code, and not code from work.
4. I follow my school's AI rules. Where they are stricter than mine, they win.
5. I log every conversation here, and my review says where AI helped.
6. I keep a line only if I can explain it in my own words. If I cannot, I
   ask again, or I leave it out.
7. One question, one small piece of code, per prompt.

## My assistant

- **Assistant:** a hosted assistant, on its free tier. For item 3, a local
  model in LM Studio, to compare.
- **Kind:** hosted, and local
- **Why:** the hosted one works where I live, and answers in Spanish. The
  local one keeps everything on my laptop, but it is slower, and I had to
  download a file of several gigabytes.
- **What its terms say about my data:** the hosted one may keep my
  conversations and use them to improve its models, unless I switch that
  off in the settings. I switched it off, and I still paste nothing private.

## Log

| Date | Assistant | What I asked for | What I shared | What I kept | Minutes |
| --- | --- | --- | --- | --- | --- |
| 5 Oct | Hosted | Explain `\|\|` in `bySchedule` | The `bySchedule` function | The explanation (item 1) | 10 |
| 5 Oct | Hosted | What `subscribe` returns, and why | `subscribe` and `commit` from `store.js` | The explanation, after testing it (item 2) | 15 |
| 6 Oct | Hosted | Practice: the invented-APIs answer | Nothing: I only read the made-up answer | Nothing: three of four claims were wrong | 30 |
| 7 Oct | Hosted | Review `store.js` for bugs | `store.js` (83 lines, no data) | Nothing (items 3 and 5) | 20 |
| 7 Oct | Local | The same review, to compare | `store.js` | Nothing. It found the same `toggleSession` point, more slowly, and invented a `localStorage.getJSON()` method | 25 |
| 8 Oct | Hosted | Is there an XSS risk in `main.js`? | `main.js` (82 lines) | Nothing (item 4) | 15 |
| 8 Oct | Hosted | Write checks for `describeMinutes` near one hour | `describeMinutes` | Two checks, one corrected (item 6) | 15 |
| 9 Oct | Hosted | Is the form accessible? | The form's HTML, and `showTopicError` | Not its fix; my own (item 7) | 20 |
| 10 Oct | Hosted | Item 1 again, in Spanish | The `bySchedule` function | A comparison, for the review | 10 |
| 12 Oct | Hosted | Explain the 3D moment's three.js code, to compare with the made-up explanation | The 3D moment's code | Nothing new: I checked its claims against the docs, the same way | 30 |

About three hours of AI use in total. About half of that time was checking.
