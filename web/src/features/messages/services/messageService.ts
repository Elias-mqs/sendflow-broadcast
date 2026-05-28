import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db } from '@/firebase'

const COLLECTION = 'messages'

export const addMessage = async (data: {
  text: string
  contactIds: string[]
  userId: string
  connectionId: string
  scheduledAt: Date | null
}) => {
  await addDoc(collection(db, COLLECTION), {
    text: data.text,
    contactIds: data.contactIds,
    userId: data.userId,
    connectionId: data.connectionId,
    status: data.scheduledAt ? 'scheduled' : 'sent',
    scheduledAt: data.scheduledAt ? Timestamp.fromDate(data.scheduledAt) : null,
    sentAt: data.scheduledAt ? null : serverTimestamp(),
    createdAt: serverTimestamp(),
  })
}

export const updateMessage = async (
  id: string,
  data: {
    text: string
    contactIds: string[]
    scheduledAt: Date | null
  }
) => {
  await updateDoc(doc(db, COLLECTION, id), {
    text: data.text,
    contactIds: data.contactIds,
    status: data.scheduledAt ? 'scheduled' : 'sent',
    scheduledAt: data.scheduledAt ? Timestamp.fromDate(data.scheduledAt) : null,
    sentAt: data.scheduledAt ? null : serverTimestamp(),
  })
}

export const deleteMessage = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id))
}
