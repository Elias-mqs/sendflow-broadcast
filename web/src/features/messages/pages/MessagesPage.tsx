import { useState } from 'react'
import {
  Box, Typography, Button, Alert, Tabs, Tab,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { Message, MessageStatus } from '@/types'
import { useConnectionStore } from '@/store/connectionStore'
import { useMessages } from '../hooks/useMessages'
import { MessageList } from '../components/MessageList'
import { MessageForm } from '../components/MessageForm'

type FilterTab = 'all' | MessageStatus

export const MessagesPage = () => {
  const { activeConnectionId } = useConnectionStore()
  const [filter, setFilter] = useState<FilterTab>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Message | undefined>()

  const statusFilter = filter === 'all' ? undefined : filter
  const { messages, loading } = useMessages(activeConnectionId, statusFilter)

  const handleEdit = (message: Message) => {
    setEditing(message)
    setFormOpen(true)
  }

  const handleClose = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  if (!activeConnectionId) {
    return (
      <Alert severity="info">
        Selecione uma conexão na sidebar para ver as mensagens.
      </Alert>
    )
  }

  return (
    <Box>
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h5" className="font-bold">
          Mensagens
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Nova mensagem
        </Button>
      </Box>

      <Tabs
        value={filter}
        onChange={(_, v) => setFilter(v)}
        className="mb-4"
      >
        <Tab label="Todas" value="all" />
        <Tab label="Enviadas" value="sent" />
        <Tab label="Agendadas" value="scheduled" />
      </Tabs>

      <MessageList messages={messages} loading={loading} onEdit={handleEdit} />

      {activeConnectionId && (
        <MessageForm
          open={formOpen}
          onClose={handleClose}
          connectionId={activeConnectionId}
          message={editing}
        />
      )}
    </Box>
  )
}
