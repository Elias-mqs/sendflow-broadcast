import type { ReactNode } from 'react'

interface NavItem {
  label: string
  path: string
  icon: ReactNode
  disabled: boolean
}

interface SidebarNavProps {
  navItems: NavItem[]
  currentPath: string
  onNavigate: (path: string) => void
}

export const SidebarNav = ({ navItems, currentPath, onNavigate }: SidebarNavProps) => (
  <nav className="flex-1 px-2 py-3">
    {navItems.map((item) => {
      const isActive = currentPath === item.path
      return (
        <button
          key={item.path}
          disabled={item.disabled}
          onClick={() => onNavigate(item.path)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm text-left transition-colors
            ${isActive
              ? 'bg-blue-50 text-blue-700 font-semibold'
              : 'text-slate-500 font-medium hover:bg-slate-50'
            }
            disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <span className="shrink-0">{item.icon}</span>
          {item.label}
        </button>
      )
    })}
  </nav>
)
