import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Alert, IconButton, Divider,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { MessageForm } from '../../forms/message-form'
import { addMessage } from '../../services/messageService'
import { useAuthStore } from '@/store/authStore'
import type { MessageFormData } from '../../forms/message-form/types'

interface CreateMessageModalProps {
  open: boolean
  connectionId: string
  onClose: () => void
}

const FORM_ID = 'create-message-form'

export function CreateMessageModal({ open, connectionId, onClose }: CreateMessageModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((s) => s.user)

  const handleClose = () => {
    if (loading) return
    setError(null)
    onClose()
  }

  const handleSubmit = async (data: MessageFormData) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const scheduledDate = data.scheduled && data.scheduledAt
        ? new Date(data.scheduledAt)
        : null
      await addMessage({
        text: data.text,
        contactIds: data.contactIds,
        userId: user.uid,
        connectionId,
        scheduledAt: scheduledDate,
      })
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar mensagem.')
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ backdrop: { sx: { backdropFilter: 'blur(2px)' } } }}
      sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
    >
      <DialogTitle className="flex items-center justify-between pr-2 font-bold">
        Nova mensagem
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-4">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <MessageForm
          id={FORM_ID}
          connectionId={connectionId}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </DialogContent>
      <Divider />
      <DialogActions className="px-6 py-3">
        <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
