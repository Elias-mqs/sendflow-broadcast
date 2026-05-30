import { useState, useMemo } from 'react'
import { Alert } from '@mui/material'
import type { Message } from '@/types'
import { useConnectionStore } from '@/store/connectionStore'
import { useMessages } from '../hooks/useMessages'
import { useContacts } from '@/features/contacts/hooks/useContacts'
import { MessagesToolbar } from '../components/messages-toolbar'
import type { StatusFilter } from '../components/messages-toolbar'
import { MessageList } from '../components/message-list'
import { MessageListSkeleton } from '../components/message-list/MessageListSkeleton'
import { MessageEmptyState } from '../components/message-empty-state'
import { CreateMessageModal } from '../components/create-message-modal'
import { EditMessageModal } from '../components/edit-message-modal'
import { DeleteMessageDialog } from '../components/delete-message-dialog'
import { PageHeader } from '@/components/page-header'

export const MessagesPage = () => {
  const { activeConnectionId } = useConnectionStore()
  const { messages, loading, error } = useMessages(activeConnectionId)
  const { contacts } = useContacts(activeConnectionId)

  const [createOpen, setCreateOpen] = useState(false)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [deletingMessage, setDeletingMessage] = useState<Message | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredMessages = useMemo(() => {
    const term = search.toLowerCase()
    return messages
      .filter((m) => m.text.toLowerCase().includes(term))
      .filter((m) => statusFilter === 'all' || m.status === statusFilter)
  }, [messages, search, statusFilter])

  if (!activeConnectionId) {
    return (
      <Alert severity="info">
        Selecione uma conexão na sidebar para ver as mensagens.
      </Alert>
    )
  }

  return (
    <div>
      <PageHeader title="Mensagens" subtitle="Gerencie suas mensagens de broadcast" />

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}

      <MessagesToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateClick={() => setCreateOpen(true)}
      />

      {loading ? (
        <MessageListSkeleton />
      ) : filteredMessages.length === 0 && !search && statusFilter === 'all' ? (
        <MessageEmptyState onCreateClick={() => setCreateOpen(true)} />
      ) : (
        <MessageList
          messages={filteredMessages}
          contacts={contacts}
          onEdit={setEditingMessage}
          onDelete={setDeletingMessage}
        />
      )}

      <CreateMessageModal
        open={createOpen}
        connectionId={activeConnectionId}
        onClose={() => setCreateOpen(false)}
      />
      <EditMessageModal
        message={editingMessage}
        onClose={() => setEditingMessage(null)}
      />
      <DeleteMessageDialog
        message={deletingMessage}
        onClose={() => setDeletingMessage(null)}
      />
    </div>
  )
}
