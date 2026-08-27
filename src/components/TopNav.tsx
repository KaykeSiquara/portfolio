import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

import { cn } from '../lib/cn'
import { useI18n } from '../i18n/I18nProvider'
import { LangToggle } from '../ui/LangToggle'
import { ThemeToggle } from '../ui/ThemeToggle'
import { ArrowRightIcon, ListIcon, XIcon } from '../ui/icons'

export type NavItem = { to: string; label: string }

export function TopNav({ items, contact }: { items: readonly NavItem[]; contact: NavItem }) {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Trocou de página, fecha o painel. Deixar aberto cobre justamente o que a
  // pessoa acabou de pedir para ver.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const link = (item: NavItem, block = false) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        cn(
          'relative inline-flex items-center rounded-[var(--radius-sm)] text-sm transition-colors',
          block ? 'min-h-11 w-full px-sm' : 'h-11 px-2xs',
          isActive
            ? 'font-medium text-[var(--nav-ink)]'
            : 'text-[var(--nav-ink-2)] hover:text-[var(--nav-ink)]',
        )
      }
    >
      {({ isActive }) => (
        <>
          {item.label}
          {isActive && (
            <>
              <span className="sr-only"> ({t.nav.current})</span>
              {/* O fio embaixo. A cor sozinha não pode dizer onde você está. */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute bg-[var(--nav-active)]',
                  block
                    ? 'inset-y-1 left-0 w-[2px] rounded-full'
                    : 'inset-x-2xs bottom-1 h-[2px] rounded-full',
                )}
              />
            </>
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <header className="sticky top-0 z-[var(--z-nav)] bg-[var(--nav)]">
      <div className="flex items-center gap-sm px-lg py-2xs">
        <Link
          to="/"
          className="mr-auto inline-flex h-11 items-center font-mono text-sm font-semibold tracking-tight text-[var(--nav-ink)]"
        >
          Kayke Siquara
        </Link>

        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-md md:flex">
          {items.map((item) => link(item))}
        </nav>

        <span aria-hidden="true" className="hidden h-4 w-px bg-[var(--nav-ink-2)] opacity-40 md:block" />

        <div className="flex items-center gap-2xs">
          <ThemeToggle onNav />
          <LangToggle onNav />
        </div>

        <NavLink
          to={contact.to}
          className="hidden min-h-9 items-center gap-2xs rounded-[var(--radius-md)] bg-[var(--nav-ink)] px-sm text-sm font-medium text-[var(--nav)] transition-opacity hover:opacity-90 md:inline-flex"
        >
          {contact.label}
          <ArrowRightIcon size={13} aria-hidden="true" />
        </NavLink>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="nav-panel"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] text-[var(--nav-ink)] md:hidden"
        >
          {open ? <XIcon size={18} aria-hidden="true" /> : <ListIcon size={18} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="nav-panel"
          aria-label={t.a11y.mainNav}
          className="flex flex-col gap-2xs border-t border-[color-mix(in_oklab,var(--nav-ink)_16%,transparent)] px-lg py-sm md:hidden"
        >
          {items.map((item) => link(item, true))}
          {link(contact, true)}
        </nav>
      )}
    </header>
  )
}
