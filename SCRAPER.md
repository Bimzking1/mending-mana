# Scraper architecture

Nothing here scrapes yet. This document is the specification; the folder is the shape.
`normalize.ts`, `validate.ts` and `deduplicate.ts` are implemented and tested by use.
`categorize.ts`, `collect.ts`, `diff.ts`, `merge.ts` and `export.ts` are placeholders that
print "not implemented" and exit 1 — keep it that way until they actually work.

## 1. How it works

```
sources/*        one adapter per site, returns raw rows
   ↓ collect
normalize        price strings → integers, text tidied
   ↓
validate         drop records that would render badly
   ↓
deduplicate      merge exact brand+name, flag near matches
   ↓
collections/collection-YYYY-MM-DD-HH-mm.json
   ↓ diff        compare against src/data/latest.json
   ↓ review      a human (or you) approves the changes
   ↓ merge
src/data/latest.json
```

Each stage is a pure function over arrays plus one thin CLI wrapper. No stage mutates
`latest.json` except `merge`.

## 2. Adding a new source

1. Create `scraper/sources/<category>/<brand>.ts`.
2. Default-export an object satisfying `SourceAdapter` (`scraper/types.ts`):

   ```ts
   const adapter: SourceAdapter = {
     id: "coffee/kopi-kenangan",
     category: "coffee",
     async collect() {
       // fetch, parse, or read a committed fixture
       return rows; // ScrapedItem[]
     },
   };
   export default adapter;
   ```
3. Register it in the adapter list inside `collect.ts`.
4. Run `npm run scrape:source -- coffee/kopi-kenangan` and inspect the collection file.

Rules for an adapter: return **specific products**, never invent a price, always fill
`sourceUrl` with the page the price came from, set `collectedAt` to the run timestamp,
and fail loudly rather than returning partial junk. Respect `robots.txt` and rate limits.

## 3. Expected output

`ScrapedItem[]` (see `scraper/types.ts`). It is close to `ReferenceItem` but has no
`id`, `emoji`, `recognizability`, `lastVerified` or `isSample` — those are added by
`merge`/`export`, not by the source.

## 4. Product data schema

See [DATA-SCHEMA.md](./DATA-SCHEMA.md).

## 5. Normalization

`normalizePrice` accepts `Rp25.000`, `Rp 25.000`, `25.000`, `Rp25,000`, `25k`, `25K`,
`1,5jt` and returns an integer. `normalizeText` collapses whitespace.
`normalizeKey(brand, name)` produces the slug used for ids and dedupe.

## 6. Validation

`validateItem` rejects: missing name, missing brand, non-integer or zero/negative price,
price above Rp1.000.000.000, malformed `sourceUrl`, missing category. Rejected rows are
reported with a reason, never silently dropped from the log.

## 7. Deduplication

Exact matches on `normalizeKey(brand, name)` are merged, newest `collectedAt` wins.
Near matches (same brand, overlapping name tokens — `Fore Latte` vs `Fore Coffee Latte`)
are returned in `suspected` for human review and **not** merged automatically.

## 8. Collection file format

`collections/collection-2026-09-17-13-25.json`

```json
{
  "collectedAt": "2026-09-17T13:25:00+07:00",
  "sources": ["coffee/kopi-kenangan", "coffee/fore"],
  "stats": { "raw": 214, "valid": 198, "unique": 186, "suspected": 4 },
  "items": []
}
```

Collections are append-only. Never overwrite an old one.

## 9. Diff and merge

`diff` compares the newest collection against `latest.json` by `id` and reports:
`added`, `priceChanged` (with old → new and the percentage), `removed` (present in
latest, absent from the collection), `suspectedDuplicates`.

A price change over ±40% is flagged as suspicious and requires explicit approval —
that is usually a parsing bug, not a real price move.

`merge` applies an approved diff: adds new records, updates `price` and `lastVerified`,
sets `isSample: false` for anything confirmed against a live source, and leaves
`removed` records in place (a shop being briefly unreachable should not delete data).

## 10. Generating `latest.json`

`export` writes the merged set back to `src/data/latest.json`, bumps `updatedAt`,
recomputes `dataQuality` (`verified` when no record has `isSample: true`, otherwise
`mixed`), sorts items by category then price, and formats with 2-space indent so the
git diff stays readable.
