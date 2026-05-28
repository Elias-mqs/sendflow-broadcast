import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { auth } from '@/firebase'

const AUTH_ERRORS: Record<string, string> = {
  'auth/user-not-found': 'Usuário não encontrado',
  'auth/wrong-password': 'Senha incorreta',
  'auth/email-already-in-use': 'E-mail já cadastrado',
  'auth/weak-password': 'Senha deve ter no mínimo 6 caracteres',
  'auth/invalid-email': 'E-mail inválido',
  'auth/invalid-credential': 'E-mail ou senha incorretos',
}

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    const code = (error as AuthError).code
    throw new Error(AUTH_ERRORS[code] ?? 'Erro ao fazer login', { cause: error })
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    const code = (error as AuthError).code
    throw new Error(AUTH_ERRORS[code] ?? 'Erro ao criar conta', { cause: error })
  }
}

export const signOut = async () => {
  await firebaseSignOut(auth)
}
