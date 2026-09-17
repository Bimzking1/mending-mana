import type { Comparison, ComparisonQuery, ReferenceItem } from "@/types";

/**
 * Baseline selection engine.
 *
 * It exists so the UI can be designed and reviewed against realistic output.
 * It is deliberately small and pure: same input → same output, no side effects.
 *
 * HANDOFF: this file is the seam where the next developer/AI takes over.
 * See HANDOFF-PROMPT.md § "Comparison engine". Keep the signature stable —
 * every screen imports only `selectComparisons`.
 */

export const MAX_RESULTS = 8;

interface ScoreBreakdown {
  item: ReferenceItem;
  quantity: number;
  score: number;
}

/** Quantities that read well out loud: not 1, not 4.312. */
function quantityAppeal(quantity: number): number {
  if (quantity < 1) return -Infinity;
  if (quantity === 1) return 0.35;
  if (quantity <= 3) return 0.8;
  if (quantity <= 30) return 1;
  if (quantity <= 120) return 0.7;
  if (quantity <= 500) return 0.4;
  return 0.15;
}

function scoreItem(item: ReferenceItem, query: ComparisonQuery): ScoreBreakdown | null {
  const quantity = Math.floor(query.budget / item.price);
  if (quantity < 1) return null;

  const appeal = quantityAppeal(quantity);
  const recognizability = item.recognizability / 5;
  // A chosen category lifts its own items but never silences the rest —
  // the cross-category surprise is the point of the product.
  const relevance = query.category === null ? 0.6 : item.category === query.category ? 1 : 0.45;

  const score = appeal * 0.45 + recognizability * 0.3 + relevance * 0.25;
  return { item, quantity, score };
}

/**
 * Picks a varied, recognisable set of comparisons for the given budget.
 * Caps each category so the result never becomes a wall of coffee.
 */
export function selectComparisons(
  items: readonly ReferenceItem[],
  query: ComparisonQuery,
  limit: number = MAX_RESULTS,
): Comparison[] {
  if (query.budget <= 0) return [];

  const scored = items
    .map((item) => scoreItem(item, query))
    .filter((entry): entry is ScoreBreakdown => entry !== null)
    .sort((a, b) => b.score - a.score || a.quantity - b.quantity);

  const perCategoryCap = query.category ? 3 : 2;
  const usedPerCategory = new Map<string, number>();
  const usedBrands = new Set<string>();
  const picked: ScoreBreakdown[] = [];

  for (const entry of scored) {
    if (picked.length >= limit) break;
    const categoryCount = usedPerCategory.get(entry.item.category) ?? 0;
    if (categoryCount >= perCategoryCap) continue;
    if (usedBrands.has(entry.item.brand)) continue;
    usedPerCategory.set(entry.item.category, categoryCount + 1);
    usedBrands.add(entry.item.brand);
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
