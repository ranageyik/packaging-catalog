"use client";

import type { PackagingProduct } from "../catalog-data";
import { QuoteListButton } from "./quote-list-button";

export function CatalogProductCard({ product }: { product: PackagingProduct }) {
  return (
    <article className="catalog-product-card">
      <div
        aria-label={`${product.name} için temsili ürün görsel alanı`}
        className={`catalog-product-art catalog-product-art-${product.shape}`}
        role="img"
      >
        <span className="catalog-product-art-label">ST AMBALAJ</span>
        <div className={`catalog-package-shape catalog-package-${product.shape}`} aria-hidden="true">
          <span>{product.shape === "glove" ? "PN" : product.shape === "roll" ? "ST" : product.shape === "tape" ? "ST" : product.shape === "corner" ? "L" : "ST"}</span>
        </div>
        <span className="catalog-art-code">{product.code}</span>
      </div>
      <div className="catalog-product-details">
        <p className="catalog-item-category">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="catalog-item-code">Ürün kodu: <strong>{product.code}</strong></p>
        <p className="catalog-item-description">{product.description}</p>
        <details className="catalog-product-specs">
          <summary>Ürün özellikleri</summary>
          <ul>{product.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
        </details>
        <QuoteListButton product={product} />
      </div>
    </article>
  );
}
