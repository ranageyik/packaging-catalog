"use client";

import Link from "next/link";
import { useQuoteList } from "./quote-list-provider";

export function QuoteListLink({ compact = false }: { compact?: boolean }) {
  const { items } = useQuoteList();
  const itemCount = items.length;

  return (
    <Link
      aria-label={`Teklif Listem, ${itemCount} ürün`}
      className={compact ? "quote-list-link quote-list-link-compact" : "quote-list-link"}
      href="/teklif-listem"
    >
      Teklif Listem <span aria-label={`${itemCount} ürün`}>{itemCount}</span>
    </Link>
  );
}
