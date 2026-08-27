import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { pt } from './pt'
import { en } from './en'
import { HTML_LANG, INTL_LOCALE, LOCALES } from './types'
import type { Dict, Locale } from './types'

const STORAGE_KEY = 'kayke_lang'

const DICTS: Record<Locale, Dict> = { pt, en }

type I18nContextValue = {
  locale: Locale
  chosen: boolean
  t: Dict
  setLocale: (locale: Locale) => void
  toggle: () => void
  formatCurrency: (value: number) => string
  formatDate: (iso: string) => string
  formatBytes: (bytes: number) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (LOCALES as readonly string[]).includes(stored)) return stored as Locale
  } catch {
    // Janela privada ou storage bloqueado: trata como quem ainda não escolheu.
  }
  return null
}

function guessLocale(): Locale {
  if (typeof navigator === 'undefined') return 'pt'
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [stored] = useState(readStoredLocale)
  const [locale, setLocaleState] = useState<Locale>(() => stored ?? guessLocale())
  const [chosen, setChosen] = useState(stored !== null)

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale]
    document.title = DICTS[locale].meta.title
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    setChosen(true)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem storage a escolha vale só nesta sessão, e isso basta: `chosen` vive
      // em memória, então a tela não volta a cada navegação.
    }
  }, [])

  const value = useMemo<I18nContextValue>(() => {
    const intl = INTL_LOCALE[locale]
    return {
      locale,
      chosen,
      t: DICTS[locale],
      setLocale,
      toggle: () => setLocale(locale === 'pt' ? 'en' : 'pt'),
      formatCurrency: (amount: number) =>
        new Intl.NumberFormat(intl, { style: 'currency', currency: 'BRL' }).format(amount),
      formatDate: (iso: string) =>
        new Intl.DateTimeFormat(intl, { day: '2-digit', month: 'short', year: 'numeric' }).format(
          new Date(`${iso}T12:00:00`),
        ),
      formatBytes: (bytes: number) => {
        const kilobytes = bytes / 1024
        if (kilobytes < 1024) {
          return new Intl.NumberFormat(intl, {
            style: 'unit',
            unit: 'kilobyte',
            maximumFractionDigits: 0,
          }).format(Math.max(1, Math.round(kilobytes)))
        }
        return new Intl.NumberFormat(intl, {
          style: 'unit',
          unit: 'megabyte',
          maximumFractionDigits: 1,
        }).format(kilobytes / 1024)
      },
    }
  }, [locale, chosen, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n precisa estar dentro de <I18nProvider>')
  return context
}
