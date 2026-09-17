import { cn } from "@/lib/cn";

interface BrandLogoProps {
  size?: "sm" | "xl";
  /** Stack "Mending" over "mana?" — used on the home screen. */
  stacked?: boolean;
  className?: string;
}

/**
 * Text-only wordmark. The question mark is the brand's one flourish:
 * it carries the accent colour and slightly overshoots the baseline.
 */
export function BrandLogo({ size = "sm", stacked = false, className }: BrandLogoProps) {
  const isLarge = size === "xl";

  return (
    <span
      className={cn(
        "font-display font-bold tracking-[-0.035em] text-ink",
        isLarge ? "text-[2.75rem] leading-[0.95] md:text-6xl" : "text-lead leading-none",
        stacked ? "block" : "inline-flex items-baseline gap-[0.22em]",
        className,
      )}
    >
      <span className={cn(stacked && "block")}>Mending</span>
      <span className={cn(stacked && "block")}>
        mana
        <span className="text-primary">?</span>
      </span>
    </span>
  );
}
