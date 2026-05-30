import { Button } from '@mui/material'
import { ArrowUpwardRounded, ArrowDownwardRounded, AddRounded } from '@mui/icons-material'

export type SortField = 'name' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

interface ConnectionsToolbarProps {
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  onCreateClick: () => void
}

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Nome' },
  { field: 'createdAt', label: 'Data' },
]

export function ConnectionsToolbar({ sortField, sortDirection, onSort, onCreateClick }: ConnectionsToolbarProps) {
  const ArrowIcon = sortDirection === 'asc' ? ArrowUpwardRounded : ArrowDownwardRounded

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-1 flex-1">
        <span className="text-xs text-slate-400 mr-1">Ordenar por:</span>
        {SORT_OPTIONS.map(({ field, label }) => {
          const isActive = sortField === field
          return (
            <button
              key={field}
              onClick={() => onSort(field)}
              className={`flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {label}
              {isActive && <ArrowIcon style={{ fontSize: 12 }} />}
            </button>
          )
        })}
      </div>

      <Button variant="contained" startIcon={<AddRounded />} onClick={onCreateClick}>
        Nova Conexão
      </Button>
    </div>
  )
}
