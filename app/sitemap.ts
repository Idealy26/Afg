import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.agrofrancegasy.com";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/catalogue`, lastModified: new Date(), priority: 0.8 },
  ];
}