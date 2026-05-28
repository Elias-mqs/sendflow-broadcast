import { useEffect } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, CircularProgress,
  FormControlLabel, Switch, FormHelperText,
} from '@mui/material'
import type { Message } from '@/types'
import { useAuthStore } from '@/store/authStore'
import { useContacts } from '@/features/contacts/hooks/useContacts'
import { addMessage, updateMessage } from '../services/messageService'
import { ContactSelector } from './ContactSelector'

interface Props {
  open: boolean
  onClose: () => void
  connectionId: string
  message?: Message
}

const schema = z.object({
  text: z.string().min(1, 'Mensagem é obrigatória'),
  contactIds: z.array(z.string()).min(1, 'Selecione ao menos um contato'),
  scheduled: z.boolean(),
  scheduledAt: z.string(),
}).refine(
  (data) => !data.scheduled || !!data.scheduledAt,
  { message: 'Data de agendamento é obrigatória', path: ['scheduledAt'] }
)

type FormData = z.infer<typeof schema>

export const MessageForm = ({ open, onClose, connectionId, message }: Props) => {
  const user = useAuthStore((s) => s.user)
  const { contacts } = useContacts(connectionId)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { text: '', contactIds: [], scheduled: false, scheduledAt: '' },
  })

  const scheduled = useWatch({ control, name: 'scheduled' })

  useEffect(() => {
    if (message) {
      const isScheduled = message.status === 'scheduled' && !!message.scheduledAt
      reset({
        text: message.text,
        contactIds: message.contactIds,
        scheduled: isScheduled,
        scheduledAt: isScheduled && message.scheduledAt
          ? message.scheduledAt.toDate().toISOString().slice(0, 16)
          : '',
      })
    } else {
      reset({ text: '', contactIds: [], scheduled: false, scheduledAt: '' })
    }
  }, [message, open, reset])

  const onSubmit = async (data: FormData) => {
    if (!user) return
    const scheduledDate = data.scheduled && data.scheduledAt
      ? new Date(data.scheduledAt)
      : null

    if (message) {
      await updateMessage(message.id, { text: data.text, contactIds: data.contactIds, scheduledAt: scheduledDate })
    } else {
      await addMessage({ text: data.text, contactIds: data.contactIds, userId: user.uid, connectionId, scheduledAt: scheduledDate })
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{message ? 'Editar mensagem' : 'Nova mensagem'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Mensagem"
            {...register('text')}
            error={!!errors.text}
            helperText={errors.text?.message}
            fullWidth
            multiline
            rows={3}
            autoFocus
          />

          <Controller
            name="contactIds"
            control={control}
            render={({ field }) => (
              <Box>
                <ContactSelector
                  contacts={contacts}
                  selectedIds={field.value}
                  onChange={field.onChange}
                  error={!!errors.contactIds}
                />
                {errors.contactIds && (
                  <FormHelperText error>{errors.contactIds.message}</FormHelperText>
                )}
              </Box>
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
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: new Date().toISOString().slice(0, 16) },
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={20} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
