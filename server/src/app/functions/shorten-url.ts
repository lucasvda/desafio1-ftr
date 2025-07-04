import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const shortenURLInput = z.object({
  originalURL: z.string(),
  shortURL: z.string(),
})

type ShortenURLInput = z.input<typeof shortenURLInput>

export async function shortenURL(input: ShortenURLInput) {
  const { originalURL, shortURL } = shortenURLInput.parse(input)

  await db.insert(schema.shortURLs).values({
    originalURL: originalURL,
    shortURL: `localhost:5173/${shortURL}`,
  })
}
