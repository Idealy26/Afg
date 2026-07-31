import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

const siteUrl = 'https://agrofrancegasy.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Agrofrancegasy — Produits agricoles d’exception de Madagascar',
    template: '%s | Agrofrancegasy',
  },
  description:
    'Agrofrancegasy produit, sélectionne et exporte des produits agricoles d’exception de Madagascar : vanille Bourbon, girofle, cacao, poivre, café, miel et épices. Qualité premium, traçabilité et commerce responsable pour les importateurs internationaux.',
  keywords: [
    'Madagascar',
    'vanille Bourbon',
    'export agricole',
    'girofle',
    'cacao',
    'poivre',
    'café',
    'miel',
    'épices',
    'importateur',
    'grossiste',
    'commerce responsable',
  ],
  authors: [{ name: 'Agrofrancegasy' }],
  generator: 'v0.app',
  alternates: {
    canonical: '/',
    languages: { 'fr-FR': '/', 'en-US': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Agrofrancegasy',
    title: 'Agrofrancegasy — Produits agricoles d’exception de Madagascar',
    description:
      'Producteur et exportateur international de vanille Bourbon, épices, cacao, café et miel de Madagascar. Qualité premium et traçabilité.',
    images: [
      {
        url: '/images/hero-plantation.png',
        width: 1200,
        height: 630,
        alt: 'Plantation de vanille à Madagascar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agrofrancegasy — Produits agricoles d’exception de Madagascar',
    description:
      'Producteur et exportateur international de vanille Bourbon, épices, cacao, café et miel de Madagascar.',
    images: ['/images/hero-plantation.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1f3d2f',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Agrofrancegasy',
  url: siteUrl,
  logo: `${siteUrl}/images/hero-plantation.png`,
  description:
    'Production, sélection et exportation de produits agricoles d’exception de Madagascar.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MG',
    addressLocality: 'Antananarivo',
  },
  areaServed: 'Worldwide',
  sameAs: [
    'https://www.linkedin.com',
    'https://www.facebook.com',
    'https://www.instagram.com',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`light ${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
