const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = new URL(configuredSiteUrl || "https://stambalaj.com.tr");
export const canonicalSiteUrl = new URL("https://stambalaj.com.tr");

const whatsappPhoneE164 = "+905422543628";
const whatsappPhoneDigits = whatsappPhoneE164.replace(/\D/g, "");
const domesticPhoneDigits = `0${whatsappPhoneDigits.slice(2)}`;
export const defaultWhatsAppMessage = "Merhaba ST Ambalaj, ürün ve fiyat bilgisi almak istiyorum.";

export const whatsappPhoneDisplay = domesticPhoneDigits.replace(
  /^(\d{4})(\d{3})(\d{2})(\d{2})$/,
  "$1 $2 $3 $4",
);

export function buildWhatsAppUrl(message = defaultWhatsAppMessage): string {
  const baseUrl = `https://wa.me/${whatsappPhoneDigits}`;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export const contactDetails = {
  phone: whatsappPhoneE164,
  phoneDisplay: whatsappPhoneDisplay,
  email: "",
  address: "",
};