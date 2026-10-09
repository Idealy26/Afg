export type SeoProduct = {
  slug: string
  name: string
  short: string
  description: string
  details: string[]
  image: string
  alt: string
}

export const products: SeoProduct[] = [
  {
    slug: 'vanille-bourbon',
    name: 'Vanille Bourbon de Madagascar',
    short: 'Gousses de vanille Bourbon de Madagascar, qualité premium pour importateurs.',
    description:
      'Agrofrancegasy exporte de la vanille Bourbon de Madagascar, cultivée dans la région SAVA. Nos gousses sont sélectionnées à la main, préparées et séchées selon la méthode traditionnelle pour un parfum riche et un taux de vanilline élevé.',
    details: [
      'Origine : Madagascar (région SAVA)',
      'Qualités : gourmet, extraction (à adapter)',
      'Conditionnement : sous vide, cartons export (à adapter)',
      'Traçabilité complète du producteur à l’expédition',
    ],
    image: '/images/hero-plantation.png', // remplace par une photo de vanille
    alt: 'Gousses de vanille Bourbon de Madagascar',
  },
  {
    slug: 'girofle',
    name: 'Girofle de Madagascar',
    short: 'Clous de girofle de Madagascar, séchés naturellement, en gros.',
    description:
      'Nos clous de girofle de Madagascar sont récoltés à maturité et séchés au soleil pour conserver toute leur teneur en huile essentielle.',
    details: ['Origine : Madagascar', 'Conditionnement : sacs export (à adapter)'],
    image: '/images/hero-plantation.png',
    alt: 'Clous de girofle de Madagascar séchés',
  },
  // Ajoute : cacao, poivre, cafe, miel, epices (même structure)
]