import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getOriginalURL } from '@/app/functions/get-original-url'

export const getOriginalURLRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/getOriginalURL/:shortURL',
    {
      schema: {
        summary: 'Get original URL from shortened URL',
        params: z.object({
          shortURL: z.string(),
        }),
        response: {
          200: z.object({ originalURL: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const paramsSchema = z.object({
        shortURL: z.string(),
      })

      const { shortURL } = paramsSchema.parse(request.params)

      const originalURL = await getOriginalURL({ shortURL })

      if (!originalURL) {
        return reply.status(404).send({ message: 'Short URL not found.' })
      }

      return reply.status(200).send({ originalURL })
    }
  )
}
