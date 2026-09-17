/** Contract every source adapter must satisfy. Mirrors src/types/index.ts. */
export interface ScrapedItem {
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  displayUnit: string;
  sourceName: string;
  sourceUrl: string;
  region: string;
  collectedAt: string;
}

export interface SourceAdapter {
  /** Unique slug, matches the folder name, e.g. "coffee/kopi-kenangan". */
  id: string;
  category: string;
  /** Returns raw rows. May fetch, read a fixture, or be hand-maintained. */
  collect(): Promise<ScrapedItem[]>;
}
