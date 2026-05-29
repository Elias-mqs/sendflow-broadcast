import { Button, Typography } from '@mui/material'
import { AddRounded, ContactsRounded } from '@mui/icons-material'

interface ContactEmptyStateProps {
  onCreateClick: () => void
}

export function ContactEmptyState({ onCreateClick }: ContactEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <ContactsRounded style={{ fontSize: 64 }} className="text-slate-300" />
      <div className="flex flex-col items-center gap-1 text-center">
        <Typography variant="h6" className="font-semibold text-slate-700">
          Nenhum contato ainda
        </Typography>
        <Typography variant="body2" className="text-slate-500 max-w-xs text-center">
          Adicione o primeiro contato para esta conexão.
        </Typography>
      </div>
      <Button variant="contained" startIcon={<AddRounded />} onClick={onCreateClick} className="mt-2">
        Adicionar contato
      </Button>
    </div>
  )
}
