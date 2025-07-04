import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteShortURL } from '@/app/functions/delete-short-url'

export const deleteShortURLRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/deleteURL',
    {
      schema: {
        summary: 'Delete a shortened URL',
        body: z.object({
          shortURL: z.string(),
        }),
        response: {
          200: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const bodySchema = z.object({
        shortURL: z.string(),
      })

      const { shortURL } = bodySchema.parse(request.body)

      if (!shortURL) {
        return reply.status(404).send({ message: 'Short URL is required.' })
      }

      const deleted = await deleteShortURL({ shortURL })      

      if (!deleted) {
        return reply.status(404).send({ message: 'Short URL not found.' })
      }

      return reply
        .status(200)
        .send({ message: 'Short URL deleted successfully.' })
    }
  )
}
