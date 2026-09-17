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

const QUICK_ADD = [10_000, 50_000, 100_000, 500_000] as const;

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
            "mt-2 flex items-baseline gap-2 rounded-slab border bg-surface px-4 py-4 transition-colors",
            "focus-within:border-primary",
            error ? "border-primary" : "border-line",
          )}
        >
          <span className="font-display text-title font-medium text-ink-muted" aria-hidden>
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
              "tabular w-full min-w-0 bg-transparent font-display text-amount font-bold text-ink",
              "outline-none placeholder:text-ink-faint/60 sm:text-[3.25rem]",
            )}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_ADD.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onValueChange(value + amount)}
              className={cn(
                "h-10 rounded-chip border border-line bg-surface px-3.5 text-meta font-medium text-ink-muted",
                "transition-colors active:scale-[0.98] hover:border-ink/25 hover:text-ink touch-manipulation",
              )}
            >
              +{formatDigits(amount)}
            </button>
          ))}
          {value > 0 && (
            <button
              type="button"
              onClick={() => onValueChange(0)}
              className="h-10 rounded-chip px-3 text-meta font-medium text-ink-faint hover:text-ink"
            >
              Hapus
            </button>
          )}
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
