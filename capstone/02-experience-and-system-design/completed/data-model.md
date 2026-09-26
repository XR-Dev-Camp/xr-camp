# Data model

## Content types

1. Exhibit object
2. Gallery room

### Content type 1: Exhibit object

| Field | Required? | Description |
| --- | --- | --- |
| `id` | Yes | A short, unique, URL-safe identifier |
| `title.en` | Yes | The object's title in English |
| `description.en` | Yes | Two to three sentences describing the object |
| `material` | No | What the object is made of, if known |
| `approximateDate` | No | An approximate date or period, if known |
| `roomId` | Yes | Which gallery room this object belongs to |

Relationships: many exhibit objects belong to one gallery room (`roomId` refers to a Gallery room's `id`).

### Content type 2: Gallery room

| Field | Required? | Description |
| --- | --- | --- |
| `id` | Yes | A short, unique, URL-safe identifier |
| `name.en` | Yes | The room's name in English |
| `objectIds` | Yes | An ordered list of the exhibit objects it contains |

Relationships: one gallery room has many exhibit objects, in a fixed display order.
