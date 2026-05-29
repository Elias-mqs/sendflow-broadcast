import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Alert, IconButton, Divider,
  useMediaQuery, useTheme,
} from '@mui/material'
import { CloseRounded, AddRounded } from '@mui/icons-material'
import { ConnectionForm } from '../../forms/connection-form'
import { addConnection } from '../../services/connectionService'
import { useAuthStore } from '@/store/authStore'
import type { ConnectionFormData } from '../../forms/connection-form/types'

const FORM_ID = 'create-connection-form'

interface CreateConnectionModalProps {
  open: boolean
  onClose: () => void
}

export function CreateConnectionModal({ open, onClose }: CreateConnectionModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((s) => s.user)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = async (data: ConnectionFormData) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      await addConnection(data.name, user.uid)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conexão.')
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (loading) return
    setError(null)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      slotProps={{
        backdrop: { sx: { backdropFilter: 'blur(2px)' } },
      }}
      sx={{ '& .MuiDialog-paper': { borderRadius: isMobile ? 0 : '16px' } }}
    >
      <DialogTitle
        className="flex items-center justify-between pr-2"
        sx={{ fontWeight: 700 }}
      >
        Nova conexão
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-6">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <ConnectionForm
          key={open ? 'open' : 'closed'}
          id={FORM_ID}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </DialogContent>
      <Divider />
      <DialogActions className="px-6 py-3">
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <AddRounded />}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
