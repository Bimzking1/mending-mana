import { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ComparisonResults } from "@/components/ComparisonResults";
import { EmptyState } from "@/components/EmptyState";
import { cheapestPrice, selectComparisons } from "@/lib/compare";
import { referenceItems } from "@/lib/referenceData";
import { formatRupiah } from "@/lib/format";
import type { ComparisonQuery } from "@/types";

interface ResultScreenProps {
  query: ComparisonQuery;
  onEditPrice: () => void;
  onRestart: () => void;
}

export function ResultScreen({ query, onEditPrice, onRestart }: ResultScreenProps) {
  const comparisons = useMemo(
    () => selectComparisons(referenceItems, query),
    [query],
  );

  const minimum = cheapestPrice(referenceItems);

  return (
    <div className="pb-4 pt-8">
      {query.itemName && (
        <p className="text-meta text-ink-muted">Buat {query.itemName.toLowerCase()}</p>
      )}

      <PriceDisplay value={query.budget} className="mt-1" />

      <p className="mt-6 text-title font-semibold text-ink">
        {comparisons.length > 0 ? "Uang segini ternyata bisa jadi…" : "Hmm."}
      </p>

      <div className="mt-4">
        {comparisons.length > 0 ? (
          <ComparisonResults comparisons={comparisons} />
        ) : (
          <EmptyState
            emoji="🤏"
            title="Belum ketemu perbandingan yang pas"
            description={`Pembanding termurah yang kami punya ${formatRupiah(minimum)}. Coba nominal yang sedikit lebih besar.`}
            action={
              <Button variant="outline" onClick={onEditPrice}>
                Ubah harga
              </Button>
            }
          />
        )}
      </div>

      <p className="mt-6 max-w-[52ch] text-micro text-ink-faint">
        Angka di atas perkiraan. Harga asli beda-beda tergantung kota, promo, dan waktu.
      </p>

      <div className="sticky bottom-0 mt-6 flex gap-2 bg-gradient-to-t from-paper via-paper to-transparent pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:static sm:bg-none sm:pb-0">
        <Button size="lg" full onClick={onEditPrice}>
          Coba harga lain
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onRestart}
          aria-label="Mulai dari awal"
          className="shrink-0 px-6"
        >
          <RefreshCw size={20} aria-hidden />
        </Button>
      </div>
    </div>
  );
}
