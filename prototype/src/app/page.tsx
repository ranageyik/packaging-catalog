
import type { ReactNode } from "react";
import { packagingCategories } from "./catalog-data";
import { SiteFooter, SiteHeader } from "./components/site-chrome";
import { contactDetails } from "./site-config";

const whatsappUrl = contactDetails.phone
  ? `https://wa.me/${contactDetails.phone.replace(/\D/g, "")}`
  : "";

const products = [
  { name: "Kraft Karton Kutu", code: "AMB-001", category: "Karton Ambalaj", shape: "box" },
  { name: "Kraft Kâğıt Poşet", code: "AMB-002", category: "Kâğıt Ambalaj", shape: "bag" },
  { name: "Kargo Poşeti", code: "AMB-003", category: "Gönderi Ambalajı", shape: "mailer" },
];

const reasons = [
  { title: "Kaliteli Ürünler", description: "Ürün seçeneklerini inceleyin; malzeme ve kullanım detaylarını ihtiyaçlarınıza göre değerlendirin.", icon: "quality" },
  { title: "Hızlı Tedarik", description: "Ürün ve teslimat seçeneklerini sipariş ihtiyacınıza göre birlikte netleştirelim.", icon: "delivery" },
  { title: "Profesyonel Destek", description: "Ürün seçimi ve teklif sürecindeki sorularınız için bizimle iletişime geçin.", icon: "support" },
];

function CategoryIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    box: <><path d="m4 8 8-4 8 4-8 4-8-4Z" /><path d="M4 8v9l8 4 8-4V8M12 12v9" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    paper: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h7M9 16h7" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    quality: <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></>,
    delivery: <><path d="M3 7h11v11H3zM14 11h4l3 3v4h-7z" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="17.5" cy="19" r="1.5" /></>,
    support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4ZM20 13h-3v6h1a2 2 0 0 0 2-2v-4ZM12 21h2" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  return (
    <main className="home-page" id="top">
      <SiteHeader onHome />

      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-container home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-eyebrow">İŞLETMELER İÇİN AMBALAJ ÇÖZÜMLERİ</p>
            <h1 id="hero-title">İşletmeniz için doğru <span>ambalaj</span> çözümleri.</h1>
            <p className="home-hero-description">Ürünlerinizi paketlemek ve göndermek için ihtiyacınıza uygun seçenekleri keşfedin. Kataloğumuzu inceleyin, teklif için bize ulaşın.</p>
            <div className="home-hero-actions">
              <a className="home-button home-button-primary" href="#urunler">Ürünleri Keşfet <span aria-hidden="true">↗</span></a>
              <a className="home-button home-button-secondary" href="#iletisim">Bize Ulaşın</a>
            </div>
            <div className="hero-caption"><span aria-hidden="true" /> Farklı ambalaj grupları, tek katalogda.</div>
          </div>

          <div className="hero-visual" role="img" aria-label="Karton kutu, kraft kâğıt poşet ve kargo ambalajını temsil eden ürün görsel alanı">
            <div className="hero-visual-label"><span className="hero-label-dot" /> AMBALAJ GRUPLARIMIZ</div>
            <div className="hero-product-scene" aria-hidden="true">
              <div className="scene-box"><div className="scene-box-top" /><div className="scene-box-front"><span>ST</span><i /></div><div className="scene-box-side" /></div>
              <div className="scene-paper-bag"><span>ST<br />AMBALAJ</span><i /></div>
              <div className="scene-mailer"><span>GÖNDERİ<br />AMBALAJI</span></div>
            </div>
            <div className="hero-visual-footer"><span>Karton kutular</span><span>Kâğıt ve kargo ambalajları</span></div>
          </div>
        </div>
      </section>

      <section className="home-section home-categories" id="kategoriler" aria-labelledby="categories-title">
        <div className="home-container">
          <div className="home-section-heading">
            <div><p className="home-eyebrow">ÜRÜN GRUPLARIMIZ</p><h2 id="categories-title">İhtiyacınıza göre<br />ambalaj seçenekleri.</h2></div>
            <a className="home-text-link" href="/products">Tüm ürünleri gör <span aria-hidden="true">↗</span></a>
          </div>
          <div className="home-category-grid">
            {packagingCategories.map((category) => (
              <a className="home-category-card" href="/products" key={category.name}>
                <span className="home-icon-box"><CategoryIcon name={category.icon} /></span>
                <h3>{category.name}</h3><p>{category.description}</p>
                <span className="category-card-link">Ürünleri incele <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-products" id="urunler" aria-labelledby="products-title">
        <div className="home-container">
          <div className="home-section-heading">
            <div><p className="home-eyebrow">ÖNE ÇIKANLAR</p><h2 id="products-title">Katalogdan seçtiklerimiz.</h2></div>
            <p className="home-section-note">Örnek ürünleri inceleyin; tüm ürün seçenekleri katalog sayfasında.</p>
          </div>
          <div className="home-product-grid">
            {products.map((product, index) => (
              <article className="home-product-card" key={product.code}>
                <a className={`home-product-image product-figure-${product.shape}`} href="/products" aria-label={`${product.name} ürün kataloğunda`}>
                  <span className="home-product-index">0{index + 1}</span>
                  <span className="product-illustration" aria-hidden="true"><i /><b>{product.shape === "box" ? "ST" : product.shape === "bag" ? "KÂĞIT" : "GÖNDERİ"}</b></span>
                </a>
                <div className="home-product-info">
                  <p className="home-product-category">{product.category}</p><h3>{product.name}</h3>
                  <p className="home-product-code">Ürün kodu: {product.code}</p>
                  <a className="home-product-link" href="/products#teklif" aria-label={`${product.name} için teklif iste`}>Teklif iste <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
          <div className="home-products-all"><a className="home-button home-button-secondary" href="/products">Tüm ürünleri gör <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section className="home-section home-reasons" id="hakkimizda" aria-labelledby="reasons-title">
        <div className="home-container">
          <div className="home-section-heading"><div><p className="home-eyebrow">ST AMBALAJ</p><h2 id="reasons-title">İhtiyacınıza odaklanan<br />bir çalışma yaklaşımı.</h2></div></div>
          <div className="home-reasons-grid">
            {reasons.map((reason) => (
              <article className="home-reason" key={reason.title}>
                <span className="home-icon-box"><CategoryIcon name={reason.icon} /></span>
                <div><h3>{reason.title}</h3><p>{reason.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-contact-section" id="iletisim" aria-labelledby="contact-title">
        <div className="home-container home-contact-panel">
          <div><p className="home-eyebrow">TEKLİF VE BİLGİ</p><h2 id="contact-title">İşletmeniz için ambalaj seçeneklerini birlikte değerlendirelim.</h2><p>Ürün, ölçü veya sipariş ihtiyacınızı paylaşın; size uygun seçenekler hakkında görüşelim.</p></div>
          {whatsappUrl ? (
            <a className="home-button home-button-light" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ile iletişim <span aria-hidden="true">↗</span></a>
          ) : (
            <a className="home-button home-button-light" href="#footer-contact">İletişim bilgileri <span aria-hidden="true">↓</span></a>
          )}
        </div>
      </section>

      <SiteFooter onHome />
    </main>
  );
}
