
import type { Metadata } from "next";
import { packagingCategories, packagingProducts } from "../catalog-data";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { WhatsAppLink } from "../components/whatsapp-link";
import { siteUrl } from "../site-config";
import CatalogBrowser from "./catalog-browser";

export const metadata: Metadata = {
  title: "Ürün Kataloğu | ST Ambalaj",
  description: "Koli bandı, streç film, köşe koruyucu, balonlu naylon, nakliye poşeti ve iş eldivenlerini inceleyin.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "ST Ambalaj",
    title: "Ürün Kataloğu | ST Ambalaj",
    description: "Ürünleri bulun, miktarı belirtin ve WhatsApp’tan teklif isteyin.",
    url: new URL("/products", siteUrl),
  },
  twitter: {
    card: "summary",
    title: "Ürün Kataloğu | ST Ambalaj",
    description: "Ürünleri bulun, miktarı belirtin ve WhatsApp’tan teklif isteyin.",
  },
};

const categories = packagingCategories.map(({ name }) => name);

export default function ProductsPage() {
  return (
    <main className="catalog-page" id="top">
      <SiteHeader />

      <section className="catalog-page-intro home-container" aria-labelledby="catalog-title">
        <p className="catalog-kicker">ST AMBALAJ · ÜRÜN KATALOĞU</p>
        <h1 id="catalog-title">Ambalaj ürünlerimiz</h1>
        <p>Aradığınız ürünü bulun, miktarı belirtin, WhatsApp’tan teklif isteyin.</p>
      </section>

      <CatalogBrowser products={packagingProducts} categories={categories} />

      <section className="catalog-offer home-container" id="teklif" aria-labelledby="catalog-offer-title">
        <div>
          <p className="catalog-kicker">TEKLİF VE BİLGİ</p>
          <h2 id="catalog-offer-title">Ürün ve miktarı paylaşın.</h2>
          <p>WhatsApp’tan fiyat ve tedarik bilgisi isteyin.</p>
        </div>
        <WhatsAppLink className="home-button home-button-light">WhatsApp’tan Teklif Alın</WhatsAppLink>
      </section>

      <SiteFooter />
    </main>
  );
}
