import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Alert, IconButton, Divider,
  useMediaQuery, useTheme,
} from '@mui/material'
import { CloseRounded, SaveRounded } from '@mui/icons-material'
import { ConnectionForm } from '../../forms/connection-form'
import { updateConnection } from '../../services/connectionService'
import type { Connection } from '../../types'
import type { ConnectionFormData } from '../../forms/connection-form/types'

const FORM_ID = 'edit-connection-form'

interface EditConnectionModalProps {
  connection: Connection | null
  onClose: () => void
}

export function EditConnectionModal({ connection, onClose }: EditConnectionModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = async (data: ConnectionFormData) => {
    if (!connection) return
    setLoading(true)
    setError(null)
    try {
      await updateConnection(connection.id, data.name)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar conexão.')
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
      open={!!connection}
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
        Editar conexão
        <IconButton size="small" onClick={handleClose} disabled={loading}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="pt-6">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <ConnectionForm
          key={connection?.id}
          id={FORM_ID}
          onSubmit={handleSubmit}
          defaultValues={{ name: connection?.name ?? '' }}
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
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveRounded />}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
