'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { requestQuote } from '@/lib/quote'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import type { Product } from '@/lib/dictionaries'

export function Products() {
  const { t } = useI18n()
  const [active, setActive] = useState<Product | null>(null)

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="products" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.products.eyebrow}
          title={t.products.title}
          subtitle={t.products.subtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.products.list.map((product, i) => (
            <Reveal key={product.id} delay={i % 4}>
              <button
                type="button"
                onClick={() => setActive(product)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--gold)]">
                    {product.tagline}
                  </p>
                  <h3 className="mt-1.5 font-serif text-xl font-medium text-foreground">
                    {product.name}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {t.products.cta}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
          >
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl md:grid-cols-2"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 z-10 inline-flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
              >
                <X className="size-4.5" />
              </button>

              <div className="relative h-56 w-full md:h-auto">
                <Image
                  src={active.image || '/placeholder.svg'}
                  alt={active.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-7 sm:p-9">
                <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--gold)]">
                  {active.tagline}
                </p>
                <h3 className="mt-1.5 font-serif text-3xl font-medium text-foreground">
                  {active.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {active.description}
                </p>

                <dl className="mt-6 space-y-4 border-t border-border pt-6">
                  {[
                    { label: t.products.labelOrigin, value: active.origin },
                    { label: t.products.labelCharacteristics, value: active.characteristics },
                    { label: t.products.labelUses, value: active.uses },
                    { label: t.products.labelAvailability, value: active.availability },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-3 gap-3">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="col-span-2 text-sm text-foreground/90">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={() => {
                    const name = active.name
                    setActive(null)
                    requestQuote(name)
                  }}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t.products.cta}
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
