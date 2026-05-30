import type { Message, Contact } from '@/types'
import { MessageCard } from '../message-card'

interface MessageListProps {
  messages: Message[]
  contacts: Contact[]
  onEdit: (message: Message) => void
  onDelete: (message: Message) => void
}

export function MessageList({ messages, contacts, onEdit, onDelete }: MessageListProps) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          contacts={contacts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
