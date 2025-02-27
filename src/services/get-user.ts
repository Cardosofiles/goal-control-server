import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'

interface GetUserService {
  userId: string
}

export async function getUser({ userId }: GetUserService) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
    })
    .from(users)
    .where(eq(users.id, userId))

  const user = result[0]

  return {
    user,
  }
}
