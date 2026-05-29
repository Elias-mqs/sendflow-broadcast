import { useState } from 'react'
import { Button, Divider, Typography, Alert } from '@mui/material'
import { AddRounded } from '@mui/icons-material'
import type { Connection } from '../types'
import type { SortField, SortDirection } from '../components/connections-toolbar'
import { useConnections } from '../hooks/useConnections'
import { ConnectionList } from '../components/connection-list'
import { ConnectionsToolbar } from '../components/connections-toolbar'
import { CreateConnectionModal } from '../components/create-connection-modal'
import { EditConnectionModal } from '../components/edit-connection-modal'
import { DeleteConnectionDialog } from '../components/delete-connection-dialog'

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
        <ConnectionsToolbar
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
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
