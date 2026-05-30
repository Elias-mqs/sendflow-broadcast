import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, FormControlLabel, Switch, FormHelperText } from '@mui/material'
import { useContacts } from '@/features/contacts/hooks/useContacts'
import { ContactSelector } from '../../components/contact-selector'
import { messageFormSchema } from './schema'
import type { MessageFormData } from './types'

interface MessageFormProps {
  id: string
  connectionId: string
  defaultValues?: Partial<MessageFormData>
  onSubmit: (data: MessageFormData) => Promise<void>
  loading?: boolean
}

export function MessageForm({ id, connectionId, defaultValues, onSubmit, loading }: MessageFormProps) {
  const { contacts } = useContacts(connectionId)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      text: '',
      contactIds: [],
      scheduled: false,
      scheduledAt: '',
      ...defaultValues,
    },
  })

  const scheduled = useWatch({ control, name: 'scheduled' })

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <TextField
        label="Mensagem"
        {...register('text')}
        error={!!errors.text}
        helperText={errors.text?.message}
        fullWidth
        multiline
        rows={3}
        autoFocus
        disabled={loading}
      />

      <Controller
        name="contactIds"
        control={control}
        render={({ field }) => (
          <div>
            <ContactSelector
              contacts={contacts}
              selectedIds={field.value}
              onChange={field.onChange}
              error={!!errors.contactIds}
              disabled={loading}
            />
            {errors.contactIds && (
              <FormHelperText error>{errors.contactIds.message}</FormHelperText>
            )}
          </div>
        )}
      />

      <Controller
        name="scheduled"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                disabled={loading}
              />
            }
            label="Agendar envio"
          />
        )}
      />

      {scheduled && (
        <TextField
          label="Data e hora do envio"
          type="datetime-local"
          {...register('scheduledAt')}
          error={!!errors.scheduledAt}
          helperText={errors.scheduledAt?.message}
          fullWidth
          disabled={loading}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { min: new Date().toISOString().slice(0, 16) },
          }}
        />
      )}
    </form>
  )
}
