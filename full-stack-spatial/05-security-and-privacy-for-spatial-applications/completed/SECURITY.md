# Security policy

This is a course project (XR Camp, Course 5.5), not a production service. It runs only on `127.0.0.1`, holds no real user data, and is not monitored. This file exists anyway, because writing one is part of what this lesson teaches: a real project should always say, in one predictable place, how it wants a security issue reported. This is loosely modeled on [IETF RFC 9116](https://www.rfc-editor.org/rfc/rfc9116), "A File Format to Aid in Security Vulnerability Disclosure" (`security.txt`) — the standardised idea this file borrows from, without adopting its exact machine-readable format, since this is a single teaching repository rather than a service with its own domain.

## Supported versions

This is a single, unversioned lesson. Only the code in [`completed/`](.) is the maintained, fixed reference; [`../starter/`](../starter/) is deliberately vulnerable, on purpose, and is not a target for a security report — its bugs are the lesson.

## Reporting a vulnerability

If you find a security issue in this lesson's `completed/` code that is not one of the seven the lesson already reviews (see the main [README](../README.md)'s "What went wrong, and how it was fixed"):

1. **Do not open a public GitHub issue.** A public issue announces the problem to everyone, including anyone who might misuse it, before a fix exists.
2. Report it the way this repository's own [`.github/SECURITY.md`](../../../.github/SECURITY.md) asks for project-wide issues, since this lesson is part of that same repository.
3. Include what you found, how to reproduce it, and what you think its impact is. You do not need to already have a fix.
4. Expect an acknowledgement, then a fix or an explanation of why it is out of scope (for example, a design trade-off this lesson already names on purpose, like the account recovery model Course 5.2 describes).

## What responsible disclosure means here

Responsible (or "coordinated") disclosure means telling the people who can fix a problem before telling the world, and giving them reasonable time to fix it before any public detail is shared. It protects the people who would otherwise be exposed by an unfixed, publicly known bug — which, for a real spatial application handling accounts and location data, could mean their account, their messages, or where they have been.

## What this project does, and does not, promise

`completed/` fixes the seven vulnerabilities this lesson set out to teach, each checked against a specific standard or cheat sheet (see the README). It has not had an independent security audit, has no bug bounty, and — like Course 5.2's account design says of itself — is "a learning prototype, not production security advice." Treat it as a worked example of a review process, not as a codebase to copy into a real product without its own review.
