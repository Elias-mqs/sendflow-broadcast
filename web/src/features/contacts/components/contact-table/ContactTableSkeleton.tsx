import {
  Table, TableHead, TableBody, TableRow, TableCell, Paper, Skeleton,
} from '@mui/material'

const TABLE_HEADERS = ['Nome', 'Telefone', 'Criado em', 'Ações']

export function ContactTableSkeleton() {
  return (
    <Paper
      className="border border-slate-200 shadow-none overflow-hidden"
      style={{ borderRadius: '12px' }}
    >
      <Table>
        <TableHead className="bg-slate-50">
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableCell
                key={header}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400 py-3 border-b border-slate-200"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-b border-slate-100">
              <TableCell className="py-3"><Skeleton width="55%" /></TableCell>
              <TableCell className="py-3"><Skeleton width="75%" /></TableCell>
              <TableCell className="py-3"><Skeleton width="65%" /></TableCell>
              <TableCell className="py-3"><Skeleton width={56} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
