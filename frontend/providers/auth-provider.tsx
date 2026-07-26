"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User, LoginPayload, SignupPayload, AuthResponse, AuthContextType } from "@/domain/types"
import { useAuth as useAuthMock } from "@/hooks/use-auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { login: mockLogin, signup: mockSignup, isLoading } = useAuthMock()
  
  const [user, setUser] = useState<User | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  // Session Persistence on Startup
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("currentUser")
      }
    }
    setIsInitializing(false)
  }, [])

  const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await mockLogin(payload)
    if (response.user) {
      setUser(response.user)
      localStorage.setItem("currentUser", JSON.stringify(response.user))
      // Redirect to home after login
      router.push("/")
    }
    return response
  }

  const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
    const response = await mockSignup(payload)
    if (response.user) {
      setUser(response.user)
      localStorage.setItem("currentUser", JSON.stringify(response.user))
      // Redirect to home after signup
      router.push("/")
    }
    return response
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  // Prevent rendering children while checking localStorage to avoid flicker
  if (isInitializing) return null

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
