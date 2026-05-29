import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, CircularProgress, Alert, IconButton, Divider,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import type { Connection } from '../../types'
import { deleteConnection } from '../../services/connectionService'
import { useConnectionStore } from '@/store/connectionStore'

interface DeleteConnectionDialogProps {
  connection: Connection | null
  onClose: () => void
}

export function DeleteConnectionDialog({ connection, onClose }: DeleteConnectionDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { activeConnectionId, clearActiveConnection } = useConnectionStore()

  const handleClose = () => {
    if (loading) return
    setError(null)
    onClose()
  }

  const handleDelete = async () => {
    if (!connection) return
    setLoading(true)
    setError(null)
    try {
      await deleteConnection(connection.id)
      if (activeConnectionId === connection.id) {
        clearActiveConnection()
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir conexão.')
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={!!connection}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: { sx: { backdropFilter: 'blur(2px)' } },
      }}
      sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
    >
      <DialogTitle
        className="flex items-center justify-between pr-2"
        sx={{ fontWeight: 700 }}
      >
        Excluir conexão
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-4">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <Typography variant="body2" sx={{ color: '#475569' }}>
          Tem certeza que deseja excluir{' '}
          <strong>"{connection?.name}"</strong>? Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions className="px-6 py-3">
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
