import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { env } from '@/env'
import { authenticateFromGithubRoute } from '@/server/routes/authenticate-from-github'
import { createCompletionRoute } from '@/server/routes/create-completion'
import { createGoalRoute } from '@/server/routes/create-goal'
import { getPendingGoalsRoute } from '@/server/routes/get-pending-goals'
import { getProfileRoute } from '@/server/routes/get-profile'
import { getUserExperienceAndLevelRoute } from '@/server/routes/get-user-experience-and-level'
import { getWeekSummaryRoute } from '@/server/routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      version: '1.0.0',
      title: 'Goal Tracker API',
      description: 'API for tracking and managing goals',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(createGoalRoute)
app.register(getPendingGoalsRoute)
app.register(createCompletionRoute)
app.register(getWeekSummaryRoute)
app.register(authenticateFromGithubRoute)
app.register(getProfileRoute)
app.register(getUserExperienceAndLevelRoute)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running 🔥')
  })

if (env.NODE_ENV === 'development') {
  const specFile = resolve(__dirname, '../../swagger.json')

  app.ready().then(() => {
    const spec = JSON.stringify(app.swagger(), null, 2)

    writeFile(specFile, spec).then(() => {
      console.log(`�� Swagger documentation generated at ${specFile} ��`)
    })
  })
}
