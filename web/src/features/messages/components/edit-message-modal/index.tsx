import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Alert, IconButton, Divider,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { MessageForm } from '../../forms/message-form'
import { updateMessage } from '../../services/messageService'
import type { Message } from '@/types'
import type { MessageFormData } from '../../forms/message-form/types'

interface EditMessageModalProps {
  message: Message | null
  onClose: () => void
}

const FORM_ID = 'edit-message-form'

export function EditMessageModal({ message, onClose }: EditMessageModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    if (loading) return
    setError(null)
    onClose()
  }

  const handleSubmit = async (data: MessageFormData) => {
    if (!message) return
    setLoading(true)
    setError(null)
    try {
      const scheduledDate = data.scheduled && data.scheduledAt
        ? new Date(data.scheduledAt)
        : null
      await updateMessage(message.id, {
        text: data.text,
        contactIds: data.contactIds,
        scheduledAt: scheduledDate,
      })
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao editar mensagem.')
      setLoading(false)
    }
  }

  const defaultValues: Partial<MessageFormData> | undefined = message
    ? {
        text: message.text,
        contactIds: message.contactIds,
        scheduled: message.status === 'scheduled' && !!message.scheduledAt,
        scheduledAt:
          message.status === 'scheduled' && message.scheduledAt
            ? message.scheduledAt.toDate().toISOString().slice(0, 16)
            : '',
      }
    : undefined

  return (
    <Dialog
      open={!!message}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ backdrop: { sx: { backdropFilter: 'blur(2px)' } } }}
      sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
    >
      <DialogTitle className="flex items-center justify-between pr-2 font-bold">
        Editar mensagem
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-4">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <MessageForm
          key={message?.id}
          id={FORM_ID}
          connectionId={message?.connectionId ?? ''}
          defaultValues={defaultValues}
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
