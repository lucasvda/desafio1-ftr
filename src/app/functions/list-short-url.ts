import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function listShortURLs(): Promise<
  { originalURL: string; shortURL: string }[]
> {
  const result = await db.select().from(schema.shortURLs)
  return result.map(row => ({
    id: row.id,
    originalURL: row.originalURL,
    shortURL: row.shortURL,
    clicks: row.clicks,
    createdAt: row.createdAt
  }))
}
