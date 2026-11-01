
import type { Metadata } from "next";
import Link from "next/link";
import { packagingCategories, packagingProducts } from "../catalog-data";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import CatalogBrowser from "./catalog-browser";

export const metadata: Metadata = {
  title: "Ürün Kataloğu | ST Ambalaj",
  description: "Karton kutu, ambalaj poşeti, kâğıt ve koruyucu ambalaj ürünlerini arayın ve kategorilere göre filtreleyin.",
};

const categories = packagingCategories.map(({ name }) => name);

export default function ProductsPage() {
  return (
    <main className="catalog-page" id="top">
      <SiteHeader />

      <section className="catalog-page-intro home-container" aria-labelledby="catalog-title">
        <p className="catalog-kicker">ST AMBALAJ · ÜRÜN KATALOĞU</p>
        <h1 id="catalog-title">İhtiyacınıza uygun<br /><span>ambalajı bulun.</span></h1>
        <p>İşletmeniz için bant, streç film, köşe koruyucu, balonlu naylon, nakliye poşeti ve iş eldiveni seçeneklerini keşfedin.</p>
        <span className="catalog-intro-count">{packagingProducts.length} ürün · {categories.length} kategori</span>
      </section>

      <CatalogBrowser products={packagingProducts} categories={categories} />

      <section className="catalog-offer home-container" id="teklif" aria-labelledby="catalog-offer-title">
        <div>
          <p className="catalog-kicker">TEKLİF VE BİLGİ</p>
          <h2 id="catalog-offer-title">İşletmenizin ambalaj ihtiyacını konuşalım.</h2>
          <p>Ürün, ölçü veya sipariş ihtiyacınızı paylaşın; size uygun seçenekleri birlikte değerlendirelim.</p>
        </div>
        <Link className="home-button home-button-light" href="/#iletisim">Teklif için iletişime geçin <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
