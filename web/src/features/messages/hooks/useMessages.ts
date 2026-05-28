import { useState, useEffect } from 'react'
import {
  collection, query, where, orderBy, onSnapshot,
} from 'firebase/firestore'
import { db } from '@/firebase'
import type { Message, MessageStatus } from '@/types'
import { useAuthStore } from '@/store/authStore'

export const useMessages = (
  connectionId: string | null,
  statusFilter?: MessageStatus
) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!user || !connectionId) return

    const constraints = [
      where('userId', '==', user.uid),
      where('connectionId', '==', connectionId),
      ...(statusFilter ? [where('status', '==', statusFilter)] : []),
      orderBy('createdAt', 'desc'),
    ]

    const q = query(collection(db, 'messages'), ...constraints)

    return onSnapshot(
      q,
      (snap) => {
        setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message)))
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
  }, [user, connectionId, statusFilter])

  if (!connectionId) return { messages: [], loading: false, error: null }

  return { messages, loading, error }
}
