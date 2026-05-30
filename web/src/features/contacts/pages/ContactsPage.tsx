import { useState, useMemo } from 'react'
import { Alert } from '@mui/material'
import type { Contact } from '@/types'
import { useConnectionStore } from '@/store/connectionStore'
import { useContacts } from '../hooks/useContacts'
import { ContactsToolbar } from '../components/contacts-toolbar'
import type { SortField, SortDirection } from '../components/contacts-toolbar'
import { ContactTable } from '../components/contact-table'
import { ContactTableSkeleton } from '../components/contact-table/ContactTableSkeleton'
import { ContactEmptyState } from '../components/contact-empty-state'
import { CreateContactModal } from '../components/create-contact-modal'
import { EditContactModal } from '../components/edit-contact-modal'
import { DeleteContactDialog } from '../components/delete-contact-dialog'
import { PageHeader } from '@/components/page-header'

export const ContactsPage = () => {
  const { activeConnectionId } = useConnectionStore()
  const { contacts, loading, error } = useContacts(activeConnectionId)

  const [createOpen, setCreateOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredContacts = useMemo(() => {
    const term = search.toLowerCase()
    return contacts
      .filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.phone.toLowerCase().includes(term)
      )
      .sort((a, b) => {
        const comparison =
          sortField === 'name'
            ? a.name.localeCompare(b.name, 'pt-BR')
            : (a.createdAt?.toMillis() ?? 0) - (b.createdAt?.toMillis() ?? 0)
        return sortDirection === 'asc' ? comparison : -comparison
      })
  }, [contacts, search, sortField, sortDirection])

  if (!activeConnectionId) {
    return (
      <Alert severity="info">
        Selecione uma conexão na sidebar para ver os contatos.
      </Alert>
    )
  }

  return (
    <div>
      <PageHeader title="Contatos" subtitle="Gerencie seus contatos de envio" />

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}

      <ContactsToolbar
        search={search}
        onSearchChange={setSearch}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onCreateClick={() => setCreateOpen(true)}
      />

      {loading ? (
        <ContactTableSkeleton />
      ) : filteredContacts.length === 0 && !search ? (
        <ContactEmptyState onCreateClick={() => setCreateOpen(true)} />
      ) : (
        <ContactTable
          contacts={filteredContacts}
          onEdit={setEditingContact}
          onDelete={setDeletingContact}
        />
      )}

      <CreateContactModal
        open={createOpen}
        connectionId={activeConnectionId}
        onClose={() => setCreateOpen(false)}
      />
      <EditContactModal
        contact={editingContact}
        onClose={() => setEditingContact(null)}
      />
      <DeleteContactDialog
        contact={deletingContact}
        onClose={() => setDeletingContact(null)}
      />
    </div>
  )
}
