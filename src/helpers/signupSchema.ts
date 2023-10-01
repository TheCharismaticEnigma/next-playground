import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().trim().email(),
  username: z
    .string()
    .trim()
    .min(3, { message: 'Name must be longer.' })
    .max(50),
  password: z.string().trim().min(3, { message: 'Password must be longer.' }),
});

export type User = z.infer<typeof UserSchema>;
