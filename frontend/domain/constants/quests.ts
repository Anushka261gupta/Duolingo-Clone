import { Zap, Star, Medal } from "lucide-react"
import { QUEST_REWARDS } from "./rewards"

export const QUEST_CONFIG = {
  DAILY_XP: {
    id: "quest-daily-xp",
    title: "Earn 30 XP",
    target: 30,
    rewardAmount: QUEST_REWARDS.DAILY_XP,
    rewardType: "gems",
    icon: Zap,
    tint: "text-duo-gold",
    fill: "bg-duo-gold",
  },
  WEEKLY_CHALLENGE: {
    id: "quest-weekly-xp",
    title: "Earn 200 XP",
    description: "Complete lessons to reach your weekly XP goal.",
    target: 200,
    rewardAmount: QUEST_REWARDS.WEEKLY_XP,
    rewardType: "gems",
    icon: Star,
    tint: "text-duo-blue",
    fill: "bg-duo-blue",
  },
  MONTHLY_CHALLENGE: {
    id: "quest-monthly-xp",
    title: "Monthly Challenge",
    description: "Complete lessons to reach your monthly XP goal.",
    target: 1000,
    rewardAmount: QUEST_REWARDS.MONTHLY_XP,
    rewardType: "gems",
    icon: Medal,
    tint: "text-duo-purple",
    fill: "bg-duo-purple",
  }
} as const
