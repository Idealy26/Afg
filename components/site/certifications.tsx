'use client'

import { Award } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

export function Certifications() {
  const { t } = useI18n()

  return (
    <section className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.certifications.eyebrow}
          title={t.certifications.title}
          subtitle={t.certifications.subtitle}
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.certifications.items.map((item, i) => (
            <Reveal key={item} delay={i}>
              <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-10 text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                  <Award className="size-7" />
                </span>
                <p className="text-sm font-medium leading-snug text-foreground">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
