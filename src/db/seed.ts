import { client, db } from '@/db'
import { goalCompletions, goals } from '@/db/schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  // const [user] = await db
  //   .insert(users)
  //   .values({
  //     name: 'John Doe',
  //     externalAccountId: 113213,
  //     avatarUrl: 'https://github.com/cardosofiles.png',
  //   })
  //   .returning()

  // const result = await db
  //   .insert(goals)
  //   .values([
  //     {
  //       userId: user.id,
  //       title: 'Praticar exercícios',
  //       desiredWeeklyFrequency: 6,
  //     },
  //     { userId: user.id, title: 'Estudar Node.js', desiredWeeklyFrequency: 5 },
  //   ])
  //   .returning()

  // const startOfWeek = dayjs().startOf('week')

  // await db.insert(goalCompletions).values([
  //   { goalId: result[0].id, createdAt: startOfWeek.toDate() },
  //   { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  // ])
}

seed().finally(() => {
  client.end()
})
