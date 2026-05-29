import { Button, Typography } from '@mui/material'
import { AddRounded, LinkRounded } from '@mui/icons-material'

interface ConnectionEmptyStateProps {
  onCreateClick: () => void
}

export function ConnectionEmptyState({ onCreateClick }: ConnectionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <LinkRounded sx={{ fontSize: 64, color: '#CBD5E1' }} />
      <div className="flex flex-col items-center gap-1 text-center">
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#334155' }}>
          Nenhuma conexão ainda
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#64748B', maxWidth: 280, textAlign: 'center' }}
        >
          Crie sua primeira conexão para começar a gerenciar seus envios.
        </Typography>
      </div>
      <Button
        variant="contained"
        startIcon={<AddRounded />}
        onClick={onCreateClick}
        className="mt-2"
      >
        Criar conexão
      </Button>
    </div>
  )
}
