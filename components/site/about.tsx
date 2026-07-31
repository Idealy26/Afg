'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/about-hands.png"
                alt="Mains d’un producteur malgache tenant des gousses de vanille"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-xl border border-border bg-card px-6 py-5 shadow-xl sm:-right-6 sm:block">
              <p className="font-serif text-3xl font-medium text-primary">2025</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {t.hero.eyebrow.split('·')[1] ?? ''}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">
              <span className="h-px w-6 bg-[color:var(--gold)]" />
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] text-foreground text-balance sm:text-4xl">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t.about.p1}
            </p>
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.about.p2}
            </p>
          </Reveal>
          <Reveal delay={4}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.about.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm leading-snug text-foreground/85">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
