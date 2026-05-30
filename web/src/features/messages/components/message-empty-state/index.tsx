import { Button } from '@mui/material'
import { ChatBubbleOutlineRounded, AddRounded } from '@mui/icons-material'

interface MessageEmptyStateProps {
  onCreateClick: () => void
}

export function MessageEmptyState({ onCreateClick }: MessageEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
        <ChatBubbleOutlineRounded className="text-slate-400!" style={{ fontSize: 32 }} />
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-slate-700">Nenhuma mensagem ainda</p>
        <p className="text-sm text-slate-400 mt-1">Crie sua primeira mensagem para começar.</p>
      </div>
      <Button variant="contained" startIcon={<AddRounded />} onClick={onCreateClick}>
        Nova mensagem
      </Button>
    </div>
  )
}
