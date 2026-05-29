import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Alert, IconButton, Divider,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { ContactForm } from '../../forms/contact-form'
import { updateContact } from '../../services/contactService'
import type { Contact } from '@/types'
import type { ContactFormData } from '../../forms/contact-form/types'

interface EditContactModalProps {
  contact: Contact | null
  onClose: () => void
}

const FORM_ID = 'edit-contact-form'

export function EditContactModal({ contact, onClose }: EditContactModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    if (loading) return
    setError(null)
    onClose()
  }

  const handleSubmit = async (data: ContactFormData) => {
    if (!contact) return
    setLoading(true)
    setError(null)
    try {
      await updateContact(contact.id, data)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao editar contato.')
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={!!contact}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ backdrop: { sx: { backdropFilter: 'blur(2px)' } } }}
      sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
    >
      <DialogTitle className="flex items-center justify-between pr-2 font-bold">
        Editar contato
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-4">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <ContactForm
          key={contact?.id}
          id={FORM_ID}
          onSubmit={handleSubmit}
          loading={loading}
          defaultValues={contact ? { name: contact.name, phone: contact.phone } : undefined}
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
