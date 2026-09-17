/**
 * Generates src/data/latest.json from a compact table.
 *
 * Prices are SAMPLE figures typical of Jakarta in 2026 — they are placeholders
 * for the UI, not verified retail prices. Every record carries isSample: true
 * until the scraper replaces it. Run: node scripts/seed.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "../src/data/latest.json");
const UPDATED_AT = "2026-09-17";

// [name, brand, subcategory, price, unit, displayUnit, emoji, recognizability, domain]
const TABLE = {
  coffee: [
    ["Kopi Kenangan Mantan", "Kopi Kenangan", "es kopi susu", 22000, "cup", "/ gelas", "☕", 5, "kopikenangan.com"],
    ["Fore Aren Latte", "Fore Coffee", "es kopi susu", 27000, "cup", "/ gelas", "☕", 5, "fore.coffee"],
    ["Tomoro Coconut Latte", "Tomoro Coffee", "latte", 25000, "cup", "/ gelas", "🥥", 4, "tomorocoffee.com"],
    ["Caffè Latte Tall", "Starbucks", "latte", 52000, "cup", "/ gelas", "☕", 5, "starbucks.co.id"],
    ["Janji Jiwa Kopi Susu", "Kopi Janji Jiwa", "es kopi susu", 21000, "cup", "/ gelas", "☕", 5, "janjijiwa.com"],
    ["Americano Dingin", "Point Coffee", "americano", 18000, "cup", "/ gelas", "🧊", 4, "pointcoffee.id"],
    ["Kopi Tubruk Warkop", "Warkop", "kopi tubruk", 6000, "cup", "/ gelas", "☕", 4, "example.id"],
    ["Brown Sugar Boba", "Chatime", "boba", 35000, "cup", "/ gelas", "🧋", 5, "chatime.co.id"],
    ["Mixue Es Krim Cone", "Mixue", "es krim", 8000, "pcs", "/ cone", "🍦", 5, "mixue.id"],
    ["Teh Botol Dingin", "Sosro", "teh kemasan", 5000, "bottle", "/ botol", "🫙", 5, "sosro.com"],
  ],
  food: [
    ["Nasi Goreng Warteg", "Warteg", "nasi", 15000, "porsi", "/ porsi", "🍚", 5, "example.id"],
    ["Mie Ayam Bakso", "Kaki Lima", "mie", 18000, "porsi", "/ porsi", "🍜", 5, "example.id"],
    ["Ayam Geprek + Nasi", "Geprek Bensu", "ayam", 25000, "porsi", "/ porsi", "🍗", 4, "geprekbensu.com"],
    ["Chicken Burger Deluxe", "McDonald's", "burger", 45000, "pcs", "/ pcs", "🍔", 5, "mcdonalds.co.id"],
    ["Pizza Regular Pan", "Pizza Hut", "pizza", 89000, "pcs", "/ loyang", "🍕", 5, "pizzahut.co.id"],
    ["Sate Ayam 10 Tusuk", "Kaki Lima", "sate", 30000, "porsi", "/ porsi", "🍢", 5, "example.id"],
    ["Indomie Goreng 1 Dus", "Indomie", "instan", 118000, "dus", "/ dus (40)", "🍜", 5, "indomie.com"],
    ["Martabak Manis Cokelat", "Kaki Lima", "martabak", 55000, "pcs", "/ loyang", "🥞", 5, "example.id"],
    ["Sushi Salmon 2 pcs", "Sushi Tei", "sushi", 48000, "porsi", "/ porsi", "🍣", 4, "sushitei.co.id"],
    ["Kebab Turki Jumbo", "Baba Rafi", "kebab", 28000, "pcs", "/ pcs", "🌯", 4, "kebabbabarafi.com"],
    ["Bakso Urat Mangkok", "Kaki Lima", "bakso", 20000, "porsi", "/ porsi", "🍲", 5, "example.id"],
  ],
  fashion: [
    ["AIRism Cotton T-Shirt", "Uniqlo", "kaos", 199000, "pcs", "/ pcs", "👕", 5, "uniqlo.com"],
    ["Kaos Polos Cotton Combed", "Erigo", "kaos", 99000, "pcs", "/ pcs", "👕", 4, "erigostore.co.id"],
    ["Celana Chino Slim", "H&M", "celana", 399000, "pcs", "/ pcs", "👖", 5, "hm.com"],
    ["Sepatu Compass Gazelle", "Compass", "sneakers", 585000, "pair", "/ pasang", "👟", 4, "sepatucompass.com"],
    ["Nike Revolution 7", "Nike", "sepatu lari", 899000, "pair", "/ pasang", "👟", 5, "nike.com"],
    ["Sandal Jepit Swallow", "Swallow", "sandal", 25000, "pair", "/ pasang", "🩴", 5, "example.id"],
    ["Hoodie Basic Fleece", "Uniqlo", "hoodie", 499000, "pcs", "/ pcs", "🧥", 5, "uniqlo.com"],
    ["Kemeja Flanel", "Erigo", "kemeja", 179000, "pcs", "/ pcs", "👔", 4, "erigostore.co.id"],
    ["Tas Selempang Kanvas", "Eiger", "tas", 249000, "pcs", "/ pcs", "🎒", 4, "eigeradventure.com"],
  ],
  gadget: [
    ["Galaxy Buds FE", "Samsung", "earbuds", 899000, "pcs", "/ unit", "🎧", 5, "samsung.com"],
    ["Powerbank 10.000mAh", "Anker", "powerbank", 349000, "pcs", "/ unit", "🔋", 4, "anker.com"],
    ["Mouse Wireless M170", "Logitech", "mouse", 165000, "pcs", "/ unit", "🖱️", 5, "logitech.com"],
    ["Keyboard Mechanical TKL", "Rexus", "keyboard", 429000, "pcs", "/ unit", "⌨️", 3, "rexus.id"],
    ["Charger 33W Fast", "Xiaomi", "charger", 169000, "pcs", "/ unit", "🔌", 4, "mi.co.id"],
    ["Kabel USB-C Braided", "Vivan", "kabel", 45000, "pcs", "/ pcs", "🧵", 3, "vivan.co.id"],
    ["Smartwatch Redmi Watch 5", "Xiaomi", "smartwatch", 799000, "pcs", "/ unit", "⌚", 4, "mi.co.id"],
    ["Flashdisk 64GB", "SanDisk", "storage", 89000, "pcs", "/ pcs", "💾", 4, "sandisk.com"],
  ],
  gaming: [
    ["Game Indie di Steam", "Steam", "game digital", 120000, "pcs", "/ judul", "🎮", 5, "store.steampowered.com"],
    ["Mobile Legends 250 Diamond", "Moonton", "top up", 70000, "pcs", "/ paket", "💎", 5, "mobilelegends.com"],
    ["Voucher Google Play 50rb", "Google Play", "voucher", 50000, "pcs", "/ voucher", "🎟️", 5, "play.google.com"],
    ["Stik Controller Wireless", "Generic", "aksesoris", 299000, "pcs", "/ unit", "🕹️", 3, "example.id"],
    ["Sewa PS5 per Jam", "Rental PS", "rental", 15000, "hour", "/ jam", "🎮", 4, "example.id"],
    ["Genshin Welkin Moon", "HoYoverse", "top up", 79000, "pcs", "/ bulan", "🌙", 4, "hoyoverse.com"],
  ],
  books: [
    ["Novel Bestseller", "Gramedia", "novel", 105000, "pcs", "/ buku", "📚", 5, "gramedia.com"],
    ["Buku Self-Improvement", "Gramedia", "non-fiksi", 98000, "pcs", "/ buku", "📖", 5, "gramedia.com"],
    ["Komik Terjemahan", "Elex Media", "komik", 35000, "pcs", "/ buku", "📗", 4, "elexmedia.id"],
    ["Buku Anak Bergambar", "Bhuana Ilmu", "anak", 65000, "pcs", "/ buku", "📘", 3, "bip.id"],
    ["Langganan Gramedia Digital", "Gramedia", "digital", 89000, "month", "/ bulan", "📱", 4, "ebooks.gramedia.com"],
  ],
  entertainment: [
    ["Tiket Reguler Weekday", "Cinema XXI", "bioskop", 50000, "ticket", "/ tiket", "🎬", 5, "21cineplex.com"],
    ["Tiket Reguler CGV", "CGV", "bioskop", 55000, "ticket", "/ tiket", "🎬", 5, "cgv.id"],
    ["Netflix Paket Basic", "Netflix", "streaming", 65000, "month", "/ bulan", "📺", 5, "netflix.com"],
    ["Spotify Premium Individual", "Spotify", "streaming", 60000, "month", "/ bulan", "🎧", 5, "spotify.com"],
    ["Tiket Konser Festival", "Promotor Lokal", "konser", 750000, "ticket", "/ tiket", "🎤", 4, "example.id"],
    ["Karaoke 2 Jam", "Happy Puppy", "karaoke", 120000, "session", "/ sesi", "🎤", 4, "happypuppy.co.id"],
    ["Tiket Dufan Weekday", "Dufan", "wahana", 250000, "ticket", "/ tiket", "🎡", 5, "ancol.com"],
  ],
  transport: [
    ["GoRide Jarak Dekat", "Gojek", "ojek online", 15000, "trip", "/ trip", "🛵", 5, "gojek.com"],
    ["GrabCar Dalam Kota", "Grab", "mobil online", 45000, "trip", "/ trip", "🚗", 5, "grab.com"],
    ["Tiket MRT Jakarta", "MRT Jakarta", "kereta", 10000, "trip", "/ trip", "🚇", 5, "jakartamrt.co.id"],
    ["Bensin Pertalite 1 Liter", "Pertamina", "bbm", 10000, "liter", "/ liter", "⛽", 5, "pertamina.com"],
    ["Tiket Kereta Ekonomi Jkt–Bdg", "KAI", "kereta", 125000, "ticket", "/ tiket", "🚆", 5, "kai.id"],
    ["Tiket Pesawat Jkt–Jogja", "Maskapai LCC", "pesawat", 780000, "ticket", "/ tiket", "✈️", 5, "example.id"],
  ],
  living: [
    ["Beras Premium 5kg", "Supermarket", "sembako", 78000, "pack", "/ karung", "🌾", 5, "example.id"],
    ["Telur Ayam 1kg", "Pasar", "sembako", 30000, "kg", "/ kg", "🥚", 5, "example.id"],
    ["Galon Air Isi Ulang", "Aqua", "air", 22000, "pcs", "/ galon", "💧", 5, "sehataqua.co.id"],
    ["Paket Data 25GB", "Telkomsel", "pulsa", 90000, "month", "/ bulan", "📶", 5, "telkomsel.com"],
    ["Token Listrik 100rb", "PLN", "listrik", 100000, "pcs", "/ token", "💡", 5, "pln.co.id"],
    ["Potong Rambut Barbershop", "Barbershop Lokal", "jasa", 50000, "session", "/ sesi", "💈", 4, "example.id"],
    ["Laundry Kiloan 3kg", "Laundry Lokal", "jasa", 24000, "kg", "/ 3 kg", "🧺", 4, "example.id"],
  ],
};

const slug = (value) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const items = [];
for (const [category, rows] of Object.entries(TABLE)) {
  for (const row of rows) {
    const [name, brand, subcategory, price, unit, displayUnit, emoji, recognizability, domain] = row;
    items.push({
      id: `${category}-${slug(brand)}-${slug(name)}`,
      name,
      brand,
      category,
      subcategory,
      price,
      unit,
      displayUnit,
      emoji,
      recognizability,
      sourceName: brand,
      sourceUrl: `https://${domain}`,
      region: "Jakarta",
      lastVerified: UPDATED_AT,
      isSample: true,
    });
  }
}

const ids = new Set();
for (const item of items) {
  if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  ids.add(item.id);
}

const payload = {
  version: 1,
  updatedAt: UPDATED_AT,
  dataQuality: "sample",
  items,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Wrote ${items.length} reference items to ${OUT}`);
