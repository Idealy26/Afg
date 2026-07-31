'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Printer } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { LanguageToggle } from '@/components/site/language-toggle'
import { useI18n } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

export function CatalogueView() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur print:hidden">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Printer className="size-4" />
              PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
        <div className="mb-12 border-b border-border pb-10">
          <Logo />
          <h1 className="mt-6 font-serif text-4xl font-medium text-primary sm:text-5xl text-balance">
            {t.products.title}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{t.products.subtitle}</p>
        </div>

        <div className="space-y-10">
          {t.products.list.map((product, index) => (
            <article
              key={product.id}
              className="grid gap-6 border-b border-border pb-10 last:border-0 sm:grid-cols-[200px_1fr]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-sm text-[color:var(--gold)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-foreground">{product.name}</h2>
                </div>
                <p className="mt-1 text-sm italic text-muted-foreground">{product.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">{product.description}</p>
                <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t.products.labelOrigin}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground/80">{product.origin}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t.products.labelCharacteristics}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground/80">{product.characteristics}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t.products.labelUses}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground/80">{product.uses}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t.products.labelAvailability}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground/80">{product.availability}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-primary p-8 text-cream">
          <h2 className="font-serif text-2xl font-medium">{t.contact.title}</h2>
          <p className="mt-2 text-sm text-cream/80">{siteConfig.email} — {siteConfig.phone}</p>
          <p className="mt-1 text-sm text-cream/70">{siteConfig.addressLine}</p>
        </div>
      </div>
    </div>
  )
}
