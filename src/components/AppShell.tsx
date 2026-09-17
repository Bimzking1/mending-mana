import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { dataUpdatedAt } from "@/lib/referenceData";
import { formatDate } from "@/lib/format";
import type { Screen } from "@/types";

interface AppShellProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  children: ReactNode;
}

/**
 * One column on mobile, the same column centred on desktop.
 * Header is quiet on purpose: the money is the loud part of this product.
 */
export function AppShell({ screen, onNavigate, children }: AppShellProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-ink"
      >
        Lompat ke konten
      </a>

      <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="rounded-control py-1 pr-2"
            aria-label="Kembali ke beranda Mending mana?"
          >
            <BrandLogo />
          </button>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="md"
              onClick={() =>
                onNavigate(screen === "about" ? "home" : screen === "changelog" ? "about" : "about")
              }
              aria-current={screen === "about" ? "page" : undefined}
              className="px-3"
            >
              {screen === "about" ? "Tutup" : "Tentang"}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="konten" className="flex-1">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-8 pt-10 text-micro text-ink-faint sm:px-6">
        <p>
          Harga di sini contoh, bukan harga resmi. Terakhir dirapikan{" "}
          {formatDate(dataUpdatedAt)}.
        </p>
      </footer>
    </div>
  );
}
