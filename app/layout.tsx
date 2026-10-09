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
    default: 'Produits locaux de Madagascar | Vanille, épices, cacao',
    template: '%s | Agrofrancegasy',
  },

  description:
    'Agrofrancegasy exporte les meilleurs produits locaux de Madagascar : vanille Bourbon, girofle, cacao, poivre, café, miel et épices. Qualité premium et traçabilité.',

  applicationName: 'Agrofrancegasy',
  authors: [{ name: 'Agrofrancegasy', url: siteUrl }],
  creator: 'Agrofrancegasy',
  publisher: 'Agrofrancegasy',
  category: 'agriculture',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Agrofrancegasy',
    title: 'Produits locaux de Madagascar | Agrofrancegasy',
    description:
      'Vanille Bourbon, girofle, cacao, poivre, café, miel et épices : les produits locaux de Madagascar, exportés avec qualité premium et traçabilité.',
    images: [
      {
        url: '/images/og-image.jpg', // à créer : 1200x630 px
        width: 1200,
        height: 630,
        alt: 'Produits locaux de Madagascar : vanille, épices et cacao - Agrofrancegasy',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Produits locaux de Madagascar | Agrofrancegasy',
    description:
      'Vanille Bourbon, girofle, cacao, poivre, café, miel et épices de Madagascar.',
    images: ['/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Décommente et colle le code fourni par Google Search Console (méthode "balise HTML")
  // verification: { google: 'TON_CODE_ICI' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1f3d2f',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Agrofrancegasy',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`, // ton vrai logo, minimum 112x112 px
    description:
      'Production, sélection et exportation de produits locaux de Madagascar : vanille Bourbon, épices, cacao, café et miel.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MG',
      addressLocality: 'Antananarivo',
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Vanille Bourbon de Madagascar',
      'Épices de Madagascar',
      'Cacao de Madagascar',
      'Girofle',
      'Poivre',
      'Café',
      'Miel',
    ],
    // Ajoute tes vrais profils :
    // sameAs: ['https://www.facebook.com/TA-PAGE', 'https://www.linkedin.com/company/TON-PROFIL'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Agrofrancegasy',
    inLanguage: 'fr',
    publisher: { '@id': `${siteUrl}/#organization` },
  },
]

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