
import type { ReactNode } from "react";
import { packagingCategories, packagingProducts } from "./catalog-data";
import { SiteFooter, SiteHeader } from "./components/site-chrome";
import { QuoteListButton } from "./components/quote-list-button";
import { WhatsAppLink } from "./components/whatsapp-link";
import { contactDetails } from "./site-config";

const featuredProducts = [1, 7, 16].map((id) => packagingProducts.find((product) => product.id === id)!);

const reasons = [
  { title: "Ürünü bulun", description: "Katalogda ürün adına veya koduna göre arama yapın.", icon: "tape" },
  { title: "Teklif listenizi hazırlayın", description: "Ürünleri ekleyin, miktarı ve birimi belirtin.", icon: "box" },
  { title: "WhatsApp’tan gönderin", description: "Mesajınızı kontrol edin ve WhatsApp üzerinden kendiniz iletin.", icon: "support" },
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
    tape: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M18 18 21 21" /></>,
    film: <><path d="M5 8a7 7 0 0 1 14 0v8a7 7 0 0 1-14 0V8Z" /><path d="M8 8h8M8 16h8" /></>,
    corner: <><path d="M5 4v15h15" /><path d="M9 8v7h7" /></>,
    bubble: <><circle cx="8" cy="8" r="2" /><circle cx="16" cy="8" r="2" /><circle cx="8" cy="16" r="2" /><circle cx="16" cy="16" r="2" /><path d="M4 12h16" /></>,
    gloves: <><path d="M7 12V6a1.5 1.5 0 0 1 3 0v4-6a1.5 1.5 0 0 1 3 0v6-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6.5 7h-1c-2.2 0-3.5-1-4.8-3.1L4 14a1.7 1.7 0 0 1 2.7-2.1L9 14" /></>,
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
            <p className="home-eyebrow">ST AMBALAJ · ÜRÜN KATALOĞU</p>
            <h1 id="hero-title">İşletmeniz için <span>ambalaj</span> ürünleri.</h1>
            <p className="home-hero-description">Koli bandı, streç film, balonlu naylon ve daha fazlası.</p>
            <div className="home-hero-actions">
              <WhatsAppLink className="home-button home-button-light">WhatsApp’tan Teklif Alın</WhatsAppLink>
              <a className="home-hero-phone" href={`tel:${contactDetails.phone}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
                </svg>
                {contactDetails.phoneDisplay}
              </a>
            </div>
            <div className="hero-caption"><span aria-hidden="true" /> Ürün koduyla arayın, teklif listenize ekleyin.</div>
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
            <div><p className="home-eyebrow">ÜRÜN GRUPLARI</p><h2 id="categories-title">Ambalaj kategorileri</h2></div>
            <a className="home-text-link" href="/products">Tüm ürünleri görüntüle <span aria-hidden="true">↗</span></a>
          </div>
          <div className="home-category-grid">
            {packagingCategories.map((category) => (
              <a className="home-category-card" href="/products" key={category.name}>
                <span className="home-icon-box"><CategoryIcon name={category.icon} /></span>
                <h3>{category.name}</h3><p>{category.description}</p>
                <span className="category-card-link">Katalogda incele <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-products" id="urunler" aria-labelledby="products-title">
        <div className="home-container">
          <div className="home-section-heading">
            <div><p className="home-eyebrow">ÜRÜN KATALOĞU</p><h2 id="products-title">Ambalaj ürünlerimiz</h2></div>
            <p className="home-section-note">Ürünleri inceleyin, teklif listenize ekleyin.</p>
          </div>
          <div className="home-product-grid">
            {featuredProducts.map((product, index) => (
              <article className="home-product-card" key={product.code}>
                <a className={`home-product-image product-figure-${product.shape}`} href="/products" aria-label={`${product.name} ürün kataloğunda`}>
                  <span className="home-product-index">0{index + 1}</span>
                  <span className="product-illustration" aria-hidden="true"><i /><b>{product.code}</b></span>
                </a>
                <div className="home-product-info">
                  <p className="home-product-category">{product.category}</p><h3>{product.name}</h3>
                  <p className="home-product-code">Ürün kodu: {product.code}</p>
                  <QuoteListButton product={product} />
                </div>
              </article>
            ))}
          </div>
          <div className="home-products-all"><a className="home-button home-button-secondary" href="/products">Kataloğun tamamını görün <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section className="home-section home-reasons" id="hakkimizda" aria-labelledby="reasons-title">
        <div className="home-container">
          <div className="home-section-heading"><div><p className="home-eyebrow">TEKLİF SÜRECİ</p><h2 id="reasons-title">Teklifinizi üç adımda hazırlayın.</h2></div></div>
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
          <div><p className="home-eyebrow">WHATSAPP İLETİŞİM</p><h2 id="contact-title">Ürün ve miktarı yazın, teklif isteyin.</h2><p>WhatsApp’tan fiyat ve tedarik bilgisi isteyin.</p></div>
          <WhatsAppLink className="home-button home-button-light">WhatsApp’tan Teklif Alın</WhatsAppLink>
        </div>
      </section>

      <SiteFooter onHome />
    </main>
  );
}
