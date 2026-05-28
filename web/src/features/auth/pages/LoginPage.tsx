import { useState } from 'react'
import {
  Box, TextField, Button, Typography, Alert,
  CircularProgress, Paper,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../services/authService'

export const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      navigate('/connections')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper className="w-full max-w-sm p-8">
        <Typography variant="h5" className="font-bold mb-6 text-center">
          {mode === 'login' ? 'Entrar' : 'Criar conta'}
        </Typography>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Button>
        </Box>

        <Button
          fullWidth
          className="mt-3"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
            setError(null)
          }}
        >
          {mode === 'login'
            ? 'Não tem conta? Cadastre-se'
            : 'Já tem conta? Entrar'}
        </Button>
      </Paper>
    </Box>
  )
}
