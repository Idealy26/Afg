'use client'

import { Quote } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

export function Partners() {
  const { t } = useI18n()

  return (
    <section className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.partners.eyebrow}
          title={t.partners.title}
          subtitle={t.partners.subtitle}
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.partners.testimonials.map((item, i) => (
            <Reveal key={item.author} delay={i}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <Quote className="size-8 text-[color:var(--gold)]" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-foreground/90">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-foreground">{item.author}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                    {item.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
