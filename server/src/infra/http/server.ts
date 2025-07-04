import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { shortenURLRoute } from './routes/shorten-url'
import { deleteShortURLRoute } from './routes/delete-url'
import { getOriginalURLRoute } from './routes/get-original-url'
import { listShortURLsRoute } from './routes/list-short-url'
import { incrementClicksRoute } from './routes/increment-click'
import { exportShortURLsRoute } from './routes/export-url-to-csv'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.validation,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error teste.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0',
    },
  }
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(shortenURLRoute)
server.register(deleteShortURLRoute)
server.register(getOriginalURLRoute)
server.register(listShortURLsRoute)
server.register(incrementClicksRoute)
server.register(exportShortURLsRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
