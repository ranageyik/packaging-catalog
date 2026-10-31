
"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  code: string;
  category: string;
  description: string;
  color: string;
  shape: "box" | "bag" | "paper";
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

const categories = [
  "Tüm Kategoriler",
  "Karton Kutular",
  "Ambalaj Poşetleri",
  "Kâğıt Ambalajlar",
  "Koruyucu Ambalaj",
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tüm Kategoriler");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("tr-TR");

    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLocaleLowerCase("tr-TR").includes(query) ||
          product.code.toLocaleLowerCase("tr-TR").includes(query);

        const matchesCategory =
          category === "Tüm Kategoriler" || product.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "name") {
          return a.name.localeCompare(b.name, "tr");
        }
        if (sort === "name-desc") {
          return b.name.localeCompare(a.name, "tr");
        }
        return a.id - b.id;
      });
  }, [search, category, sort]);

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <a className="catalog-logo" href="/"> 
          <span className="logo-mark">P</span>
          <span>PACKAGING <span className="logo-light">CO.</span></span>
        </a>
        <nav className="catalog-nav">
          <a href="/#kategoriler">Kategoriler</a>
          <a href="/products">Tüm Ürünler</a>
          <a href="/#iletisim">İletişim</a>
        </nav>
        <a className="catalog-top-cta" href="#teklif">Teklif Al ↗</a>
      </header>

      <section className="catalog-intro">
        <p className="eyebrow">ÜRÜN KATALOĞUMUZ</p>
        <h1>Aradığınız ambalajı bulun.</h1>
        <p className="catalog-lead">
          Ürünlerimizi inceleyin, ihtiyacınıza uygun ambalaj çözümünü keşfedin
          ve size özel teklif alın.
        </p>
      </section>

      <section className="catalog-controls" aria-label="Ürün arama ve filtreleme">
        <div className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Ürün adı veya ürün koduyla ara..."
            aria-label="Ürün ara"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch("")}>
              Temizle
            </button>
          )}
        </div>

        <div className="filter-row">
          <label className="filter-field">
            <span>Kategori</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>Sıralama</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="default">Varsayılan</option>
              <option value="name">Ürün adı (A–Z)</option>
              <option value="name-desc">Ürün adı (Z–A)</option>
            </select>
          </label>
        </div>
      </section>

      <section className="catalog-results">
        <div className="results-heading">
          <p><strong>{filteredProducts.length}</strong> ürün listeleniyor</p>
          {(search || category !== "Tüm Kategoriler") && (
            <button
              className="reset-filters"
              onClick={() => {
                setSearch("");
                setCategory("Tüm Kategoriler");
                setSort("default");
              }}
            >
              Filtreleri temizle ↗
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="catalog-grid">
            {filteredProducts.map((product, index) => (
              <article className="catalog-card" key={product.id}>
                <div className="catalog-art" style={{ backgroundColor: product.color }}>
                  <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className={`package-shape package-${product.shape}`}>
                    <span>{product.code}</span>
                  </div>
                </div>
                <div className="catalog-card-content">
                  <p className="product-category">{product.category}</p>
                  <h2>{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  <p className="product-code">Ürün kodu: {product.code}</p>
                  <a className="product-quote" href={`#teklif-${product.code}`}>
                    Bu ürün için teklif iste <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <h2>Aramanızla eşleşen ürün bulunamadı.</h2>
            <p>Farklı bir ürün adı veya kategori deneyebilirsiniz.</p>
            <button onClick={() => {
              setSearch("");
              setCategory("Tüm Kategoriler");
            }}>
              Tüm ürünleri göster
            </button>
          </div>
        )}
      </section>

      <section className="catalog-contact" id="teklif">
        <div>
          <p className="eyebrow">BİRLİKTE ÇALIŞALIM</p>
          <h2>İhtiyacınıza uygun ambalajı birlikte bulalım.</h2>
          <p>Ürünler, ölçüler ve toplu siparişler hakkında bilgi alın.</p>
        </div>
        <a href="#iletisim" className="catalog-contact-button">Teklif ve iletişim ↗</a>
      </section>

      <footer className="catalog-footer">
        <a className="catalog-logo" href="/">PACKAGING <span className="logo-light">CO.</span></a>
        <p>Ürün listesi ve görseller şu an örnektir.</p>
      </footer>
    </main>
  );
}
