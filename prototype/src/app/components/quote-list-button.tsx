"use client";

import type { PackagingProduct } from "../catalog-data";
import { useQuoteList } from "./quote-list-provider";

export function QuoteListButton({ product }: { product: PackagingProduct }) {
  const { items, addProduct } = useQuoteList();
  const item = items.find((quoteItem) => quoteItem.code === product.code);

  return (
    <button
      aria-label={`${product.name} ürününü teklif listesine ${item ? "bir adet daha ekle" : "ekle"}`}
      className="quote-list-add-button"
      onClick={() => addProduct(product)}
      type="button"
    >
      {item ? `Teklif listesinde · ${item.quantity} ${item.unit}` : "Teklif İste"}
      <span aria-hidden="true">+</span>
    </button>
  );
}
