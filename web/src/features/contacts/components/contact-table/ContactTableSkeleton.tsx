import {
  Table, TableHead, TableBody, TableRow, TableCell, Paper, Skeleton,
} from '@mui/material'

const HEADER_CELL_CLASS = 'text-xs font-bold uppercase tracking-wide text-slate-400 py-2 border-b border-slate-200'

export function ContactTableSkeleton() {
  return (
    <Paper
      className="border border-slate-200 shadow-none overflow-hidden"
      style={{ borderRadius: '12px' }}
    >
      <Table>
        <TableHead className="bg-slate-50">
          <TableRow>
            <TableCell className={HEADER_CELL_CLASS}>Nome</TableCell>
            <TableCell className={HEADER_CELL_CLASS}>Telefone</TableCell>
            <TableCell className={HEADER_CELL_CLASS}>Criado em</TableCell>
            <TableCell className={HEADER_CELL_CLASS} align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-b border-slate-100">
              <TableCell className="py-2"><Skeleton width="55%" /></TableCell>
              <TableCell className="py-2"><Skeleton width="75%" /></TableCell>
              <TableCell className="py-2"><Skeleton width="65%" /></TableCell>
              <TableCell className="py-2" align="right"><Skeleton width={56} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
