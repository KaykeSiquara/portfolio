import { useState } from 'react'
import { UserIcon } from '../ui/icons'

import { useI18n } from '../i18n/I18nProvider'
import { PROFILE } from '../data/profile'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { t } = useI18n()
  const [failed, setFailed] = useState(false)

  return (
    <section id="about" className="section">
      {/* h1: esta seção abre a página /perfil. */}
      <SectionHeading as="h1" title={t.about.heading} />

      <div className="grid gap-xl @2xl:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] @2xl:gap-2xl">
        <div>
          {/* No celular a foto é um retrato pequeno, não um bloco de meia tela
              antes de qualquer texto. */}
          <div className="aspect-[4/5] w-full max-w-[9rem] overflow-hidden @2xl:max-w-none rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-2)]">
            {failed ? (
              <div className="flex h-full flex-col items-center justify-center gap-xs p-md text-center">
                <UserIcon size={28} aria-hidden="true" className="text-[var(--ink-3)]" />
                <span className="text-xs text-[var(--ink-3)]">{t.about.photoPending}</span>
              </div>
            ) : (
              <img
                src={`${import.meta.env.BASE_URL}${PROFILE.photo}`}
                alt={t.about.photoAlt}
                width={448}
                height={560}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
                className="size-full object-cover"
              />
            )}
          </div>
        </div>

        <div>
          <div className="flex max-w-[64ch] flex-col gap-md leading-relaxed text-[var(--ink-2)]">
            {t.about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
