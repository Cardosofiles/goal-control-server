import { z } from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authenticateFromGithubCode } from '@/services/authenticate-from-github-code'

export const authenticateFromGithubRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/auth/github',
    {
      schema: {
        tags: ['auth'],
        description: 'Authenticate from GitHub user code',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const { token } = await authenticateFromGithubCode({ code })

      return reply.code(201).send({ token })
    }
  )
}

//http://github.com/login/oauth/authorize?client_id=Iv23li2o7vpC5KSJ4oRT&redirect_uri=http://localhost:3000/auth/github/callback
