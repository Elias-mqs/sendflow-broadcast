import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Alert, IconButton, Divider,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { ContactForm } from '../../forms/contact-form'
import { addContact } from '../../services/contactService'
import { useAuthStore } from '@/store/authStore'
import type { ContactFormData } from '../../forms/contact-form/types'

interface CreateContactModalProps {
  open: boolean
  connectionId: string
  onClose: () => void
}

const FORM_ID = 'create-contact-form'

export function CreateContactModal({ open, connectionId, onClose }: CreateContactModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((s) => s.user)

  const handleClose = () => {
    if (loading) return
    setError(null)
    onClose()
  }

  const handleSubmit = async (data: ContactFormData) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      await addContact(data, user.uid, connectionId)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar contato.')
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ backdrop: { sx: { backdropFilter: 'blur(2px)' } } }}
      sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
    >
      <DialogTitle className="flex items-center justify-between pr-2 font-bold">
        Novo contato
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-4">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <ContactForm id={FORM_ID} onSubmit={handleSubmit} loading={loading} />
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
