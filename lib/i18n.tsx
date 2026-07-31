'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { dictionaries, type Dictionary } from '@/lib/dictionaries'
import type { Lang } from '@/lib/site-config'

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Dictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? (window.localStorage.getItem('afg-lang') as Lang | null)
        : null
    if (stored === 'fr' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('afg-lang', next)
      document.documentElement.lang = next
    }
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'fr' ? 'en' : 'fr'
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('afg-lang', next)
        document.documentElement.lang = next
      }
      return next
    })
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, toggle, t: dictionaries[lang] }),
    [lang, setLang, toggle],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return ctx
}
