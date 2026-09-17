import { describe, expect, it } from "vitest";
import { selectComparisons, MAX_RESULTS } from "./compare";
import type { ReferenceItem } from "@/types";

function makeItem(partial: Partial<ReferenceItem> & { id: string; name: string; brand: string }): ReferenceItem {
  return {
    category: "coffee",
    subcategory: "bar",
    price: 10000,
    unit: "pcs",
    displayUnit: "/ pcs",
    emoji: "☕",
    recognizability: 4,
    sourceName: "Source",
    sourceUrl: "https://example.com",
    region: "Jakarta",
    lastVerified: "2026-09-17",
    isSample: true,
    ...partial,
  };
}

const items: ReferenceItem[] = [
  makeItem({ id: "coffee-a", name: "Kopi Mantan", brand: "Brand A", price: 22000, category: "coffee", recognizability: 5 }),
  makeItem({ id: "coffee-b", name: "Latte Artik", brand: "Brand B", price: 27000, category: "coffee", recognizability: 4 }),
  makeItem({ id: "coffee-c", name: "Espresso Petit", brand: "Brand C", price: 52000, category: "coffee", recognizability: 3 }),
  makeItem({ id: "food-a", name: "Nasi Goreng", brand: "Brand D", price: 15000, category: "food", recognizability: 5 }),
  makeItem({ id: "food-b", name: "Mie Ayam", brand: "Brand E", price: 18000, category: "food", recognizability: 4 }),
  makeItem({ id: "fashion-a", name: "Kaos Polos", brand: "Brand F", price: 99000, category: "fashion", recognizability: 4 }),
  makeItem({ id: "fashion-b", name: "Chino Slim", brand: "Brand G", price: 199000, category: "fashion", recognizability: 3 }),
  makeItem({ id: "gadget-a", name: "Mouse Wireless", brand: "Brand H", price: 149000, category: "gadget", recognizability: 4 }),
  makeItem({ id: "gadget-b", name: "Powerbank", brand: "Brand I", price: 299000, category: "gadget", recognizability: 2 }),
  makeItem({ id: "gaming-a", name: "Steam Game", brand: "Brand J", price: 120000, category: "gaming", recognizability: 5 }),
  makeItem({ id: "books-a", name: "Novel Bestseller", brand: "Brand K", price: 90000, category: "books", recognizability: 4 }),
  makeItem({ id: "entertainment-a", name: "Cinema Ticket", brand: "Brand L", price: 50000, category: "entertainment", recognizability: 5 }),
  makeItem({ id: "entertainment-b", name: "Netflix Month", brand: "Brand M", price: 65000, category: "entertainment", recognizability: 4 }),
  makeItem({ id: "transport-a", name: "GoRide", brand: "Brand N", price: 15000, category: "transport", recognizability: 5 }),
  makeItem({ id: "transport-b", name: "MRT Ticket", brand: "Brand O", price: 10000, category: "transport", recognizability: 4 }),
  makeItem({ id: "living-a", name: "Beras 5kg", brand: "Brand P", price: 78000, category: "living", recognizability: 4 }),
];

const query = { itemName: "Headphone", budget: 500000, categories: [] };

describe("selectComparisons", () => {
  it("returns [] when budget is below the cheapest item", () => {
    const result = selectComparisons(items, { ...query, budget: 1000 });
    expect(result).toHaveLength(0);
  });

  it("returns 6–8 items spanning at least 4 distinct categories for budget 500000", () => {
    const result = selectComparisons(items, query);
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result.length).toBeLessThanOrEqual(MAX_RESULTS);
    const categories = new Set(result.map((c) => c.item.category));
    expect(categories.size).toBeGreaterThanOrEqual(4);
  });

  it("filters strictly to the selected categories", () => {
    const result = selectComparisons(items, { ...query, categories: ["coffee"] });
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.every((c) => c.item.category === "coffee")).toBe(true);
  });

  it("mixes both categories when more than one is selected", () => {
    const result = selectComparisons(items, { ...query, categories: ["food", "books"] });
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.every((c) => c.item.category === "food" || c.item.category === "books")).toBe(true);
  });

  it("returns identical output for identical input (deterministic)", () => {
    const first = selectComparisons(items, query);
    const second = selectComparisons(items, query);
    expect(second).toEqual(first);
  });

  it("never returns more than one item per brand", () => {
    const result = selectComparisons(items, query);
    const brands = result.map((c) => c.item.brand);
    expect(new Set(brands).size).toBe(brands.length);
  });

  it("caps each category from 'Semua' to avoid a wall of coffee", () => {
    const result = selectComparisons(items, query);
    const byCategory = new Map<string, number>();
    for (const c of result) {
      byCategory.set(c.item.category, (byCategory.get(c.item.category) ?? 0) + 1);
    }
    for (const count of byCategory.values()) {
      expect(count).toBeLessThanOrEqual(2);
    }
  });
});