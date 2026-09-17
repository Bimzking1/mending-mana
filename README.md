# Mending mana?

Masukin harga barang yang mau kamu beli, lihat uang segitu ternyata bisa jadi apa aja.

This repository is the **UI slice**: the full visual system, screens, components and
interaction flow are built and working against static sample data. The data pipeline
(scraper, normalisation, real prices) is intentionally left as a documented skeleton for
whoever picks it up next — start with **[HANDOFF-PROMPT.md](./HANDOFF-PROMPT.md)**.

## What is done

- Design tokens (colour, type, radius, shadow) for light and dark mode
- Mobile-first app shell, header, footer, skip link, theme toggle
- Home screen with looping "Rp500 ribu bisa jadi…" preview
- Input flow: item name, large rupiah field with quick-add, category chips
- Reveal transition into the result screen
- Comparison cards, results grid (1 / 2 / 3 columns), empty states
- Copy-result action; share/image architecture prepared
- 200 sample reference products across 9 categories
- Comparison engine with diversity caps, quantity appeal, recognizability and price-tier scoring
- Unit tests (vitest) for the comparison engine
- Changelog screen with versioned product updates
- Scraper folder structure, contract, and the normalise / validate / deduplicate utilities

## What is not done

- Real, verified prices (everything in `src/data/latest.json` has `isSample: true`)
- The scraper itself (`collect`, `categorize`, `diff`, `merge`, `export` are stubs that exit 1)
- URL routing / deep links, analytics, image export, region switch

## Tech stack

React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · Lucide React · Vitest · static JSON.
No backend, no database, no auth, no AI API. Deploy target: Netlify.

shadcn/ui was not installed as a dependency: the app needs three primitives
(`Button`, `Chip`, `Card`), so they live in `src/components/ui/` written in the same
style (cva + `cn`). Adding the full shadcn CLI later works without changes.

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  → dist/
npm run preview
npm run typecheck
npm test           # vitest run
```

Sample data is generated, not hand-edited:

```bash
node scripts/seed.mjs   # rewrites src/data/latest.json
```

## Project structure

```
src/
├── components/
│   ├── ui/            Button, Chip, Card
│   ├── AppShell.tsx   header + footer + skip link
│   ├── BrandLogo.tsx  wordmark
│   ├── Hero.tsx  TickerPreview.tsx  AboutSection.tsx
│   ├── PurchaseForm.tsx  CurrencyInput.tsx  CategorySelector.tsx
│   ├── ComparisonResults.tsx  ComparisonCard.tsx
│   ├── ProductIcon.tsx  PriceDisplay.tsx  QuantityDisplay.tsx
│   ├── EmptyState.tsx  ThemeToggle.tsx
├── screens/           HomeScreen, InputScreen, ResultScreen, AboutScreen, ChangelogScreen
├── lib/               compare, format, share, categories, referenceData, cn
├── hooks/             useTheme
├── types/             all domain types
├── data/latest.json   reference products
├── data/changelog.ts  versioned changelog entries
└── index.css          design tokens
scraper/               pipeline skeleton + contract
scripts/seed.mjs       sample data generator
```

## Data architecture

`src/lib/referenceData.ts` is the only module that touches the JSON. Components talk to
the types in `src/types/index.ts`. Replacing the file with a fetch or an API client is a
one-file change. Schema and rules: [DATA-SCHEMA.md](./DATA-SCHEMA.md).

## Adding reference products (manually)

Add a row to the table in `scripts/seed.mjs`, run it, commit the regenerated JSON.
Rules that matter: specific products only (`Kopi Kenangan Mantan`, not `Coffee`), real
brand, a `displayUnit` that reads naturally after a price, and `isSample: true` until a
price is verified against a source.

---

## How to use the scrapers

The scraper is a **documented pipeline skeleton**. `normalize.ts`, `validate.ts` and
`deduplicate.ts` work. The remaining stages (`collect`, `categorize`, `diff`, `merge`,
`export`) are placeholders that print "not implemented" and exit 1 until a future session
implements them.

### 1. What you want

The goal is to build a **clean, verified list of recognisable Indonesian products**
(200–300 quality items) where each product has a price you can trace back to a real page:

```
Kopi Kenangan Mantan → Rp22.000 (kopikenangan.com)
Cinema XXI Regular   → Rp50.000 (21cineplex.com)
Uniqlo AIRism T-Shirt → Rp199.000 (uniqlo.com)
```

Everything in `src/data/latest.json` is currently **sample data** (`isSample: true`).
The scraper exists so a future AI/developer can replace those sample prices with real ones
without breaking the UI.

### 2. What you need to do

At a minimum, **implement the pipeline stages**. SCRAPER.md is the specification — read it
first. The files below are stubs that need real implementations:

```
scraper/collect.ts      # runs all source adapters, merges their rows
scraper/categorize.ts   # (optional) assigns/validates category labels
scraper/diff.ts         # compares a collection against latest.json
scraper/merge.ts        # applies an approved diff into latest.json
scraper/export.ts       # writes merged set back to src/data/latest.json
```

Then **write source adapters** under `scraper/sources/<category>/<brand>.ts` for
individual sites (e.g. `coffee/kopi-kenangan.ts`). Each adapter:

```ts
import type { SourceAdapter, ScrapedItem } from "../../types.ts";

