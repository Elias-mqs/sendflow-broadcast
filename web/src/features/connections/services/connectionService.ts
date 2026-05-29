import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp,
} from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { db } from '@/firebase'

const COLLECTION = 'connections'

const CONNECTION_ERRORS: Record<string, string> = {
  'permission-denied': 'Você não tem permissão para realizar esta ação.',
  'not-found': 'Conexão não encontrada.',
  'unavailable': 'Serviço temporariamente indisponível. Tente novamente.',
}

function handleError(error: unknown): never {
  if (error instanceof FirebaseError) {
    const code = error.code.replace('firestore/', '')
    const message = CONNECTION_ERRORS[code] ?? 'Ocorreu um erro inesperado. Tente novamente.'
    throw new Error(message, { cause: error })
  }
  throw error
}

export const addConnection = async (name: string, userId: string) => {
  try {
    await addDoc(collection(db, COLLECTION), {
      name,
      userId,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    handleError(error)
  }
}

export const updateConnection = async (id: string, name: string) => {
  try {
    await updateDoc(doc(db, COLLECTION, id), { name })
  } catch (error) {
    handleError(error)
  }
}

export const deleteConnection = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION, id))
  } catch (error) {
    handleError(error)
  }
}
