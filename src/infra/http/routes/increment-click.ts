import { incrementClicks } from '@/app/functions/increment-click'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const incrementClicksRoute: FastifyPluginAsyncZod = async server => {
  server.patch(
    '/incrementClicks/:shortURL',
    {
      schema: {
        summary: 'Increment click count of a shortened URL',
        params: z.object({
          shortURL: z.string(),
        }),
        response: {
          200: z.object({ message: z.string(), clicks: z.number() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const paramsSchema = z.object({
        shortURL: z.string(),
      })

      const { shortURL } = paramsSchema.parse(request.params)

      const clicks = await incrementClicks({ shortURL })

      if (clicks === null) {
        return reply.status(404).send({ message: 'Short URL not found.' })
      }

      return reply
        .status(200)
        .send({ message: 'Click count incremented.', clicks })
    }
  )
}
