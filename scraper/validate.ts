import type { ScrapedItem } from "./types.ts";

export interface ValidationIssue {
  item: Partial<ScrapedItem>;
  reason: string;
}

/** Rejects records that would produce a bad comparison card. */
export function validateItem(item: ScrapedItem): ValidationIssue | null {
  if (!item.name?.trim()) return { item, reason: "missing name" };
  if (!item.brand?.trim()) return { item, reason: "missing brand" };
  if (!Number.isInteger(item.price) || item.price <= 0)
    return { item, reason: `invalid price: ${item.price}` };
  if (item.price > 1_000_000_000) return { item, reason: "price out of range" };
  if (!/^https?:\/\//.test(item.sourceUrl)) return { item, reason: "malformed sourceUrl" };
  if (!item.category?.trim()) return { item, reason: "missing category" };
  return null;
}

export function validateAll(items: ScrapedItem[]) {
  const issues: ValidationIssue[] = [];
  const valid: ScrapedItem[] = [];
  for (const item of items) {
    const issue = validateItem(item);
    if (issue) issues.push(issue);
    else valid.push(item);
  }
  return { valid, issues };
}
