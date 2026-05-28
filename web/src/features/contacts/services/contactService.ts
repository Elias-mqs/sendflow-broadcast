import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/firebase'

const COLLECTION = 'contacts'

export const addContact = async (
  data: { name: string; phone: string },
  userId: string,
  connectionId: string
) => {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    userId,
    connectionId,
    createdAt: serverTimestamp(),
  })
}

export const updateContact = async (
  id: string,
  data: { name: string; phone: string }
) => {
  await updateDoc(doc(db, COLLECTION, id), data)
}

export const deleteContact = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id))
}
