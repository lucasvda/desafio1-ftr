import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const deleteShortURLInput = z.object({
  shortURL: z.string(),
})

type DeleteShortURLInput = z.input<typeof deleteShortURLInput>

export async function deleteShortURL(input: DeleteShortURLInput) {
  const { shortURL } = deleteShortURLInput.parse(input)

  const result = await db
    .delete(schema.shortURLs)
    .where(eq(schema.shortURLs.shortURL, `localhost:5173/${shortURL}`))

  return result
}
