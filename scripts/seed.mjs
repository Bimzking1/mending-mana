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
    ["Kopi Susu Gula Aren", "Kopi Kenangan", "es kopi susu", 19000, "cup", "/ gelas", "🥤", 5, "kopikenangan.com"],
    ["Fore Aren Latte", "Fore Coffee", "es kopi susu", 27000, "cup", "/ gelas", "☕", 5, "fore.coffee"],
    ["Es Kopi Susu", "Fore Coffee", "es kopi", 21000, "cup", "/ gelas", "🧊", 4, "fore.coffee"],
    ["Tomoro Coconut Latte", "Tomoro Coffee", "latte", 25000, "cup", "/ gelas", "🥥", 4, "tomorocoffee.com"],
    ["Vanilla Latte", "Tomoro Coffee", "latte", 28000, "cup", "/ gelas", "🍦", 3, "tomorocoffee.com"],
    ["Caffè Latte Tall", "Starbucks", "latte", 52000, "cup", "/ gelas", "☕", 5, "starbucks.co.id"],
    ["Caramel Macchiato Tall", "Starbucks", "macchiato", 56000, "cup", "/ gelas", "🍯", 5, "starbucks.co.id"],
    ["Janji Jiwa Kopi Susu", "Kopi Janji Jiwa", "es kopi susu", 21000, "cup", "/ gelas", "☕", 5, "janjijiwa.com"],
    ["Kopi Susu Jahe", "Kopi Janji Jiwa", "es kopi", 22000, "cup", "/ gelas", "🫚", 4, "janjijiwa.com"],
    ["Americano Dingin", "Point Coffee", "americano", 18000, "cup", "/ gelas", "🧊", 4, "pointcoffee.id"],
    ["Americano Hangat", "Point Coffee", "americano", 16000, "cup", "/ gelas", "☕", 3, "pointcoffee.id"],
    ["Kopi Tubruk Warkop", "Warkop", "kopi tubruk", 6000, "cup", "/ gelas", "☕", 4, "example.id"],
    ["Kopi Jahe Hangat", "Warkop", "kopi jahe", 5000, "cup", "/ gelas", "🫚", 3, "example.id"],
    ["Brown Sugar Boba", "Chatime", "boba", 35000, "cup", "/ gelas", "🧋", 5, "chatime.co.id"],
    ["Thai Tea Kreasi", "Chatime", "teh", 33000, "cup", "/ gelas", "🧋", 4, "chatime.co.id"],
    ["Mixue Es Krim Cone", "Mixue", "es krim", 8000, "pcs", "/ cone", "🍦", 5, "mixue.id"],
    ["Mixue Sundae Cokelat", "Mixue", "es krim", 13000, "pcs", "/ cup", "🍫", 4, "mixue.id"],
    ["Teh Botol Dingin", "Sosro", "teh kemasan", 5000, "bottle", "/ botol", "🫙", 5, "sosro.com"],
    ["Teh Botol Hangat", "Sosro", "teh kemasan", 4500, "bottle", "/ botol", "🍵", 4, "sosro.com"],
    ["Teh Kotak Mellano", "Ultra Milk", "teh kemasan", 6500, "pcs", "/ kotak", "🧃", 4, "ultrajaya.co.id"],
    ["Es Teh Server", "Teh Poci", "teh", 15000, "cup", "/ gelas", "🍵", 3, "example.id"],
    ["Sweet Tea Es", "Gong Cha", "teh", 32000, "cup", "/ gelas", "🧋", 3, "gongcha.co.id"],
    ["Fresh Milk Alpukat", "Lazy Coffee", "susu", 38000, "cup", "/ gelas", "🥑", 3, "example.id"],
    ["Kopi Kelapa Gading", "Boba Express", "kopi", 29000, "cup", "/ gelas", "🥥", 3, "example.id"],
  ],
  food: [
    ["Nasi Goreng Warteg", "Warteg", "nasi", 15000, "porsi", "/ porsi", "🍚", 5, "example.id"],
    ["Nasi Kuning Komplit", "Warteg", "nasi", 18000, "porsi", "/ porsi", "🍛", 4, "example.id"],
    ["Mie Ayam Bakso", "Kaki Lima", "mie", 18000, "porsi", "/ porsi", "🍜", 5, "example.id"],
    ["Roti Bakar Coklat", "Kaki Lima", "roti", 12000, "porsi", "/ porsi", "🍞", 4, "example.id"],
    ["Pisang Goreng 5 pcs", "Kaki Lima", "gorengan", 10000, "porsi", "/ porsi", "🍌", 5, "example.id"],
    ["Sate Ayam 10 Tusuk", "Kaki Lima", "sate", 30000, "porsi", "/ porsi", "🍢", 5, "example.id"],
    ["Martabak Manis Cokelat", "Kaki Lima", "martabak", 55000, "pcs", "/ loyang", "🥞", 5, "example.id"],
    ["Soto Betawi", "Kaki Lima", "soto", 32000, "porsi", "/ porsi", "🍲", 4, "example.id"],
    ["Bakso Urat Mangkok", "Kaki Lima", "bakso", 20000, "porsi", "/ porsi", "🍲", 5, "example.id"],
    ["Kwetiau Siram", "Kaki Lima", "kwetiau", 26000, "porsi", "/ porsi", "🍜", 3, "example.id"],
    ["Ayam Geprek + Nasi", "Geprek Bensu", "ayam", 25000, "porsi", "/ porsi", "🍗", 4, "geprekbensu.com"],
    ["Ayam Geprek Original", "Geprek Bensu", "ayam", 22000, "porsi", "/ porsi", "🍗", 4, "geprekbensu.com"],
    ["Chicken Burger Deluxe", "McDonald's", "burger", 45000, "pcs", "/ pcs", "🍔", 5, "mcdonalds.co.id"],
    ["McSpicy", "McDonald's", "burger", 47000, "pcs", "/ pcs", "🍔", 4, "mcdonalds.co.id"],
    ["Whopper Beef", "Burger King", "burger", 52000, "pcs", "/ pcs", "🍔", 4, "burgerking.co.id"],
    ["Pizza Regular Pan", "Pizza Hut", "pizza", 89000, "pcs", "/ loyang", "🍕", 5, "pizzahut.co.id"],
    ["Pizza Personal Pepperoni", "Domino's", "pizza", 65000, "pcs", "/ loyang", "🍕", 4, "dominos.co.id"],
    ["Indomie Goreng 1 Dus", "Indomie", "instan", 118000, "dus", "/ dus (40)", "🍜", 5, "indomie.com"],
    ["Indomie Ayam Bawang 1 Dus", "Indomie", "instan", 100000, "dus", "/ dus (40)", "🍜", 4, "indomie.com"],
    ["Sushi Salmon 2 pcs", "Sushi Tei", "sushi", 48000, "porsi", "/ porsi", "🍣", 4, "sushitei.co.id"],
    ["Salmon Donburi", "Sushi Tei", "sushi", 89000, "porsi", "/ porsi", "🍣", 3, "sushitei.co.id"],
    ["Kebab Turki Jumbo", "Baba Rafi", "kebab", 28000, "pcs", "/ pcs", "🌯", 4, "kebabbabarafi.com"],
    ["Kebab Mini 4 pcs", "Baba Rafi", "kebab", 25000, "porsi", "/ porsi", "🌯", 3, "kebabbabarafi.com"],
    ["Donat Glazed", "J.CO", "donat", 24000, "pcs", "/ pcs", "🍩", 5, "jcodonuts.com"],
    ["Donat Cruller", "J.CO", "donat", 26000, "pcs", "/ pcs", "🍩", 3, "jcodonuts.com"],
    ["Nasi Padang Komplit", "Rumah Makan Padang", "nasi", 28000, "porsi", "/ porsi", "🍛", 5, "example.id"],
    ["Nasi Rendang Sapi", "Rumah Makan Padang", "nasi", 35000, "porsi", "/ porsi", "🍛", 4, "example.id"],
    ["Bakmi GM Ayam Pangsit", "Bakmi GM", "mie", 42000, "porsi", "/ porsi", "🍜", 4, "bakmigm.co.id"],
    ["Bakmi GM Yamin", "Bakmi GM", "mie", 39000, "porsi", "/ porsi", "🍜", 3, "bakmigm.co.id"],
    ["Nasi Uduk Khas Jakarta", "Kaki Lima", "nasi", 12000, "porsi", "/ porsi", "🍛", 5, "example.id"],
    ["Bubur Ayam Kampung", "Kaki Lima", "bubur", 15000, "porsi", "/ porsi", "🥣", 4, "example.id"],
    ["Soto Mie Bogor", "Kaki Lima", "soto", 25000, "porsi", "/ porsi", "🍲", 4, "example.id"],
    ["Gado-Gado Komplit", "Kaki Lima", "salad", 18000, "porsi", "/ porsi", "🥗", 4, "example.id"],
    ["Rujak Buah", "Kaki Lima", "buah", 15000, "porsi", "/ porsi", "🍉", 3, "example.id"],
    ["Es Campur", "Kaki Lima", "es", 20000, "porsi", "/ porsi", "🥤", 3, "example.id"],
  ],
  fashion: [
    ["AIRism Cotton T-Shirt", "Uniqlo", "kaos", 199000, "pcs", "/ pcs", "👕", 5, "uniqlo.com"],
    ["Kemeja Oxford Slim", "Uniqlo", "kemeja", 299000, "pcs", "/ pcs", "👔", 4, "uniqlo.com"],
    ["Kaos Graphic Print", "Uniqlo", "kaos", 249000, "pcs", "/ pcs", "👕", 3, "uniqlo.com"],
    ["Hoodie Basic Fleece", "Uniqlo", "hoodie", 499000, "pcs", "/ pcs", "🧥", 5, "uniqlo.com"],
    ["Kaos Polos Cotton Combed", "Erigo", "kaos", 99000, "pcs", "/ pcs", "👕", 4, "erigostore.co.id"],
    ["Kemeja Flanel", "Erigo", "kemeja", 179000, "pcs", "/ pcs", "👔", 4, "erigostore.co.id"],
    ["Jaket Denim", "Erigo", "jaket", 290000, "pcs", "/ pcs", "🧥", 3, "erigostore.co.id"],
    ["Celana Jeans Loose", "Erigo", "celana", 159000, "pcs", "/ pcs", "👖", 4, "erigostore.co.id"],
    ["Celana Chino Slim", "H&M", "celana", 399000, "pcs", "/ pcs", "👖", 5, "hm.com"],
    ["Dress Casual", "H&M", "dress", 349000, "pcs", "/ pcs", "👗", 3, "hm.com"],
    ["Jeans Slim Fit", "Levi's", "jeans", 749000, "pcs", "/ pcs", "👖", 4, "levi.com"],
    ["Sepatu Compass Gazelle", "Compass", "sneakers", 585000, "pair", "/ pasang", "👟", 4, "sepatucompass.com"],
    ["Nike Revolution 7", "Nike", "sepatu lari", 899000, "pair", "/ pasang", "👟", 5, "nike.com"],
    ["Sepatu Ultraboost", "Adidas", "sepatu lari", 1899000, "pair", "/ pasang", "👟", 3, "adidas.co.id"],
    ["Sandal Jepit Swallow", "Swallow", "sandal", 25000, "pair", "/ pasang", "🩴", 5, "example.id"],
    ["Topi Snapback", "Eiger", "topi", 129000, "pcs", "/ pcs", "🧢", 3, "eigeradventure.com"],
    ["Tas Selempang Kanvas", "Eiger", "tas", 249000, "pcs", "/ pcs", "🎒", 4, "eigeradventure.com"],
    ["Kemeja Flanel Kotak", "Eiger", "kemeja", 229000, "pcs", "/ pcs", "👔", 3, "eigeradventure.com"],
    ["Celana Cargo", "Eiger", "celana", 269000, "pcs", "/ pcs", "👖", 3, "eigeradventure.com"],
    ["Sepatu Panther", "Brodo", "sneakers", 699000, "pair", "/ pasang", "👟", 4, "brodo.co.id"],
    ["Sweater Rajut", "H&M", "sweater", 429000, "pcs", "/ pcs", "🧶", 3, "hm.com"],
    ["Jaket Bomber", "Zara", "jaket", 749000, "pcs", "/ pcs", "🧥", 3, "zara.com"],
    ["Rok A-Line", "H&M", "rok", 299000, "pcs", "/ pcs", "👗", 3, "hm.com"],
    ["Celana Kulot", "H&M", "celana", 329000, "pcs", "/ pcs", "👖", 3, "hm.com"],
    ["Sepatu Vans Old Skool", "Vans", "sneakers", 1099000, "pair", "/ pasang", "👟", 4, "vans.co.id"],
  ],
  gadget: [
    ["Galaxy Buds FE", "Samsung", "earbuds", 899000, "pcs", "/ unit", "🎧", 5, "samsung.com"],
    ["Galaxy A55 5G", "Samsung", "hp", 4999000, "pcs", "/ unit", "📱", 5, "samsung.com"],
    ["Charger 33W Fast", "Xiaomi", "charger", 169000, "pcs", "/ unit", "🔌", 4, "mi.co.id"],
    ["Smartwatch Redmi Watch 5", "Xiaomi", "smartwatch", 799000, "pcs", "/ unit", "⌚", 4, "mi.co.id"],
    ["Redmi Note 13", "Xiaomi", "hp", 2899000, "pcs", "/ unit", "📱", 5, "mi.co.id"],
    ["iPhone Charger 20W", "Apple", "charger", 399000, "pcs", "/ unit", "🔌", 5, "apple.com"],
    ["Audio Pro 4", "Nothing", "earbuds", 1999000, "pcs", "/ unit", "🎧", 3, "nothing.tech"],
    ["Powerbank 10.000mAh", "Anker", "powerbank", 349000, "pcs", "/ unit", "🔋", 4, "anker.com"],
    ["Mouse Wireless M170", "Logitech", "mouse", 165000, "pcs", "/ unit", "🖱️", 5, "logitech.com"],
    ["Webcam C270", "Logitech", "webcam", 449000, "pcs", "/ unit", "📷", 3, "logitech.com"],
    ["Keyboard Mechanical TKL", "Rexus", "keyboard", 429000, "pcs", "/ unit", "⌨️", 3, "rexus.id"],
    ["Kabel USB-C Braided", "Vivan", "kabel", 45000, "pcs", "/ pcs", "🧵", 3, "vivan.co.id"],
    ["Flashdisk 64GB", "SanDisk", "storage", 89000, "pcs", "/ pcs", "💾", 4, "sandisk.com"],
    ["Harddisk 1TB", "Western Digital", "storage", 899000, "pcs", "/ unit", "💾", 4, "wd.com"],
    ["Speaker Bluetooth JBL Go", "JBL", "speaker", 750000, "pcs", "/ unit", "🔊", 4, "jbl.com"],
    ["Monitor 24'' IPS", "LG", "monitor", 1599000, "pcs", "/ unit", "🖥️", 3, "lg.com"],
    ["Kamomera Mirrorless", "Sony", "kamera", 7500000, "pcs", "/ unit", "📷", 3, "sony.co.id"],
    ["MacBook Air M2", "Apple", "laptop", 15999000, "pcs", "/ unit", "💻", 5, "apple.com"],
    ["Chromebook 11", "Acer", "laptop", 3499000, "pcs", "/ unit", "💻", 3, "acer.com"],
    ["Mi Band 9", "Xiaomi", "smartband", 549000, "pcs", "/ unit", "⌚", 4, "mi.co.id"],
  ],
  gaming: [
    ["Game Indie di Steam", "Steam", "game digital", 120000, "pcs", "/ judul", "🎮", 5, "store.steampowered.com"],
    ["Game AAA di Steam", "Steam", "game digital", 599000, "pcs", "/ judul", "🎮", 5, "store.steampowered.com"],
    ["Mobile Legends 250 Diamond", "Moonton", "top up", 70000, "pcs", "/ paket", "💎", 5, "mobilelegends.com"],
    ["Mobile Legends 568 Diamond", "Moonton", "top up", 147000, "pcs", "/ paket", "💎", 4, "mobilelegends.com"],
    ["Voucher Google Play 50rb", "Google Play", "voucher", 50000, "pcs", "/ voucher", "🎟️", 5, "play.google.com"],
    ["Voucher Google Play 100rb", "Google Play", "voucher", 100000, "pcs", "/ voucher", "🎟️", 4, "play.google.com"],
    ["Top Up Free Fire 100", "Garena", "top up", 85000, "pcs", "/ paket", "🔥", 4, "ff.garena.com"],
    ["Genshin Welkin Moon", "HoYoverse", "top up", 79000, "pcs", "/ bulan", "🌙", 4, "hoyoverse.com"],
    ["Genshin Primogems 980", "HoYoverse", "top up", 183000, "pcs", "/ paket", "💎", 3, "hoyoverse.com"],
    ["PlayStation Plus Essential", "Sony", "langganan", 149000, "month", "/ bulan", "🎮", 4, "playstation.com"],
    ["Stik Controller Wireless", "Generic", "aksesoris", 299000, "pcs", "/ unit", "🕹️", 3, "example.id"],
    ["Sewa PS5 per Jam", "Rental PS", "rental", 15000, "hour", "/ jam", "🎮", 4, "example.id"],
    ["Steam Deck 64GB", "Valve", "konsol", 6500000, "pcs", "/ unit", "🕹️", 3, "steamdeck.com"],
    ["PlayStation 5 Digital", "Sony", "konsol", 6499000, "pcs", "/ unit", "🎮", 5, "playstation.com"],
    ["Xbox Series S", "Microsoft", "konsol", 3999000, "pcs", "/ unit", "🎮", 4, "xbox.com"],
    ["Konsol Nintendo Switch", "Nintendo", "konsol", 4299000, "pcs", "/ unit", "🎮", 4, "nintendo.co.id"],
  ],
  books: [
    ["Novel Bestseller", "Gramedia", "novel", 105000, "pcs", "/ buku", "📚", 5, "gramedia.com"],
    ["Novel Fiksi Ilmiah", "Gramedia", "novel", 145000, "pcs", "/ buku", "📖", 3, "gramedia.com"],
    ["Buku Self-Improvement", "Gramedia", "non-fiksi", 98000, "pcs", "/ buku", "📖", 5, "gramedia.com"],
    ["Buku Manajemen Keuangan", "Gramedia", "non-fiksi", 89000, "pcs", "/ buku", "💰", 4, "gramedia.com"],
    ["Buku Resep Masakan", "Gramedia", "non-fiksi", 125000, "pcs", "/ buku", "🍳", 3, "gramedia.com"],
    ["Ensiklopedia Anak", "Erlangga", "ensiklopedia", 150000, "pcs", "/ buku", "📚", 3, "erlangga.co.id"],
    ["Komik Terjemahan", "Elex Media", "komik", 35000, "pcs", "/ buku", "📗", 4, "elexmedia.id"],
    ["Komik Manga Seri Lengkap", "Elex Media", "komik", 42000, "pcs", "/ buku", "📗", 4, "elexmedia.id"],
    ["Buku Anak Bergambar", "Bhuana Ilmu", "anak", 65000, "pcs", "/ buku", "📘", 3, "bip.id"],
    ["Buku Cerita Anak Lengkap", "Bhuana Ilmu", "anak", 85000, "pcs", "/ buku", "📘", 3, "bip.id"],
    ["Buku Kerja Matematika", "Erlangga", "pendidikan", 45000, "pcs", "/ buku", "🧮", 2, "erlangga.co.id"],
    ["Majalah GG", "Cata Data", "majalah", 60000, "pcs", "/ eksemplar", "🗞️", 3, "example.id"],
    ["Langganan Gramedia Digital", "Gramedia", "digital", 89000, "month", "/ bulan", "📱", 4, "ebooks.gramedia.com"],
    ["Buku Puisi Kompilasi", "Gramedia", "puisi", 55000, "pcs", "/ buku", "🌸", 2, "gramedia.com"],
    ["Novel Horor Indonesia", "Gramedia", "novel", 99000, "pcs", "/ buku", "👻", 3, "gramedia.com"],
    ["Buku Sejarah Indonesia", "Gramedia", "non-fiksi", 135000, "pcs", "/ buku", "🏛️", 3, "gramedia.com"],
    ["Komik Strip Harian", "Elex Media", "komik", 28000, "pcs", "/ buku", "💬", 3, "elexmedia.id"],
  ],
  entertainment: [
    ["Tiket Reguler Weekday", "Cinema XXI", "bioskop", 50000, "ticket", "/ tiket", "🎬", 5, "21cineplex.com"],
    ["Tiket Reguler Weekend", "Cinema XXI", "bioskop", 65000, "ticket", "/ tiket", "🎬", 5, "21cineplex.com"],
    ["Tiket IMAX", "Cinema XXI", "bioskop", 90000, "ticket", "/ tiket", "🎥", 4, "21cineplex.com"],
    ["Tiket Reguler CGV", "CGV", "bioskop", 55000, "ticket", "/ tiket", "🎬", 5, "cgv.id"],
    ["Tiket Dolby Cinema", "CGV", "bioskop", 110000, "ticket", "/ tiket", "🎥", 3, "cgv.id"],
    ["Netflix Paket Basic", "Netflix", "streaming", 65000, "month", "/ bulan", "📺", 5, "netflix.com"],
    ["Netflix Paket Standard", "Netflix", "streaming", 130000, "month", "/ bulan", "📺", 4, "netflix.com"],
    ["Spotify Premium Individual", "Spotify", "streaming", 60000, "month", "/ bulan", "🎧", 5, "spotify.com"],
    ["YouTube Premium", "YouTube", "streaming", 59000, "month", "/ bulan", "📱", 4, "youtube.com"],
    ["Tiket Konser Festival", "Promotor Lokal", "konser", 750000, "ticket", "/ tiket", "🎤", 4, "example.id"],
    ["Tiket Konser Band International", "Promotor", "konser", 2500000, "ticket", "/ tiket", "🎸", 3, "example.id"],
    ["Karaoke 2 Jam", "Happy Puppy", "karaoke", 120000, "session", "/ sesi", "🎤", 4, "happypuppy.co.id"],
    ["Karaoke 5 Jam Paket", "Happy Puppy", "karaoke", 180000, "session", "/ sesi", "🎙️", 3, "happypuppy.co.id"],
    ["Tiket Dufan Weekday", "Dufan", "wahana", 250000, "ticket", "/ tiket", "🎡", 5, "ancol.com"],
    ["Tiket Trans Studio Bandung", "Trans Studio", "wahana", 150000, "ticket", "/ tiket", "🎢", 4, "transstudiomall.com"],
    ["Tiket Pantai Indah Kapuk", "PIK", "wisata", 15000, "ticket", "/ tiket", "🏖️", 3, "example.id"],
    ["Bermain Bowling 1 Game", "Bowling Center", "olahraga", 35000, "game", "/ game", "🎳", 3, "example.id"],
    ["Tiket Konser Vera", "Promotor Lokal", "konser", 550000, "ticket", "/ tiket", "🎤", 3, "example.id"],
    ["City Tour Bus Jakarta", "Kota Wisata", "wisata", 85000, "ticket", "/ tiket", "🚌", 3, "example.id"],
    ["Museum Nasional Tiket", "Museum UM", "wisata", 15000, "ticket", "/ tiket", "🏛️", 3, "example.id"],
    ["Komik Expo 1 Hari", "Komika", "pameran", 120000, "ticket", "/ tiket", "🎪", 3, "example.id"],
  ],
  transport: [
    ["GoRide Jarak Dekat", "Gojek", "ojek online", 15000, "trip", "/ trip", "🛵", 5, "gojek.com"],
    ["GoCar Dalam Kota", "Gojek", "mobil online", 55000, "trip", "/ trip", "🚗", 4, "gojek.com"],
    ["GrabBike Jarak Menengah", "Grab", "ojek online", 18000, "trip", "/ trip", "🛵", 5, "grab.com"],
    ["GrabCar Dalam Kota", "Grab", "mobil online", 45000, "trip", "/ trip", "🚗", 5, "grab.com"],
    ["Tiket MRT Jakarta", "MRT Jakarta", "kereta", 10000, "trip", "/ trip", "🚇", 5, "jakartamrt.co.id"],
    ["Tiket MRT Pulang-Pergi", "MRT Jakarta", "kereta", 20000, "trip", "/ trip", "🚇", 4, "jakartamrt.co.id"],
    ["Tiket KRL Commuter", "KAI Commuter", "kereta", 4000, "trip", "/ trip", "🚃", 5, "commuterline.id"],
    ["Bensin Pertalite 1 Liter", "Pertamina", "bbm", 10000, "liter", "/ liter", "⛽", 5, "pertamina.com"],
    ["Bensin Pertamax 1 Liter", "Pertamina", "bbm", 13000, "liter", "/ liter", "⛽", 4, "pertamina.com"],
    ["Tiket Kereta Ekonomi Jkt–Bdg", "KAI", "kereta", 125000, "ticket", "/ tiket", "🚆", 5, "kai.id"],
    ["Tiket Kereta Eksekutif Jkt–Bdg", "KAI", "kereta", 220000, "ticket", "/ tiket", "🚆", 4, "kai.id"],
    ["Tiket Pesawat Jkt–Jogja", "Maskapai LCC", "pesawat", 780000, "ticket", "/ tiket", "✈️", 5, "example.id"],
    ["Tiket Pesawat Jkt–Bali", "Maskapai LCC", "pesawat", 1200000, "ticket", "/ tiket", "✈️", 5, "example.id"],
    ["Busway Perjalanan", "TransJakarta", "bus", 3500, "trip", "/ trip", "🚌", 5, "transjakarta.co.id"],
    ["Taksi Bluebird Argo", "Bluebird", "taksi", 75000, "trip", "/ trip", "🚕", 4, "bluebirdgroup.com"],
    ["Tiket Ferry Jkt–Bintan", "Ferry Indonesia", "kapal", 700000, "ticket", "/ tiket", "⛴️", 3, "example.id"],
    ["Parkir Mall 4 Jam", "Mall", "parkir", 24000, "hour", "/ 4 jam", "🅿️", 4, "example.id"],
  ],
  living: [
    ["Beras Premium 5kg", "Supermarket", "sembako", 78000, "pack", "/ karung", "🌾", 5, "example.id"],
    ["Beras Medium 5kg", "Supermarket", "sembako", 68000, "pack", "/ karung", "🌾", 4, "example.id"],
    ["Telur Ayam 1kg", "Pasar", "sembako", 30000, "kg", "/ kg", "🥚", 5, "example.id"],
    ["Minyak Goreng 2L", "Supermarket", "sembako", 42000, "pcs", "/ botol", "🛢️", 5, "example.id"],
    ["Gula Pasir 1kg", "Supermarket", "sembako", 18000, "kg", "/ kg", "🍬", 5, "example.id"],
    ["Tepung Terigu 1kg", "Supermarket", "sembako", 14000, "kg", "/ kg", "🌾", 4, "example.id"],
    ["Kecap Manis 600ml", "Bango", "bumbu", 25000, "pcs", "/ botol", "🫙", 5, "bango.co.id"],
    ["Galon Air Isi Ulang", "Aqua", "air", 22000, "pcs", "/ galon", "💧", 5, "sehataqua.co.id"],
    ["Air Mineral 600ml", "Aqua", "air", 4000, "pcs", "/ botol", "💧", 5, "sehataqua.co.id"],
    ["Paket Data 25GB", "Telkomsel", "pulsa", 90000, "month", "/ bulan", "📶", 5, "telkomsel.com"],
    ["Paket Data 3GB", "Telkomsel", "pulsa", 30000, "month", "/ bulan", "📶", 4, "telkomsel.com"],
    ["Token Listrik 100rb", "PLN", "listrik", 100000, "pcs", "/ token", "💡", 5, "pln.co.id"],
    ["Token Listrik 50rb", "PLN", "listrik", 50000, "pcs", "/ token", "💡", 4, "pln.co.id"],
    ["Potong Rambut Barbershop", "Barbershop Lokal", "jasa", 50000, "session", "/ sesi", "💈", 4, "example.id"],
    ["Potong Rambut VIP", "Barbershop Lokal", "jasa", 120000, "session", "/ sesi", "💈", 3, "example.id"],
    ["Laundry Kiloan 3kg", "Laundry Lokal", "jasa", 24000, "kg", "/ 3 kg", "🧺", 4, "example.id"],
    ["Wifi Rumah 1 Bulan", "Provider Lokal", "internet", 250000, "month", "/ bulan", "📡", 5, "example.id"],
    ["Wifi Fiber 30Mbps", "Tipa", "internet", 325000, "month", "/ bulan", "📡", 4, "example.id"],
    ["Telur 1kg Pasar Pagi", "Pasar", "sembako", 28000, "kg", "/ kg", "🥚", 4, "example.id"],
    ["Cabai Rawit 1kg", "Pasar", "bumbu", 45000, "kg", "/ kg", "🌶️", 4, "example.id"],
    ["Sabun Mandi", "Lux", "kebersihan", 21000, "pcs", "/ batang", "🧼", 5, "example.id"],
    ["Shampo Sachet Ukuran Besar", "Pantene", "kebersihan", 12000, "pcs", "/ sachet", "🧴", 4, "example.id"],
    ["Popok Bayi 1 Pack", "Pampers", "bayi", 120000, "pack", "/ pack", "👶", 4, "example.id"],
    ["Susu UHT 1L", "Ultra Milk", "susu", 17000, "pcs", "/ liter", "🥛", 5, "ultrajaya.co.id"],
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