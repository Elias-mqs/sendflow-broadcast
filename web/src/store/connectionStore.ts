import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ConnectionState {
  activeConnectionId: string | null
  setActiveConnection: (id: string) => void
  clearActiveConnection: () => void
}

export const useConnectionStore = create<ConnectionState>()(
  persist(
    (set) => ({
      activeConnectionId: null,
      setActiveConnection: (id) => set({ activeConnectionId: id }),
      clearActiveConnection: () => set({ activeConnectionId: null }),
    }),
    { name: 'active-connection' }
  )
)
