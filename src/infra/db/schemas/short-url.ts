import { randomUUID } from 'node:crypto'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const shortURLs = pgTable('short_urls', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  originalURL: text('original_url').notNull(),
  shortURL: text('short_url').notNull().unique(),
  clicks: integer().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
