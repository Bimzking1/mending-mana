/**
 * Domain types. The UI only ever talks to these — never to the raw JSON shape —
 * so the data source can be swapped for an API later without touching components.
 */

export type CategoryId =
  | "coffee"
  | "food"
  | "fashion"
  | "gadget"
  | "gaming"
  | "books"
  | "entertainment"
  | "transport"
  | "living";

export interface Category {
  id: CategoryId;
  /** Label shown on chips and card meta. Indonesian. */
  label: string;
  emoji: string;
  /** Design token family used for the card accent. */
  tone: "primary" | "lemon" | "laut" | "daun" | "terong";
}

export interface ReferenceItem {
  id: string;
  /** Specific product, e.g. "Kopi Kenangan Mantan" — never a generic "Coffee". */
  name: string;
  brand: string;
  category: CategoryId;
  subcategory: string;
  /** Rupiah, integer, no decimals. */
  price: number;
  /** Machine unit: "cup", "pcs", "ticket", "month". */
  unit: string;
  /** Human unit rendered after the price, e.g. "/ cup". */
  displayUnit: string;
  emoji: string;
  /** 1–5. Higher means more people will instantly recognise it. */
  recognizability: number;
  sourceName: string;
  sourceUrl: string;
  region: string;
  /** ISO date (YYYY-MM-DD). */
  lastVerified: string;
  /** true until a price has been confirmed against a real source. */
  isSample: boolean;
}

export interface ReferenceDataFile {
  version: number;
  updatedAt: string;
  /** "sample" until the scraper has replaced it with verified data. */
  dataQuality: "sample" | "verified" | "mixed";
  items: ReferenceItem[];
}

export interface Comparison {
  item: ReferenceItem;
  /** Math.floor(budget / item.price) */
  quantity: number;
  /** budget - quantity * item.price */
  leftover: number;
}

export interface ComparisonQuery {
  /** What the user is about to buy. Optional — the price is what matters. */
  itemName: string;
  /** Rupiah. */
  budget: number;
  /** null = "Semua". */
  category: CategoryId | null;
}

export type ThemeMode = "light" | "dark" | "system";

export type Screen = "home" | "input" | "result" | "about";
