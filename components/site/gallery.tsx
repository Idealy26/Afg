'use client'

import Image from 'next/image'
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
            <Reveal
              key={img.src}
              delay={i % 4}
              className={img.className ?? ''}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={img.src || '/placeholder.svg'}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
