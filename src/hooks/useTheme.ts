import { useCallback, useEffect, useState } from "react";
import type { ThemeMode } from "@/types";

const STORAGE_KEY = "mm-theme";

function readStored(): ThemeMode {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

function prefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/** Light / dark / follow-system, applied to <html class="dark">. */
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(readStored);

  useEffect(() => {
    const isDark = mode === "dark" || (mode === "system" && prefersDark());
    document.documentElement.classList.toggle("dark", isDark);
    try {
      if (mode === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage blocked — the class is still applied for this session */
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => document.documentElement.classList.toggle("dark", media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [mode]);

  const isDark =
    mode === "dark" || (mode === "system" && typeof window !== "undefined" && prefersDark());

  const toggle = useCallback(() => {
    setMode(isDark ? "light" : "dark");
  }, [isDark]);

  return { mode, setMode, isDark, toggle };
}
