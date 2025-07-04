import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { shortenURL } from '@/app/functions/shorten-url'

export const shortenURLRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/shortenURL',
    {
      schema: {
        summary: 'Short an URL',
        body: z.object({
          originalURL: z.string().url(),
          shortURL: z.string(),
        }),
        response: {
          201: z.object({ shortURL: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const bodySchema = z.object({
        originalURL: z.string().url(),
        shortURL: z.string()
      })
        
      const { originalURL, shortURL } = bodySchema.parse(request.body)

      if (!originalURL || !shortURL) {
        return reply.status(400).send({ message: 'Original URL and Short URL is required.' })
      }

      await shortenURL({
        originalURL: originalURL,
        shortURL: shortURL,
      })

      return reply.status(201).send({ shortURL: 'teste' })
    }
  )
}
