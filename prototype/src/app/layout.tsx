import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { QuoteListProvider } from "./components/quote-list-provider";
import { canonicalSiteUrl } from "./site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: canonicalSiteUrl,
  title: "ST Ambalaj | Ambalaj Ürünleri",
  description: "Koli bandı, streç film, balonlu naylon, köşe koruyucu, nakliye poşeti ve iş eldiveni.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "ST Ambalaj",
    title: "ST Ambalaj | Ambalaj Ürünleri",
    description: "Ambalaj ürünlerini inceleyin, WhatsApp’tan teklif isteyin.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "ST Ambalaj | Ambalaj Ürünleri",
    description: "Ambalaj ürünlerini inceleyin, WhatsApp’tan teklif isteyin.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <QuoteListProvider>{children}</QuoteListProvider>
      </body>
    </html>
  );
}
