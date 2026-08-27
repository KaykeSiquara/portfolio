import { Outlet } from 'react-router-dom'

import { useI18n } from '../i18n/I18nProvider'
import { Colophon } from './Colophon'
import { TopNav } from './TopNav'

export function Shell() {
  const { t } = useI18n()

  const items = [
    { to: '/', label: t.nav.home },
    { to: '/perfil', label: t.nav.profile },
    { to: '/design-system', label: t.nav.designSystem },
    { to: '/inatos', label: t.nav.case },
  ]

  return (
    <div className="shell">
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>

      <TopNav items={items} contact={{ to: '/contato', label: t.nav.contact }} />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Colophon />
    </div>
  )
}
