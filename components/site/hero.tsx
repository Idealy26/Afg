'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-plantation.png"
          alt="Plantation de vanille à Madagascar au lever du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/45 to-foreground/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-16 sm:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-sm"
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="font-serif text-4xl font-medium leading-[1.05] text-cream text-balance sm:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {t.hero.title1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-[color:var(--gold)]"
            >
              {t.hero.title2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-cream/90"
            >
              {t.hero.ctaPrimary}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/15 bg-cream/10 backdrop-blur-md sm:grid-cols-4"
        >
          {t.hero.stats.map((stat) => (
           <div
            key={stat.label}
            className="flex flex-col justify-center bg-foreground/20 px-5 py-5 text-center sm:text-left"
          >
            <dt className="font-serif text-2xl leading-tight font-medium whitespace-nowrap text-cream sm:text-3xl">
              {stat.value}
            </dt>
            <dd className="mt-1 text-xs leading-snug text-cream/70">{stat.label}</dd>
          </div>
          ))}
        </motion.dl>
      </div>

      <a
        href="#about"
        aria-label="Défiler vers le bas"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-cream/70 transition-colors hover:text-cream md:block"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  )
}
