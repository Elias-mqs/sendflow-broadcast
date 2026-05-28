import { Timestamp } from 'firebase/firestore'

export interface Connection {
  id: string
  name: string
  userId: string
  createdAt: Timestamp
}

export interface Contact {
  id: string
  name: string
  phone: string
  userId: string
  connectionId: string
  createdAt: Timestamp
}

export type MessageStatus = 'scheduled' | 'sent'

export interface Message {
  id: string
  text: string
  status: MessageStatus
  contactIds: string[]
  userId: string
  connectionId: string
  scheduledAt: Timestamp | null
  sentAt: Timestamp | null
  createdAt: Timestamp
}
