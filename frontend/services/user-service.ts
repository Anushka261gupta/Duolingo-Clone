import { fetchApi } from "./api"

export interface UserProfileResponse {
  id: string
  username: string
  email: string
  avatar: string | null
  language: string
  xp: number
  daily_xp: number
  weekly_xp: number
  monthly_xp: number
  gems: number
  hearts: number
  max_hearts: number
  streak: number
  longest_streak: number
  created_at: string
  updated_at: string
}

export const UserService = {
  async getDemoUser(): Promise<UserProfileResponse> {
    return fetchApi<UserProfileResponse>("/users/demo")
  }
}
