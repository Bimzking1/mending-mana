import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const button = cva(
  [
    "inline-flex items-center justify-center gap-2 select-none",
    "font-semibold tracking-tight",
    "transition-[transform,background-color,border-color,color] duration-150",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
    // Touch targets stay comfortable; no hover-only affordances.
    "touch-manipulation",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-ink shadow-lift hover:bg-primary/90",
        outline: "border border-line bg-surface text-ink hover:border-ink/30",
        ghost: "text-ink-muted hover:bg-sunken hover:text-ink",
      },
      size: {
        lg: "h-14 rounded-control px-6 text-lead",
        md: "h-11 rounded-control px-4 text-body",
        icon: "h-11 w-11 rounded-control",
      },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", full: false },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, full, type = "button", ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cn(button({ variant, size, full }), className)} {...props} />
  );
});
