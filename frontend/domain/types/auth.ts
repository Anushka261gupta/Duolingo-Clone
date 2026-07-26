export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  streak: number
  totalXp: number
}

export interface AuthResponse {
  user?: User
  error?: string
}

export interface LoginPayload {
  email: string
  password?: string // password might be omitted if social login
  provider?: "google" | "apple"
}

export interface SignupPayload {
  name: string
  email: string
  password?: string
  provider?: "google" | "apple"
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<AuthResponse>
  signup: (payload: SignupPayload) => Promise<AuthResponse>
  logout: () => void
}
