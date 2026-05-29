import { Chip, IconButton, Paper, Typography } from '@mui/material'
import { EditRounded, DeleteRounded } from '@mui/icons-material'
import type { Timestamp } from 'firebase/firestore'
import type { Connection } from '../../types'
import { useConnectionStore } from '@/store/connectionStore'

interface ConnectionCardProps {
  connection: Connection
  onEdit: (connection: Connection) => void
  onDelete: (connection: Connection) => void
}

function formatDate(timestamp: Timestamp): string {
  return timestamp.toDate().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function ConnectionCard({ connection, onEdit, onDelete }: ConnectionCardProps) {
  const { activeConnectionId, setActiveConnection } = useConnectionStore()
  const isActive = activeConnectionId === connection.id

  return (
    <Paper
      onClick={() => setActiveConnection(connection.id)}
      className={`relative p-5 cursor-pointer select-none border transition-all duration-200 hover:shadow-md group ${
        isActive
          ? 'border-blue-500 shadow-sm'
          : 'border-slate-200 shadow-sm hover:border-slate-300'
      }`}
      sx={{ borderRadius: '12px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
    >
      <div className="flex items-start justify-between mb-3">
        {isActive ? (
          <Chip
            label="Ativa"
            size="small"
            sx={{
              bgcolor: '#EFF6FF',
              color: '#2563EB',
              fontWeight: 600,
              height: 22,
              fontSize: '0.7rem',
              border: '1px solid #BFDBFE',
            }}
          />
        ) : (
          <div />
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onEdit(connection) }}
            className="text-slate-400 hover:text-slate-700"
            sx={{ padding: '4px' }}
          >
            <EditRounded sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onDelete(connection) }}
            className="text-slate-400"
            sx={{ padding: '4px', '&:hover': { color: '#EF4444' } }}
          >
            <DeleteRounded sx={{ fontSize: 16 }} />
          </IconButton>
        </div>
      </div>

      <Typography
        variant="body1"
        className="text-slate-800 mb-1"
        sx={{ fontWeight: 600, lineHeight: 1.3 }}
      >
        {connection.name}
      </Typography>
      <Typography variant="caption" className="text-slate-400">
        Criado em {formatDate(connection.createdAt)}
      </Typography>
    </Paper>
  )
}
