'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/site/logo'
import { LanguageToggle } from '@/components/site/language-toggle'

export function Header() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#products', label: t.nav.products },
    { href: '#madagascar', label: t.nav.madagascar },
    { href: '#process', label: t.nav.process },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" aria-label="Agrofrancegasy" className="shrink-0">
          <Logo className={scrolled ? 'text-foreground' : 'text-cream'} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors',
                scrolled
                  ? 'text-muted-foreground hover:text-primary'
                  : 'text-cream/80 hover:text-cream',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle dark={!scrolled} />
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:inline-block"
          >
            {t.nav.quote}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden',
              scrolled ? 'text-foreground hover:bg-muted' : 'text-cream hover:bg-cream/10',
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 bg-background transition-[max-height] duration-500 ease-in-out lg:hidden',
          open ? 'max-h-[70vh]' : 'max-h-0 border-t-transparent',
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 sm:px-8" aria-label="Navigation mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-medium text-primary-foreground"
          >
            {t.nav.quote}
          </a>
        </nav>
      </div>
    </header>
  )
}
