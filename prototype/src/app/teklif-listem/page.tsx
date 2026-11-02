import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { WhatsAppLink } from "../components/whatsapp-link";
import { QuoteListClient } from "./quote-list-client";

export const metadata: Metadata = {
  title: "Teklif Listem | ST Ambalaj",
  description: "Birden fazla ürünü ve miktarı tek WhatsApp teklif mesajında hazırlayın.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function QuoteListPage() {
  return (
    <main className="catalog-page" id="top">
      <SiteHeader />
      <section className="quote-list-page home-container" aria-labelledby="quote-list-title">
        <p className="catalog-kicker">TEKLİF LİSTEM</p>
        <h1 id="quote-list-title">Ürünleri ve miktarları belirleyin.</h1>
        <p className="quote-list-intro">Mesajı kontrol edin, WhatsApp’tan kendiniz gönderin.</p>
        <WhatsAppLink className="home-button home-button-light quote-list-intro-cta">WhatsApp’tan Teklif Alın</WhatsAppLink>
        <QuoteListClient />
      </section>
      <SiteFooter />
    </main>
  );
}
