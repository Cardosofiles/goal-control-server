import { z } from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authenticateUserHook } from '@/server/hooks/authenticate-user'
import { createGoalCompletion } from '@/services/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Complete a goal',
        body: z.object({
          goalId: z.string(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, replay) => {
      const userId = request.user.sub
      const { goalId } = request.body

      await createGoalCompletion({ userId, goalId })

      return replay.code(201).send()
    }
  )
}
