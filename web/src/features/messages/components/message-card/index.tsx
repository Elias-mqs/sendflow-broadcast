import { Chip, Tooltip, IconButton } from '@mui/material'
import { EditRounded, DeleteRounded, PeopleRounded } from '@mui/icons-material'
import type { Message, Contact } from '@/types'

interface MessageCardProps {
  message: Message
  contacts: Contact[]
  onEdit: (message: Message) => void
  onDelete: (message: Message) => void
}

function formatTimestamp(ts: { toDate: () => Date } | null): string {
  if (!ts) return '—'
  return ts.toDate().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function MessageCard({ message, contacts, onEdit, onDelete }: MessageCardProps) {
  const resolvedNames = contacts
    .filter((c) => message.contactIds.includes(c.id))
    .map((c) => c.name)

  const timestamp = message.status === 'scheduled' ? message.scheduledAt : message.sentAt
  const timestampLabel = message.status === 'scheduled' ? 'Agendada para' : 'Enviada em'

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Chip
          label={message.status === 'sent' ? 'Enviada' : 'Agendada'}
          size="small"
          color={message.status === 'sent' ? 'success' : 'warning'}
        />
        <span className="text-xs text-slate-400">
          {timestampLabel}: {formatTimestamp(timestamp)}
        </span>
      </div>

      <p className="text-sm text-slate-700 line-clamp-2">{message.text}</p>

      <div className="flex items-center justify-between">
        <Tooltip
          title={resolvedNames.length > 0 ? resolvedNames.join(', ') : 'Sem contatos'}
          placement="top"
        >
          <span className="flex items-center gap-1 text-xs text-slate-500 cursor-default">
            <PeopleRounded style={{ fontSize: 14 }} />
            {message.contactIds.length} contato{message.contactIds.length !== 1 ? 's' : ''}
          </span>
        </Tooltip>

        <div className="flex items-center gap-1">
          <Tooltip
            title={message.status === 'sent' ? 'Não é possível editar uma mensagem enviada' : ''}
            placement="top"
          >
            <span>
              <IconButton
                size="small"
                onClick={() => onEdit(message)}
                disabled={message.status === 'sent'}
                className="text-slate-400! hover:text-slate-700!"
              >
                <EditRounded style={{ fontSize: 16 }} />
              </IconButton>
            </span>
          </Tooltip>
          <IconButton
            size="small"
            onClick={() => onDelete(message)}
            className="text-red-500! hover:text-red-600!"
          >
            <DeleteRounded style={{ fontSize: 16 }} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
