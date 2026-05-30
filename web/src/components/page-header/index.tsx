import { Divider } from '@mui/material'

interface PageHeaderProps {
  title: string
  subtitle: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <>
      <div className="pt-5 pb-5">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <Divider className="mb-5!" />
    </>
  )
}
