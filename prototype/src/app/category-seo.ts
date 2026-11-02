export type CategorySeoPage = {
  slug: string;
  categoryName: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  content: string;
};

export const categorySeoPages = [
  {
    slug: "koli-ve-kagit-bantlar",
    categoryName: "Koli ve Kâğıt Bantlar",
    title: "Koli ve Kâğıt Bantlar | ST Ambalaj",
    description:
      "Koli kapatma ve maskeleme için koli bandı, kâğıt bant ve kauçuk bantları ürün bilgileriyle inceleyin. WhatsApp’tan teklif isteyin.",
    heading: "Koli ve Kâğıt Bantlar",
    intro:
      "Koli kapatma, maskeleme ve genel ambalaj işleri için katalogdaki bantları inceleyin.",
    content:
      "Katalogda ASTEL koli bandı, FECH ve METAPİN kâğıt bantlar ile VEGE LEOPAR kauçuk bant bulunur. Ölçü ve kullanım bilgilerini ürün kartlarından kontrol edebilirsiniz.",
  },
  {
    slug: "strec-filmler",
    categoryName: "Streç Filmler",
    title: "Streç Filmler | ST Ambalaj",
    description:
      "Streç film ürünlerini katalogdaki mikron, renk ve ölçü bilgileriyle inceleyin. WhatsApp’tan teklif isteyin.",
    heading: "Streç Filmler",
    intro:
      "Palet, koli ve farklı boyuttaki ürünleri sarmak için streç film seçeneklerini inceleyin.",
    content:
      "Listede 17 ve 23 mikron seçenekleri ile şeffaf ve renkli streç filmler yer alır. Genişlik, uzunluk ve diğer ürün bilgileri katalog kayıtlarında belirtilmiştir.",
  },
  {
    slug: "kose-koruyucular",
    categoryName: "Köşe Koruyucular",
    title: "Köşe Koruyucular | ST Ambalaj",
    description:
      "L tipi mavi köşe koruyucu modellerini ve katalogdaki ürün özelliklerini inceleyin. WhatsApp’tan teklif isteyin.",
    heading: "Köşe Koruyucular",
    intro:
      "Paletli ürünleri sabitlemeye ve köşelerini korumaya yardımcı olan modelleri inceleyin.",
    content:
      "Katalogda L tipi mavi köşe koruyucuların 5 köşe ve 7 köşe modelleri bulunur. Her iki ürün kaydında da 2 metre uzunluk bilgisi yer alır.",
  },
  {
    slug: "balonlu-naylonlar",
    categoryName: "Balonlu Naylonlar",
    title: "Balonlu Naylonlar | ST Ambalaj",
    description:
      "Balonlu ve şilteli naylon ürünlerini açıklama ve katalogda doğrulanan özellikleriyle inceleyin. WhatsApp’tan teklif isteyin.",
    heading: "Balonlu Naylonlar",
    intro:
      "Balonlu ve şilteli naylon seçeneklerini açıklama ve ölçü bilgileriyle karşılaştırın.",
    content:
      "Katalogda farklı enlerde balonlu naylonlar ve şilteli balonlu naylon bulunur. Ürün açıklamalarını ve listelenen teknik özellikleri kartlardan inceleyebilirsiniz.",
  },
  {
    slug: "nakliye-posetleri",
    categoryName: "Nakliye Poşetleri",
    title: "Nakliye Poşetleri | ST Ambalaj",
    description:
      "Nakliye poşetini katalogdaki açıklama ve ölçü bilgileriyle inceleyin. Teklif talebinizi WhatsApp’tan iletin.",
    heading: "Nakliye Poşetleri",
    intro:
      "Nakliye, depolama ve paketleme için katalogda listelenen ürünü inceleyin.",
    content:
      "Nakliye Poşeti ürün kaydında 80 × 110 cm ölçü ve 25 kg ağırlık bilgisi yer alır. Teklif talebinizde ihtiyacınız olan miktarı belirtebilirsiniz.",
  },
  {
    slug: "is-eldivenleri",
    categoryName: "İş Eldivenleri",
    title: "İş Eldivenleri | ST Ambalaj",
    description:
      "BEYBİ PN3, PN5 ve PN7 iş eldiveni modellerini katalog bilgileriyle inceleyin. WhatsApp’tan teklif isteyin.",
    heading: "İş Eldivenleri",
    intro:
      "BEYBİ PN3, PN5 ve PN7 modellerini ürün kartlarındaki bilgilerle inceleyin.",
    content:
      "Katalogda listelenen modeller genel amaçlı el koruması için tanımlanmıştır. Ürün açıklamalarında depo, ambalaj, paketleme ve montaj gibi kullanım alanları belirtilir.",
  },
] as const satisfies readonly CategorySeoPage[];

export function getCategorySeoBySlug(slug: string) {
  return categorySeoPages.find((category) => category.slug === slug);
}

export function getCategorySeoByName(categoryName: string) {
  return categorySeoPages.find((category) => category.categoryName === categoryName);
}
