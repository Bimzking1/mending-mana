import type { ScrapedItem } from "./types.ts";
import { normalizeKey } from "./normalize.ts";

export interface DedupeResult {
  unique: ScrapedItem[];
  /** Pairs that look similar but were NOT merged — review by hand. */
  suspected: Array<[ScrapedItem, ScrapedItem]>;
}

/**
 * Exact matches on normalized brand + name are merged (newest collectedAt wins).
 * Near matches are only flagged: silently deleting data is worse than a duplicate.
 */
export function deduplicate(items: ScrapedItem[]): DedupeResult {
  const byKey = new Map<string, ScrapedItem>();
  const suspected: Array<[ScrapedItem, ScrapedItem]> = [];

  for (const item of items) {
    const key = normalizeKey(item.brand, item.name);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, item);
      continue;
    }
    byKey.set(key, item.collectedAt > existing.collectedAt ? item : existing);
  }

  const unique = [...byKey.values()];

  for (let i = 0; i < unique.length; i += 1) {
    for (let j = i + 1; j < unique.length; j += 1) {
      const a = unique[i]!;
      const b = unique[j]!;
      if (a.brand === b.brand && similar(a.name, b.name)) suspected.push([a, b]);
    }
  }

  return { unique, suspected };
}

/** Cheap token overlap — enough to flag "Fore Latte" vs "Fore Coffee Latte". */
function similar(a: string, b: string): boolean {
  const tokensA = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
  const tokensB = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
  const overlap = [...tokensA].filter((token) => tokensB.has(token)).length;
  return overlap > 0 && overlap >= Math.min(tokensA.size, tokensB.size);
}
