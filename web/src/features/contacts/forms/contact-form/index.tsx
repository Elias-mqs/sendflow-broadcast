import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@mui/material'
import { contactSchema } from './schema'
import type { ContactFormData } from './types'

interface ContactFormProps {
  id: string
  onSubmit: (data: ContactFormData) => Promise<void>
  defaultValues?: Partial<ContactFormData>
  loading?: boolean
}

export function ContactForm({ id, onSubmit, defaultValues, loading }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  })

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <TextField
        {...register('name')}
        label="Nome"
        placeholder="Ex: João Silva"
        fullWidth
        autoFocus
        disabled={loading}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('phone')}
        label="Telefone"
        type="tel"
        placeholder="(11) 99999-9999"
        fullWidth
        disabled={loading}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
    </form>
  )
}
