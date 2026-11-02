export type PackagingCategory = {
  name: string;
  description: string;
  icon: string;
};

export type PackagingProduct = {
  id: number;
  name: string;
  code: string;
  category: string;
  description: string;
  specs: string[];
  brand?: string;
  shape: "tape" | "roll" | "corner" | "bubble" | "bag" | "glove";
};

export const packagingCategories: PackagingCategory[] = [
  { name: "Koli ve Kâğıt Bantlar", description: "Koli kapatma ve maskeleme için bantlar.", icon: "tape" },
  { name: "Streç Filmler", description: "Palet, koli ve ürün sarımı için filmler.", icon: "film" },
  { name: "Köşe Koruyucular", description: "Paletli yüklerin köşelerini korumak için.", icon: "corner" },
  { name: "Balonlu Naylonlar", description: "Hassas ve geniş yüzeyli ürünleri paketlemek için.", icon: "bubble" },
  { name: "Nakliye Poşetleri", description: "Taşıma, tekstil ve sevkiyat için poşetler.", icon: "bag" },
  { name: "İş Eldivenleri", description: "Depo, paketleme ve montaj işleri için.", icon: "gloves" },
];

export const packagingProducts: PackagingProduct[] = [
  {
    id: 1, code: "ST-001", name: "ASTEL Koli Bandı 45×100", brand: "ASTEL", category: "Koli ve Kâğıt Bantlar", shape: "tape",
    description: "Kolileri kapatmak ve gönderileri bantlamak için koli bandı.",
    specs: ["Ölçü: 45 mm × 100 metre", "Yapışkan: Hot Melt", "Yapışma: Standart üstü, güçlü yapışma", "Renk: Şeffaf ve taba (kahverengi)", "Koli içi: 60 adet", "Kullanım: Koli kapatma, paketleme ve kargo gönderileri", "Avantaj: Kolileri sağlam kapatmaya yardımcı olur; uzun süreli kullanım sağlar."],
  },
  {
    id: 2, code: "ST-002", name: "FECH 35×36 Kâğıt Bant", brand: "FECH", category: "Koli ve Kâğıt Bantlar", shape: "tape",
    description: "Boya, tadilat ve paketleme işlerinde maskeleme için kâğıt bant.",
    specs: ["Marka: FECH", "Ölçü: 35×36 (birim belirtilmemiş)", "Kullanım: Maskeleme ve yüzey koruma", "Uygulama: Pratik kullanım", "Alanlar: Boya, tadilat, ambalaj ve paketleme"],
  },
  {
    id: 3, code: "ST-003", name: "METAPİN 48×25 Kâğıt Bant", brand: "Metapin", category: "Koli ve Kâğıt Bantlar", shape: "tape",
    description: "Boya, tadilat ve paketleme işlerinde maskeleme için kâğıt bant.",
    specs: ["Marka: Metapin", "Ölçü: 48 mm × 25 metre", "Kullanım: Maskeleme ve yüzey koruma", "Özellik: Kolay yapıştırma ve pratik sökme", "Alanlar: Boya, tadilat, ambalaj ve paketleme"],
  },
  {
    id: 4, code: "ST-004", name: "VEGE LEOPAR 45×100 Kauçuk Bant", brand: "Vege Leopar", category: "Koli ve Kâğıt Bantlar", shape: "tape",
    description: "Koli kapatma ve genel ambalaj işleri için kauçuk bant.",
    specs: ["Marka: Vege Leopar", "Ölçü: 45 mm × 100 metre", "Tür: 4 mevsim kauçuk bant", "Özellik: Güçlü tutuş, pratik kullanım", "Alanlar: Ambalaj, paketleme, koli kapatma ve genel amaçlı yapıştırma"],
  },
  {
    id: 5, code: "ST-005", name: "17 Mikron 200 Metre Streç Film", category: "Streç Filmler", shape: "roll",
    description: "Palet ve kolileri sarmak, ürünleri sevkiyata hazırlamak için streç film.",
    specs: ["Kalınlık: 17 mikron", "Ağırlık: 2 kg", "Uzunluk: 200 metre", "Esnek ve kolay sarım", "Katmanların birbirine tutunmasına yardımcı olur.", "Toz, kir ve neme karşı korumaya yardımcı olur.", "Kullanım: Palet sarma, koli paketleme, ürün sabitleme ve sevkiyat"],
  },
  {
    id: 6, code: "ST-006", name: "17 Mikron 300 Metre Streç Film", category: "Streç Filmler", shape: "roll",
    description: "Palet ve kolileri sarmak için esnek, kolay sarımlı streç film.",
    specs: ["Kalınlık: 17 mikron", "Uzunluk: 300 metre", "Ağırlık: 2.600 gram (2,6 kg)", "Kolay sarım ve esnek kullanım", "Kullanım: Palet sarma, koli paketleme, ürün sabitleme ve sevkiyat"],
  },
  {
    id: 7, code: "ST-007", name: "Siyah Streç Film", category: "Streç Filmler", shape: "roll",
    description: "Palet ve sevkiyatta sarılan ürünlerin görünürlüğünü azaltmaya yardımcı olur.",
    specs: ["Kalınlık: 23 mikron", "Renk: Siyah", "Uzunluk: 300 metre", "Ağırlık: 2.600 gram (2,6 kg)", "Yırtılmaya karşı direnç sağlamaya yardımcı olur.", "Sarılan ürünlerin görünürlüğünü azaltır.", "Kullanım: Palet sarma, depo, nakliye ve sevkiyat"],
  },
  {
    id: 8, code: "ST-008", name: "Kırmızı Streç Film", category: "Streç Filmler", shape: "roll",
    description: "Kırmızı rengi, sarılan ürünlerin fark edilmesini kolaylaştırır.",
    specs: ["Kalınlık: 23 mikron", "Renk: Kırmızı", "Uzunluk: 300 metre", "Ağırlık: 2.600 gram (2,6 kg)", "Kolay sarım, esnek kullanım", "Sarılan ürünlerin fark edilmesini kolaylaştırır.", "Kullanım: Palet sarma, depo, nakliye ve sevkiyat"],
  },
  {
    id: 9, code: "ST-009", name: "Turuncu Streç Film", category: "Streç Filmler", shape: "roll",
    description: "Turuncu rengi, sarılan ürünlerin fark edilmesini kolaylaştırır.",
    specs: ["Kalınlık: 23 mikron", "Renk: Turuncu", "Uzunluk: 300 metre", "Ağırlık: 2.600 gram (2,6 kg)", "Kolay sarım, esnek kullanım", "Sarılan ürünlerin fark edilmesini kolaylaştırır.", "Kullanım: Palet sarma, depo, nakliye ve sevkiyat"],
  },
  {
    id: 10, code: "ST-010", name: "Mavi Streç Film", category: "Streç Filmler", shape: "roll",
    description: "Mavi rengi, sarılan ürünlerin fark edilmesini kolaylaştırır.",
    specs: ["Kalınlık: 23 mikron", "Renk: Mavi", "Uzunluk: 300 metre", "Ağırlık: 2.600 gram (2,6 kg)", "Kolay sarım, esnek kullanım", "Sarılan ürünlerin fark edilmesini kolaylaştırır.", "Kullanım: Palet sarma, depo, nakliye ve sevkiyat"],
  },
  {
    id: 11, code: "ST-011", name: "17 Mikron 25 cm Şeffaf Dilimli Streç", category: "Streç Filmler", shape: "roll",
    description: "Geniş ürünleri paketlemek için şeffaf dilimli streç film.",
    specs: ["Kalınlık: 17 mikron", "Genişlik: 25 cm", "Renk: Şeffaf", "Tür: Dilimli streç film", "Kullanım: Büyük ve geniş ürünlerin paketlenmesi", "Şeffaf yapısıyla ürün görünürlüğünü korur."],
  },
  {
    id: 12, code: "ST-012", name: "23 Mikron 10 cm Siyah Dilimli Streç", category: "Streç Filmler", shape: "roll",
    description: "Küçük ve dar ürünleri sarmak için siyah dilimli streç film.",
    specs: ["Kalınlık: 23 mikron", "Genişlik: 10 cm", "Renk: Siyah", "Tür: Dilimli streç film", "Kullanım: Küçük ve dar ürünlerin paketlenmesi", "Siyah yapısıyla ürün görünürlüğünü azaltmaya yardımcı olur."],
  },
  {
    id: 13, code: "ST-013", name: "23 Mikron 17 cm Siyah Dilimli Streç", category: "Streç Filmler", shape: "roll",
    description: "Orta boy ürünleri sarmak için siyah dilimli streç film.",
    specs: ["Kalınlık: 23 mikron", "Genişlik: 17 cm", "Renk: Siyah", "Tür: Dilimli streç film", "Kullanım: Orta boy ürünlerin paketlenmesi", "Pratik ve kolay sarım"],
  },
  {
    id: 14, code: "ST-014", name: "L Tipi Mavi Köşe Koruyucu 5 Köşe", category: "Köşe Koruyucular", shape: "corner",
    description: "Paletli ürünleri sabitlemeye ve köşelerini korumaya yardımcı olur.",
    specs: ["Tip: L tipi, 5 köşe", "Renk: Mavi", "Uzunluk: 2 metre", "Kullanım: Ambalaj, nakliye, depolama ve sevkiyat", "Paletli ürünlerin sabitlenmesi ve korunması"],
  },
  {
    id: 15, code: "ST-015", name: "L Tipi Mavi Köşe Koruyucu 7 Köşe", category: "Köşe Koruyucular", shape: "corner",
    description: "Paletli ürünleri sabitlemeye ve köşelerini korumaya yardımcı olur.",
    specs: ["Tip: L tipi, 7 köşe", "Renk: Mavi", "Uzunluk: 2 metre", "Kullanım: Ambalaj, nakliye, depolama ve sevkiyat", "Paletli ürünlerin sabitlenmesi ve korunması"],
  },
  {
    id: 16, code: "ST-016", name: "Balonlu Naylon 1 Metre", category: "Balonlu Naylonlar", shape: "bubble",
    description: "1 metre eninde; kargo ve taşınmada hassas ürünleri sarmak için balonlu naylon.",
    specs: ["En: 1 metre", "Uzunluk: 50 metre", "Gramaj: 30 gram (birim belirtilmemiş)", "Darbe ve çizilmelere karşı korumaya yardımcı olur.", "Kolay kesilir, pratik paketleme sağlar.", "Kullanım: Kargo, nakliye, taşınma, mobilya, cam ve hassas ürünler"],
  },
  {
    id: 17, code: "ST-017", name: "Balonlu Naylon 1,50 Metre", category: "Balonlu Naylonlar", shape: "bubble",
    description: "1,50 metre eninde; kargo ve taşınmada hassas ürünleri sarmak için balonlu naylon.",
    specs: ["En: 1,50 metre", "Uzunluk: 50 metre", "Gramaj: 30 gram (birim belirtilmemiş)", "Darbe ve çizilmelere karşı korumaya yardımcı olur.", "Kolay kesilir, pratik paketleme sağlar.", "Kullanım: Kargo, nakliye, taşınma, mobilya, cam ve hassas ürünler"],
  },
  {
    id: 18, code: "ST-018", name: "Depoluk Balonlu Naylon", category: "Balonlu Naylonlar", shape: "bubble",
    description: "Geniş yüzeyli ürünleri paketlemek için balonlu naylon.",
    specs: ["En: 160 cm (1,60 metre)", "Uzunluk: 50 metre", "Geniş yüzeyli ürünlerin paketlenmesine uygundur.", "Kullanım: Depo, mobilya, nakliye, taşınma, cam ve hassas ürünler"],
  },
  {
    id: 19, code: "ST-019", name: "Şilteli Balonlu Naylon", category: "Balonlu Naylonlar", shape: "bubble",
    description: "Hassas ürünlerin yüzey ve darbe koruması için şilteli balonlu naylon.",
    specs: ["Ağırlık: 15 kg", "En: 160 cm (1,60 metre)", "Tür: Şilteli balonlu naylon", "Hassas ürünler için yüzey ve darbe korumasına yardımcı olur.", "Kullanım: Mobilya, beyaz eşya, cam, taşınma, depo ve nakliye"],
  },
  {
    id: 20, code: "ST-020", name: "Nakliye Poşeti", category: "Nakliye Poşetleri", shape: "bag",
    description: "Nakliye, depolama ve paketleme için poşet.",
    specs: ["Ağırlık: 25 kg", "Ölçü: 80 × 110 cm", "Taşıma ve paketleme işlemlerinde kullanıma uygundur.", "Kullanım: Nakliye, depo, tekstil, ambalaj ve sevkiyat"],
  },
  {
    id: 21, code: "ST-021", name: "BEYBİ PN3 İş Eldiveni", brand: "Beybi", category: "İş Eldivenleri", shape: "glove",
    description: "Depo, paketleme ve montaj işleri için iş eldiveni.",
    specs: ["Marka: Beybi", "Model: PN3", "Tür: İş eldiveni", "Kullanım: Genel amaçlı el koruma", "Esneklik ve kavramaya yardımcı özellikler", "Uygulama: Depo, ambalaj, paketleme, montaj ve genel işler"],
  },
  {
    id: 22, code: "ST-022", name: "BEYBİ PN5 İş Eldiveni", brand: "Beybi", category: "İş Eldivenleri", shape: "glove",
    description: "Depo, paketleme ve montaj işleri için iş eldiveni.",
    specs: ["Marka: Beybi", "Model: PN5", "Tür: İş eldiveni", "Kullanım: Genel amaçlı el koruma", "Esneklik ve kavramaya yardımcı özellikler", "Uygulama: Depo, ambalaj, paketleme, montaj ve genel işler"],
  },
  {
    id: 23, code: "ST-023", name: "BEYBİ PN7 İş Eldiveni", brand: "Beybi", category: "İş Eldivenleri", shape: "glove",
    description: "Depo, paketleme ve montaj işleri için iş eldiveni.",
    specs: ["Marka: Beybi", "Model: PN7", "Tür: İş eldiveni", "Kullanım: Genel amaçlı el koruma", "Esneklik ve kavramaya yardımcı özellikler", "Uygulama: Depo, ambalaj, paketleme, montaj ve genel işler"],
  },
];