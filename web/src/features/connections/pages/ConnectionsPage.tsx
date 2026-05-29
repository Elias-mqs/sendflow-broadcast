import { useState } from 'react'
import { Button, Divider, Typography, Alert } from '@mui/material'
import { AddRounded } from '@mui/icons-material'
import type { Connection } from '../types'
import { useConnections } from '../hooks/useConnections'
import { ConnectionList } from '../components/connection-list'
import { CreateConnectionModal } from '../components/create-connection-modal'
import { EditConnectionModal } from '../components/edit-connection-modal'
import { DeleteConnectionDialog } from '../components/delete-connection-dialog'

export function ConnectionsPage() {
  const { connections, loading, error } = useConnections()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [deletingConnection, setDeletingConnection] = useState<Connection | null>(null)

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

      <div className="flex-1 overflow-auto p-6">
        <ConnectionList
          connections={connections}
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
