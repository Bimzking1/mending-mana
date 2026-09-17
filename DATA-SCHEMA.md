# Data schema

## File

`src/data/latest.json` — the only data file the app reads.

```json
{
  "version": 1,
  "updatedAt": "2026-09-17",
  "dataQuality": "sample",
  "items": []
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `version` | number | Bump on a breaking shape change. |
| `updatedAt` | `YYYY-MM-DD` | Shown in the footer. |
| `dataQuality` | `"sample" \| "verified" \| "mixed"` | Drives the honesty copy in the UI. |
| `items` | `ReferenceItem[]` | See below. |

## `ReferenceItem`

```ts
interface ReferenceItem {
  id: string;              // "coffee-kopi-kenangan-kopi-kenangan-mantan"
  name: string;            // "Kopi Kenangan Mantan"  — a product, never a category
  brand: string;           // "Kopi Kenangan"
  category: CategoryId;    // see below
  subcategory: string;     // "es kopi susu"
  price: number;           // 22000 — integer rupiah, no decimals
  unit: string;            // "cup" | "pcs" | "ticket" | "month" | "trip" | ...
  displayUnit: string;     // "/ gelas" — rendered straight after the price
  emoji: string;           // "☕"
  recognizability: number; // 1–5, how instantly a Jakarta shopper recognises it
  sourceName: string;      // "Kopi Kenangan"
  sourceUrl: string;       // must start with http(s)://
  region: string;          // "Jakarta"
  lastVerified: string;    // YYYY-MM-DD
  isSample: boolean;       // true until a real source confirmed the price
}
```

### Example

```json
{
  "id": "entertainment-cinema-xxi-tiket-reguler-weekday",
  "name": "Tiket Reguler Weekday",
  "brand": "Cinema XXI",
  "category": "entertainment",
  "subcategory": "bioskop",
  "price": 50000,
  "unit": "ticket",
  "displayUnit": "/ tiket",
  "emoji": "🎬",
  "recognizability": 5,
  "sourceName": "Cinema XXI",
  "sourceUrl": "https://21cineplex.com",
  "region": "Jakarta",
  "lastVerified": "2026-09-17",
  "isSample": true
}
```

## `CategoryId`

`coffee` · `food` · `fashion` · `gadget` · `gaming` · `books` · `entertainment` ·
`transport` · `living`

Labels, emoji and the colour tone for each live in `src/lib/categories.ts`. Adding a
category means adding it there **and** to the `CategoryId` union in `src/types/index.ts`.

## Rules

1. **Products, not categories.** `Kopi Kenangan Mantan` ✓ · `Coffee` ✗
2. **Integer rupiah.** No decimals, no strings, no currency symbol.
3. **`displayUnit` reads after a price.** "± Rp22.000 / gelas".
4. **`id` is stable** — `${category}-${slug(brand)}-${slug(name)}`. Never reuse an id
   for a different product; a price change keeps the id.
5. **`isSample: true` unless verified** against `sourceUrl` on `lastVerified`.
6. **One region per record.** Same product in another city is a separate record.
7. **`recognizability` is honest.** 5 = almost everyone knows it, 1 = niche. It feeds
   the selection scoring, so inflating it degrades results.
