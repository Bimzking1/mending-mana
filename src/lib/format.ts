/** Single source of truth for every number the user sees. */

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const plain = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

/** 500000 → "Rp500.000" */
export function formatRupiah(value: number): string {
  return rupiah.format(Math.max(0, Math.round(value))).replace(/\s/g, "");
}

/** 500000 → "Rp 500.000" — keeps the space after "Rp" (a non-breaking space). */
export function formatRupiahSpaced(value: number): string {
  return rupiah.format(Math.max(0, Math.round(value)));
}

/** 500000 → "500.000" (used while typing, where "Rp" is a separate element) */
export function formatDigits(value: number): string {
  return plain.format(Math.max(0, Math.round(value)));
}

/** "Rp1.500.000" / "1.500k" / "1,5jt" → 1500000. Returns 0 for junk. */
export function parseRupiah(input: string): number {
  const cleaned = input.trim().toLowerCase().replace(/rp/g, "").replace(/\s/g, "");
  if (!cleaned) return 0;

  const shorthand = cleaned.match(/^([\d.,]+)(rb|k|jt|m)$/);
  if (shorthand) {
    const [, rawNumber = "", suffix = ""] = shorthand;
    const base = Number(rawNumber.replace(/\./g, "").replace(",", "."));
    if (!Number.isFinite(base)) return 0;
    const multiplier = suffix === "jt" || suffix === "m" ? 1_000_000 : 1_000;
    return Math.round(base * multiplier);
  }

  const digits = cleaned.replace(/\D/g, "");
  if (!digits) return 0;
  // Cap at 999 trillion so a pasted essay can never break the layout.
  return Math.min(Number(digits.slice(0, 15)), 999_999_999_999_999);
}

/** 500000 → "Rp500 ribu", 1500000 → "Rp1,5 juta". Used in short copy. */
export function formatRupiahShort(value: number): string {
  if (value >= 1_000_000_000) return `Rp${trimZero(value / 1_000_000_000)} miliar`;
  if (value >= 1_000_000) return `Rp${trimZero(value / 1_000_000)} juta`;
  if (value >= 1_000) return `Rp${trimZero(value / 1_000)} ribu`;
  return formatRupiah(value);
}

function trimZero(value: number): string {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value);
}

/** Quantities are approximations, so they always carry the ~ prefix. */
export function formatQuantity(quantity: number): string {
  return `~${plain.format(quantity)}×`;
}

/** "2026-09-17" → "17 Sep 2026" */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
