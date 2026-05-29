import { useState } from 'react'
import { Button, Divider, Typography, Alert } from '@mui/material'
import { AddRounded, ArrowUpwardRounded, ArrowDownwardRounded } from '@mui/icons-material'
import type { Connection } from '../types'
import { useConnections } from '../hooks/useConnections'
import { ConnectionList } from '../components/connection-list'
import { CreateConnectionModal } from '../components/create-connection-modal'
import { EditConnectionModal } from '../components/edit-connection-modal'
import { DeleteConnectionDialog } from '../components/delete-connection-dialog'

type SortField = 'name' | 'createdAt'
type SortDirection = 'asc' | 'desc'

const SORT_LABELS: Record<SortField, string> = {
  name: 'Nome',
  createdAt: 'Data',
}

function sortConnections(connections: Connection[], field: SortField, direction: SortDirection): Connection[] {
  return [...connections].sort((a, b) => {
    if (field === 'name') {
      const cmp = a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
      return direction === 'asc' ? cmp : -cmp
    }
    const aTime = a.createdAt?.toMillis() ?? 0
    const bTime = b.createdAt?.toMillis() ?? 0
    return direction === 'asc' ? aTime - bTime : bTime - aTime
  })
}

export function ConnectionsPage() {
  const { connections, loading, error } = useConnections()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [deletingConnection, setDeletingConnection] = useState<Connection | null>(null)
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedConnections = sortConnections(connections, sortField, sortDirection)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-6 py-5">
        <div>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            Conexões
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie suas conexões de envio
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => setCreateOpen(true)}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Nova Conexão
        </Button>
      </div>
      <Divider />

      {error && (
        <Alert severity="error" className="mx-6 mt-4">
          {error}
        </Alert>
      )}

      {!loading && connections.length > 0 && (
        <div className="flex items-center gap-1 px-6 pt-4">
          <span className="text-xs text-slate-400 mr-1">Ordenar por</span>
          {(['name', 'createdAt'] as SortField[]).map((field) => {
            const isActive = sortField === field
            const ArrowIcon = sortDirection === 'asc' ? ArrowUpwardRounded : ArrowDownwardRounded
            return (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {SORT_LABELS[field]}
                {isActive && <ArrowIcon sx={{ fontSize: 12 }} />}
              </button>
            )
          })}
        </div>
      )}

      <div className="flex-1 overflow-auto p-6">
        <ConnectionList
          connections={sortedConnections}
          loading={loading}
          onEdit={(connection) => setEditingConnection(connection)}
          onDelete={(connection) => setDeletingConnection(connection)}
          onCreateClick={() => setCreateOpen(true)}
        />
      </div>

      <CreateConnectionModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <EditConnectionModal
        connection={editingConnection}
        onClose={() => setEditingConnection(null)}
      />
      <DeleteConnectionDialog
        connection={deletingConnection}
        onClose={() => setDeletingConnection(null)}
      />
    </div>
  )
}
