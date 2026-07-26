import type { LucideIcon } from "lucide-react"

export interface Quest {
  id?: string
  label: string
  current: number
  target: number
  icon: LucideIcon
  tint: string
  fill: string
  status?: 'locked' | 'in_progress' | 'completed' | 'claimed'
  reward?: {
    type: 'xp' | 'gems'
    amount: number
  }
}

export interface Challenge {
  id: string
  title: string
  description: string
  current: number
  target: number
  timeRemaining: string
  status: 'locked' | 'in_progress' | 'completed' | 'claimed'
  reward: {
    type: 'xp' | 'gems' | 'badge'
    amount?: number
    icon?: LucideIcon
  }
}

export interface QuestData {
  dailyQuests: Quest[]
  weeklyChallenge: Challenge
  monthlyChallenge: Challenge
  achievements: Challenge[]
}

export interface XpGoal {
  current: number
  target: number
}
