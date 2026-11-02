"use client";

import { useMemo, useState } from "react";
import { useQuoteList } from "../components/quote-list-provider";
import { WhatsAppLink } from "../components/whatsapp-link";

function createQuoteMessage(
  items: ReturnType<typeof useQuoteList>["items"],
  companyName: string,
  contactName: string,
) {
  const productLines = items
    .map((item) => `- ${item.code} | ${item.name} | ${item.quantity}${item.unit.trim() ? ` ${item.unit.trim()}` : ""}`)
    .join("\n");

  return [
    "Merhaba ST Ambalaj,",
    "",
    "Aşağıdaki ürünler için fiyat teklifi almak istiyorum:",
    "",
    productLines,
    `Firma adı: ${companyName.trim()}`,
    `İlgili kişi: ${contactName.trim()}`,
    "",
    "Fiyat ve tedarik bilgisi paylaşabilir misiniz?",
    "",
    "Teşekkürler.",
  ].join("\n");
}

export function QuoteListClient() {
  const {
    items,
    isReady,
    storageError,
    updateQuantity,
    updateUnit,
    removeProduct,
    clearList,
  } = useQuoteList();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const generatedMessage = useMemo(
    () => createQuoteMessage(items, companyName, contactName),
    [items, companyName, contactName],
  );

  if (!isReady) {
    return <p className="quote-list-status" aria-live="polite">Teklif listeniz yükleniyor...</p>;
  }

  return (
    <section className="quote-list-content" aria-labelledby="quote-list-title">
      {storageError && <p className="quote-list-alert" role="alert">{storageError}</p>}

      {items.length === 0 ? (
        <div className="quote-list-empty">
          <h2>Teklif listeniz henüz boş.</h2>
          <p>Katalogdan ürün ekleyin. Kod ve miktarları tek mesajda gönderin.</p>
          <a className="home-button home-button-primary" href="/products">Kataloğa git</a>
        </div>
      ) : (
        <>
          <div className="quote-list-heading">
            <p>{items.length} ürün teklif listenizde</p>
            <button className="quote-list-clear" onClick={clearList} type="button">Listeyi temizle</button>
          </div>

          <div className="quote-list-items">
            {items.map((item) => (
              <article className="quote-list-item" key={item.code}>
                <div className="quote-list-item-info">
                  <p>{item.code}</p>
                  <h2>{item.name}</h2>
                </div>
                <label className="quote-list-quantity">
                  <span>Miktar</span>
                  <input
                    aria-label={`${item.name} miktarı`}
                    min="0.01"
                    onChange={(event) => updateQuantity(item.code, Number(event.target.value))}
                    step="any"
                    type="number"
                    value={item.quantity}
                  />
                </label>
                <label className="quote-list-unit">
                  <span>Birim</span>
                  <input
                    aria-label={`${item.name} miktar birimi`}
                    maxLength={24}
                    onChange={(event) => updateUnit(item.code, event.target.value)}
                    value={item.unit}
                  />
                </label>
                <button
                  aria-label={`${item.name} ürününü teklif listesinden çıkar`}
                  className="quote-list-remove"
                  onClick={() => removeProduct(item.code)}
                  type="button"
                >
                  Listeden çıkar
                </button>
              </article>
            ))}
          </div>

          <div className="quote-list-customer">
            <h2>İletişim bilgileri <span>(isteğe bağlı)</span></h2>
            <div className="quote-list-fields">
              <label>
                Firma adı
                <input autoComplete="organization" onChange={(event) => setCompanyName(event.target.value)} value={companyName} />
              </label>
              <label>
                İlgili kişi
                <input autoComplete="name" onChange={(event) => setContactName(event.target.value)} value={contactName} />
              </label>
            </div>
          </div>

          <label className="quote-list-message">
            WhatsApp mesajı
            <textarea readOnly rows={13} value={generatedMessage} />
          </label>
          <WhatsAppLink className="home-button home-button-light quote-list-send" message={generatedMessage}>
            Mesajı WhatsApp’ta aç
          </WhatsAppLink>
        </>
      )}
    </section>
  );
}
