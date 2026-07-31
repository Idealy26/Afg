'use client'

import { ShieldCheck, MapPin, HandHeart, Leaf } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const icons = [ShieldCheck, MapPin, HandHeart, Leaf]

export function Commitments() {
  const { t } = useI18n()

  return (
    <section className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.commitments.eyebrow}
          title={t.commitments.title}
          subtitle={t.commitments.subtitle}
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.commitments.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={item.title} delay={i}>
                <article className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
