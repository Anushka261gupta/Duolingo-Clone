export interface StreakProgress {
  current: number
  target: number
  label: string
}

export interface Achievement {
  unlocked: boolean
  title: string
  description: string
  icon: string
}

export interface LessonCompleteSummary {
  xpEarned: number
  accuracy: number
  heartsRemaining: number
  maxHearts: number
  streak: StreakProgress
  achievement: Achievement
}
