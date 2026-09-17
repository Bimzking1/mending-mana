import { useMemo } from "react";
import { ProductIcon } from "@/components/ProductIcon";
import { selectComparisons } from "@/lib/compare";
import { referenceItems } from "@/lib/referenceData";
import { formatQuantity, formatRupiahShort } from "@/lib/format";

const PREVIEW_BUDGET = 500_000;

/**
 * The single piece of ambient motion in the app: a slow vertical loop showing
 * what Rp500 ribu turns into. It answers "what is this?" without a paragraph.
 * Reduced motion stops it and the list simply sits still.
 */
export function TickerPreview() {
  const comparisons = useMemo(
    () =>
      selectComparisons(referenceItems, {
        itemName: "",
        budget: PREVIEW_BUDGET,
        category: null,
      }, 6),
    [],
  );

  const loop = [...comparisons, ...comparisons];

  return (
    <section
      aria-label={`Contoh: ${formatRupiahShort(PREVIEW_BUDGET)} bisa jadi apa saja`}
      className="rounded-slab border border-line bg-surface p-5 shadow-card"
    >
      <p className="text-meta text-ink-muted">
        {formatRupiahShort(PREVIEW_BUDGET)} ternyata bisa jadi…
      </p>

      <div className="relative mt-3 h-[168px] overflow-hidden">
        <ul className="animate-marquee-up space-y-3">
          {loop.map((comparison, index) => (
            <li
              key={`${comparison.item.id}-${index}`}
              className="flex items-center gap-3"
              aria-hidden={index >= comparisons.length}
            >
              <ProductIcon emoji={comparison.item.emoji} category={comparison.item.category} />
              <span className="min-w-0">
                <span className="tabular font-display text-lead font-bold text-ink">
                  {formatQuantity(comparison.quantity)}
                </span>{" "}
                <span className="text-body font-medium text-ink">{comparison.item.name}</span>
                <span className="block truncate text-meta text-ink-muted">
                  {comparison.item.brand}
                </span>
              </span>
            </li>
          ))}
        </ul>
        {/* Soft mask so items enter and leave instead of being chopped off. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent" />
      </div>
    </section>
  );
}
