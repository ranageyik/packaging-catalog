"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { packagingProducts, type PackagingProduct } from "../catalog-data";

export type QuoteListItem = {
  code: string;
  name: string;
  quantity: number;
  unit: string;
};

type QuoteListState = {
  items: QuoteListItem[];
  isReady: boolean;
  storageError: string;
};

type QuoteListContextValue = QuoteListState & {
  addProduct: (product: PackagingProduct) => void;
  updateQuantity: (code: string, quantity: number) => void;
  updateUnit: (code: string, unit: string) => void;
  removeProduct: (code: string) => void;
  clearList: () => void;
};

const storageKey = "st-ambalaj-quote-list-v2";
const legacyStorageKey = "st-ambalaj-quote-list-v1";
const serverSnapshot: QuoteListState = { items: [], isReady: false, storageError: "" };
let snapshot = serverSnapshot;
let initialized = false;
const listeners = new Set<() => void>();
const QuoteListContext = createContext<QuoteListContextValue | null>(null);

function isQuoteListItem(value: unknown): value is Omit<QuoteListItem, "unit"> & { unit?: string } {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;
  return typeof item.code === "string"
    && typeof item.name === "string"
    && typeof item.quantity === "number"
    && Number.isFinite(item.quantity)
    && item.quantity > 0
    && (typeof item.unit === "string" || typeof item.unit === "undefined");
}

function readStorage(): QuoteListState {
  let savedList: string | null;
  let isLegacyList = false;
  try {
    savedList = window.localStorage.getItem(storageKey);
    if (savedList === null) {
      savedList = window.localStorage.getItem(legacyStorageKey);
      isLegacyList = savedList !== null;
    }
  } catch {
    return {
      items: [],
      isReady: true,
      storageError: "Teklif listesi bu tarayıcıda kalıcı kaydedilemiyor; sayfa açıkken listenizi kullanabilirsiniz.",
    };
  }

  if (!savedList) return { items: [], isReady: true, storageError: "" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(savedList);
  } catch {
    return {
      items: [],
      isReady: true,
      storageError: "Kayıtlı teklif listesi okunamadı. Yeni listeniz bu oturumda kullanılabilir.",
    };
  }

  if (!Array.isArray(parsed) || !parsed.every(isQuoteListItem)) {
    return {
      items: [],
      isReady: true,
      storageError: "Kayıtlı teklif listesi okunamadı. Yeni listeniz bu oturumda kullanılabilir.",
    };
  }

  const items: QuoteListItem[] = parsed.map((item) => {
    const unit = item.unit ?? "";
    const productUnit = packagingProducts.find((product) => product.code === item.code)?.unit;
    const hasUnverifiedDefaultUnit = isLegacyList
      && unit.trim().toLocaleLowerCase("tr") === "adet"
      && productUnit?.trim().toLocaleLowerCase("tr") !== "adet";
    return {
      ...item,
      unit: hasUnverifiedDefaultUnit ? "" : unit,
    };
  });
  if (isLegacyList) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      return {
        items,
        isReady: true,
        storageError: "Eski teklif listesi yeni biçime kaydedilemedi; değişiklikler bu oturumda kullanılabilir.",
      };
    }
  }

  return { items, isReady: true, storageError: "" };
}

function getSnapshot() {
  if (typeof window !== "undefined" && !initialized) {
    snapshot = readStorage();
    initialized = true;
  }
  return snapshot;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function refreshFromStorage() {
  snapshot = readStorage();
  initialized = true;
  notifyListeners();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", refreshFromStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", refreshFromStorage);
  };
}

function updateItems(updater: (items: QuoteListItem[]) => QuoteListItem[]) {
  const current = getSnapshot();
  let next: QuoteListState = { items: updater(current.items), isReady: true, storageError: "" };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next.items));
  } catch {
    next = {
      ...next,
      storageError: "Teklif listesi bu tarayıcıda kalıcı kaydedilemiyor; sayfa açıkken listenizi kullanabilirsiniz.",
    };
  }

  snapshot = next;
  initialized = true;
  notifyListeners();
}

function addProduct(product: PackagingProduct) {
  updateItems((items) => {
    const existing = items.find((item) => item.code === product.code);
    if (existing) {
      return items.map((item) => item.code === product.code
        ? { ...item, quantity: item.quantity + 1 }
        : item);
    }

    return [...items, { code: product.code, name: product.name, quantity: 1, unit: product.unit?.trim() ?? "" }];
  });
}

function updateQuantity(code: string, quantity: number) {
  if (!Number.isFinite(quantity) || quantity <= 0) return;
  updateItems((items) => items.map((item) => item.code === code ? { ...item, quantity } : item));
}

function updateUnit(code: string, unit: string) {
  updateItems((items) => items.map((item) => item.code === code ? { ...item, unit } : item));
}

function removeProduct(code: string) {
  updateItems((items) => items.filter((item) => item.code !== code));
}

function clearList() {
  updateItems(() => []);
}

export function QuoteListProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  const value = useMemo(() => ({
    ...state,
    addProduct,
    updateQuantity,
    updateUnit,
    removeProduct,
    clearList,
  }), [state]);

  return <QuoteListContext.Provider value={value}>{children}</QuoteListContext.Provider>;
}

export function useQuoteList() {
  const context = useContext(QuoteListContext);
  if (!context) throw new Error("useQuoteList, QuoteListProvider içinde kullanılmalıdır.");
  return context;
}
