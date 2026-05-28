import { useState, useEffect } from 'react'
import {
  collection, query, where, orderBy, onSnapshot,
} from 'firebase/firestore'
import { db } from '@/firebase'
import type { Connection } from '@/types'
import { useAuthStore } from '@/store/authStore'

export const useConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'connections'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )

    return onSnapshot(
      q,
      (snap) => {
        setConnections(
          snap.docs.map((d) => ({ id: d.id, ...d.data() } as Connection))
        )
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
  }, [user])

  return { connections, loading, error }
}
