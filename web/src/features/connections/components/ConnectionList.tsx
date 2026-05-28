import {
  List, ListItem, ListItemText, IconButton, Box,
  Typography, CircularProgress,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { Connection } from '@/types'
import { deleteConnection } from '../services/connectionService'
import { useConnectionStore } from '@/store/connectionStore'

interface Props {
  connections: Connection[]
  loading: boolean
  onEdit: (connection: Connection) => void
}

export const ConnectionList = ({ connections, loading, onEdit }: Props) => {
  const { activeConnectionId, setActiveConnection } = useConnectionStore()

  const handleDelete = async (id: string) => {
    await deleteConnection(id)
    if (activeConnectionId === id) {
      useConnectionStore.getState().clearActiveConnection()
    }
  }

  if (loading) {
    return (
      <Box className="flex justify-center py-8">
        <CircularProgress />
      </Box>
    )
  }

  if (connections.length === 0) {
    return (
      <Typography className="text-gray-400 py-8 text-center">
        Nenhuma conexão cadastrada
      </Typography>
    )
  }

  return (
    <List>
      {connections.map((c) => (
        <ListItem
          key={c.id}
          className={`rounded-lg mb-1 cursor-pointer border ${
            activeConnectionId === c.id
              ? 'bg-blue-50 border-blue-200'
              : 'border-transparent hover:bg-gray-50'
          }`}
          onClick={() => setActiveConnection(c.id)}
          secondaryAction={
            <Box>
              <IconButton onClick={(e) => { e.stopPropagation(); onEdit(c) }} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(c.id) }} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        >
          <ListItemText primary={c.name} />
        </ListItem>
      ))}
    </List>
  )
}
