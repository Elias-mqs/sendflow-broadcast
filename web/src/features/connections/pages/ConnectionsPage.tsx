import { useState } from 'react'
import { Box, Typography, Button, Alert } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { Connection } from '@/types'
import { useConnections } from '../hooks/useConnections'
import { ConnectionList } from '../components/ConnectionList'
import { ConnectionForm } from '../components/ConnectionForm'

export const ConnectionsPage = () => {
  const { connections, loading, error } = useConnections()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Connection | undefined>()

  const handleEdit = (connection: Connection) => {
    setEditing(connection)
    setFormOpen(true)
  }

  const handleClose = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  return (
    <Box>
      <Box className="flex items-center justify-between mb-6">
        <Typography variant="h5" className="font-bold">
          Conexões
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Nova conexão
        </Button>
      </Box>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <ConnectionList connections={connections} loading={loading} onEdit={handleEdit} />

      <ConnectionForm open={formOpen} onClose={handleClose} connection={editing} />
    </Box>
  )
}
