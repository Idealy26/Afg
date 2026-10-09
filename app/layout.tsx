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
    default: 'Agrofrancegasy | Vanille Bourbon et épices de Madagascar',
    template: '%s | Agrofrancegasy',
  },

  description:
    'Agrofrancegasy produit et exporte de la vanille Bourbon, girofle, cacao, poivre, café, miel et épices de Madagascar. Qualité premium et traçabilité pour importateurs.',

  authors: [{ name: 'Agrofrancegasy' }],

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Agrofrancegasy',
    title: 'Agrofrancegasy | Produits agricoles d’exception de Madagascar',
    description:
      'Producteur et exportateur international de vanille Bourbon, épices, cacao, café et miel de Madagascar. Qualité premium et traçabilité.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Plantation de vanille à Madagascar - Agrofrancegasy',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Agrofrancegasy | Produits agricoles d’exception de Madagascar',
    description:
      'Producteur et exportateur international de vanille Bourbon, épices, cacao, café et miel de Madagascar.',
    images: ['/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
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
  logo: `${siteUrl}/logo.png`, // remplace par ton vrai logo
  description:
    'Production, sélection et exportation de produits agricoles d’exception de Madagascar.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MG',
    addressLocality: 'Antananarivo',
  },
  areaServed: 'Worldwide',
  // sameAs: ['https://www.linkedin.com/company/TON-PROFIL'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`light ${inter.variable} ${fraunces.variable} bg-background`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}