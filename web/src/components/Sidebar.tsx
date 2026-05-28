import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, Select, MenuItem, FormControl,
  InputLabel, Button,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import {
  Cable as CableIcon,
  Contacts as ContactsIcon,
  Message as MessageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { useAuthStore } from '@/store/authStore'
import { useConnectionStore } from '@/store/connectionStore'
import { signOut } from '@/features/auth/services/authService'
import { useConnections } from '@/features/connections/hooks/useConnections'

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const { activeConnectionId, setActiveConnection, clearActiveConnection } =
    useConnectionStore()

  const { connections } = useConnections()

  const handleSignOut = async () => {
    await signOut()
    clearActiveConnection()
    navigate('/login')
  }

  const handleConnectionChange = (e: SelectChangeEvent) => {
    setActiveConnection(e.target.value)
  }

  const navItems = [
    { label: 'Conexões', path: '/connections', icon: <CableIcon />, disabled: false },
    { label: 'Contatos', path: '/contacts', icon: <ContactsIcon />, disabled: !activeConnectionId },
    { label: 'Mensagens', path: '/messages', icon: <MessageIcon />, disabled: !activeConnectionId },
  ]

  return (
    <Box className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <Box className="p-4 border-b border-gray-200">
        <Typography variant="h6" className="font-bold text-gray-800">
          Broadcast
        </Typography>
        <Typography variant="caption" className="text-gray-500 block truncate">
          {user?.email}
        </Typography>
      </Box>

      <Box className="p-4 border-b border-gray-100">
        <FormControl fullWidth size="small">
          <InputLabel>Conexão ativa</InputLabel>
          <Select
            value={activeConnectionId ?? ''}
            label="Conexão ativa"
            onChange={handleConnectionChange}
          >
            {connections.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <List className="flex-1 px-2 py-2">
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            disabled={item.disabled}
            onClick={() => navigate(item.path)}
            className="rounded-lg mb-1"
          >
            <ListItemIcon className="min-w-10">{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider />
      <Box className="p-2">
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleSignOut}
          color="inherit"
        >
          Sair
        </Button>
      </Box>
    </Box>
  )
}
