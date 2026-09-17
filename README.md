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
- 69 sample reference products across 9 categories
- Scraper folder structure, contract, and the normalise / validate / deduplicate utilities

## What is not done

- Real, verified prices (everything in `src/data/latest.json` has `isSample: true`)
- The scraper itself (`collect`, `categorize`, `diff`, `merge`, `export` are stubs that exit 1)
- URL routing / deep links, analytics, image export, tests

## Tech stack

React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · Lucide React · static JSON.
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
├── screens/           HomeScreen, InputScreen, ResultScreen, AboutScreen
├── lib/               compare, format, share, categories, referenceData, cn
├── hooks/             useTheme
├── types/             all domain types
├── data/latest.json   reference products
└── index.css          design tokens
scraper/               pipeline skeleton + contract
scripts/seed.mjs       sample data generator
```

## Data architecture

`src/lib/referenceData.ts` is the only module that touches the JSON. Components talk to
the types in `src/types/index.ts`. Replacing the file with a fetch or an API client is a
one-file change. Schema and rules: [DATA-SCHEMA.md](./DATA-SCHEMA.md).

## Adding reference products

Add a row to the table in `scripts/seed.mjs`, run it, commit the regenerated JSON.
Rules that matter: specific products only (`Kopi Kenangan Mantan`, not `Coffee`), real
brand, a `displayUnit` that reads naturally after a price, and `isSample: true` until a
price is verified against a source.

## Scraper

Not built. The contract, folder layout, and intended pipeline are in
[SCRAPER.md](./SCRAPER.md). Commands in `package.json` map to files that currently exit
with a "not implemented" message on purpose.

## Deployment

`netlify.toml` is committed: build `npm run build`, publish `dist`, SPA fallback to
`index.html`. Connect the repo to Netlify and no further configuration is needed.

## Roadmap

1. Real prices for the top ~200 reference products
2. Scraper pipeline (collect → normalise → validate → dedupe → diff → merge → publish)
3. Shareable result image
4. Region switch (Jakarta / Bandung / Surabaya) — `region` is already on every record
5. URL state so a result can be linked
