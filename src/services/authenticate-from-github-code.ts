import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'
import { authenticateUser } from '@/modules/auth'
import {
  getAccessTokenFromCode,
  getUserFromAccessToken,
} from '@/modules/github-oauth'

interface AuthenticateFromGithubService {
  code: string
}

export async function authenticateFromGithubCode({
  code,
}: AuthenticateFromGithubService) {
  const accessToken = await getAccessTokenFromCode(code)
  const githubUser = await getUserFromAccessToken(accessToken)

  const result = await db
    .select()
    .from(users)
    .where(eq(users.externalAccountId, githubUser.id))

  let userId: string | null

  const userAlredyExists = result.length > 0

  if (!userAlredyExists) {
    userId = result[0].id
  } else {
    const [insertedUser] = await db
      .insert(users)
      .values({
        name: githubUser.name,
        email: githubUser.email,
        avatarUrl: githubUser.avatar_url,
        externalAccountId: githubUser.id,
      })
      .returning()

    userId = insertedUser.id
  }

  const token = await authenticateUser(userId)

  return {
    token,
  }
}
