import { useForm, Controller } from 'react-hook-form'
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

export function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function ContactForm({ id, onSubmit, defaultValues, loading }: ContactFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...defaultValues,
      phone: defaultValues?.phone ? applyPhoneMask(defaultValues.phone) : '',
    },
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
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            fullWidth
            disabled={loading}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            onChange={(e) => field.onChange(applyPhoneMask(e.target.value))}
            slotProps={{ htmlInput: { maxLength: 15 } }}
          />
        )}
      />
    </form>
  )
}
