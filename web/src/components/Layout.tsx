import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const Layout = () => (
  <Box className="flex h-screen bg-gray-50 overflow-hidden">
    <Sidebar />
    <Box component="main" className="flex-1 overflow-auto p-6">
      <Outlet />
    </Box>
  </Box>
)
