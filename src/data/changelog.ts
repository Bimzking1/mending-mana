import type { ChangelogEntry } from "@/types";

/** Human-readable changelog shown on the Changelog screen. Newest first. */
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.4.0",
    date: "2026-09-18",
    title: "Fokus yang lebih tajam",
    description: "Pilih kategori dengan tenang — hasilnya nggak nyasar lagi.",
    changes: [
      "Kategori bisa dipilih lebih dari satu sekaligus, dan hasilnya benar-benar berisi kategori pilihanmu saja.",
      "Tombol kategori otomatis turun ke baris baru — nggak ada lagi pilihan yang kepotong di layar sempit.",
      "Angka harga dan label ± harga di kartu hasil diperbesar biar lebih gampang dibaca.",
      "Saran chip di bawah kolom harga dihapus, biar fokus ke harga dan kategori.",
      "Saran nama barang dihilangkan dari kolom 'Mau beli apa?'.",
      "Tombol 'Salin hasil' disingkirkan; cukup 'Coba harga lain' dan tombol mulai ulang yang berdampingan.",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-09-17",
    title: "Mesin pembanding yang lebih pintar",
    description: "Hasil perbandingan sekarang lebih beragam dan terasa lebih 'wow'.",
    changes: [
      "Skor kuantitas baru: angka 2–30 terasa paling menarik, angka raksasa dan ~1× tidak lagi mendominasi.",
      "Keragaman hasil ditingkatkan: maksimal 1 produk per merek dan 2 per kategori (3 untuk kategori yang dipilih).",
      "Kategori yang dipilih naik ke posisi teratas tanpa menenggelamkan kategori lain.",
      "Harga yang terlalu murah atau terlalu mahal diberi skor lebih rendah agar hasil tidak repetitif.",
      "Ditambah unit test (vitest) untuk menjamin engine tetap deterministik dan beragam.",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-09-10",
    title: "Mode gelap & hasil yang lebih hidup",
    description: "Aplikasi sekarang nyaman dipakai malam hari dan hasilnya lebih memukau.",
    changes: [
      "Mode gelap (dark mode) yang dirancang khusus — bukan sekadar hitam-putih.",
      "Transisi reveal antara input dan hasil diperhalus dengan curtain animasi.",
      "Kartu perbandingan masuk satu per satu dengan stagger ringan.",
      "Hormati prefers-reduced-motion untuk pengguna yang sensitif animasi.",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-09-01",
    title: "Versi pertama",
    description: "MVP Mending mana? resmi berdiri.",
    changes: [
      "Alur inti: masukin barang → masukin harga → lihat perbandingan.",
      "Input Rupiah yang nyaman di mobile (keyboard angka, format otomatis).",
      "69 produk contoh di 9 kategori untuk pengujian.",
      "Halaman Tentang dengan penjelasan singkat dan jujur soal data.",
      "Header + footer minimal dengan navigasi ke beranda dan Tentang.",
    ],
  },
];