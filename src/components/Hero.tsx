import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/BrandLogo";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="pt-10 md:pt-14">
      <BrandLogo size="xl" stacked />

      <p className="mt-5 max-w-[22ch] text-hero font-semibold text-ink md:text-[2.6rem] md:leading-[1.05]">
        Sebelum beli, coba bandingin dulu.
      </p>

      <p className="mt-3 max-w-[40ch] text-lead text-ink-muted">
        Masukin harganya, lihat uang segitu sebenernya bisa jadi apa aja.
      </p>

      <Button size="lg" full onClick={onStart} className="mt-7 md:w-auto md:px-8">
        Mulai bandingin
        <ArrowRight size={20} aria-hidden />
      </Button>
    </section>
  );
}
