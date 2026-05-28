import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../../firebase'

const COLLECTION = 'connections'

export const addConnection = async (name: string, userId: string) => {
  await addDoc(collection(db, COLLECTION), {
    name,
    userId,
    createdAt: serverTimestamp(),
  })
}

export const updateConnection = async (id: string, name: string) => {
  await updateDoc(doc(db, COLLECTION, id), { name })
}

export const deleteConnection = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id))
}
