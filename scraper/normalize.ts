import type { ScrapedItem } from "./types.ts";

/** "Rp25.000" | "25k" | "Rp 25,000" -> 25000. Returns null when unparseable. */
export function normalizePrice(raw: string | number): number | null {
  if (typeof raw === "number") return Number.isFinite(raw) ? Math.round(raw) : null;

  const cleaned = raw.trim().toLowerCase().replace(/rp/g, "").replace(/\s/g, "");
  if (!cleaned) return null;

  const shorthand = cleaned.match(/^([\d.,]+)(rb|k|jt|m)$/);
  if (shorthand) {
    const base = Number((shorthand[1] ?? "").replace(/\./g, "").replace(",", "."));
    if (!Number.isFinite(base)) return null;
    const multiplier = shorthand[2] === "jt" || shorthand[2] === "m" ? 1_000_000 : 1_000;
    return Math.round(base * multiplier);
  }

  const digits = cleaned.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

/** Collapses whitespace, keeps the brand's own spelling. */
export function normalizeText(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

/** Stable key used for ids and deduplication. */
export function normalizeKey(brand: string, name: string): string {
  return `${brand} ${name}`
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeItem(item: ScrapedItem): ScrapedItem | null {
  const price = normalizePrice(item.price);
  if (price === null) return null;
  return {
    ...item,
    name: normalizeText(item.name),
    brand: normalizeText(item.brand),
    price,
  };
}
