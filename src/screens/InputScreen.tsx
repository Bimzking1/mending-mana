import { PurchaseForm } from "@/components/PurchaseForm";
import type { ComparisonQuery } from "@/types";

interface InputScreenProps {
  query: ComparisonQuery;
  onSubmit: (query: ComparisonQuery) => void;
}

export function InputScreen({ query, onSubmit }: InputScreenProps) {
  return (
    <div className="pt-8">
      <h1 className="font-display text-hero font-bold text-ink">Lagi mau beli apa?</h1>
      <p className="mt-2 max-w-[42ch] text-body text-ink-muted">
        Isi harganya aja juga cukup.
      </p>

      <div className="mt-8">
        <PurchaseForm initial={query} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
