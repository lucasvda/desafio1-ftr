import { listShortURLs } from '@/app/functions/list-short-url'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const listShortURLsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/listShortURLs',
    {
      schema: {
        summary: 'List all shortened URLs',
        response: {
          200: z.object({
            urls: z.array(
              z.object({
                id: z.string().uuid(),
                originalURL: z.string(),
                shortURL: z.string(),
                clicks: z.number(),
                createdAt: z.date()
              })
            ),
          }),
        },
      },
    },
    async (_request, reply) => {
      const urls = await listShortURLs()
      return reply.status(200).send({ urls })
    }
  )
}
