import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import { useAuthStore } from '@/store/authStore'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { PrivateRoute } from '@/components/PrivateRoute'
import { Layout } from '@/components/Layout'
import { ConnectionsPage } from '@/features/connections/pages/ConnectionsPage'
import { ContactsPage } from '@/features/contacts/pages/ContactsPage'

function App() {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [setUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            {/* páginas serão adicionadas nas fases 5, 6 e 7 */}
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/messages" element={<div>Mensagens</div>} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/connections" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
