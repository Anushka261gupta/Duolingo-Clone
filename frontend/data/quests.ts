import { Trophy, Zap, Target, Star, Flame, Award, Medal } from "lucide-react"

import type { Quest, QuestData, XpGoal } from "@/domain/types"

export const MOCK_DAILY_QUESTS: Quest[] = [
  {
    id: "dq-1",
    label: "Earn 30 XP",
    current: 20,
    target: 30,
    icon: Zap,
    tint: "text-duo-gold",
    fill: "bg-duo-gold",
    status: "in_progress",
    reward: { type: "gems", amount: 10 }
  },
  {
    id: "dq-2",
    label: "Score 90% or higher in 3 lessons",
    current: 3,
    target: 3,
    icon: Trophy,
    tint: "text-duo-blue",
    fill: "bg-duo-blue",
    status: "completed",
    reward: { type: "gems", amount: 15 }
  },
  {
    id: "dq-3",
    label: "Find Lily 4 times",
    current: 4,
    target: 4,
    icon: Target,
    tint: "text-duo-purple",
    fill: "bg-duo-purple",
    status: "claimed",
    reward: { type: "gems", amount: 20 }
  },
]

export const MOCK_QUEST_DATA: QuestData = {
  dailyQuests: MOCK_DAILY_QUESTS,
  weeklyChallenge: {
    id: "wc-1",
    title: "Earn 200 XP",
    description: "Complete lessons to reach your weekly XP goal.",
    current: 120,
    target: 200,
    timeRemaining: "4 days",
    status: "in_progress",
    reward: { type: "gems", amount: 50, icon: Star }
  },
  monthlyChallenge: {
    id: "mc-1",
    title: "July Challenge",
    description: "Complete 30 Quests this month to earn an exclusive badge.",
    current: 15,
    target: 30,
    timeRemaining: "12 days",
    status: "in_progress",
    reward: { type: "badge", icon: Medal }
  },
  achievements: [
    {
      id: "ach-1",
      title: "Wildfire",
      description: "Reach a 30 day streak",
      current: 24,
      target: 30,
      timeRemaining: "No time limit",
      status: "in_progress",
      reward: { type: "gems", amount: 100, icon: Flame }
    },
    {
      id: "ach-2",
      title: "Sage",
      description: "Earn 1000 XP",
      current: 1000,
      target: 1000,
      timeRemaining: "No time limit",
      status: "completed",
      reward: { type: "gems", amount: 50, icon: Award }
    },
    {
      id: "ach-3",
      title: "Scholar",
      description: "Learn 50 new words",
      current: 10,
      target: 50,
      timeRemaining: "No time limit",
      status: "locked",
      reward: { type: "gems", amount: 20, icon: Award }
    }
  ]
}

export const MOCK_XP_GOAL: XpGoal = {
  current: 40,
  target: 50,
}
