import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getWeekPendingGoals } from '@/services/get-week-pending-goals'
import z from 'zod'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pending-goals',
    {
      schema: {
        tags: ['goals'],
        description: 'Get pending goals for the week',
        response: {
          200: z.object({
            pendingGoals: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                desiredWeeklyFrequency: z.number().int().min(1).max(7),
                completionCount: z.number(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const { pendingGoals } = await getWeekPendingGoals()

      return { pendingGoals }
    }
  )
}
