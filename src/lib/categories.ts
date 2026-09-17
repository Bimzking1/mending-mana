import type { Category, CategoryId } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "coffee", label: "Kopi", emoji: "☕", tone: "primary" },
  { id: "food", label: "Makan", emoji: "🍜", tone: "lemon" },
  { id: "fashion", label: "Fashion", emoji: "👕", tone: "terong" },
  { id: "gadget", label: "Gadget", emoji: "📱", tone: "laut" },
  { id: "gaming", label: "Gaming", emoji: "🎮", tone: "daun" },
  { id: "books", label: "Buku", emoji: "📚", tone: "lemon" },
  { id: "entertainment", label: "Hiburan", emoji: "🎬", tone: "primary" },
  { id: "transport", label: "Transport", emoji: "🛵", tone: "laut" },
  { id: "living", label: "Harian", emoji: "🏠", tone: "daun" },
];

const BY_ID = new Map<CategoryId, Category>(CATEGORIES.map((c) => [c.id, c]));

export function getCategory(id: CategoryId): Category {
  const found = BY_ID.get(id);
  if (!found) throw new Error(`Unknown category: ${id}`);
  return found;
}
