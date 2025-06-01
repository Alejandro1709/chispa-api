import * as z from 'zod'

export const createUserSchema = z.object({
  name: z.string({ required_error: 'Provide a name' }).min(1),
  username: z.string({ required_error: 'Provide a username' }).min(1),
  email: z
    .string({ required_error: 'Provide an email' })
    .email({ message: 'Provide a valid email address' }),
  password: z
    .string({ required_error: 'Provide a password' })
    .min(7, 'Provide a password greater or equal to 7 characters'),
})

export type CreateUserInput = z.TypeOf<typeof createUserSchema>

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: 'Provide an email' })
    .email({ message: 'Provide a valid email address' }),
  password: z.string({ required_error: 'Provide a password' }).min(1),
})

export type LoginUserInput = z.TypeOf<typeof loginUserSchema>
