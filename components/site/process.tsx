'use client'

import Image from 'next/image'
import { Sprout, ClipboardCheck, Package, Ship } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const icons = [Sprout, ClipboardCheck, Package, Ship]

export function Process() {
  const { t } = useI18n()

  return (
    <section id="process" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t.process.eyebrow}
              title={t.process.title}
              subtitle={t.process.subtitle}
            />

            <div className="mt-10 space-y-6">
              {t.process.steps.map((step, i) => {
                const Icon = icons[i]
                return (
                  <Reveal key={step.title} delay={i}>
                    <div className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="size-5.5" />
                        </span>
                        {i < t.process.steps.length - 1 ? (
                          <span className="mt-2 h-full w-px flex-1 bg-border" />
                        ) : null}
                      </div>
                      <div className="pb-2">
                        <h3 className="font-serif text-lg font-medium text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          <Reveal delay={1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
              <Image
                src="/images/quality-sorting.png"
                alt="Contrôle qualité et tri manuel des gousses de vanille"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
