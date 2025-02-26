import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { getWeekSummary } from '@/services/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/summary',
    {
      schema: {
        tags: ['goals'],
        description: 'Get week summary',
        response: {
          200: z.object({
            summary: z.object({
              completed: z.number(),
              total: z.number(),
              goalsPerDay: z.record(
                z.string(),
                z.array(
                  z.object({
                    id: z.string(),
                    title: z.string(),
                    completedAt: z.string(),
                  })
                )
              ),
            }),
          }),
        },
      },
    },
    async () => {
      const { summary } = await getWeekSummary()

      return { summary }
    }
  )
}
