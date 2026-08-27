import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'kayke_theme'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  const attribute = document.documentElement.getAttribute('data-theme')
  if (attribute === 'dark' || attribute === 'light') return attribute
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-theme', next)
    setThemeState(next)
  }, [])

  // Rede de segurança para a primeira montagem. Não substitui a escrita
  // síncrona acima.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = useCallback(
    (next: Theme) => {
      applyTheme(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Janela privada ou storage bloqueado: o tema vale só nesta sessão.
      }
    },
    [applyTheme],
  )

  // Enquanto ninguém escolheu explicitamente, o site acompanha o sistema.
  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      stored = null
    }
    if (stored === 'light' || stored === 'dark') return

    const list = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => applyTheme(event.matches ? 'dark' : 'light')
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [applyTheme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return context
}
