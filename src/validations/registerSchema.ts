// Zod Schema Validations
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(30, { message: 'Username must not exceed 30 characters' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Username must only contain letters and numbers' }),

  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must not exceed 20 characters' }),

  role: z.enum(['user', 'admin', 'organization'], { message: 'Role must be either user or admin or organization' })
});