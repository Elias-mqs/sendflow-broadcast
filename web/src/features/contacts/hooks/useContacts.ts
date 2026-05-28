import { useState, useEffect } from 'react'
import {
  collection, query, where, orderBy, onSnapshot,
} from 'firebase/firestore'
import { db } from '@/firebase'
import type { Contact } from '@/types'
import { useAuthStore } from '@/store/authStore'

export const useContacts = (connectionId: string | null) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!user || !connectionId) return

    const q = query(
      collection(db, 'contacts'),
      where('userId', '==', user.uid),
      where('connectionId', '==', connectionId),
      orderBy('createdAt', 'desc')
    )

    return onSnapshot(
      q,
      (snap) => {
        setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact)))
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
  }, [user, connectionId])

  if (!connectionId) return { contacts: [], loading: false, error: null }

  return { contacts, loading, error }
}
