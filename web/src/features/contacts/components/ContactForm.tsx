import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, CircularProgress,
} from '@mui/material'
import type { Contact } from '../../../types'
import { addContact, updateContact } from '../services/contactService'
import { useAuthStore } from '../../../store/authStore'

interface Props {
  open: boolean
  onClose: () => void
  connectionId: string
  contact?: Contact
}

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
})

type FormData = z.infer<typeof schema>

export const ContactForm = ({ open, onClose, connectionId, contact }: Props) => {
  const user = useAuthStore((s) => s.user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    reset({ name: contact?.name ?? '', phone: contact?.phone ?? '' })
  }, [contact, open, reset])

  const onSubmit = async (data: FormData) => {
    if (!user) return
    if (contact) {
      await updateContact(contact.id, data)
    } else {
      await addContact(data, user.uid, connectionId)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{contact ? 'Editar contato' : 'Novo contato'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Nome"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            autoFocus
          />
          <TextField
            label="Telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
          />
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
