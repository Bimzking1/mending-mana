import { Chip } from "@/components/ui/Chip";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryId } from "@/types";

interface CategorySelectorProps {
  value: CategoryId | null;
  onChange: (value: CategoryId | null) => void;
}

/**
 * Optional filter. Scrolls horizontally on phones, wraps from sm up.
 * Edge padding keeps the first and last chip reachable with a thumb.
 */
export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div>
      <p className="text-meta font-medium text-ink-muted">
        Mau dibandingin sama apa? <span className="text-ink-faint">(opsional)</span>
      </p>

      <div
        role="group"
        aria-label="Kategori pembanding"
        className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        <Chip selected={value === null} onClick={() => onChange(null)}>
          Semua
        </Chip>
        {CATEGORIES.map((category) => (
          <Chip
            key={category.id}
            selected={value === category.id}
            onClick={() => onChange(value === category.id ? null : category.id)}
          >
            <span aria-hidden>{category.emoji}</span>
            {category.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
