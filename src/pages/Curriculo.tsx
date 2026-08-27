import { useEffect, useRef, useState } from 'react'

import { PROFILE } from '../data/profile'
import { useI18n } from '../i18n/I18nProvider'
import { LOCALES } from '../i18n/types'
import type { Locale } from '../i18n/types'
import { cn } from '../lib/cn'
import { SectionHeading } from '../ui/SectionHeading'
import { DownloadSimpleIcon } from '../ui/icons'

const LANGUAGES: Record<Locale, { label: string; lang: string }> = {
  pt: { label: 'Português', lang: 'pt-BR' },
  en: { label: 'English', lang: 'en' },
}

export function Curriculo() {
  const { t, locale } = useI18n()
  const copy = t.resume

  // Independente do idioma do site: dá para ler em português e baixar em inglês.
  const [chosen, setEscolhido] = useState<Locale>(locale)
  const [height, setHeight] = useState(640)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    document.title = `${copy.heading} · ${t.meta.title}`
    return () => {
      document.title = t.meta.title
    }
  }, [copy.heading, t.meta.title])

  function fitHeight() {
    const doc = frameRef.current?.contentDocument
    const view = frameRef.current?.contentWindow
    if (!doc?.body || !view) return

    const style = view.getComputedStyle(doc.body)
    const measured = Math.ceil(
      doc.body.getBoundingClientRect().height +
        parseFloat(style.marginTop || '0') +
        parseFloat(style.marginBottom || '0'),
    )
    if (measured > 0) setHeight(measured)
  }

  // Estreitar a coluna reflui o documento e muda a altura.
  useEffect(() => {
    const doc = frameRef.current?.contentDocument
    if (!doc?.body) return
    const observer = new ResizeObserver(() => fitHeight())
    observer.observe(doc.body)
    return () => observer.disconnect()
  }, [chosen])

  const file = PROFILE.resume[chosen]

  return (
    <section className="section">
      <SectionHeading as="h1" title={copy.heading} lede={copy.lede} />

      <div className="mb-lg flex flex-wrap items-center justify-between gap-md">
        <div
          role="group"
          aria-label={copy.langGroup}
          className="inline-flex items-center gap-[2px] rounded-[var(--radius-md)] border border-[var(--field-line)] bg-[var(--surface-2)] p-[2px]"
        >
          {LOCALES.map((code) => {
            const active = code === chosen
            return (
              <button
                key={code}
                type="button"
                lang={LANGUAGES[code].lang}
                aria-current={active ? 'true' : undefined}
                onClick={() => setEscolhido(code)}
                className={cn(
                  'inline-flex h-9 items-center rounded-[var(--radius-sm)] px-sm text-sm font-medium transition-colors',
                  active
                    ? 'bg-[var(--ink)] text-[var(--bg)]'
                    : 'text-[var(--ink-3)] hover:text-[var(--ink)]',
                )}
              >
                {LANGUAGES[code].label}
              </button>
            )
          })}
        </div>

        <a
          href={`${import.meta.env.BASE_URL}${file.pdf}`}
          download
          className="btn btn--secondary btn--sm"
        >
          <DownloadSimpleIcon size={14} aria-hidden="true" />
          {copy.download}
        </a>
      </div>

      {/* Branco fixo nos dois temas: é papel, não interface. */}
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-white">
        <iframe
          ref={frameRef}
          key={chosen}
          src={`${import.meta.env.BASE_URL}${file.html}`}
          title={`${copy.frameTitle}, ${LANGUAGES[chosen].label}`}
          onLoad={fitHeight}
          loading="lazy"
          className="block w-full"
          style={{ height: `${height}px` }}
        />
      </div>
    </section>
  )
}
