import { Hero } from "@/components/Hero";
import { TickerPreview } from "@/components/TickerPreview";

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="space-y-10 pb-6 md:grid md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12 md:space-y-0">
      <Hero onStart={onStart} />
      <TickerPreview />
    </div>
  );
}
