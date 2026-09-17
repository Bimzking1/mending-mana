import { forwardRef, useId, type ChangeEvent } from "react";
import { formatDigits, parseRupiah } from "@/lib/format";
import { cn } from "@/lib/cn";

interface CurrencyInputProps {
  value: number;
  onValueChange: (value: number) => void;
  label: string;
  hint?: string;
  error?: string | null;
}

/**
 * Rupiah field. The user types digits; grouping dots appear as they go.
 * inputMode="numeric" brings up the number pad on phones.
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput({ value, onValueChange, label, hint, error }, ref) {
    const id = useId();
    const hintId = `${id}-hint`;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onValueChange(parseRupiah(event.target.value));
    }

    return (
      <div>
        <label htmlFor={id} className="block text-meta font-medium text-ink-muted">
          {label}
        </label>

        <div
          className={cn(
            "mt-2 flex items-baseline gap-2 rounded-slab border bg-surface px-4 py-5 transition-colors",
            "focus-within:border-primary",
            error ? "border-primary" : "border-line",
          )}
        >
          <span
            className="font-display text-2xl font-medium text-ink-muted sm:text-3xl"
            aria-hidden
          >
            Rp
          </span>
          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            enterKeyHint="done"
            placeholder="0"
            value={value > 0 ? formatDigits(value) : ""}
            onChange={handleChange}
            aria-describedby={hint || error ? hintId : undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              "tabular w-full min-w-0 break-all bg-transparent font-display font-bold text-ink",
              "text-[clamp(3rem,13vw,5rem)] leading-none",
              "outline-none placeholder:text-ink-faint/60",
            )}
          />
        </div>

        {(hint || error) && (
          <p
            id={hintId}
            role={error ? "alert" : undefined}
            className={cn("mt-2 text-meta", error ? "text-primary" : "text-ink-faint")}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
