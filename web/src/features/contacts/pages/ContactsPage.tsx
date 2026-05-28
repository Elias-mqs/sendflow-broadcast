import { useState } from 'react'
import { Box, Typography, Button, Alert } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { Contact } from '@/types'
import { useConnectionStore } from '@/store/connectionStore'
import { useContacts } from '../hooks/useContacts'
import { ContactList } from '../components/ContactList'
import { ContactForm } from '../components/ContactForm'

export const ContactsPage = () => {
  const { activeConnectionId } = useConnectionStore()
  const { contacts, loading, error } = useContacts(activeConnectionId)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Contact | undefined>()

  const handleEdit = (contact: Contact) => {
    setEditing(contact)
    setFormOpen(true)
  }

  const handleClose = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  if (!activeConnectionId) {
    return (
      <Alert severity="info">
        Selecione uma conexão na sidebar para ver os contatos.
      </Alert>
    )
  }

  return (
    <Box>
      <Box className="flex items-center justify-between mb-6">
        <Typography variant="h5" className="font-bold">
          Contatos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Novo contato
        </Button>
      </Box>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <ContactList contacts={contacts} loading={loading} onEdit={handleEdit} />

      {activeConnectionId && (
        <ContactForm
          open={formOpen}
          onClose={handleClose}
          connectionId={activeConnectionId}
          contact={editing}
        />
      )}
    </Box>
  )
}
