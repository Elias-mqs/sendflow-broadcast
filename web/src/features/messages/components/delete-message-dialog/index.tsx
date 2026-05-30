import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, CircularProgress, Alert, IconButton, Divider,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import type { Message } from '@/types'
import { deleteMessage } from '../../services/messageService'

interface DeleteMessageDialogProps {
  message: Message | null
  onClose: () => void
}

export function DeleteMessageDialog({ message, onClose }: DeleteMessageDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    if (loading) return
    setError(null)
    onClose()
  }

  const handleDelete = async () => {
    if (!message) return
    setLoading(true)
    setError(null)
    try {
      await deleteMessage(message.id)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir mensagem.')
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={!!message}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ backdrop: { sx: { backdropFilter: 'blur(2px)' } } }}
      sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
    >
      <DialogTitle className="flex items-center justify-between pr-2 font-bold">
        Excluir mensagem
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-4">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <Typography variant="body2" className="text-slate-600">
          Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions className="px-6 py-3">
        <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
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
