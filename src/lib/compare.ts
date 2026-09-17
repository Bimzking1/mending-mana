import type { Comparison, ComparisonQuery, ReferenceItem } from "@/types";

/**
 * Comparison selection engine.
 *
 * Pure function: same input → same output, no side effects, no fetching.
 * See HANDOFF-PROMPT.md § "Comparison engine". Keep the signature stable —
 * every screen imports only `selectComparisons`.
 */

export const MAX_RESULTS = 8;

/** Per-category and per-brand caps to guarantee diversity from "Semua". */
const CATEGORY_CAP = 2;
const BRAND_CAP = 1;

interface ScoreBreakdown {
  item: ReferenceItem;
  quantity: number;
  score: number;
}

/**
 * Quantities that read well out loud.
 * "~20× Kopi Kenangan" is striking. "~1×" is weak. "~4312×" is noise.
 * Best range: roughly 2–30.
 */
function quantityAppeal(quantity: number): number {
  if (quantity < 1) return -Infinity;
  if (quantity === 1) return 0.3;
  if (quantity <= 3) return 0.75;
  if (quantity <= 10) return 1;
  if (quantity <= 30) return 0.95;
  if (quantity <= 120) return 0.65;
  if (quantity <= 500) return 0.35;
  return 0.12;
}

/** Penalise items that appear in every price range (too generic). */
function priceTierDiversity(price: number): number {
  if (price < 10_000) return 0.7;
  if (price < 30_000) return 0.85;
  if (price < 100_000) return 1;
  if (price < 300_000) return 0.9;
  if (price < 800_000) return 0.8;
  return 0.65;
}

function scoreItem(item: ReferenceItem, query: ComparisonQuery): ScoreBreakdown | null {
  const quantity = Math.floor(query.budget / item.price);
  if (quantity < 1) return null;

  const appeal = quantityAppeal(quantity);
  const recognizability = item.recognizability / 5;
  const tier = priceTierDiversity(item.price);

  // When categories are picked we filter strictly to them, so the relevance
  // term is constant within the pool. From "Semua" it is flat too.
  const relevance = query.categories.length > 0 ? 1 : 0.6;

  const score = appeal * 0.4 + recognizability * 0.25 + relevance * 0.2 + tier * 0.15;
  return { item, quantity, score };
}

/**
 * Picks a varied, recognisable set of comparisons for the given budget.
 * Selecting categories filters strictly to those — no cross-category surprises
 * when the user asked for one category. From "Semua", per-category caps stop
 * the result becoming a wall of coffee.
 */
export function selectComparisons(
  items: readonly ReferenceItem[],
  query: ComparisonQuery,
  limit: number = MAX_RESULTS,
): Comparison[] {
  if (query.budget <= 0) return [];

  const filtered = query.categories.length > 0;
  const pool = filtered
    ? items.filter((item) => query.categories.includes(item.category))
    : items;

  const scored = pool
    .map((item) => scoreItem(item, query))
    .filter((entry): entry is ScoreBreakdown => entry !== null)
    .sort((a, b) => b.score - a.score || a.quantity - b.quantity);

  // Within a single chosen category there is no reason to cap it further —
  // the user asked for exactly that. More than one category caps each so the
  // picks stay balanced.
  const perCategoryCap = filtered
    ? query.categories.length > 1
      ? 4
      : limit
    : CATEGORY_CAP;
  const usedPerCategory = new Map<string, number>();
  const usedBrands = new Map<string, number>();
  const picked: ScoreBreakdown[] = [];

  for (const entry of scored) {
    if (picked.length >= limit) break;
    const cat = entry.item.category;
    const categoryCount = usedPerCategory.get(cat) ?? 0;
    if (categoryCount >= perCategoryCap) continue;
    const brandCount = usedBrands.get(entry.item.brand) ?? 0;
    if (brandCount >= BRAND_CAP) continue;
    usedPerCategory.set(cat, categoryCount + 1);
    usedBrands.set(entry.item.brand, brandCount + 1);
    picked.push(entry);
  }

  // Backfill if the diversity rules left us short (very small budgets).
  if (picked.length < limit) {
    for (const entry of scored) {
      if (picked.length >= limit) break;
      if (picked.includes(entry)) continue;
      picked.push(entry);
    }
  }

  return picked.map(({ item, quantity }) => ({
    item,
    quantity,
    leftover: query.budget - quantity * item.price,
  }));
}

/** Cheapest reference price in the set — used by the empty state copy. */
export function cheapestPrice(items: readonly ReferenceItem[]): number {
  return items.reduce((min, item) => Math.min(min, item.price), Number.POSITIVE_INFINITY);
}
