'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { QUOTE_EVENT } from '@/lib/quote'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

export function Contact() {
  const { t } = useI18n()
  const [product, setProduct] = useState('')
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string | undefined>).detail
      if (detail) setProduct(detail)
    }
    window.addEventListener(QUOTE_EVENT, handler)
    return () => window.removeEventListener(QUOTE_EVENT, handler)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const lines = [
      `${t.contact.formName}: ${data.get('name')}`,
      `${t.contact.formCompany}: ${data.get('company')}`,
      `${t.contact.formEmail}: ${data.get('email')}`,
      `${t.contact.formCountry}: ${data.get('country')}`,
      `${t.contact.formProduct}: ${data.get('product')}`,
      `${t.contact.formVolume}: ${data.get('volume')}`,
      '',
      `${data.get('message')}`,
    ]
    const subject = encodeURIComponent(
      `${t.nav.quote} — ${data.get('company') || data.get('name')}`,
    )
    const body = encodeURIComponent(lines.join('\n'))
    setSent(true)
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20'

  const contactItems = [
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: siteConfig.phone,
      href: `https://wa.me/${siteConfig.whatsapp}`,
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: siteConfig.phone,
      href: `tel:${siteConfig.phoneHref}`,
    },
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      label: t.contact.addressLabel,
      value: siteConfig.addressLine,
      href: siteConfig.mapEmbed.replace('&output=embed', ''),
    },
  ]

  return (
    <section id="contact" className="scroll-mt-20 bg-cocoa py-20 text-cocoa-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">
                <span className="h-px w-6 bg-[color:var(--gold)]" />
                {t.contact.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] text-cream text-balance sm:text-4xl">
                {t.contact.title}
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/75">
                {t.contact.subtitle}
              </p>
            </Reveal>

            <Reveal delay={3}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {contactItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-3 rounded-xl border border-cream/15 bg-cream/5 p-4 transition-colors hover:border-cream/40 hover:bg-cream/10"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--gold)]/20 text-[color:var(--gold)]">
                        <item.icon className="size-4.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-wider text-cream/60">
                          {item.label}
                        </span>
                        <span className="block truncate text-sm font-medium text-cream">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-cream/15">
                <iframe
                  src={siteConfig.mapEmbed}
                  title="Localisation Agrofrancegasy — Madagascar"
                  width="100%"
                  height="220"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block grayscale"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-cream/15 bg-cream p-6 text-foreground sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.contact.formName}
                  </span>
                  <input name="name" required className={inputClass} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.contact.formCompany}
                  </span>
                  <input name="company" className={inputClass} autoComplete="organization" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.contact.formEmail}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    autoComplete="email"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.contact.formCountry}
                  </span>
                  <input name="country" className={inputClass} autoComplete="country-name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.contact.formProduct}
                  </span>
                  <select
                    name="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">{t.contact.productPlaceholder}</option>
                    {t.products.list.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.contact.formVolume}
                  </span>
                  <input name="volume" className={inputClass} placeholder="ex: 500 kg / 1 conteneur" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.contact.formMessage}
                </span>
                <textarea name="message" rows={4} className={inputClass} />
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t.contact.submit}
                <Send className="size-4" />
              </button>

              {sent ? (
                <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                  {t.contact.successNote}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
