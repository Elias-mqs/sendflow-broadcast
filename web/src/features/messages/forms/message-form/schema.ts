import { z } from 'zod'

export const messageFormSchema = z.object({
  text: z.string().min(1, 'Mensagem é obrigatória').max(1000, 'Máximo 1000 caracteres'),
  contactIds: z.array(z.string()).min(1, 'Selecione ao menos um contato'),
  scheduled: z.boolean(),
  scheduledAt: z.string(),
}).refine(
  (data) => !data.scheduled || !!data.scheduledAt,
  { message: 'Data de agendamento é obrigatória', path: ['scheduledAt'] }
)
