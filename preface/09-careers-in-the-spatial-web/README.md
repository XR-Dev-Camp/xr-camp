# Careers in the Spatial Web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `preface` · **Lesson:** `careers-in-the-spatial-web-09` · **Time:** about 4 hours · 6 sessions of 45 minutes · about 2 weeks at 4 sessions a week

---

> Create a personal career pathway and skills map.

---

## Learning objectives

By the end of this project you will be able to:

1. Describe twelve roles in web, 3D, and immersive development, and what each one does day to day.
2. Choose roles that fit your interests and your life, and explain why.
3. Map the skills those roles need to where XR Camp teaches them.
4. Assess honestly where you are now.
5. Plan realistic milestones, with dates, based on the time you actually have.

## Prerequisites

- **Courses 0.1–0.8.** You have seen what the spatial web is and how it is built.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser | Your career page | Free |
| A plain text editor | Writing your plan | Free |
| Your calendar | Real dates for your milestones | Free |

## What you will build

A personal career page: the three roles you are aiming for and why, a skills map showing where XR Camp teaches each skill and where you are now, a pathway with real dates, and the people you will learn from.

The reference solution in [`completed/`](completed/) is Ana's plan. Yours will be different, and it should be.

## Folder guide

```text
09-careers-in-the-spatial-web/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: your career page, with 6 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy this lesson's `starter` folder into your `xr-camp` folder and rename it `my-career`.
2. Open `my-career/index.html` in your browser and your text editor.
3. Scroll to the bottom: the twelve roles are described there.

## The story

### There is no single "tech job"

People often imagine technology work as one person typing code alone. In reality, a team building an immersive museum might include a designer who talks to visitors, a developer who builds the pages, a technical artist who prepares the 3D models, an accessibility specialist who tests with screen-reader users, and someone who writes the documentation and teaches others. Each of those is a career.

### Twelve roles

| Role | What they do | Where XR Camp teaches it |
| --- | --- | --- |
| **Frontend developer** | Builds the parts of websites and apps that people see and use | Phases 1–2 |
| **Web and UX designer** | Designs how products look, feel, and work, based on research with real users | Every phase, especially 1 and 4 |
| **Accessibility specialist** | Makes sure products work for disabled people, and tests with assistive technology | Every lesson, especially 1.5 and 4.4 |
| **JavaScript engineer** | Writes the logic behind interactive applications | Phases 1, 2, and 5 |
| **Web3D and XR developer** | Builds 3D and immersive experiences that run in a browser | Phases 3 and 4 |
| **Spatial UX designer** | Designs how people move, point, and stay comfortable in 3D and XR | Course 4.3 |
| **Technical artist** | Prepares 3D models, materials, and effects so they look good and run fast | Phase 3 |
| **Geospatial developer** | Builds maps and applications that work with location data | The optional geospatial track |
| **Digital twin developer** | Builds live 3D copies of real places, connected to sensor data | Phases 3 and 5 |
| **AI-assisted developer** | Uses AI tools to build faster, while checking and understanding every result | Courses 2.8 and 5.6 |
| **Standards contributor** | Helps write the web's standards | Courses 0.7 and 6.3 |
| **Developer advocate and educator** | Teaches developers, writes documentation, and builds communities | Courses 6.3 and 6.5 |

Many people move between these roles over a career, and most real jobs mix two or three.

### Ways to work

- **Employed** by a company or organisation, in an office or remotely: remote work means your job does not have to be in your city.
- **Freelance:** building projects for clients, one at a time. You will learn the basics in Course 6.4.
- **Your own product or studio.**
- **Nonprofit and public-interest work:** museums, schools, health, and community organisations need these skills too.

### Making a plan that fits your life

XR Camp is long, because it takes you all the way to professional. A plan that ignores your real life will not survive the first busy week. Start from the time you actually have: if you can study four 45-minute sessions a week, each lesson tells you how many weeks it takes. Every phase ends with something real you can show, so progress is visible even before you finish.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read **There is no single "tech job"** and **Twelve roles**; TODOs 1–2 | Three roles chosen |
| 2 | TODO 3: why each role | Your reasons, in your own words |
| 3 | TODO 4: your skills map | An honest picture of where you are |
| 4 | Read **Making a plan**; TODO 5 with your calendar | Real milestones, with dates |
| 5 | TODO 6, then [`tests/checklist.md`](tests/checklist.md) | A finished career page |
| 6 | One challenge extension, then **Submitting your work** | Your plan in your portfolio |

### Being honest in your skills map (TODO 4)

Use only three levels: **Not yet**, **Started**, **Confident**. There is no shame in "Not yet": that is what XR Camp is for. The map is only useful if it is true, and you will update it at the end of every phase.

## Key code explained

**`class="role mine"`.** An element can have several classes, separated by spaces. Every role card has the class `role`; the three you choose also have `mine`, which the CSS gives a thick border. That is how one word in your HTML changes how the page looks.

**The skills table.** Skills are rows, with `<th scope="row">`, so a screen reader announces "JavaScript, Where I am now, Not yet" rather than a lone "Not yet".

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Chosen roles are also listed in words, not only highlighted | 1.4.1 | The border is not the only way to tell. |
| The skills table has a caption and headers | 1.3.1 | Each level stays linked to its skill. |
| Headings in order | 1.3.1, 2.4.6 | Easy to navigate. |
| `lang` matches your language | 3.1.1 | Correct pronunciation. |

## Performance considerations

Plain HTML and CSS: instant to load. A career page is often read by a recruiter on a phone between meetings: fast and simple is professional.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Choosing roles for their titles | A plan that does not fit you | Choose what you would enjoy doing every day |
| Marking everything "Confident" | The map stops being useful | Be honest; update it every phase |
| Milestones without dates | They slip forever | Use real dates from your calendar |
| Planning for time you do not have | Giving up after a busy week | Plan for your real week |

## Troubleshooting

**The thick border does not appear.** Check the spelling: `class="role mine"`, with a space, inside the quotes.

**I do not know which roles I want.** That is normal. Choose the three you are most curious about now; you will change them later.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: interview someone who works in technology.
2. **[Creative](challenges/challenge-2.md)**: map the technology roles in your own region.
3. **[Explorer](challenges/challenge-3.md)**: turn your roles into a 3D constellation in A-Frame.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of your career page.
3. Keep it in your learner journal, and put a reminder in your calendar to update it at the end of Phase 1. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: what is the first milestone on your path, and when will you reach it?

## Further reading

- [MDN: Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)
- [W3C: Accessibility roles and responsibilities](https://www.w3.org/WAI/planning/arrm/)

## Women to Know

**Mariana Costa Checa** is a Peruvian social entrepreneur who, in 2014, co-founded **Laboratoria**, an organisation born in Lima that helps women who face barriers to technology careers, many from low-income backgrounds, get jobs in technology across Latin America. It began by training them as web developers and UX designers.

Laboratoria started from the same idea as XR Camp: talent is everywhere, but opportunity is not. Thousands of women have changed careers through it, many of them starting exactly where you are now.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

Web standards create careers as well as technologies. Because HTML, CSS, and JavaScript are open standards that work the same in every modern browser, and WebXR is built the same way, the skills you learn at XR Camp are not tied to one company or one country: they transfer to any job, anywhere the web works.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
