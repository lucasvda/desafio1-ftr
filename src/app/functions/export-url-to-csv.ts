import { randomUUID } from 'node:crypto'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { format } from 'date-fns'
import { asc } from 'drizzle-orm'
import { env } from '@/env'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { r2 } from '@/storage/client'

const bucketName = env.CLOUDFLARE_BUCKET

export async function exportShortURLs() {
  let csv = 'Original URL,Short URL,Clicks,Created At\n'

  const pageSize = 500
  let offset = 0

  while (true) {
    const rows = await db
      .select({
        originalURL: schema.shortURLs.originalURL,
        shortURL: schema.shortURLs.shortURL,
        clicks: schema.shortURLs.clicks,
        createdAt: schema.shortURLs.createdAt,
      })
      .from(schema.shortURLs)
      .orderBy(asc(schema.shortURLs.id))
      .limit(pageSize)
      .offset(offset)

    if (rows.length === 0) break

    for (const row of rows) {
      csv += `"${row.originalURL}","${row.shortURL}",${row.clicks},"${format(
        row.createdAt,
        'yyyy-MM-dd HH:mm:ss'
      )}"\n`
    }

    if (rows.length < pageSize) break

    offset += pageSize
  }

  const fileName = `short-urls-${randomUUID()}.csv`

  await r2.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: csv,
      ContentType: 'text/csv',
    })
  )

  const cdnUrl = `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`

  return cdnUrl
}
