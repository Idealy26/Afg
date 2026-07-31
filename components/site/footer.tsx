'use client'

import { Logo } from '@/components/site/logo'
import { useI18n } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { Mail, MapPin, Phone, FileDown } from 'lucide-react'

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
    </svg>
  )
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.5-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.7v8z" />
    </svg>
  )
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#products', label: t.nav.products },
    { href: '#madagascar', label: t.nav.madagascar },
    { href: '#process', label: t.nav.process },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <footer className="bg-primary text-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="text-cream" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">{t.footer.tagline}</p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              <IconLinkedin className="size-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              <IconFacebook className="size-4" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              <IconInstagram className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)]">
            {t.footer.navTitle}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-cream/75 transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)]">
            {t.footer.productsTitle}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {t.products.list.slice(0, 6).map((product) => (
              <li key={product.id}>
                <a href="#products" className="text-cream/75 transition-colors hover:text-cream">
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)]">
            {t.footer.contactTitle}
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-cream/60" />
              <span className="text-cream/75">{siteConfig.addressLine}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-cream/60" />
              <a href={`tel:${siteConfig.phoneHref}`} className="text-cream/75 transition-colors hover:text-cream">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-cream/60" />
              <a href={`mailto:${siteConfig.email}`} className="text-cream/75 transition-colors hover:text-cream">
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <a
            href="/catalogue"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
          >
            <FileDown className="size-4" />
            {t.footer.catalogue}
          </a>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/60 sm:flex-row sm:px-8">
          <p>
            &copy; {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <p>{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  )
}
