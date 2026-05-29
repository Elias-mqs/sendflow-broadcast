import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Paper,
} from '@mui/material'
import { EditRounded, DeleteRounded } from '@mui/icons-material'
import type { Timestamp } from 'firebase/firestore'
import type { Contact } from '@/types'

interface ContactTableProps {
  contacts: Contact[]
  onEdit: (contact: Contact) => void
  onDelete: (contact: Contact) => void
}

function formatDate(timestamp: Timestamp | null): string {
  if (!timestamp) return '—'
  return timestamp.toDate().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const TABLE_HEADERS = ['Nome', 'Telefone', 'Criado em', 'Ações']

export function ContactTable({ contacts, onEdit, onDelete }: ContactTableProps) {
  return (
    <Paper
      className="border border-slate-200 shadow-none overflow-hidden"
      style={{ borderRadius: '12px' }}
    >
      <Table>
        <TableHead className="bg-slate-50">
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableCell
                key={header}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400 py-3 border-b border-slate-200"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <TableCell className="font-medium text-slate-900 text-sm py-3">
                {contact.name}
              </TableCell>
              <TableCell className="text-slate-500 text-sm py-3">
                {contact.phone}
              </TableCell>
              <TableCell className="text-slate-400 text-sm py-3">
                {formatDate(contact.createdAt)}
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-1">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(contact)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <EditRounded style={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(contact)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <DeleteRounded style={{ fontSize: 16 }} />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
