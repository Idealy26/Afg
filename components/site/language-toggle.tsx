'use client'

import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Lang } from '@/lib/site-config'

export function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useI18n()
  const options: Lang[] = ['fr', 'en']

  return (
    <div
      role="group"
      aria-label="Langue / Language"
      className={cn(
        'flex items-center rounded-full border p-0.5 text-xs font-semibold',
        dark ? 'border-cream/25 text-cream' : 'border-border text-muted-foreground',
      )}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setLang(opt)}
          aria-pressed={lang === opt}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors',
            lang === opt
              ? dark
                ? 'bg-cream text-primary'
                : 'bg-primary text-primary-foreground'
              : 'hover:opacity-80',
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
