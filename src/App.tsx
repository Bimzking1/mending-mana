import { useCallback, useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HomeScreen } from "@/screens/HomeScreen";
import { InputScreen } from "@/screens/InputScreen";
import { ResultScreen } from "@/screens/ResultScreen";
import { AboutScreen } from "@/screens/AboutScreen";
import { BrandLogo } from "@/components/BrandLogo";
import type { ComparisonQuery, Screen } from "@/types";

const EMPTY_QUERY: ComparisonQuery = { itemName: "", budget: 0, category: null };

/** Short beat between tapping and the reveal, so the result lands as an answer. */
const REVEAL_MS = 420;

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [query, setQuery] = useState<ComparisonQuery>(EMPTY_QUERY);
  const [isRevealing, setIsRevealing] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    headingRef.current?.focus();
  }, [screen]);

  const handleSubmit = useCallback((next: ComparisonQuery) => {
    setQuery(next);
    setIsRevealing(true);
    window.setTimeout(() => {
      setIsRevealing(false);
      setScreen("result");
    }, REVEAL_MS);
  }, []);

  const handleRestart = useCallback(() => {
    setQuery(EMPTY_QUERY);
    setScreen("input");
  }, []);

  return (
    <AppShell screen={screen} onNavigate={setScreen}>
      <div
        ref={headingRef}
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl px-4 outline-none sm:px-6"
      >
        {screen === "home" && <HomeScreen onStart={() => setScreen("input")} />}
        {screen === "input" && <InputScreen query={query} onSubmit={handleSubmit} />}
        {screen === "result" && (
          <ResultScreen
            query={query}
            onEditPrice={() => setScreen("input")}
            onRestart={handleRestart}
          />
        )}
        {screen === "about" && <AboutScreen />}
      </div>

      {isRevealing && <RevealCurtain />}
    </AppShell>
  );
}

/** Covers the hand-off between input and result. Announced politely, then gone. */
function RevealCurtain() {
  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-paper/95 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="animate-count-pop text-center">
        <BrandLogo size="xl" stacked />
        <p className="mt-3 text-body text-ink-muted">Ngitung dulu…</p>
      </div>
    </div>
  );
}
