import { pt } from './pt'

// A forma sai do português. Chave faltando em `en.ts` vira erro de compilação,
// não texto em branco em produção.
export type Dict = typeof pt

export const LOCALES = ['pt', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const HTML_LANG: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
}

export const INTL_LOCALE: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
}
