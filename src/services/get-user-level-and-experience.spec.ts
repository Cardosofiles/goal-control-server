import { describe, expect, it } from 'vitest'

import {
  calculateExperienceForNextLevel,
  calculateLevelFromExperience,
} from '@/modules/gamification'
import { getUserLevelAndExperience } from '@/services/get-user-level-and-experience'
import { makeUser } from '@/test/factories/make-user'

describe('get user level and experience', () => {
  it('should be able to get a user level and experience', async () => {
    const user = await makeUser({
      experience: 200,
    })

    const sut = await getUserLevelAndExperience({ userId: user.id })

    const level = calculateLevelFromExperience(200)

    expect(sut).toEqual({
      experience: 200,
      level: level,
      experienceToNextLevel: calculateExperienceForNextLevel(level),
    })
  })
})