const adapter: SourceAdapter = {
  id: "coffee/kopi-kenangan",
  category: "coffee",
  async collect(): Promise<ScrapedItem[]> {
    // fetch, parse, or read a committed HTML fixture
    return rows; // ScrapedItem[]
  },
};
export default adapter;
```

### 3. Command reference

| Command | What it does | Current status |
| --- | --- | --- |
| `npm run dev` | Start the dev server | ✅ works |
| `npm run build` | Typecheck + production build | ✅ works |
| `npm test` | Run vitest unit tests | ✅ works |
| `npm run data:validate` | Validate all records in `latest.json` | ⚠️ stub |
| `npm run scrape` | Run every registered source adapter | ⚠️ stub |
| `npm run scrape:source -- <id>` | Run a single adapter, e.g. `coffee/kopi-kenangan` | ⚠️ stub |
| `npm run data:diff` | Compare a new collection against `latest.json` | ⚠️ stub |
| `npm run data:merge` | Merge an approved diff into `latest.json` | ⚠️ stub |
| `npm run data:publish` | Write the merged set, bump version/metadata | ⚠️ stub |

> ⚠️ "stub" means the script exists but currently exits 1 with "not implemented".
> The pipeline stages are *documented* (see next section) but need an AI/dev session to
> implement them — don't run them expecting real output yet.

### 4. The intended pipeline

```
npm run scrape
      ↓  collects from all scraper/sources/* adapters
collections/collection-2026-09-17-13-25.json   (timestamped, never overwritten)
      ↓
npm run data:diff      compares newest collection vs src/data/latest.json
(added / priceChanged / removed / suspectedDuplicates)
      ↓
npm run data:merge     applies an approved diff
      ↓
npm run data:publish   writes src/data/latest.json, bumps updatedAt
```

### 5. Normalization rules

`scraper/normalize.ts` converts these formats to an integer price:

```
Rp25.000 → 25000
Rp 25.000 → 25000
25.000    → 25000
Rp25,000  → 25000
25k       → 25000
25K       → 25000
1,5jt     → 1500000
```

It rejects zero/negative prices, missing product names, malformed URLs and invalid records.

### 6. Validation rules

`scraper/validate.ts` rejects records with: missing name, missing brand, non-integer or
zero/negative price, price above Rp1.000.000.000, malformed `sourceUrl`, missing category.
Rejected rows are reported with a reason — never dropped in silence.

### 7. Deduplication

Exact matches on `normalizeKey(brand, name)` are merged (newest `collectedAt` wins).
Near matches (`Fore Latte` vs `Fore Coffee Latte`) are flagged as `suspected` for human
review, never deleted silently.

### 8. Collection file format

```json
{
  "collectedAt": "2026-09-17T13:25:00+07:00",
  "sources": ["coffee/kopi-kenangan", "coffee/fore"],
  "stats": { "raw": 214, "valid": 198, "unique": 186, "suspected": 4 },
  "items": []
}
```

### 9. Rules that must never be broken

No paid service, no API key, no headless browser unless there is no alternative.
Respect `robots.txt` and rate limits; one request at a time with a delay.
A scraper run writes a NEW timestamped file and never overwrites one.
Only `merge` may touch `src/data/latest.json`, and only from an approved diff.
A price change over ±40% is flagged for review, not applied silently.
`isSample` stays true unless the price was confirmed against a live `sourceUrl`.

More detail: [SCRAPER.md](./SCRAPER.md) and [DATA-SCHEMA.md](./DATA-SCHEMA.md).

---

## Deployment

`netlify.toml` is committed: build `npm run build`, publish `dist`, SPA fallback to
`index.html`. Connect the repo to Netlify and no further configuration is needed.

## Roadmap

1. Real prices for the top ~200 reference products
2. Scraper pipeline (collect → normalise → validate → dedupe → diff → merge → publish)
3. Region switch (Jakarta / Bandung / Surabaya) — `region` is already on every record
4. Shareable result image
5. URL state so a result can be linked