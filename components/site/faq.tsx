'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

export function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
          align="center"
        />

        <div className="mt-12 divide-y divide-border border-y border-border">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i % 3}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-serif text-lg font-medium text-foreground">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        'inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-300',
                        isOpen && 'rotate-45 bg-primary text-primary-foreground',
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
