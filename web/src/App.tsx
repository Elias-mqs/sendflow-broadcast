import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useAuthStore } from './store/authStore'
import { LoginPage } from './features/auth/pages/LoginPage'
import { PrivateRoute } from './components/PrivateRoute'

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
          {/* rotas privadas serão adicionadas na fase 4 */}
        </Route>
        <Route path="*" element={<Navigate to="/connections" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
