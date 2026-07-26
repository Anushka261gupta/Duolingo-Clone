export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  isUnlocked: boolean
  progress: number
  total: number
}

export interface Activity {
  id: string
  title: string
  timestamp: string
  icon: string
}

export interface DailyGoal {
  current: number
  target: number
}

export interface Language {
  code: string
  name: string
  flagIcon: string
}

export interface UserProfile {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  joinDate: string
  streak: number
  totalXp: number
  hearts: number
  gems: number
  completedLessons: number
  completedUnits: number
  dailyGoal: DailyGoal
  currentLanguage: Language
  achievements: Achievement[]
  recentActivity: Activity[]
}
