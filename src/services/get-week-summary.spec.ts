import { describe, it } from 'vitest'

import { getWeekSummary } from '@/services/get-week-summary'
import { makeGoal } from '@/test/factories/make-goal'
import { makeGoalCompletion } from '@/test/factories/make-goal-completion'
import { makeUser } from '@/test/factories/make-user'
import dayjs from 'dayjs'

describe('get week summary', () => {
  it('should be able to get week summary', async () => {
    const user = await makeUser()

    const weekStartsAt = dayjs(new Date(2025, 3, 3))
      .startOf('week')
      .toDate()

    const goal1 = await makeGoal({
      userId: user.id,
      title: 'Meditar',
      desiredWeeklyFrequency: 2,
    })

    const goal2 = await makeGoal({
      userId: user.id,
      title: 'Nadar',
      desiredWeeklyFrequency: 1,
    })

    const goal3 = await makeGoal({
      userId: user.id,
      title: 'Ler',
      desiredWeeklyFrequency: 3,
    })

    await makeGoalCompletion({
      goalId: goal1.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal2.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })

    const result = await getWeekSummary({
      userId: user.id,
      weekStartsAt,
    })

    // expect(result).toEqual({
    //   pendingGoals: expect.arrayContaining([
    //     expect.objectContaining({
    //       title: 'Meditar',
    //       desiredWeeklyFrequency: 2,
    //       completionCount: 1,
    //     }),
    //     expect.objectContaining({
    //       title: 'Nadar',
    //       desiredWeeklyFrequency: 1,
    //       completionCount: 1,
    //     }),
    //     expect.objectContaining({
    //       title: 'Ler',
    //       desiredWeeklyFrequency: 3,
    //       completionCount: 2,
    //     }),
    //   ]),
    // })
  })
})
