import { db } from '@/db'
import { goals } from '@/db/schema'

interface createGoalService {
  userId: string
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  userId,
  title,
  desiredWeeklyFrequency,
}: createGoalService) {
  const result = await db
    .insert(goals)
    .values({
      userId,
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
