import type { MetadataRoute } from 'next'
import { products } from '@/lib/products-seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://agrofrancegasy.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/catalogue`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...products.map((p) => ({
      url: `${base}/produits/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}