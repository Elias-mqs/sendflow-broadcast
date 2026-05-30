import type { z } from 'zod'
import type { messageFormSchema } from './schema'

export type MessageFormData = z.infer<typeof messageFormSchema>
