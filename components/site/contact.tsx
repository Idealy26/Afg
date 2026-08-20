'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, MessageCircle, Phone, MapPin, Send, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { QUOTE_EVENT } from '@/lib/quote'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

export function Contact() {
  const { t, lang } = useI18n()
  const [product, setProduct] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const productOptions = t.products.list.flatMap((p) =>
    p.variants && p.variants.length > 0
      ? p.variants.map((v) => `${p.name} — ${v}`)
      : [p.name],
  )

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string | undefined>).detail
      if (detail) setProduct(detail)
    }
    window.addEventListener(QUOTE_EVENT, handler)
    return () => window.removeEventListener(QUOTE_EVENT, handler)
  }, [])

  useEffect(() => {
    if (sent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sent])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSent(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    setErrorDetails(null)
    const data = new FormData(e.currentTarget)
    const payload = {
      name: data.get('name'),
      company: data.get('company'),
      email: data.get('email'),
      country: data.get('country'),
      product: data.get('product'),
      volume: data.get('volume'),
      message: data.get('message'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json().catch(() => null)
      if (!res.ok) {
        console.error('[contact] Échec envoi formulaire:', result)
        setErrorDetails(result?.error || result?.details || null)
        throw new Error('send-failed')
      }
      setSent(true)
      formRef.current?.reset()
      setProduct('')
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20'

  const formatIntlNumber = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, '')
    const country = digits.slice(0, digits.length - 9)
    const rest = digits.slice(digits.length - 9)
    const pairs = rest.match(/.{1,2}/g)?.join(' ') ?? rest
    return `+${country} ${pairs}`
  }

  const contactItems = [
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: formatIntlNumber(siteConfig.whatsapp),
      href: `https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, '')}`,
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

  const successCopy =
    lang === 'en'
      ? {
          title: 'Request sent!',
          text: 'Thank you for reaching out. Our export team will get back to you within 48 business hours.',
          close: 'Close',
        }
      : {
          title: 'Demande envoyée !',
          text: 'Merci pour votre demande. Notre équipe export vous répondra sous 48 h ouvrées.',
          close: 'Fermer',
        }

  return (
    <section id="contact" className="scroll-mt-20 bg-cocoa py-20 text-cocoa-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
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

            <Reveal delay={4}>
              <ul className="mt-8 grid gap-3">
                {contactItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 rounded-xl border border-cream/15 bg-cream/5 p-4 transition-colors hover:border-cream/40 hover:bg-cream/10"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--gold)]/20 text-[color:var(--gold)]">
                        <item.icon className="size-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs uppercase tracking-wider text-cream/60">
                          {item.label}
                        </span>
                        <span className="block break-words text-sm font-medium leading-snug text-cream">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
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
                    {product && !productOptions.includes(product) ? (
                      <option value={product}>{product}</option>
                    ) : null}
                    {productOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
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
                disabled={sending}
                className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[color:var(--gold)] via-[#e8c992] to-[color:var(--gold)] bg-[length:200%_100%] px-6 py-3.5 text-sm font-semibold text-cocoa shadow-lg shadow-[color:var(--gold)]/20 transition-all duration-500 hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-[color:var(--gold)]/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {lang === 'en' ? 'Sending…' : 'Envoi en cours…'}
                  </>
                ) : (
                  <>
                    {t.contact.submit}
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              {error ? (
                <p className="mt-4 text-center text-xs leading-relaxed text-red-600">
                  {lang === 'en'
                    ? 'Something went wrong. Please try again or contact us directly.'
                    : "Une erreur s'est produite. Réessayez ou contactez-nous directement."}
                  {errorDetails ? <span className="mt-1 block text-[10px] opacity-70">{errorDetails}</span> : null}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {sent ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSent(false)}
            role="dialog"
            aria-modal="true"
            aria-label={successCopy.title}
          >
            <div className="absolute inset-0 bg-cocoa/70 backdrop-blur-sm" />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm rounded-3xl border border-border bg-card p-8 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSent(false)}
                aria-label={successCopy.close}
                className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                className="mx-auto flex size-16 items-center justify-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
              >
                <CheckCircle2 className="size-9" />
              </motion.div>

              <h3 className="mt-5 font-serif text-2xl font-medium text-foreground">
                {successCopy.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {successCopy.text}
              </p>

              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold text-cocoa transition-colors hover:bg-[color:var(--gold)]/90"
              >
                {successCopy.close}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}