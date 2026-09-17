import { cn } from "@/lib/cn";
import { formatDigits } from "@/lib/format";

interface PriceDisplayProps {
  value: number;
  size?: "amount" | "inline";
  className?: string;
}

/** The headline number. "Rp" is a separate, smaller element so the digits lead. */
export function PriceDisplay({ value, size = "amount", className }: PriceDisplayProps) {
  if (size === "inline") {
    return (
      <span className={cn("tabular font-semibold text-ink", className)}>
        Rp{formatDigits(value)}
      </span>
    );
  }

  return (
    <p className={cn("flex items-baseline gap-1 font-display text-ink", className)}>
      <span className="text-title font-medium text-ink-muted">Rp</span>
      <span className="tabular break-all text-amount font-bold sm:text-[3.5rem]">
        {formatDigits(value)}
      </span>
    </p>
  );
}
