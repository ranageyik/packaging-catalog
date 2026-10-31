
const categories = [
  { name: "Karton Kutular", description: "Farklı ölçülerde kutu çözümleri", icon: "▧" },
  { name: "Ambalaj Poşetleri", description: "Günlük kullanım ve gönderim", icon: "▤" },
  { name: "Kâğıt Ambalajlar", description: "Şık ve işlevsel sunumlar", icon: "▱" },
  { name: "Koruyucu Ambalaj", description: "Ürünleriniz için güvenli taşıma", icon: "◇" },
];

const products = [
  { name: "Kraft Karton Kutu", code: "AMB-001", category: "Karton Ambalaj" },
  { name: "Kraft Kâğıt Poşet", code: "AMB-002", category: "Kâğıt Ambalaj" },
  { name: "Kargo Poşeti", code: "AMB-003", category: "Gönderi Ambalajı" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Ana sayfa">
          <span className="brand-mark">P</span>
          <span>PACKAGING<span className="brand-light"> CO.</span></span>
        </a>

        <nav className="navigation">
          <a href="#kategoriler">Kategoriler</a>
          <a href="#urunler">Ürünler</a>
          <a href="#hakkimizda">Hakkımızda</a>
        </nav>

        <a
          className="header-contact"
          href="#iletisim"
        >
          Teklif Al <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">İŞLETMELER İÇİN AMBALAJ ÇÖZÜMLERİ</span>
          <h1>
            Ürünlerinize
            <br />
            <span>değer katan</span>
            <br />
            ambalajlar.
          </h1>
          <p>
            İşletmenizin ihtiyaçlarına uygun ambalaj çözümlerini keşfedin.
            Ürünlerimizi inceleyin, size özel teklif alın.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#urunler">
              Ürünleri Keşfet <span>↗</span>
            </a>
            <a className="button-secondary" href="#iletisim">
              Bize Ulaşın
            </a>
          </div>
          <div className="hero-note">
            <span className="note-dot" />
            İşletmenize uygun çözümler, tek noktada.
          </div>
        </div>

        <div className="hero-visual" aria-label="Ambalaj ürünleri tanıtım alanı">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="package-box">
            <div className="package-top" />
            <div className="package-front">
              <span className="package-label">YOUR BRAND</span>
              <span className="package-line" />
              <span className="package-caption">PACKAGING SOLUTIONS</span>
            </div>
            <div className="package-side" />
          </div>
          <div className="visual-tag">
            <span>01 / 04</span>
            <span>Thoughtful packaging</span>
          </div>
        </div>
      </section>

      <section className="categories section-wrap" id="kategoriler">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ÜRÜN GRUPLARIMIZ</span>
            <h2>Her ihtiyaca uygun<br />ambalaj çözümleri.</h2>
          </div>
          <a href="#urunler" className="text-link">Tüm ürünleri gör ↗</a>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.name}>
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <a href="#urunler" aria-label={`${category.name} ürünlerini incele`}>
                İncele <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="products section-wrap" id="urunler">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SEÇİLMİŞ ÜRÜNLER</span>
            <h2>Kataloğumuzdan.</h2>
          </div>
          <p className="section-description">
            Örnek ürünlerdir. Gerçek ürün listesi geldiğinde güncellenecektir.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.code}>
              <div className={`product-art product-art-${index + 1}`}>
                <span className="product-number">0{index + 1}</span>
                <div className="mini-package">
                  <span>{index === 0 ? "BOX" : index === 1 ? "PAPER" : "SHIP"}</span>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <span className="product-code">Ürün kodu: {product.code}</span>
                <a
                  className="product-link"
                  href={`#iletisim`}
                  aria-label={`${product.name} için teklif iste`}
                >
                  Teklif iste <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-banner" id="iletisim">
        <div>
          <span className="eyebrow">BİRLİKTE ÇALIŞALIM</span>
          <h2>İhtiyacınıza uygun<br />ambalajı birlikte bulalım.</h2>
          <p>Ürünler, ölçüler ve toplu siparişler hakkında bilgi alın.</p>
        </div>
        <a className="button-primary" href="https://wa.me/" target="_blank" rel="noreferrer">
          WhatsApp ile iletişim <span>↗</span>
        </a>
      </section>

      <footer className="site-footer" id="hakkimizda">
        <a className="brand" href="#">
          <span className="brand-mark">P</span>
          <span>PACKAGING<span className="brand-light"> CO.</span></span>
        </a>
        <p>Ambalaj çözümleri için örnek marka arayüzü.</p>
        <span>© {new Date().getFullYear()} · Tüm hakları saklıdır.</span>
      </footer>
    </main>
  );
}
