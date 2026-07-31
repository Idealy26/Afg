import type { Metadata } from 'next'
import { I18nProvider } from '@/lib/i18n'
import { CatalogueView } from '@/components/site/catalogue-view'

export const metadata: Metadata = {
  title: 'Catalogue',
  description:
    'Catalogue des produits agricoles d’exception de Madagascar par Agrofrancegasy : vanille Bourbon, girofle, cacao, poivre, café, miel et épices.',
}

export default function CataloguePage() {
  return (
    <I18nProvider>
      <CatalogueView />
    </I18nProvider>
  )
}
