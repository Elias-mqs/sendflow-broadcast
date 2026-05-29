import type { Connection } from '../../types'
import { ConnectionCard } from '../connection-card'
import { ConnectionCardSkeleton } from '../connection-card/ConnectionCardSkeleton'
import { ConnectionEmptyState } from '../connection-empty-state'

const SKELETON_COUNT = 6

interface ConnectionListProps {
  connections: Connection[]
  loading: boolean
  onEdit: (connection: Connection) => void
  onDelete: (connection: Connection) => void
  onCreateClick: () => void
}

export function ConnectionList({
  connections,
  loading,
  onEdit,
  onDelete,
  onCreateClick,
}: ConnectionListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ConnectionCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (connections.length === 0) {
    return <ConnectionEmptyState onCreateClick={onCreateClick} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {connections.map((connection) => (
        <ConnectionCard
          key={connection.id}
          connection={connection}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
