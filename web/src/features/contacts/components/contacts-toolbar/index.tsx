import { InputAdornment, TextField, Button } from '@mui/material'
import { SearchRounded, ArrowUpwardRounded, ArrowDownwardRounded, AddRounded } from '@mui/icons-material'

export type SortField = 'name' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

interface ContactsToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  onCreateClick: () => void
}

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Nome' },
  { field: 'createdAt', label: 'Data' },
]

export function ContactsToolbar({
  search,
  onSearchChange,
  sortField,
  sortDirection,
  onSort,
  onCreateClick,
}: ContactsToolbarProps) {
  const ArrowIcon = sortDirection === 'asc' ? ArrowUpwardRounded : ArrowDownwardRounded

  return (
    <div className="flex items-center gap-4 mb-4">
      <TextField
        size="small"
        placeholder="Buscar por nome ou telefone…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-72!"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded className="text-slate-400!" style={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          },
          htmlInput: {
            style: { paddingTop: '8px', paddingBottom: '8px' },
          },
        }}
      />

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
        Novo contato
      </Button>
    </div>
  )
}
