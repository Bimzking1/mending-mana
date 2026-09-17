import type { Comparison } from "@/types";
import { formatQuantity, formatRupiah } from "@/lib/format";

/**
 * Plain-text version of a result. Kept separate from the UI so a future
 * "download as image" or Web Share flow can reuse the same composition.
 */
export function buildShareText(budget: number, comparisons: Comparison[]): string {
  const lines = comparisons
    .slice(0, 5)
    .map((c) => `${formatQuantity(c.quantity)} ${c.item.name}`);

  return [`${formatRupiah(budget)}`, "ternyata bisa jadi…", "", ...lines, "", "— Mending mana?"].join(
    "\n",
  );
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
