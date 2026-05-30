import { InputAdornment, TextField, Button } from '@mui/material'
import { SearchRounded, AddRounded } from '@mui/icons-material'
import type { MessageStatus } from '@/types'

export type StatusFilter = 'all' | MessageStatus

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'scheduled', label: 'Agendadas' },
  { value: 'sent', label: 'Enviadas' },
]

interface MessagesToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (filter: StatusFilter) => void
  onCreateClick: () => void
}

export function MessagesToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onCreateClick,
}: MessagesToolbarProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <TextField
        size="small"
        placeholder="Buscar por texto…"
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
        <span className="text-xs text-slate-400 mr-1">Filtrar:</span>
        {STATUS_OPTIONS.map(({ value, label }) => {
          const isActive = statusFilter === value
          return (
            <button
              key={value}
              onClick={() => onStatusFilterChange(value)}
              className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      <Button variant="contained" startIcon={<AddRounded />} onClick={onCreateClick}>
        Nova mensagem
      </Button>
    </div>
  )
}
