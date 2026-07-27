import { fetchApi } from "./api"
import { UserProfileResponse } from "./user-service"

export const LeaderboardService = {
  async getLeaderboard(limit: number = 10, offset: number = 0): Promise<UserProfileResponse[]> {
    return fetchApi<UserProfileResponse[]>(`/leaderboard?limit=${limit}&offset=${offset}`)
  }
}
