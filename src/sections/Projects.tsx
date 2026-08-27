import { Link } from 'react-router-dom'
import { ArrowRightIcon, CircleIcon } from '../ui/icons'

import { PROJECTS } from '../data/projects'
import { useI18n } from '../i18n/I18nProvider'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="section">
      <SectionHeading title={t.projects.heading} lede={t.projects.lede} />

      <ul className="grid gap-lg @3xl:grid-cols-2">
        {PROJECTS.map((project) => {
          const copy = t.projects.items[project.id]

          return (
            <li key={project.id}>
              <article className="flex h-full flex-col gap-md rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-lg">
                <div className="flex items-start justify-between gap-md">
                  <div>
                    <h3 className="text-lg font-semibold">{copy.title}</h3>
                    <p className="mt-2xs font-mono text-xs text-[var(--ink-3)]">{project.year}</p>
                  </div>
                  {project.inProduction && (
                    <span className="inline-flex shrink-0 items-center gap-2xs rounded-[var(--radius-sm)] border border-[var(--brand-line)] bg-[var(--brand-subtle)] px-xs py-[2px] text-2xs font-medium text-[var(--brand-text)]">
                      <CircleIcon size={7} weight="fill" aria-hidden="true" />
                      {t.projects.inProduction}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-[var(--ink-2)]">{copy.summary}</p>

                <ul className="flex flex-wrap gap-2xs">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-[var(--radius-sm)] bg-[var(--surface-2)] px-xs py-[2px] font-mono text-2xs text-[var(--ink-2)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-sm pt-xs">
                  {project.caseHref && (
                    <Link to={project.caseHref} className="btn btn--secondary btn--sm">
                      {t.projects.viewCase}
                      <ArrowRightIcon size={13} aria-hidden="true" />
                    </Link>
                  )}
                  {project.liveHref && (
                    <Link to={project.liveHref} className="btn btn--secondary btn--sm">
                      {t.projects.viewLive}
                      <ArrowRightIcon size={13} aria-hidden="true" />
                    </Link>
                  )}
                  {project.codeHref && (
                    <a
                      href={project.codeHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--ghost btn--sm"
                    >
                      {t.projects.viewCode}
                      <span className="sr-only"> ({t.a11y.externalLink})</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      <p className="mt-lg font-mono text-xs text-[var(--ink-3)]">{t.projects.empty}</p>
    </section>
  )
}
