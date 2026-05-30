import { useState, useMemo } from 'react'
import { Alert } from '@mui/material'
import type { Connection } from '../types'
import type { SortField, SortDirection } from '../components/connections-toolbar'
import { useConnections } from '../hooks/useConnections'
import { ConnectionList } from '../components/connection-list'
import { ConnectionsToolbar } from '../components/connections-toolbar'
import { CreateConnectionModal } from '../components/create-connection-modal'
import { EditConnectionModal } from '../components/edit-connection-modal'
import { DeleteConnectionDialog } from '../components/delete-connection-dialog'
import { PageHeader } from '@/components/page-header'

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
  const [search, setSearch] = useState('')

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredConnections = useMemo(() => {
    const term = search.toLowerCase()
    const filtered = connections.filter((c) => c.name.toLowerCase().includes(term))
    return sortConnections(filtered, sortField, sortDirection)
  }, [connections, search, sortField, sortDirection])

  return (
    <div>
      <PageHeader title="Conexões" subtitle="Gerencie suas conexões de envio" />

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}

      <ConnectionsToolbar
        search={search}
        onSearchChange={setSearch}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onCreateClick={() => setCreateOpen(true)}
      />

      <ConnectionList
        connections={filteredConnections}
        loading={loading}
        onEdit={(connection) => setEditingConnection(connection)}
        onDelete={(connection) => setDeletingConnection(connection)}
        onCreateClick={() => setCreateOpen(true)}
      />

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
