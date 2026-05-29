import { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import { ExpandMore as ExpandMoreIcon, Check as CheckIcon } from '@mui/icons-material'
import type { Connection } from '@/types'

interface ConnectionSelectorProps {
  connections: Connection[]
  activeConnectionId: string | null
  onConnectionChange: (id: string) => void
}

export const ConnectionSelector = ({
  connections,
  activeConnectionId,
  onConnectionChange,
}: ConnectionSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const activeConnection = connections.find((c) => c.id === activeConnectionId)

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleSelect = (id: string) => {
    onConnectionChange(id)
    handleClose()
  }

  return (
    <div className="px-3 py-3 border-b border-slate-100">
      <div
        role="button"
        onClick={handleOpen}
        className="flex items-center gap-2 px-3 py-2 rounded-[10px] cursor-pointer border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors select-none"
      >
        {activeConnection && (
          <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-500" />
        )}
        <span className={`flex-1 text-sm font-medium truncate ${activeConnection ? 'text-slate-900' : 'text-slate-400'}`}>
          {activeConnection?.name ?? 'Selecionar conexão'}
        </span>
        <ExpandMoreIcon className="text-slate-400 shrink-0" style={{ fontSize: 18 }} />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: { sx: { width: 220, borderRadius: '10px', mt: 0.5 } },
        }}
      >
        {connections.map((c) => (
          <MenuItem
            key={c.id}
            onClick={() => handleSelect(c.id)}
            className="flex justify-between text-sm"
          >
            {c.name}
            {c.id === activeConnectionId && (
              <CheckIcon className="text-blue-600 ml-2" style={{ fontSize: 16 }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
