import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { CaretUpDownIcon } from './icons'

export function Combobox({
  label,
  options,
  placeholder,
  emptyText,
  hint,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  placeholder?: string
  emptyText: string
  hint?: string
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  const listId = `${id}-list`
  const hintId = `${id}-hint`

  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => setQuery(value), [value])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle || needle === value.toLowerCase()) return options
    return options.filter((option) => option.toLowerCase().includes(needle))
  }, [options, query, value])

  // Mantém o item corrente visível quando a navegação passa do fim da lista.
  useEffect(() => {
    if (!open) return
    const active = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  // Clique fora fecha. Um combobox aberto sobre a página inteira é uma armadilha.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setQuery(value)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, value])

  function commit(index: number) {
    const picked = filtered[index]
    if (picked === undefined) return
    onChange(picked)
    setQuery(picked)
    setOpen(false)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) {
          setOpen(true)
          setActiveIndex(0)
        } else {
          setActiveIndex((current) => (current + 1) % Math.max(filtered.length, 1))
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!open) {
          setOpen(true)
          setActiveIndex(filtered.length - 1)
        } else {
          setActiveIndex((current) => (current - 1 + filtered.length) % Math.max(filtered.length, 1))
        }
        break
      case 'Home':
        if (open) {
          event.preventDefault()
          setActiveIndex(0)
        }
        break
      case 'End':
        if (open) {
          event.preventDefault()
          setActiveIndex(filtered.length - 1)
        }
        break
      case 'Enter':
        if (open && filtered.length > 0) {
          event.preventDefault()
          commit(activeIndex)
        }
        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          setOpen(false)
          setQuery(value)
        }
        break
      case 'Tab':
        setOpen(false)
        break
      default:
        break
    }
  }

  const activeId = open && filtered[activeIndex] ? `${id}-option-${activeIndex}` : undefined

  return (
    <div className="field" ref={rootRef}>
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {hint && (
        <span id={hintId} className="field__help">
          {hint}
        </span>
      )}

      <div className="combobox">
        <input
          id={id}
          role="combobox"
          type="text"
          className="field__control pr-9"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-describedby={hint ? hintId : undefined}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActiveIndex(0)
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
        />
        <CaretUpDownIcon
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-3)]"
        />

        {open && (
          <ul id={listId} role="listbox" aria-label={label} className="combobox__list" ref={listRef}>
            {filtered.length === 0 && <li className="combobox__empty">{emptyText}</li>}
            {filtered.map((option, index) => (
              <li
                key={option}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={option === value}
                data-active={index === activeIndex}
                className="combobox__option"
                onPointerDown={(event) => {
                  event.preventDefault()
                  commit(index)
                }}
                onPointerEnter={() => setActiveIndex(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
