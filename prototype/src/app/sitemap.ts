import type { MetadataRoute } from "next";
import { categorySeoPages } from "./category-seo";
import { canonicalSiteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonicalSiteUrl.toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/products", canonicalSiteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...categorySeoPages.map(({ slug }) => ({
      url: new URL(`/kategori/${slug}`, canonicalSiteUrl).toString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
