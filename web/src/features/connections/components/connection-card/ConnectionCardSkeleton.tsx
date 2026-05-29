import { Paper, Skeleton } from '@mui/material'

export function ConnectionCardSkeleton() {
  return (
    <Paper
      className="p-5 border border-slate-200"
      sx={{ borderRadius: '12px', boxShadow: 'none' }}
    >
      <div className="flex items-start justify-between mb-3">
        <Skeleton variant="rounded" width={52} height={22} />
        <div className="flex gap-1">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </div>
      </div>
      <Skeleton variant="text" width="60%" height={22} className="mb-1" />
      <Skeleton variant="text" width="40%" height={16} />
    </Paper>
  )
}
