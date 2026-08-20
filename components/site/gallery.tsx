'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const images = [
  { src: '/images/gallery-1.png', alt: 'Récolte de vanille verte dans une plantation', className: 'sm:col-span-2 sm:row-span-2' },
  { src: '/images/gallery-2.png', alt: 'Gousses de vanille séchant au soleil' },
  { src: '/images/export-crates.png', alt: 'Caisses de produits prêts à l’export' },
  { src: '/images/quality-sorting.png', alt: 'Tri manuel des gousses de vanille' },
  { src: '/images/gallery-3.png', alt: 'Paysage des hautes terres de Madagascar' },
]

export function Gallery() {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isOpen = activeIndex !== null

  const close = useCallback(() => setActiveIndex(null), [])

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    document.addEventListener('keydown', onKeyDown)

    // Bloque le scroll du body, y compris le "bounce" iOS
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = ''
    }
  }, [isOpen, close, showPrev, showNext])

  // Swipe tactile — on suit le mouvement en direct pour un léger feedback
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    setDragOffset(e.touches[0].clientX - touchStartX)
  }

  const onTouchEnd = () => {
    if (touchStartX === null) return
    if (dragOffset > 60) showPrev()
    else if (dragOffset < -60) showNext()
    setTouchStartX(null)
    setDragOffset(0)
  }

  return (
    <section id="gallery" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={i % 4} className={img.className ?? ''}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Agrandir : ${img.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src || '/placeholder.svg'}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex touch-none flex-col items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Barre haute : fermer + compteur, avec padding pour l'encoche */}
          <div
            className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3"
            style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
          >
            <span className="text-sm text-white/70">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                close()
              }}
              aria-label="Fermer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Image active */}
          <div
            className="relative h-[60vh] w-full max-w-4xl px-2 transition-transform sm:h-[70vh] sm:px-4"
            style={{ transform: `translateX(${dragOffset * 0.4}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src || '/placeholder.svg'}
              alt={images[activeIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Flèches : cachées sur mobile (le swipe suffit), visibles à partir de sm */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            aria-label="Image précédente"
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            aria-label="Image suivante"
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicateur de points, utile surtout sur mobile */}
          <div
            className="absolute inset-x-0 flex items-center justify-center gap-2"
            style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            {images.map((img, i) => (
              <span
                key={img.src}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}