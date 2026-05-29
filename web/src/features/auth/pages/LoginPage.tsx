import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../services/authService'
import { authSchema, type AuthFormData } from '../components/AuthForm/schema'
import { BrandPanel } from '../components/BrandPanel'
import { AuthForm } from '../components/AuthForm'

export const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    shouldUnregister: true,
  })

  const onSubmit = async (data: AuthFormData) => {
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
    setShowPassword(false)
    setShowConfirmPassword(false)
    reset()
  }

  return (
    <div className="flex min-h-screen">
      <BrandPanel />

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-white min-h-screen">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-12">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
          >
            <span className="text-white font-extrabold text-base leading-none">S</span>
          </div>
          <span className="font-bold text-lg tracking-[-0.02em]">SendFlow</span>
        </div>

        <div className="w-full max-w-100">
          <div className="mb-10 flex flex-col items-center sm:items-start">
            <Typography variant="h5" className="mb-2">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mode === 'login'
                ? 'Entre com suas credenciais para continuar'
                : 'Preencha os dados abaixo para começar'}
            </Typography>
          </div>

          {serverError && (
            <Alert severity="error" className="mb-6">
              {serverError}
            </Alert>
          )}

          <AuthForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            mode={mode}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((v) => !v)}
            showConfirmPassword={showConfirmPassword}
            onToggleConfirmPassword={() => setShowConfirmPassword((v) => !v)}
          />

          <div className="mt-8 text-center">
            <Typography variant="body2" color="text.secondary">
              {mode === 'login' ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
              <span
                onClick={switchMode}
                className="text-[#2563EB] font-semibold cursor-pointer hover:underline"
              >
                {mode === 'login' ? 'Cadastre-se grátis' : 'Fazer login'}
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
