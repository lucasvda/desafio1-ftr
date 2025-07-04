import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const getOriginalURLInput = z.object({
  shortURL: z.string(),
})

type GetOriginalURLInput = z.input<typeof getOriginalURLInput>

export async function getOriginalURL(input: GetOriginalURLInput) {
  const { shortURL } = getOriginalURLInput.parse(input)

  const result = await db
    .select()
    .from(schema.shortURLs)
    .where(eq(schema.shortURLs.shortURL, `localhost:5173/${shortURL}`))

  if (result.length === 0) return null

  return result[0].originalURL
}
