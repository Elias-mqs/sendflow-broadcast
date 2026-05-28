import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, CircularProgress, Box,
} from '@mui/material'
import type { Connection } from '../../../types'
import { addConnection, updateConnection } from '../services/connectionService'
import { useAuthStore } from '../../../store/authStore'

interface Props {
  open: boolean
  onClose: () => void
  connection?: Connection
}

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
})

type FormData = z.infer<typeof schema>

export const ConnectionForm = ({ open, onClose, connection }: Props) => {
  const user = useAuthStore((s) => s.user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    reset({ name: connection?.name ?? '' })
  }, [connection, open, reset])

  const onSubmit = async (data: FormData) => {
    if (!user) return
    if (connection) {
      await updateConnection(connection.id, data.name)
    } else {
      await addConnection(data.name, user.uid)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{connection ? 'Editar conexão' : 'Nova conexão'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Nome"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            autoFocus
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
