import type { Metadata } from 'next'
import { I18nProvider } from '@/lib/i18n'
import { CatalogueView } from '@/components/site/catalogue-view'

export const metadata = {
  title: 'Catalogue : produits locaux de Madagascar',
  description:
    'Catalogue de produits locaux de Madagascar : vanille Bourbon, girofle, cacao, poivre, café, miel et épices en gros pour importateurs.',
  alternates: { canonical: '/catalogue' },
}

export default function CataloguePage() {
  return (
    <I18nProvider>
      <CatalogueView />
    </I18nProvider>
  )
}
