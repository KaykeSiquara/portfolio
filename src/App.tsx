import { lazy, Suspense, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { useI18n } from './i18n/I18nProvider'

import { LanguageGate } from './components/LanguageGate'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { Perfil } from './pages/Perfil'
import { Contato } from './pages/Contato'
import { Curriculo } from './pages/Curriculo'

/* Duas rotas pesadas em chunk próprio. A vitrine carrega os primitivos, e o
   estudo de caso carrega o relatório de contraste, a paleta é a área
   redimensionavel. Quem só abre a home não paga por nenhum dos dois. */
const DesignSystem = lazy(() =>
  import('./pages/DesignSystem').then((module) => ({ default: module.DesignSystem })),
)
const InatosCase = lazy(() =>
  import('./pages/InatosCase').then((module) => ({ default: module.InatosCase })),
)

export default function App() {
  const { chosen } = useI18n()

  // Enquanto ninguém escolheu o idioma, a única tela é a da escolha.
  if (!chosen) return <LanguageGate />

  return (
    <>
      <RouteEffects />

      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route
            path="/design-system"
            element={
              <Suspense fallback={<RouteFallback />}>
                <DesignSystem />
              </Suspense>
            }
          />
          <Route
            path="/inatos"
            element={
              <Suspense fallback={<RouteFallback />}>
                <InatosCase />
              </Suspense>
            }
          />
          <Route path="/curriculo" element={<Curriculo />} />
          <Route path="/contato" element={<Contato />} />
          {/* Qualquer outro caminho cai na home, não numa tela em branco. */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

function RouteFallback() {
  return <div className="min-h-[60dvh]" />
}

function RouteEffects() {
  const { pathname, hash } = useLocation()
  // Guarda a rota atual, não um booleano de primeira renderização: o
  // StrictMode roda o efeito duas vezes em dev e a flag já viraria false.
  const lastRoute = useRef(`${pathname}${hash}`)

  useEffect(() => {
    const route = `${pathname}${hash}`

    // Na carga inicial o foco não se mexe: quem chega pelo teclado precisa
    // começar antes do conteúdo, no skip link.
    if (lastRoute.current === route) return
    lastRoute.current = route

    const target = hash ? document.getElementById(hash.slice(1)) : null

    if (target) {
      target.scrollIntoView({ block: 'start' })
    } else {
      window.scrollTo(0, 0)
    }

    // Numa troca de rota, sim: sem isso o foco fica no fim da página anterior.
    const landing = target ?? document.getElementById('main')
    if (landing) {
      landing.setAttribute('tabindex', '-1')
      landing.focus({ preventScroll: true })
      landing.removeAttribute('tabindex')
    }
  }, [pathname, hash])

  return null
}
