import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'

interface DeleteUserService {
  userId: string
}

export async function deleteUser({ userId }: DeleteUserService) {
  const result = await db.delete(users).where(eq(users.id, userId))

  // Verificar se o número de registros deletados é maior que 0
  if (result.count === 0) {
    // Drizzle ORM retorna um objeto com a propriedade 'count'
    throw new Error('User not found or already deleted')
  }

  return { success: true }
}
