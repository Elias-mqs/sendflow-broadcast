import { Skeleton } from '@mui/material'

export function MessageListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Skeleton width={72} height={24} />
            <Skeleton width={160} height={16} />
          </div>
          <Skeleton width="80%" height={16} />
          <Skeleton width="55%" height={16} />
          <div className="flex items-center justify-between">
            <Skeleton width={80} height={16} />
            <Skeleton width={56} height={24} />
          </div>
        </div>
      ))}
    </div>
  )
}
