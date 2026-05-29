import { useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  Cable as CableIcon,
  Contacts as ContactsIcon,
  Message as MessageIcon,
} from '@mui/icons-material'
import { useAuthStore } from '@/store/authStore'
import { useConnectionStore } from '@/store/connectionStore'
import { signOut } from '@/features/auth/services/authService'
import { useConnections } from '@/features/connections/hooks/useConnections'
import { SidebarHeader } from './components/sidebar-header'
import { ConnectionSelector } from './components/connection-selector'
import { SidebarNav } from './components/sidebar-nav'
import { SidebarFooter } from './components/sidebar-footer'

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const { activeConnectionId, setActiveConnection, clearActiveConnection } = useConnectionStore()
  const { connections } = useConnections()

  const handleSignOut = async () => {
    await signOut()
    clearActiveConnection()
    navigate('/login')
  }

  const navItems = [
    { label: 'Conexões', path: '/connections', icon: <CableIcon />, disabled: false },
    { label: 'Contatos', path: '/contacts', icon: <ContactsIcon />, disabled: !activeConnectionId },
    { label: 'Mensagens', path: '/messages', icon: <MessageIcon />, disabled: !activeConnectionId },
  ]

  return (
    <Box className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      <SidebarHeader />
      <ConnectionSelector
        connections={connections}
        activeConnectionId={activeConnectionId}
        onConnectionChange={setActiveConnection}
      />
      <SidebarNav
        navItems={navItems}
        currentPath={location.pathname}
        onNavigate={navigate}
      />
      <SidebarFooter user={user!} onSignOut={handleSignOut} />
    </Box>
  )
}
