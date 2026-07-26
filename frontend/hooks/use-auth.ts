import { useState, useEffect } from "react"
import type { LoginPayload, SignupPayload, AuthResponse } from "@/domain/types"
import { MOCK_USERS_DB, type MockUserRecord } from "@/data/auth"

async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [db, setDb] = useState<MockUserRecord[]>([])

  useEffect(() => {
    // Initialize DB from localStorage or seed it
    const stored = localStorage.getItem("users")
    if (stored) {
      setDb(JSON.parse(stored))
    } else {
      setDb(MOCK_USERS_DB)
      localStorage.setItem("users", JSON.stringify(MOCK_USERS_DB))
    }
  }, [])

  const saveDb = (newDb: MockUserRecord[]) => {
    setDb(newDb)
    localStorage.setItem("users", JSON.stringify(newDb))
  }

  const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    if (payload.provider) {
      // Social login simulation
      let record = db.find(r => r.user.email === payload.email && r.provider === payload.provider)
      if (!record) {
         // Auto signup for social
         record = {
           user: {
             id: `user-${Date.now()}`,
             name: "Social User",
             email: payload.email || `social-${Date.now()}@example.com`,
             streak: 0,
             totalXp: 0
           },
           provider: payload.provider
         }
         saveDb([...db, record])
      }
      return { user: record.user }
    }

    if (!payload.password) return { error: "Password required" }

    const record = db.find(r => r.user.email === payload.email && !r.provider)
    if (!record) return { error: "Invalid email or password." }

    const hash = await hashPassword(payload.password)
    if (record.passwordHash !== hash) {
      return { error: "Invalid email or password." }
    }

    return { user: record.user }
  }

  const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    if (payload.provider) {
       // Handled similarly to login in this mock
       return login({ email: payload.email, provider: payload.provider })
    }

    const exists = db.find(r => r.user.email === payload.email)
    if (exists) {
      return { error: "Email already in use." }
    }

    if (!payload.password) return { error: "Password required" }

    const hash = await hashPassword(payload.password)
    const newRecord: MockUserRecord = {
      user: {
        id: `user-${Date.now()}`,
        name: payload.name,
        email: payload.email,
        streak: 0,
        totalXp: 0,
      },
      passwordHash: hash
    }

    saveDb([...db, newRecord])

    return { user: newRecord.user }
  }

  return { login, signup, isLoading }
}
