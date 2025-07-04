import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const incrementClicksInput = z.object({
  shortURL: z.string(),
})

type IncrementClicksInput = z.input<typeof incrementClicksInput>

export async function incrementClicks(input: IncrementClicksInput) {
  const { shortURL } = incrementClicksInput.parse(input)

  const result = await db
    .update(schema.shortURLs)
    .set({
      clicks: sql`${schema.shortURLs.clicks} + 1`,
    })
    .where(eq(schema.shortURLs.shortURL, `localhost:5173/${shortURL}`))
    .returning({ clicks: schema.shortURLs.clicks })

  if (result.length === 0) return null

  return result[0].clicks
}
