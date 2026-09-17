import { cn } from "@/lib/cn";
import { formatQuantity } from "@/lib/format";

interface QuantityDisplayProps {
  quantity: number;
  className?: string;
}

/**
 * The loudest element on a comparison card.
 * The "~" is read out as "kurang lebih" for screen readers.
 */
export function QuantityDisplay({ quantity, className }: QuantityDisplayProps) {
  return (
    <span className={cn("tabular font-display text-qty font-bold text-ink", className)}>
      <span aria-hidden>{formatQuantity(quantity)}</span>
      <span className="sr-only">kurang lebih {quantity} kali</span>
    </span>
  );
}
