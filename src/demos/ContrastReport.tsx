import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { CheckIcon, XIcon } from '../ui/icons'

import { contrastRatio, formatRatio, parseCssColor, toHex } from '../lib/color'
import { CONTRAST_PAIRS, MIN_RATIO } from '../lib/contrast-pairs'
import { useI18n } from '../i18n/I18nProvider'
import { useTheme } from '../theme/ThemeProvider'

type Measured = {
  fg: string
  bg: string
  kind: 'text' | 'indicator'
  ratio: number
  min: number
  pass: boolean
  fgHex: string
  bgHex: string
  usedIn: string
}

function tokensByScope() {
  const base = new Set<string>()
  const inatos = new Set<string>()
  for (const pair of CONTRAST_PAIRS) {
    const target = pair.scope === 'inatos' ? inatos : base
    target.add(pair.fg)
    target.add(pair.bg)
  }
  return { base: [...base], inatos: [...inatos] }
}

export function ContrastReport() {
  const { t, locale } = useI18n()
  const { theme } = useTheme()
  const copy = t.contrast

  const scopes = useMemo(tokensByScope, [])
  const baseRef = useRef<HTMLDivElement>(null)
  const inatosRef = useRef<HTMLDivElement>(null)
  const [rows, setRows] = useState<Measured[]>([])

  useLayoutEffect(() => {
    function read(container: HTMLDivElement | null, tokens: string[]) {
      const map = new Map<string, string>()
      if (!container) return map
      for (const token of tokens) {
        const probe = container.querySelector<HTMLElement>(`[data-token="${token}"]`)
        if (probe) map.set(token, getComputedStyle(probe).color)
      }
      return map
    }

    const base = read(baseRef.current, scopes.base)
    const inatos = read(inatosRef.current, scopes.inatos)

    const measured: Measured[] = []
    for (const pair of CONTRAST_PAIRS) {
      const source = pair.scope === 'inatos' ? inatos : base
      const fg = parseCssColor(source.get(pair.fg) ?? '')
      const bg = parseCssColor(source.get(pair.bg) ?? '')
      if (!fg || !bg) continue

      const min = MIN_RATIO[pair.kind]
      const ratio = contrastRatio(fg, bg)
      measured.push({
        fg: pair.fg,
        bg: pair.bg,
        kind: pair.kind,
        ratio,
        min,
        pass: ratio >= min,
        fgHex: toHex(fg),
        bgHex: toHex(bg),
        usedIn: pair.usedIn[locale],
      })
    }

    setRows(measured)
    // O tema entra na dependência de propósito: sem ele a tabela mente sobre
    // a página que está na tela.
  }, [scopes, theme, locale])

  return (
    <div className="flex flex-col gap-md">
      {/* Sondas. Cada uma só existe para o navegador resolver a cadeia de
          var() por nos e nos entregar a cor computada final. */}
      <div aria-hidden="true" className="pointer-events-none absolute size-0 overflow-hidden">
        <div ref={baseRef}>
          {scopes.base.map((token) => (
            <span key={token} data-token={token} style={{ color: `var(--${token})` }} />
          ))}
        </div>
        <div ref={inatosRef} className="inatos-palette">
          {scopes.inatos.map((token) => (
            <span key={token} data-token={token} style={{ color: `var(--${token})` }} />
          ))}
        </div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <caption>{copy.summary(rows.length, copy.themeName[theme])}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.pair}</th>
              <th scope="col" className="num">
                {copy.columns.ratio}
              </th>
              <th scope="col" className="num">
                {copy.columns.min}
              </th>
              <th scope="col">{copy.columns.status}</th>
              <th scope="col">{copy.columns.usedIn}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.fg}-${row.bg}`}>
                <td data-label={copy.columns.pair}>
                  <span className="font-mono text-xs">
                    <Swatch hex={row.fgHex} />
                    {row.fg}
                    <span className="text-[var(--ink-3)]">{' / '}</span>
                    <Swatch hex={row.bgHex} />
                    {row.bg}
                  </span>
                </td>
                <td data-label={copy.columns.ratio} className="num font-mono font-medium">
                  {formatRatio(row.ratio)}:1
                </td>
                <td data-label={copy.columns.min} className="num font-mono text-[var(--ink-3)]">
                  {row.min.toFixed(1)}
                </td>
                <td data-label={copy.columns.status}>
                  <Verdict pass={row.pass} passLabel={copy.pass} failLabel={copy.fail} />
                </td>
                <td data-label={copy.columns.usedIn} className="text-[var(--ink-2)]">
                  {row.usedIn}
                  <span className="ml-xs font-mono text-2xs text-[var(--ink-3)]">
                    {copy.kind[row.kind]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Swatch({ hex }: { hex: string }) {
  return (
    <span
      aria-hidden="true"
      className="mr-1 inline-block size-2 translate-y-[1px] rounded-[2px] ring-1 ring-[var(--line-strong)]"
      style={{ background: hex }}
    />
  )
}

function Verdict({ pass, passLabel, failLabel }: { pass: boolean; passLabel: string; failLabel: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium"
      style={{ color: pass ? 'var(--brand-text)' : 'var(--danger-text)' }}
    >
      {pass ? (
        <CheckIcon size={12} weight="bold" aria-hidden="true" />
      ) : (
        <XIcon size={12} weight="bold" aria-hidden="true" />
      )}
      {pass ? passLabel : failLabel}
    </span>
  )
}
