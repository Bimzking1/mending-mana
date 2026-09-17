import { Chip } from "@/components/ui/Chip";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryId } from "@/types";

interface CategorySelectorProps {
  value: CategoryId[];
  onChange: (value: CategoryId[]) => void;
}

/**
 * Optional filter. Chips wrap on every screen size so all options are
 * visible without horizontal scrolling. "Semua" clears every selection.
 */
export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  function toggle(id: CategoryId) {
    onChange(
      value.includes(id)
        ? value.filter((selected) => selected !== id)
        : [...value, id],
    );
  }

  return (
    <div>
      <p className="text-meta font-medium text-ink-muted">
        Mau dibandingin sama apa?{" "}
        <span className="text-ink-faint">(opsional, bisa pilih lebih dari satu)</span>
      </p>

      <div
        role="group"
        aria-label="Kategori pembanding"
        className="mt-2 flex flex-wrap gap-2"
      >
        <Chip selected={value.length === 0} onClick={() => onChange([])}>
          Semua
        </Chip>
        {CATEGORIES.map((category) => (
          <Chip
            key={category.id}
            selected={value.includes(category.id)}
            onClick={() => toggle(category.id)}
          >
            <span aria-hidden>{category.emoji}</span>
            {category.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}