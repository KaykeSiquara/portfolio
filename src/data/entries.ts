import type { Status } from '../ui/StatusBadge'

// Lançamentos fictícios. Fornecedor e meta são índices para o dicionário
// porque aparecem na tela e precisam trocar de língua.
export type Entry = {
  id: string
  supplierKey: number
  goalKey: number
  date: string
  amount: number
  status: Status
}

export const ENTRIES: readonly Entry[] = [
  { id: 'NF-4471', supplierKey: 0, goalKey: 0, date: '2026-07-14', amount: 1284.9, status: 'paid' },
  { id: 'NF-4478', supplierKey: 1, goalKey: 2, date: '2026-07-16', amount: 7412.35, status: 'paid' },
  { id: 'NF-4482', supplierKey: 2, goalKey: 1, date: '2026-07-19', amount: 2960.0, status: 'pending' },
  { id: 'NF-4490', supplierKey: 3, goalKey: 3, date: '2026-07-22', amount: 438.7, status: 'rejected' },
  { id: 'NF-4503', supplierKey: 4, goalKey: 2, date: '2026-07-28', amount: 5187.44, status: 'paid' },
  { id: 'NF-4511', supplierKey: 5, goalKey: 5, date: '2026-08-03', amount: 12750.0, status: 'review' },
  { id: 'NF-4519', supplierKey: 0, goalKey: 3, date: '2026-08-07', amount: 906.15, status: 'pending' },
  { id: 'NF-4526', supplierKey: 6, goalKey: 6, date: '2026-08-11', amount: 3320.8, status: 'paid' },
  { id: 'NF-4534', supplierKey: 1, goalKey: 7, date: '2026-08-18', amount: 1899.99, status: 'review' },
]
