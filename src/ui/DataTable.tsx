import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowDownIcon, ArrowUpIcon, ArrowsDownUpIcon } from './icons'
import { cn } from '../lib/cn'

export type Column<T> = {
  key: string
  header: string
  numeric?: boolean
  sortable?: boolean
  render: (row: T) => ReactNode
  sortValue?: (row: T) => string | number
}

type SortState = { key: string; direction: 'asc' | 'desc' } | null

export function DataTable<T>({
  rows,
  columns,
  caption,
  getRowKey,
  labels,
  announceCount = true,
}: {
  rows: readonly T[]
  columns: ReadonlyArray<Column<T>>
  caption: string
  getRowKey: (row: T) => string
  announceCount?: boolean
  labels: {
    empty: string
    sortedAsc: string
    sortedDesc: string
    sortable: string
    resultCount: (n: number) => string
  }
}) {
  const [sort, setSort] = useState<SortState>(null)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const column = columns.find((c) => c.key === sort.key)
    if (!column?.sortValue) return rows

    const factor = sort.direction === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => {
      const left = column.sortValue!(a)
      const right = column.sortValue!(b)
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * factor
      return String(left).localeCompare(String(right), 'pt-BR') * factor
    })
  }, [rows, columns, sort])

  function toggleSort(key: string) {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: 'asc' }
      if (current.direction === 'asc') return { key, direction: 'desc' }
      return null
    })
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted = sort?.key === column.key
              const ariaSort = !column.sortable
                ? undefined
                : isSorted
                  ? sort.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'

              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={cn(column.numeric && 'num')}
                >
                  {column.sortable ? (
                    <button type="button" className="table__sort" onClick={() => toggleSort(column.key)}>
                      {column.header}
                      <SortMark direction={isSorted ? sort.direction : null} />
                      <span className="sr-only">
                        {isSorted
                          ? sort.direction === 'asc'
                            ? labels.sortedAsc
                            : labels.sortedDesc
                          : labels.sortable}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key} data-label={column.header} className={cn(column.numeric && 'num')}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <p className="py-lg text-center text-sm text-[var(--ink-3)]">{labels.empty}</p>
      )}

      {announceCount && (
        <p className="sr-only" role="status">
          {labels.resultCount(sorted.length)}
        </p>
      )}
    </div>
  )
}

function SortMark({ direction }: { direction: 'asc' | 'desc' | null }) {
  if (direction === 'asc') return <ArrowUpIcon size={12} aria-hidden="true" className="table__sort-mark" />
  if (direction === 'desc')
    return <ArrowDownIcon size={12} aria-hidden="true" className="table__sort-mark" />
  return <ArrowsDownUpIcon size={12} aria-hidden="true" className="opacity-40" />
}
