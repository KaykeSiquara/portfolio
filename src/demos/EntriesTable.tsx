import { useMemo, useState } from 'react'
import { MagnifyingGlassIcon, XIcon } from '../ui/icons'

import { ENTRIES } from '../data/entries'
import type { Entry } from '../data/entries'
import { useI18n } from '../i18n/I18nProvider'
import { DataTable } from '../ui/DataTable'
import type { Column } from '../ui/DataTable'
import { StatusBadge } from '../ui/StatusBadge'
import type { Status } from '../ui/StatusBadge'

const STATUS_ORDER: readonly Status[] = ['paid', 'pending', 'review', 'rejected']

export function EntriesTable({ showFilter = true }: { showFilter?: boolean }) {
  const { t, formatCurrency, formatDate } = useI18n()
  const [text, setText] = useState('')
  const [statuses, setStatuses] = useState<ReadonlySet<Status>>(new Set())

  const goals = t.demos.combobox.options
  const labels = t.demos.table
  const suppliers = labels.suppliers

  const counts = useMemo(() => {
    const map = new Map<Status, number>()
    for (const entry of ENTRIES) map.set(entry.status, (map.get(entry.status) ?? 0) + 1)
    return map
  }, [])

  const rows = useMemo(() => {
    const needle = text.trim().toLowerCase()
    return ENTRIES.filter((entry) => {
      // Nenhuma situação marcada não é "esconder tudo", é "não filtrar".
      if (statuses.size > 0 && !statuses.has(entry.status)) return false
      if (!needle) return true
      const goal = goals[entry.goalKey] ?? ''
      const supplier = suppliers[entry.supplierKey] ?? ''
      return (
        supplier.toLowerCase().includes(needle) ||
        goal.toLowerCase().includes(needle) ||
        entry.id.toLowerCase().includes(needle)
      )
    })
  }, [text, statuses, goals, suppliers])

  function toggleStatus(status: Status) {
    setStatuses((current) => {
      const next = new Set(current)
      if (next.has(status)) next.delete(status)
      else next.add(status)
      return next
    })
  }

  const filtering = text.trim() !== '' || statuses.size > 0

  const columns = useMemo<ReadonlyArray<Column<Entry>>>(
    () => [
      {
        key: 'supplier',
        header: labels.columns.supplier,
        sortable: true,
        sortValue: (row) => suppliers[row.supplierKey] ?? '',
        render: (row) => (
          <span>
            <span className="block font-medium text-[var(--ink)]">{suppliers[row.supplierKey]}</span>
            <span className="font-mono text-2xs text-[var(--ink-3)]">{row.id}</span>
          </span>
        ),
      },
      {
        key: 'goal',
        header: labels.columns.goal,
        sortable: true,
        sortValue: (row) => goals[row.goalKey] ?? '',
        render: (row) => <span className="text-[var(--ink-2)]">{goals[row.goalKey]}</span>,
      },
      {
        key: 'date',
        header: labels.columns.date,
        sortable: true,
        sortValue: (row) => row.date,
        render: (row) => <time dateTime={row.date}>{formatDate(row.date)}</time>,
      },
      {
        key: 'amount',
        header: labels.columns.amount,
        numeric: true,
        sortable: true,
        sortValue: (row) => row.amount,
        render: (row) => <span className="num font-medium">{formatCurrency(row.amount)}</span>,
      },
      {
        key: 'status',
        header: labels.columns.status,
        render: (row) => <StatusBadge status={row.status} label={t.demos.badge[row.status]} />,
      },
    ],
    [labels, goals, suppliers, formatCurrency, formatDate, t.demos.badge],
  )

  return (
    <div className="inatos-palette flex flex-col gap-md py-md">
      {showFilter && (
        <div className="flex flex-col gap-sm px-sm">
          <div className="relative max-w-[20rem]">
            <label htmlFor="entries-filter" className="sr-only">
              {labels.filterLabel}
            </label>
            <MagnifyingGlassIcon
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-3)]"
            />
            <input
              id="entries-filter"
              type="search"
              className="field__control pl-9"
              placeholder={labels.filterPlaceholder}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </div>

          {/* role="group" e não radiogroup: são alternâncias independentes, e
              marcar uma não desmarca a outra. */}
          <div role="group" aria-labelledby="status-filter-label" aria-describedby="status-filter-hint">
            <span id="status-filter-label" className="sr-only">
              {labels.statusFilterLabel}
            </span>
            <div className="flex flex-wrap items-center gap-2xs">
              {STATUS_ORDER.map((status) => {
                const pressed = statuses.has(status)
                return (
                  <button
                    key={status}
                    type="button"
                    className="chip"
                    data-status={status}
                    aria-pressed={pressed}
                    onClick={() => toggleStatus(status)}
                  >
                    <span className="chip__dot" aria-hidden="true" />
                    {t.demos.badge[status]}
                    <span className="chip__count">{counts.get(status) ?? 0}</span>
                  </button>
                )
              })}

              {filtering && (
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => {
                    setText('')
                    setStatuses(new Set())
                  }}
                >
                  <XIcon size={12} aria-hidden="true" />
                  {labels.clearFilters}
                </button>
              )}
            </div>
          </div>

          <p className="flex flex-wrap gap-x-sm text-xs text-[var(--ink-3)]">
            <span id="status-filter-hint">{labels.statusFilterHint}</span>
            {/* Visível e anunciado: quem não vê a tabela encolher precisa
                ouvir quantas linhas sobraram. */}
            <span role="status" className="text-[var(--ink-2)]">
              {labels.showing(rows.length, ENTRIES.length)}
            </span>
          </p>
        </div>
      )}

      <DataTable
        rows={rows}
        columns={columns}
        caption={labels.caption}
        getRowKey={(row) => row.id}
        announceCount={!showFilter}
        labels={{
          empty: labels.empty,
          sortedAsc: labels.sortedAsc,
          sortedDesc: labels.sortedDesc,
          sortable: labels.sortable,
          resultCount: labels.resultCount,
        }}
      />
    </div>
  )
}
