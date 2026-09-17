import { Card } from "@/components/ui/Card";
import { ProductIcon } from "@/components/ProductIcon";
import { QuantityDisplay } from "@/components/QuantityDisplay";
import { getCategory } from "@/lib/categories";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Comparison } from "@/types";

interface ComparisonCardProps {
  comparison: Comparison;
  /** Position in the reveal sequence, used for the entrance stagger. */
  index?: number;
  className?: string;
}

export function ComparisonCard({ comparison, index = 0, className }: ComparisonCardProps) {
  const { item, quantity, leftover } = comparison;
  const category = getCategory(item.category);

  return (
    <Card
      className={cn("animate-rise-in p-5", className)}
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <ProductIcon emoji={item.emoji} category={item.category} />
        <span className="rounded-chip bg-sunken px-2.5 py-1 text-micro font-medium text-ink-muted">
          {category.label}
        </span>
      </div>

      <div className="mt-4">
        <QuantityDisplay quantity={quantity} />
        <h3 className="mt-1.5 text-title font-semibold text-ink">{item.name}</h3>
        <p className="text-meta text-ink-muted">{item.brand}</p>
      </div>

      {/* Dotted leader, borrowed from a printed menu. */}
      <div className="mt-4 flex items-baseline gap-2 text-meta text-ink-muted">
        <span className="tabular whitespace-nowrap">± {formatRupiah(item.price)}</span>
        <span className="leader h-px flex-1" aria-hidden />
        <span className="whitespace-nowrap">{item.displayUnit}</span>
      </div>

      {leftover > 0 && (
        <p className="mt-1.5 text-micro text-ink-faint">
          sisa {formatRupiah(leftover)}
        </p>
      )}
    </Card>
  );
}
