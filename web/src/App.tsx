import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useAuthStore } from './store/authStore'

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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
