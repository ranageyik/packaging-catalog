import Link from "next/link";
import { contactDetails } from "../site-config";
import { QuoteListLink } from "./quote-list-link";
import { WhatsAppLink } from "./whatsapp-link";

function Brand() {
  return (
    <Link className="home-brand" href="/" aria-label="ST Ambalaj ana sayfa">
      <span className="home-brand-mark" aria-hidden="true">ST</span>
      <span className="home-brand-name">
        <span className="home-brand-st">ST</span>
        <span className="home-brand-word">AMBALAJ</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ onHome = false }: { onHome?: boolean }) {
  const homePrefix = onHome ? "" : "/";
  const links = [
    { label: "Kategoriler", href: `${homePrefix}#kategoriler` },
    { label: "Ürünler", href: "/products" },
    { label: "Teklif Süreci", href: `${homePrefix}#hakkimizda` },
    { label: "İletişim", href: `${homePrefix}#iletisim` },
  ];

  return (
    <header className="home-header">
      <div className="home-header-inner">
        <Brand />
        <nav className="home-navigation" aria-label="Ana navigasyon">
          {links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
        </nav>
        <a className="home-header-phone" href={`tel:${contactDetails.phone}`}>
          {contactDetails.phoneDisplay}
        </a>
        <QuoteListLink />
        <WhatsAppLink className="home-header-cta">WhatsApp’tan Teklif Alın</WhatsAppLink>
        <details className="mobile-menu">
          <summary aria-label="Mobil menüyü aç">Menü <span aria-hidden="true">☰</span></summary>
          <nav aria-label="Mobil navigasyon">
            {links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
            <a className="mobile-menu-phone" href={`tel:${contactDetails.phone}`}>{contactDetails.phoneDisplay}</a>
            <QuoteListLink compact />
            <WhatsAppLink className="mobile-menu-cta">WhatsApp’tan Teklif Alın</WhatsAppLink>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({ onHome = false }: { onHome?: boolean }) {
  const homePrefix = onHome ? "" : "/";

  return (
    <footer className="home-footer" id={onHome ? "footer-contact" : undefined}>
      <div className="home-container">
        <div className="home-footer-main">
          <div className="home-footer-brand">
            <Brand />
            <p>Koli bandı, streç film ve koruyucu ambalaj ürünleri.</p>
          </div>
          <div className="home-footer-links">
            <h2>Sayfalar</h2>
            <Link href={`${homePrefix}#kategoriler`}>Kategoriler</Link>
            <Link href="/products">Ürünler</Link>
            <Link href={`${homePrefix}#hakkimizda`}>Teklif Süreci</Link>
            <Link href={`${homePrefix}#iletisim`}>İletişim</Link>
          </div>
          <div className="home-footer-contact">
            <h2>İletişim</h2>
            <a href={`tel:${contactDetails.phone}`}>{contactDetails.phoneDisplay}</a>
            <WhatsAppLink className="home-footer-whatsapp">WhatsApp’tan yazın</WhatsAppLink>
            {contactDetails.email && <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>}
            {contactDetails.address && <p>{contactDetails.address}</p>}
          </div>
        </div>
        <div className="home-footer-bottom">
          <span>© {new Date().getFullYear()} ST Ambalaj. Tüm hakları saklıdır.</span>
          <Link href={onHome ? "#top" : "/#top"}>Başa dön ↑</Link>
        </div>
      </div>
    </footer>
  );
}