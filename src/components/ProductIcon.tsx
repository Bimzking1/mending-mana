import { cn } from "@/lib/cn";
import { getCategory } from "@/lib/categories";
import type { CategoryId } from "@/types";

/** Static class strings — Tailwind must be able to see them at build time. */
const TONE_SURFACE: Record<string, string> = {
  primary: "bg-primary-soft text-primary",
  lemon: "bg-lemon-soft text-lemon",
  laut: "bg-laut-soft text-laut",
  daun: "bg-daun-soft text-daun",
  terong: "bg-terong-soft text-terong",
};

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
        TONE_SURFACE[tone],
        className,
      )}
    >
      {emoji}
    </span>
  );
}
