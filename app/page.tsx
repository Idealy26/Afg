import { I18nProvider } from '@/lib/i18n'
import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { About } from '@/components/site/about'
import { Commitments } from '@/components/site/commitments'
import { Products } from '@/components/site/products'
import { Madagascar } from '@/components/site/madagascar'
import { Process } from '@/components/site/process'
import { Certifications } from '@/components/site/certifications'
import { Gallery } from '@/components/site/gallery'
import { Partners } from '@/components/site/partners'
import { Faq } from '@/components/site/faq'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'
import { FloatingActions } from '@/components/site/floating-actions'

export default function Page() {
  return (
    <I18nProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Commitments />
        <Products />
        <Madagascar />
        <Process />
        <Certifications />
        <Gallery />
        <Partners />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </I18nProvider>
  )
}
