import type { Config } from "tailwindcss";

/**
 * Every colour is a CSS variable holding space-separated RGB channels,
 * declared in src/index.css for both themes. Components never use raw hex.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: token("--c-paper"),
        surface: token("--c-surface"),
        sunken: token("--c-sunken"),
        line: token("--c-line"),
        ink: token("--c-ink"),
        "ink-muted": token("--c-ink-muted"),
        "ink-faint": token("--c-ink-faint"),
        primary: {
          DEFAULT: token("--c-primary"),
          soft: token("--c-primary-soft"),
          ink: token("--c-primary-ink"),
        },
        lemon: { DEFAULT: token("--c-lemon"), soft: token("--c-lemon-soft") },
        laut: { DEFAULT: token("--c-laut"), soft: token("--c-laut-soft") },
        daun: { DEFAULT: token("--c-daun"), soft: token("--c-daun-soft") },
        terong: { DEFAULT: token("--c-terong"), soft: token("--c-terong-soft") },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Mobile-first scale. Desktop steps up via responsive utilities.
        micro: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
        meta: ["0.8125rem", { lineHeight: "1.15rem" }],
        body: ["0.9375rem", { lineHeight: "1.5rem" }],
        lead: ["1.0625rem", { lineHeight: "1.6rem" }],
        title: ["1.375rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],
        hero: ["2rem", { lineHeight: "2.15rem", letterSpacing: "-0.03em" }],
        amount: ["2.75rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        qty: ["3.25rem", { lineHeight: "0.9", letterSpacing: "-0.05em" }],
      },
      borderRadius: {
        chip: "999px",
        control: "0.875rem",
        card: "1.25rem",
        slab: "1.75rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(var(--c-line) / 1), 0 8px 24px -18px rgb(var(--c-shadow) / 0.45)",
        lift: "0 12px 30px -16px rgb(var(--c-shadow) / 0.5)",
        press: "inset 0 2px 0 0 rgb(var(--c-shadow) / 0.12)",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "count-pop": {
          "0%": { transform: "scale(0.94)", opacity: "0" },
          "60%": { transform: "scale(1.02)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "marquee-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "rise-in": "rise-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "count-pop": "count-pop 420ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "marquee-up": "marquee-up 18s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
