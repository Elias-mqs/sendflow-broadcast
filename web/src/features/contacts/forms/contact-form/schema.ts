import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Máximo de 100 caracteres'),
  phone: z.string()
    .min(1, 'Telefone é obrigatório')
    .refine(
      (val) => val.replace(/\D/g, '').length >= 11,
      'Telefone deve ter ao menos 11 dígitos'
    ),
})
