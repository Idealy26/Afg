'use client'

import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'

export function Madagascar() {
  const { t } = useI18n()

  return (
    <section id="madagascar" className="relative scroll-mt-20 overflow-hidden bg-cocoa py-20 text-cocoa-foreground sm:py-28">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/gallery-3.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cocoa/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">
              <span className="h-px w-6 bg-[color:var(--gold)]" />
              {t.madagascar.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] text-cream text-balance sm:text-4xl lg:text-[2.75rem]">
              {t.madagascar.title}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-base leading-relaxed text-cream/75">
              {t.madagascar.p1}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {t.madagascar.items.map((item, i) => (
            <Reveal key={item.title} delay={i}>
              <div className="border-t border-cream/20 pt-6">
                <span className="font-serif text-4xl font-medium text-[color:var(--gold)]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium text-cream">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cream/70">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
