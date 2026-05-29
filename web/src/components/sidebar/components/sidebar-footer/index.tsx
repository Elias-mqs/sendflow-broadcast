import { Logout as LogoutIcon } from '@mui/icons-material'
import type { User } from 'firebase/auth'

interface SidebarFooterProps {
  user: User
  onSignOut: () => void
}

export const SidebarFooter = ({ user, onSignOut }: SidebarFooterProps) => {
  const initial = (user.displayName ?? user.email ?? 'U')[0].toUpperCase()

  return (
    <div className="border-t border-slate-100 p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-bold select-none"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          {user.displayName && (
            <p className="text-sm font-semibold text-slate-900 truncate leading-tight">{user.displayName}</p>
          )}
          <p className={`truncate leading-tight ${user.displayName ? 'text-xs text-slate-400' : 'text-sm text-slate-600'}`}>
            {user.email}
          </p>
        </div>
      </div>

      <button
        onClick={onSignOut}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <LogoutIcon style={{ fontSize: 16 }} />
        Sair
      </button>
    </div>
  )
}
