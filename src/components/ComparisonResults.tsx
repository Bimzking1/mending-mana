import { ComparisonCard } from "@/components/ComparisonCard";
import type { Comparison } from "@/types";

interface ComparisonResultsProps {
  comparisons: Comparison[];
}

/**
 * Mobile: horizontal swipe carousel with snap so one card at a time still
 * shows the next peeking — no scrolling needed to see more.
 * md+: the same cards in a widening grid.
 */
export function ComparisonResults({ comparisons }: ComparisonResultsProps) {
  const renderCard = (comparison: Comparison, index: number) => (
    <ComparisonCard comparison={comparison} index={index} className="h-full" />
  );

  return (
    <>
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:hidden">
        {comparisons.map((comparison, index) => (
          <li
            key={comparison.item.id}
            className="w-[78vw] max-w-[340px] shrink-0 snap-center"
          >
            {renderCard(comparison, index)}
          </li>
        ))}
      </ul>

      <ul className="hidden grid-cols-2 gap-4 md:grid lg:grid-cols-3">
        {comparisons.map((comparison, index) => (
          <li key={comparison.item.id}>{renderCard(comparison, index)}</li>
        ))}
      </ul>
    </>
  );
}