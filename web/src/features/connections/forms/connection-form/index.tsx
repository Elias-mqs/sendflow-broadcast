import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@mui/material'
import { connectionSchema } from './schema'
import type { ConnectionFormData } from './types'

interface ConnectionFormProps {
  id: string
  onSubmit: (data: ConnectionFormData) => Promise<void>
  defaultValues?: Partial<ConnectionFormData>
  loading?: boolean
}

export function ConnectionForm({ id, onSubmit, defaultValues, loading }: ConnectionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectionFormData>({
    resolver: zodResolver(connectionSchema),
    defaultValues,
  })

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        {...register('name')}
        label="Nome da conexão"
        placeholder="Ex: Minha Empresa WhatsApp"
        fullWidth
        autoFocus
        disabled={loading}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </form>
  )
}
