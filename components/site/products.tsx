'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Calendar, Compass, Gem, Layers, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { requestQuote } from '@/lib/quote'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import type { Product } from '@/lib/dictionaries'

export function Products() {
  const { t, lang } = useI18n()
  const [active, setActive] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

  const allLabel = lang === 'en' ? 'All' : 'Tous'

  const categories = useMemo(() => {
    const unique = Array.from(new Set(t.products.list.map((p) => p.category)))
    return unique
  }, [t.products.list])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return t.products.list
    return t.products.list.filter((p) => p.category === activeCategory)
  }, [t.products.list, activeCategory])

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
      setSelectedVariant(active.variants && active.variants.length > 0 ? active.variants[0] : null)
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

        {categories.length > 1 ? (
          <Reveal delay={1}>
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeCategory === 'all'
                    ? 'border-[color:var(--gold)] bg-[color:var(--gold)] text-cocoa'
                    : 'border-border text-muted-foreground hover:border-[color:var(--gold)]/50 hover:text-foreground'
                }`}
              >
                {allLabel}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeCategory === category
                      ? 'border-[color:var(--gold)] bg-[color:var(--gold)] text-cocoa'
                      : 'border-border text-muted-foreground hover:border-[color:var(--gold)]/50 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        ) : null}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, i) => (
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

              <div className="relative h-64 w-full md:h-auto">
                <Image
                  src={active.image || '/placeholder.svg'}
                  alt={active.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-cocoa/0 to-cocoa/0" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-block rounded-full bg-cocoa/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--gold)] backdrop-blur">
                    {active.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col p-7 sm:p-9">
                <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--gold)]">
                  {active.tagline}
                </p>
                <h3 className="mt-1.5 font-serif text-3xl font-medium text-foreground">
                  {active.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {active.description}
                </p>

                {active.variants && active.variants.length > 0 ? (
                  <div className="mt-6">
                    <span className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Layers className="size-3.5 text-[color:var(--gold)]" />
                      {lang === 'en' ? 'Choose a type' : 'Choisissez un type'}
                    </span>
                    <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-muted/30 p-2">
                      {active.variants.map((variant) => (
                        <button
                          key={variant}
                          type="button"
                          onClick={() => setSelectedVariant(variant)}
                          className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                            selectedVariant === variant
                              ? 'bg-[color:var(--gold)] text-cocoa shadow-sm'
                              : 'text-muted-foreground hover:bg-cream/60 hover:text-foreground'
                          }`}
                        >
                          {variant}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
                  {[
                    { icon: Compass, label: t.products.labelOrigin, value: active.origin },
                    { icon: Gem, label: t.products.labelCharacteristics, value: active.characteristics },
                    { icon: Layers, label: t.products.labelUses, value: active.uses },
                    { icon: Calendar, label: t.products.labelAvailability, value: active.availability },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-3 bg-muted/20 p-3.5">
                      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                        <row.icon className="size-3.5" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-foreground/90">{row.value}</dd>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const name = selectedVariant ? `${active.name} — ${selectedVariant}` : active.name
                    setActive(null)
                    requestQuote(name)
                  }}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3.5 text-sm font-semibold text-cocoa transition-colors hover:bg-[color:var(--gold)]/90"
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