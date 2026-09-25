# The old planner: behaviour and smells

Fill this in before you change any code (TODOs 1 and 2). Open `old/index.html`
through your local server and try everything.

## TODO 1: What does it do?

Write one line for every behaviour you can find. When you have refactored, the
new planner must still do every one of them (unless you fix it on purpose, in
the "Deliberate changes" section below).

- [ ] Shows a form with a day, a time (19:00 to start), and a topic.
- [ ] Adding a session puts it in "Still to do".
- [ ] Sessions are sorted by day, then by time.
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 

## TODO 2: What is wrong with how it is written?

Find at least eight code smells in `old/app.js`. For each, write the line
number and one sentence. Two to get you started:

| Line | Smell | Why it hurts |
| --- | --- | --- |
| 2 | The name `a` says nothing | You must read the whole file to learn it holds the sessions |
| 44 | The number 45 has no name | If sessions change length, you must find every 45 |
| | | |
| | | |
| | | |
| | | |
| | | |
| | | |

## Deliberate changes

Things you will change on purpose, not by accident. Write each one here, and
make each one in its own commit, after the refactor.

- 
