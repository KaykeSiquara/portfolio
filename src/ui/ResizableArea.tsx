import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { useI18n } from '../i18n/I18nProvider'
import { DotsSixVerticalIcon } from './icons'

// Mesmo piso que o estudo de caso afirma: cinco faixas, de 360 a 1920.
const MIN_WIDTH = 360
const HANDLE_WIDTH = 44

// O primeiro degrau é 675 porque é onde a tabela vira cartão. Se divergissem,
// o rótulo diria "cartões" com a tabela na tela.
const BANDS = [
  { key: 'base', from: 0 },
  { key: 'sm', from: 675 },
  { key: 'md', from: 768 },
  { key: 'lg', from: 1024 },
  { key: 'xl', from: 1280 },
] as const

type BandKey = (typeof BANDS)[number]['key']

function bandFor(width: number): BandKey {
  let current: BandKey = 'base'
  for (const band of BANDS) if (width >= band.from) current = band.key
  return current
}

// O conteúdo responde à largura desta área, não à da janela, então dá para ver
// o layout responsivo mudar sem redimensionar o navegador.
export function ResizableArea({
  children,
  maxHeight = '30rem',
}: {
  children: ReactNode
  maxHeight?: string
}) {
  const { t } = useI18n()
  const copy = t.demos.resize

  const trackRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  // A largura que a container query enxerga. Mostrar a externa fazia o número
  // dizer "786px, faixa tablet" com a tabela já em cartões.
  const [contentWidth, setContentWidth] = useState(0)
  // Bordas mais barra de rolagem, lido do elemento. Deduzir de
  // `width - contentWidth` misturava dois instantes diferentes e o piso
  // oscilava a cada quadro enquanto se arrastava contra o limite.
  const [chrome, setChrome] = useState(0)
  const [maxWidth, setMaxWidth] = useState(1024)
  const [width, setWidth] = useState(1024)
  const [touched, setTouched] = useState(false)

  // A barra de rolagem aparece e some conforme a altura, e o piso muda junto.
  useEffect(() => {
    setWidth((atual) => Math.max(atual, MIN_WIDTH + chrome))
  }, [chrome])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new ResizeObserver((entries) => {
      // Desconta a calha: centrada na borda, a alça cobria a barra de rolagem.
      const available = Math.floor((entries[0]?.contentRect.width ?? 0) - HANDLE_WIDTH)
      if (available <= 0) return
      setMaxWidth(available)
      setWidth((current) => (touched ? Math.min(current, available) : available))
    })

    observer.observe(track)
    return () => observer.disconnect()
  }, [touched])

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    // Os dois na mesma leitura, senão voltam a divergir.
    const measure = () => {
      const el = boxRef.current
      if (!el || el.clientWidth <= 0) return
      setContentWidth(el.clientWidth)
      setChrome(el.offsetWidth - el.clientWidth)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(box)
    measure()
    return () => observer.disconnect()
  }, [])

  const clamp = useCallback(
    (value: number) => Math.max(MIN_WIDTH + chrome, Math.min(Math.round(value), maxWidth)),
    [maxWidth, chrome],
  )

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setTouched(true)
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    const left = trackRef.current?.getBoundingClientRect().left ?? 0
    setWidth(clamp(event.clientX - left))
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 64 : 16
    let next: number | null = null

    if (event.key === 'ArrowLeft') next = width - step
    else if (event.key === 'ArrowRight') next = width + step
    else if (event.key === 'PageDown') next = width - 128
    else if (event.key === 'PageUp') next = width + 128
    else if (event.key === 'Home') next = MIN_WIDTH + chrome
    else if (event.key === 'End') next = maxWidth

    if (next === null) return
    event.preventDefault()
    setTouched(true)
    setWidth(clamp(next))
  }

  // Os três valores de ARIA na mesma unidade do que aparece na tela.
  const effective = contentWidth || width
  const band = bandFor(effective)
  const ariaMin = MIN_WIDTH
  const ariaMax = Math.max(MIN_WIDTH, maxWidth - chrome)

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-2xs">
        <p className="text-sm text-[var(--ink-2)]">{copy.hint}</p>
        <p className="font-mono text-xs text-[var(--ink-3)]">
          <span className="num text-[var(--brand-text)]">{effective}px</span>
          {'  '}
          {copy.band(copy.bands[band])}
        </p>
      </div>

      <div ref={trackRef} className="relative w-full">
        <div
          ref={boxRef}
          // Sem padding: encolheria a caixa que a container query mede.
          className="overflow-y-auto overscroll-contain rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)]"
          style={{ width: `${Math.min(width, maxWidth)}px`, maxHeight }}
        >
          {children}
        </div>

        <div
          role="slider"
          tabIndex={0}
          aria-label={copy.handle}
          aria-orientation="horizontal"
          aria-valuemin={ariaMin}
          aria-valuemax={ariaMax}
          aria-valuenow={effective}
          aria-valuetext={`${copy.current(effective)}, ${copy.band(copy.bands[band])}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onKeyDown={onKeyDown}
          className="group absolute top-0 flex h-full cursor-ew-resize touch-none items-center justify-center rounded-[var(--radius-sm)]"
          style={{ left: `${Math.min(width, maxWidth)}px`, width: `${HANDLE_WIDTH}px` }}
        >
          <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[var(--line-strong)]" />
          <span className="relative flex h-12 w-6 items-center justify-center rounded-[var(--radius-md)] border border-[var(--field-line)] bg-[var(--surface)] text-[var(--ink-2)] transition-colors group-hover:border-[var(--brand)] group-hover:text-[var(--brand-text)] group-focus-visible:border-[var(--brand)]">
            <DotsSixVerticalIcon size={14} weight="bold" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  )
}
