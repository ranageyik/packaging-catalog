"use client";

import { useMemo, useState } from "react";

export type Product = {
  id: number;
  name: string;
  code: string;
  category: string;
  description: string;
  color: string;
  shape: "box" | "bag" | "paper";
};

type CatalogBrowserProps = {
  products: Product[];
  categories: string[];
};

const allCategoriesLabel = "Tüm Kategoriler";

function CategoryOptions({
  categories,
  products,
  selected,
  onSelect,
}: {
  categories: string[];
  products: Product[];
  selected: string;
  onSelect: (category: string) => void;
}) {
  const options = [allCategoriesLabel, ...categories];

  return (
    <div className="catalog-category-options">
      {options.map((item) => {
        const count = item === allCategoriesLabel
          ? products.length
          : products.filter((product) => product.category === item).length;

        return (
          <button
            aria-pressed={selected === item}
            className={`catalog-category-option${selected === item ? " is-active" : ""}`}
            key={item}
            onClick={() => onSelect(item)}
            type="button"
          >
            <span>{item}</span><span className="catalog-category-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function CatalogBrowser({ products, categories }: CatalogBrowserProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(allCategoriesLabel);
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("tr-TR");

    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLocaleLowerCase("tr-TR").includes(query) ||
          product.code.toLocaleLowerCase("tr-TR").includes(query);
        const matchesCategory = category === allCategoriesLabel || product.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name, "tr");
        if (sort === "name-desc") return b.name.localeCompare(a.name, "tr");
        return a.id - b.id;
      });
  }, [category, products, search, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory(allCategoriesLabel);
    setSort("default");
  };

  return (
    <div className="catalog-browser home-container">
      <section className="catalog-toolbar" aria-label="Ürün arama ve sıralama">
        <label className="catalog-search-field">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" />
          </svg>
          <span className="catalog-visually-hidden">Ürün ara</span>
          <input
            type="search"
            placeholder="Ürün adı veya koduyla arayın..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && <button className="catalog-clear-search" onClick={() => setSearch("")} type="button">Temizle</button>}
        </label>
        <label className="catalog-sort-field">
          <span>Sırala</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="default">Varsayılan</option>
            <option value="name">Ürün adı (A–Z)</option>
            <option value="name-desc">Ürün adı (Z–A)</option>
          </select>
        </label>
      </section>

      <details className="catalog-mobile-filter">
        <summary><span>Filtreler</span><span className="catalog-mobile-filter-state">{category === allCategoriesLabel ? "Tüm kategoriler" : category}</span></summary>
        <CategoryOptions categories={categories} products={products} selected={category} onSelect={setCategory} />
      </details>

      <div className="catalog-workspace">
        <aside className="catalog-sidebar" aria-label="Kategori filtreleri">
          <h2>Kategoriler</h2>
          <CategoryOptions categories={categories} products={products} selected={category} onSelect={setCategory} />
        </aside>

        <section className="catalog-results" aria-label="Ürün sonuçları">
          <div className="catalog-results-heading" aria-live="polite" aria-atomic="true">
            <p><strong>{filteredProducts.length}</strong> ürün listeleniyor</p>
            {(search || category !== allCategoriesLabel || sort !== "default") && (
              <button className="catalog-reset-button" onClick={resetFilters} type="button">Filtreleri temizle</button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="catalog-product-grid">
              {filteredProducts.map((product) => (
                <article className="catalog-product-card" key={product.id}>
                  <div
                    aria-label={`${product.name} için temsili ürün görsel alanı`}
                    className="catalog-product-art"
                    role="img"
                    style={{ backgroundColor: product.color }}
                  >
                    <span className="catalog-product-art-label">ÜRÜN GÖRSELİ</span>
                    <div className={`catalog-package-shape catalog-package-${product.shape}`} aria-hidden="true">
                      <span>{product.code}</span>
                    </div>
                  </div>
                  <div className="catalog-product-details">
                    <p className="catalog-item-category">{product.category}</p>
                    <h2>{product.name}</h2>
                    <p className="catalog-item-code">Ürün kodu: <strong>{product.code}</strong></p>
                    <p className="catalog-item-description">{product.description}</p>
                    <a className="catalog-product-quote" href="#teklif">
                      Bu ürün için teklif iste <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalog-empty-state">
              <span className="catalog-empty-icon" aria-hidden="true">⌕</span>
              <h2>Aramanızla eşleşen ürün bulunamadı.</h2>
              <p>Ürün adını veya kodunu kontrol edin ya da filtreleri temizleyip yeniden deneyin.</p>
              <button className="catalog-empty-reset" onClick={resetFilters} type="button">Tüm ürünleri göster</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}