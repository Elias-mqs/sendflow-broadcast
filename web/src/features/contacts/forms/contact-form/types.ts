import type { z } from 'zod'
import type { contactSchema } from './schema'

export type ContactFormData = z.infer<typeof contactSchema>
