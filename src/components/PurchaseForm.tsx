import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { CategorySelector } from "@/components/CategorySelector";
import type { CategoryId, ComparisonQuery } from "@/types";

interface PurchaseFormProps {
  initial: ComparisonQuery;
  onSubmit: (query: ComparisonQuery) => void;
}

const ITEM_SUGGESTIONS = ["Sepatu baru", "Headphone", "Skincare", "Tiket konser", "HP baru"];

export function PurchaseForm({ initial, onSubmit }: PurchaseFormProps) {
  const itemId = useId();
  const [itemName, setItemName] = useState(initial.itemName);
  const [budget, setBudget] = useState(initial.budget);
  const [category, setCategory] = useState<CategoryId | null>(initial.category);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (budget <= 0) {
      setError("Masukin dulu harganya ya 👀");
      return;
    }
    setError(null);
    onSubmit({ itemName: itemName.trim(), budget, category });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor={itemId} className="block text-meta font-medium text-ink-muted">
          Mau beli apa? <span className="text-ink-faint">(boleh dikosongin)</span>
        </label>
        <input
          id={itemId}
          type="text"
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
          placeholder="Headphone wireless"
          autoComplete="off"
          maxLength={60}
          className="mt-2 h-14 w-full rounded-control border border-line bg-surface px-4 text-lead text-ink outline-none transition-colors placeholder:text-ink-faint/70 focus:border-primary"
        />
        <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {ITEM_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setItemName(suggestion)}
              className="h-9 shrink-0 rounded-chip bg-sunken px-3 text-meta text-ink-muted transition-colors hover:text-ink active:scale-[0.98]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <CurrencyInput
        label="Harganya berapa?"
        value={budget}
        onValueChange={(value) => {
          setBudget(value);
          if (value > 0) setError(null);
        }}
        hint="Boleh ketik 50000, nanti kami rapikan."
        error={error}
      />

      <CategorySelector value={category} onChange={setCategory} />

      {/* Stays within thumb reach on phones, inline on larger screens. */}
      <div className="sticky bottom-0 -mx-4 bg-gradient-to-t from-paper via-paper to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:static sm:mx-0 sm:bg-none sm:p-0">
        <Button type="submit" size="lg" full disabled={budget <= 0}>
          Bandingin sekarang
          <ArrowRight size={20} aria-hidden />
        </Button>
      </div>
    </form>
  );
}
