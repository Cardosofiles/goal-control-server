import { describe, expect, it } from 'vitest'

import { db } from '@/db'
import { users } from '@/db/schema'
import { createGoalCompletion } from '@/services/create-goal-completion'
import { makeGoal } from '@/test/factories/make-goal'
import { makeGoalCompletion } from '@/test/factories/make-goal-completion'
import { makeUser } from '@/test/factories/make-user'
import { eq } from 'drizzle-orm'

describe('creat goal completion', () => {
  it('should be able to complete a goal', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id })

    const result = await createGoalCompletion({
      userId: user.id,
      goalId: goal.id,
    })

    expect(result).toEqual({
      goalCompletion: expect.objectContaining({
        id: expect.any(String),
        goalId: goal.id,
      }),
    })
  })

  it('should not be able complete a gol more times then i expects', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id, desiredWeeklyFrequency: 1 })

    await makeGoalCompletion({ goalId: goal.id })

    await expect(
      createGoalCompletion({ userId: user.id, goalId: goal.id })
    ).rejects.toThrow()
  })

  it('should incrase user expirience by 5 when compliting a goal', async () => {
    const user = await makeUser({ experience: 0 })
    const goal = await makeGoal({ userId: user.id, desiredWeeklyFrequency: 5 })

    await createGoalCompletion({
      userId: user.id,
      goalId: goal.id,
    })

    const [userOnBd] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))

    expect(userOnBd.experience).toEqual(5)
  })

  it('should incrase user expirience by 7 when fully compliting a goal', async () => {
    const user = await makeUser({ experience: 0 })
    const goal = await makeGoal({ userId: user.id, desiredWeeklyFrequency: 1 })

    await createGoalCompletion({
      userId: user.id,
      goalId: goal.id,
    })

    const [userOnBd] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))

    expect(userOnBd.experience).toEqual(7)
  })
})
