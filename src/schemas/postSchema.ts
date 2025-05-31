import * as z from 'zod'

export const createPostSchema = z.object({
  content: z.string({ required_error: 'Content is required' }),
})

export type CreatePostInput = z.TypeOf<typeof createPostSchema>
