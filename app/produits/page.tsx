import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products } from '@/lib/products-seo'

const siteUrl = 'https://agrofrancegasy.com'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} | Export`,
    description: product.short,
    alternates: { canonical: `/produits/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.short,
      url: `/produits/${product.slug}`,
      images: [{ url: product.image, alt: product.alt }],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    brand: { '@type': 'Brand', name: 'Agrofrancegasy' },
    countryOfOrigin: 'MG',
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <nav className="mb-6 text-sm">
        <Link href="/">Accueil</Link> / <Link href="/catalogue">Catalogue</Link> / {product.name}
      </nav>

      <h1 className="font-serif text-4xl">{product.name}</h1>

      <Image
        src={product.image}
        alt={product.alt}
        width={1200}
        height={800}
        className="my-8 rounded-lg"
        priority
      />

      <p className="text-lg leading-relaxed">{product.description}</p>

      <h2 className="mt-10 text-2xl">Caractéristiques</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        {product.details.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>

      <Link href="/#contact" className="mt-10 inline-block rounded bg-[#1f3d2f] px-6 py-3 text-white">
        Demander un devis
      </Link>
    </main>
  )
}