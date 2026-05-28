import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Box, TextField, Button, Typography, Alert,
  CircularProgress, Paper,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../services/authService'

const schema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [serverError, setServerError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      if (mode === 'login') {
        await signIn(data.email, data.password)
      } else {
        await signUp(data.email, data.password)
      }
      navigate('/connections')
    } catch (err) {
      setServerError((err as Error).message)
    }
  }

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    setServerError(null)
    reset()
  }

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper className="w-full max-w-sm p-8">
        <Typography variant="h5" className="font-bold mb-6 text-center">
          {mode === 'login' ? 'Entrar' : 'Criar conta'}
        </Typography>

        {serverError && (
          <Alert severity="error" className="mb-4">
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            label="E-mail"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Button>
        </Box>

        <Button fullWidth className="mt-3" onClick={switchMode}>
          {mode === 'login'
            ? 'Não tem conta? Cadastre-se'
            : 'Já tem conta? Entrar'}
        </Button>
      </Paper>
    </Box>
  )
}
