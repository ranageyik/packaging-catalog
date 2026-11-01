
import type { Metadata } from "next";
import Link from "next/link";
import { packagingCategories } from "../catalog-data";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import CatalogBrowser, { type Product } from "./catalog-browser";

export const metadata: Metadata = {
  title: "Ürün Kataloğu | ST Ambalaj",
  description: "Karton kutu, ambalaj poşeti, kâğıt ve koruyucu ambalaj ürünlerini arayın ve kategorilere göre filtreleyin.",
};

const products: Product[] = [
  { id: 1, name: "Kraft Karton Kutu", code: "AMB-001", category: "Karton Kutular", description: "Dayanıklı, farklı kullanım alanlarına uygun kutu.", color: "#cbb58e", shape: "box" },
  { id: 2, name: "Kraft Kâğıt Poşet", code: "AMB-002", category: "Kâğıt Ambalajlar", description: "Mağaza ve ürün sunumları için kâğıt poşet.", color: "#d5c9aa", shape: "bag" },
  { id: 3, name: "Kargo Poşeti", code: "AMB-003", category: "Ambalaj Poşetleri", description: "Gönderiler için pratik ambalaj çözümü.", color: "#bfc3b6", shape: "bag" },
  { id: 4, name: "Oluklu Mukavva Kutu", code: "AMB-004", category: "Karton Kutular", description: "Taşıma ve sevkiyat ihtiyaçları için kutu.", color: "#c4ad84", shape: "box" },
  { id: 5, name: "Baskılı Kâğıt Çanta", code: "AMB-005", category: "Kâğıt Ambalajlar", description: "Marka sunumuna uygun kâğıt çanta.", color: "#d8cdb4", shape: "paper" },
  { id: 6, name: "Balonlu Koruyucu Ambalaj", code: "AMB-006", category: "Koruyucu Ambalaj", description: "Ürünleri taşıma sırasında korumaya yardımcı ambalaj.", color: "#c7cfc7", shape: "paper" },
  { id: 7, name: "E-Ticaret Gönderi Kutusu", code: "AMB-007", category: "Karton Kutular", description: "Online siparişlerin gönderimi için kutu.", color: "#cbb58e", shape: "box" },
  { id: 8, name: "Fermuarlı Ambalaj Poşeti", code: "AMB-008", category: "Ambalaj Poşetleri", description: "Ürünleri bir arada tutmaya uygun poşet.", color: "#c4c8bb", shape: "bag" },
  { id: 9, name: "Kraft Sarma Kâğıdı", code: "AMB-009", category: "Kâğıt Ambalajlar", description: "Paketleme ve sarma işlemleri için kâğıt.", color: "#d8c5a1", shape: "paper" },
  { id: 10, name: "Köpük Koruyucu", code: "AMB-010", category: "Koruyucu Ambalaj", description: "Hassas ürünlerin paketlenmesine yardımcı koruyucu.", color: "#c7cfc7", shape: "paper" },
  { id: 11, name: "Küçük Boy Karton Kutu", code: "AMB-011", category: "Karton Kutular", description: "Küçük ürünlerin paketlenmesi için kutu.", color: "#cbb58e", shape: "box" },
  { id: 12, name: "Büyük Boy Kargo Poşeti", code: "AMB-012", category: "Ambalaj Poşetleri", description: "Farklı gönderi ihtiyaçlarına yönelik poşet.", color: "#bfc3b6", shape: "bag" },
];

const categories = packagingCategories.map(({ name }) => name);

export default function ProductsPage() {
  return (
    <main className="catalog-page" id="top">
      <SiteHeader />

      <section className="catalog-page-intro home-container" aria-labelledby="catalog-title">
        <p className="catalog-kicker">ST AMBALAJ · ÜRÜN KATALOĞU</p>
        <h1 id="catalog-title">İhtiyacınıza uygun<br /><span>ambalajı bulun.</span></h1>
        <p>İşletmeniz için karton kutu, ambalaj poşeti, kâğıt ve koruyucu ambalaj seçeneklerini keşfedin.</p>
      </section>

      <CatalogBrowser products={products} categories={categories} />

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
