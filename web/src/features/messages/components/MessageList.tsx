import {
  List, ListItem, ListItemText, IconButton, Box,
  Typography, CircularProgress, Chip,
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import type { Message } from '@/types'
import { deleteMessage } from '../services/messageService'

interface Props {
  messages: Message[]
  loading: boolean
  onEdit: (message: Message) => void
}

const formatDate = (ts: { toDate: () => Date } | null) => {
  if (!ts) return ''
  return ts.toDate().toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export const MessageList = ({ messages, loading, onEdit }: Props) => {
  if (loading) {
    return (
      <Box className="flex justify-center py-8">
        <CircularProgress />
      </Box>
    )
  }

  if (messages.length === 0) {
    return (
      <Typography className="text-gray-400 py-8 text-center">
        Nenhuma mensagem encontrada
      </Typography>
    )
  }

  return (
    <List>
      {messages.map((m) => (
        <ListItem
          key={m.id}
          className="rounded-lg mb-2 border border-gray-200 hover:bg-gray-50"
          alignItems="flex-start"
          secondaryAction={
            <Box className="flex gap-1">
              {m.status === 'scheduled' && (
                <IconButton onClick={() => onEdit(m)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton onClick={() => deleteMessage(m.id)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        >
          <ListItemText
            primary={
              <Box className="flex items-center gap-2 flex-wrap">
                <Typography variant="body1">{m.text}</Typography>
                <Chip
                  label={m.status === 'sent' ? 'Enviada' : 'Agendada'}
                  size="small"
                  color={m.status === 'sent' ? 'success' : 'warning'}
                />
              </Box>
            }
            secondary={
              m.status === 'scheduled'
                ? `Agendada para: ${formatDate(m.scheduledAt)}`
                : `Enviada em: ${formatDate(m.sentAt)}`
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
