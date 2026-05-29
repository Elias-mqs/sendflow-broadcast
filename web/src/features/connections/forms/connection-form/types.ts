import type { z } from 'zod'
import type { connectionSchema } from './schema'

export type ConnectionFormData = z.infer<typeof connectionSchema>
