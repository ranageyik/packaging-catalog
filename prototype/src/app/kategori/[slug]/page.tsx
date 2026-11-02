import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { packagingCategories, packagingProducts } from "../../catalog-data";
import { CatalogProductCard } from "../../components/catalog-product-card";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { WhatsAppLink } from "../../components/whatsapp-link";
import { categorySeoPages, getCategorySeoBySlug } from "../../category-seo";
import { canonicalSiteUrl } from "../../site-config";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categorySeoPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategorySeoBySlug(slug);

  if (!category) {
    notFound();
  }

  const canonical = new URL(`/kategori/${category.slug}`, canonicalSiteUrl);

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: canonical.toString() },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "ST Ambalaj",
      title: category.title,
      description: category.description,
      url: canonical,
    },
    twitter: {
      card: "summary",
      title: category.title,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategorySeoBySlug(slug);

  if (!category) {
    notFound();
  }

  if (!packagingCategories.some(({ name }) => name === category.categoryName)) {
    throw new Error(`Kategori adı katalogda bulunamadı: ${category.categoryName}`);
  }

  const products = packagingProducts.filter(
    (product) => product.category === category.categoryName,
  );

  return (
    <main className="catalog-page" id="top">
      <SiteHeader />

      <section className="catalog-page-intro home-container" aria-labelledby="category-title">
        <p className="catalog-kicker">ST AMBALAJ · ÜRÜN KATEGORİSİ</p>
        <h1 id="category-title">{category.heading}</h1>
        <p>{category.intro}</p>
      </section>

      <section className="category-seo-content home-container">
        <p>{category.content}</p>
        <Link className="category-seo-catalog-link" href="/products">
          Tüm ürün kataloğuna dön <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="catalog-browser home-container category-page-products" aria-label={`${category.heading} ürünleri`}>
        <div className="catalog-results-heading">
          <p><strong>{products.length}</strong> ürün listeleniyor</p>
          <Link className="catalog-reset-button" href="/teklif-listem">
            Teklif listemi görüntüle
          </Link>
        </div>
        <div className="catalog-product-grid">
          {products.map((product) => (
            <CatalogProductCard key={product.code} product={product} />
          ))}
        </div>
      </section>

      <section className="category-seo-links home-container" aria-labelledby="other-categories-title">
        <h2 id="other-categories-title">Diğer ambalaj kategorileri</h2>
        <nav aria-label="Diğer ürün kategorileri">
          {categorySeoPages
            .filter((otherCategory) => otherCategory.slug !== category.slug)
            .map((otherCategory) => (
              <Link
                className="category-seo-link"
                href={`/kategori/${otherCategory.slug}`}
                key={otherCategory.slug}
              >
                {otherCategory.categoryName}
              </Link>
            ))}
        </nav>
      </section>

      <section className="catalog-offer home-container" id="teklif" aria-labelledby="category-offer-title">
        <div>
          <p className="catalog-kicker">TEKLİF VE BİLGİ</p>
          <h2 id="category-offer-title">Ürün ve miktarı paylaşın.</h2>
          <p>Teklif listenizi hazırlayın veya ürün bilgilerini WhatsApp’tan iletin.</p>
        </div>
        <WhatsAppLink className="home-button home-button-light">
          WhatsApp’tan Teklif Alın
        </WhatsAppLink>
      </section>

      <SiteFooter />
    </main>
  );
}
