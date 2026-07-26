export interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  color: string
  medal: string
  you?: boolean
  id?: string
  avatarUrl?: string
  trend?: "up" | "down" | "same"
  zone?: "promotion" | "demotion" | "safe"
}

export interface LeagueInfo {
  name: string
  icon: string
  color: string
}

export interface WeeklyLeaderboard {
  league: LeagueInfo
  resetDate: string
  entries: LeaderboardEntry[]
}
