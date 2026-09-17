import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/**
 * Filter chip. Selection is carried by aria-pressed as well as colour,
 * so it is never communicated by colour alone.
 */
export function Chip({ selected = false, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-chip border px-4",
        "text-body font-medium transition-colors duration-150 active:scale-[0.98] touch-manipulation",
        selected
          ? "border-primary bg-primary text-primary-ink"
          : "border-line bg-surface text-ink-muted hover:border-ink/25 hover:text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
