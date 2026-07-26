import type { User } from "@/domain/types"

export interface MockUserRecord {
  user: User
  passwordHash?: string
  provider?: string
}

// Pre-computed SHA-256 hash for "Password123"
// 4865181775f0a0d644781dc41c2c4d935478ebbc608bd0b3fb08d43d1a4574dd
export const MOCK_USERS_DB: MockUserRecord[] = [
  {
    user: {
      id: "user-1",
      name: "Duo Learner",
      email: "user@duolingo.com",
      streak: 15,
      totalXp: 4500,
    },
    passwordHash: "4865181775f0a0d644781dc41c2c4d935478ebbc608bd0b3fb08d43d1a4574dd"
  }
]
