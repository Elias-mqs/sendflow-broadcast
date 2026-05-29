import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material'
import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
  ArrowForward,
} from '@mui/icons-material'
import type { LoginFormData } from './schema'

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>
  register: UseFormRegister<LoginFormData>
  errors: FieldErrors<LoginFormData>
  isSubmitting: boolean
  showPassword: boolean
  onTogglePassword: () => void
  mode: 'login' | 'register'
}

export const AuthForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  showPassword,
  onTogglePassword,
  mode,
}: Props) => (
  <Box component="form" onSubmit={onSubmit} className="flex flex-col gap-5">
    <TextField
      label="E-mail"
      type="email"
      {...register('email')}
      error={!!errors.email}
      helperText={errors.email?.message}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined style={{ fontSize: 18 }} className="text-slate-400" />
            </InputAdornment>
          ),
        },
      }}
    />

    <TextField
      label="Senha"
      type={showPassword ? 'text' : 'password'}
      {...register('password')}
      error={!!errors.password}
      helperText={errors.password?.message}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined style={{ fontSize: 18 }} className="text-slate-400" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={onTogglePassword}
                edge="end"
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <VisibilityOff style={{ fontSize: 18 }} />
                ) : (
                  <Visibility style={{ fontSize: 18 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />

    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={isSubmitting}
      endIcon={
        isSubmitting ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          <ArrowForward style={{ fontSize: 18 }} />
        )
      }
      className="mt-1"
      sx={{ height: 48, fontSize: 15 }}
    >
      {mode === 'login' ? 'Entrar na conta' : 'Criar conta'}
    </Button>
  </Box>
)
