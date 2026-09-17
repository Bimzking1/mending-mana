import { Card } from "@/components/ui/Card";
import { QuantityDisplay } from "@/components/QuantityDisplay";
import { CATEGORY_TONE_SURFACE, getCategory } from "@/lib/categories";
import { formatRupiahSpaced } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Comparison } from "@/types";

interface ComparisonCardProps {
  comparison: Comparison;
  /** Position in the reveal sequence, used for the entrance stagger. */
  index?: number;
  className?: string;
}

/**
 * Compact comparison card.
 * Vertical order: big centered emoji → huge quantity → name → price.
 * Centered so the "~11×" reads at a glance while swiping.
 */
export function ComparisonCard({ comparison, index = 0, className }: ComparisonCardProps) {
  const { item, quantity, leftover } = comparison;
  const tone = getCategory(item.category).tone;

  return (
    <Card
      className={cn(
        "animate-rise-in flex w-full flex-col items-center px-4 pb-4 pt-6 text-center",
        className,
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      {/* Emoji biggest of all, on a soft category tint. leading-none + tiny inset
          keeps the glyph visually centred in the circle. */}
      <span
        aria-hidden
        className={cn(
          "grid h-16 w-16 shrink-0 place-items-center rounded-full text-4xl leading-none",
          "pb-[0.1em]",
          CATEGORY_TONE_SURFACE[tone],
        )}
      >
        {item.emoji}
      </span>

      {/* Quantity — the loudest element. block + my-4 so the number gets real
          breathing room above and below. Scales with the card, never overflows. */}
      <QuantityDisplay
        quantity={quantity}
        className="my-6 block !text-[clamp(3.5rem,16vw,4.5rem)]"
      />

      <h3 className="w-full text-lead font-semibold leading-snug text-ink">
        {item.name}
      </h3>
      <p className="mt-0.5 text-meta text-ink-muted">{item.brand}</p>

      <div className="mt-4 flex items-baseline gap-1.5 rounded-chip bg-primary-soft px-3.5 py-2 text-lead font-semibold text-primary">
        <span className="tabular">± {formatRupiahSpaced(item.price)}</span>
        <span className="font-medium text-ink-muted">{item.displayUnit}</span>
      </div>

      {leftover > 0 && (
        <p className="mt-2 text-micro text-ink-faint">sisa {formatRupiahSpaced(leftover)}</p>
      )}
    </Card>
  );
}