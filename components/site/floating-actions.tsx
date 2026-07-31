'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

export function FloatingActions() {
  const { t } = useI18n()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Retour en haut"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg shadow-foreground/10 transition-colors hover:bg-secondary"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label={t.floating.whatsapp}
        className="group flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-lg shadow-[#25D366]/30 transition-all hover:pr-5"
      >
        <MessageCircle className="size-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[160px] group-hover:opacity-100">
          {t.floating.whatsapp}
        </span>
      </a>
    </div>
  )
}
