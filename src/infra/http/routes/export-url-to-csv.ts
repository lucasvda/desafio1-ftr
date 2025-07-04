import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { exportShortURLs } from '@/app/functions/export-url-to-csv'

export const exportShortURLsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/exportShortURLs',
    {
      schema: {
        summary: 'Export all shortened URLs as CSV and upload to CDN',
        response: {
          200: z.object({ url: z.string() }),
        },
      },
    },
    async (_request, reply) => {
      const url = await exportShortURLs()
      return reply.status(200).send({ url })
    }
  )
}
