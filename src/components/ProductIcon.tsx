import { cn } from "@/lib/cn";
import { CATEGORY_TONE_SURFACE, getCategory } from "@/lib/categories";
import type { CategoryId } from "@/types";

interface ProductIconProps {
  emoji: string;
  category: CategoryId;
  size?: "md" | "lg";
  className?: string;
}

export function ProductIcon({ emoji, category, size = "md", className }: ProductIconProps) {
  const tone = getCategory(category).tone;

  return (
    <span
      aria-hidden
      className={cn(
        "grid place-items-center rounded-2xl",
        size === "lg" ? "h-14 w-14 text-2xl" : "h-11 w-11 text-xl",
        CATEGORY_TONE_SURFACE[tone],
        className,
      )}
    >
      {emoji}
    </span>
  );
}
