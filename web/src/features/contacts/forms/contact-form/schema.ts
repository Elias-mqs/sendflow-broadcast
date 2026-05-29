import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Máximo de 100 caracteres'),
  phone: z.string().min(1, 'Telefone é obrigatório').max(20, 'Máximo de 20 caracteres'),
})
