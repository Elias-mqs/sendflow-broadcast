import { z } from 'zod'

export const authSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.confirmPassword === undefined) return
  if (data.confirmPassword.length === 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Confirme sua senha', path: ['confirmPassword'] })
    return
  }
  if (data.confirmPassword !== data.password) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'As senhas não conferem', path: ['confirmPassword'] })
  }
})

export type AuthFormData = z.infer<typeof authSchema>
