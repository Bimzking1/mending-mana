import { ComparisonCard } from "@/components/ComparisonCard";
import type { Comparison } from "@/types";

interface ComparisonResultsProps {
  comparisons: Comparison[];
}

/** Single column on phones, two from md, three from lg. */
export function ComparisonResults({ comparisons }: ComparisonResultsProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {comparisons.map((comparison, index) => (
        <li key={comparison.item.id}>
          <ComparisonCard comparison={comparison} index={index} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
