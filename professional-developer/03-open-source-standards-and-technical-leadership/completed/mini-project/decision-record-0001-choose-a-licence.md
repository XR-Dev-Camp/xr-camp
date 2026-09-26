# Decision record 0001: choose a licence

A decision record (sometimes called an Architecture Decision Record, or ADR) is a short, dated note that captures one decision, why it was made, and what it costs. It lets someone who joins later understand a choice without having to ask the person who made it.

## Status

Accepted.

## Context

`scene-description-lint` needs a licence before anyone besides its author can legally use, copy, or contribute to it: with no licence at all, copyright law defaults to "all rights reserved," and a project in that state is not really open source, whatever its GitHub visibility says.

## Decision

Chose **MIT** (SPDX identifier `MIT`, from the [SPDX License List](https://spdx.org/licenses/)), recorded in a `LICENSE` file at the project root. MIT was picked over a copyleft licence such as `GPL-3.0-only` because this is a small developer tool meant to be embedded in other people's build steps freely, including in XR Camp learners' own projects, whatever licence those use.

## Consequences

MIT lets anyone use, copy, modify, and redistribute the project, including inside proprietary or differently-licensed work, as long as the original copyright notice stays attached. It does not require anyone's derivative work to be shared back or to use the same licence, which is a deliberate trade-off: it maximises how freely the tool can spread, at the cost of not guaranteeing improvements come back to the project.
