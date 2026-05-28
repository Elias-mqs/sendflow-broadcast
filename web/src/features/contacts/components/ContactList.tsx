import {
  List, ListItem, ListItemText, IconButton,
  Box, Typography, CircularProgress,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { Contact } from '../../../types'
import { deleteContact } from '../services/contactService'

interface Props {
  contacts: Contact[]
  loading: boolean
  onEdit: (contact: Contact) => void
}

export const ContactList = ({ contacts, loading, onEdit }: Props) => {
  if (loading) {
    return (
      <Box className="flex justify-center py-8">
        <CircularProgress />
      </Box>
    )
  }

  if (contacts.length === 0) {
    return (
      <Typography className="text-gray-400 py-8 text-center">
        Nenhum contato cadastrado
      </Typography>
    )
  }

  return (
    <List>
      {contacts.map((c) => (
        <ListItem
          key={c.id}
          className="rounded-lg mb-1 border border-transparent hover:bg-gray-50"
          secondaryAction={
            <Box>
              <IconButton onClick={() => onEdit(c)} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => deleteContact(c.id)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        >
          <ListItemText primary={c.name} secondary={c.phone} />
        </ListItem>
      ))}
    </List>
  )
}
