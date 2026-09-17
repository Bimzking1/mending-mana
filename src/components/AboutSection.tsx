export function AboutSection() {
  return (
    <section className="space-y-4 pt-10">
      <h1 className="font-display text-hero font-bold text-ink">Tentang</h1>

      <p className="max-w-[60ch] text-lead text-ink">
        Mending mana? membantu kamu melihat harga dari sudut pandang yang berbeda.
      </p>

      <p className="max-w-[60ch] text-body text-ink-muted">
        Masukkan harga barang yang ingin kamu beli, lalu lihat apa saja yang bisa kamu dapatkan
        dengan jumlah uang yang sama.
      </p>

      <p className="max-w-[60ch] text-body text-ink-muted">
        Bukan untuk bilang kamu harus beli atau jangan beli. Cuma… biar tahu aja. 👀
      </p>

      <div className="rounded-card border border-line bg-sunken/60 p-5 text-meta text-ink-muted">
        <p className="font-medium text-ink">Soal harga</p>
        <p className="mt-1 max-w-[60ch]">
          Harga pembanding di aplikasi ini masih data contoh dan bisa beda jauh tergantung kota,
          promo, dan waktu. Anggap saja perkiraan kasar, bukan harga resmi.
        </p>
      </div>
    </section>
  );
}
