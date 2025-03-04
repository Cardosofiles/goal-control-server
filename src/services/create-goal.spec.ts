import { describe, expect, it } from 'vitest'

import { createGoal } from '@/services/create-goal'
import { makeUser } from '@/test/factories/make-user'

describe('creat goal', () => {
  it('should be able to create a new goal', async () => {
    const user = await makeUser()

    const result = await createGoal({
      userId: user.id,
      title: 'Example Goal',
      desiredWeeklyFrequency: 5,
    })

    expect(result).toEqual({
      goal: expect.objectContaining({
        userId: expect.any(String),
        title: 'Example Goal',
        desiredWeeklyFrequency: 5,
      }),
    })
  })
})
