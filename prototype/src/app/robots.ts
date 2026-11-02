import type { MetadataRoute } from "next";
import { canonicalSiteUrl } from "./site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", canonicalSiteUrl).toString(),
  };
}
