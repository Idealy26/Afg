'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone, Printer } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { LanguageToggle } from '@/components/site/language-toggle'
import { useI18n } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

export function CatalogueView() {
  const { t } = useI18n()

  const formatIntlNumber = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, '')
    const country = digits.slice(0, digits.length - 9)
    const rest = digits.slice(digits.length - 9)
    const pairs = rest.match(/.{1,2}/g)?.join(' ') ?? rest
    return `+${country} ${pairs}`
  }

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
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-sm font-semibold text-cocoa transition-colors hover:bg-[color:var(--gold)]/90"
            >
              <Printer className="size-4" />
              PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
        <div className="mb-12 border-b border-border pb-10">
          <Logo className="text-primary" />
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
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-serif text-sm text-[color:var(--gold)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-foreground">{product.name}</h2>
                  {product.category ? (
                    <span className="rounded-full bg-[color:var(--gold)]/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                      {product.category}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm italic text-muted-foreground">{product.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">{product.description}</p>

                {product.variants && product.variants.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.variants.map((variant) => (
                      <span
                        key={variant}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground/70"
                      >
                        {variant}
                      </span>
                    ))}
                  </div>
                ) : null}

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

        <div className="mt-12 rounded-xl bg-cocoa p-8 text-cream">
          <h2 className="font-serif text-2xl font-medium">{t.contact.title}</h2>
          <ul className="mt-4 grid gap-2.5 text-sm text-cream/80 sm:grid-cols-2">
            <li className="flex items-center gap-2.5">
              <MessageCircle className="size-4 shrink-0 text-[color:var(--gold)]" />
              {formatIntlNumber(siteConfig.whatsapp)}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-[color:var(--gold)]" />
              {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-[color:var(--gold)]" />
              {siteConfig.email}
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-[color:var(--gold)]" />
              {siteConfig.addressLine}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}