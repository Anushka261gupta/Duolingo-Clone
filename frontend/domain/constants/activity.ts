import { ActivityType } from "../types/activity"

export const ACTIVITY_CONFIG = {
  [ActivityType.LESSON_COMPLETED]: {
    icon: "🏆",
    defaultTitle: "Lesson Completed",
    defaultDescription: "You completed a lesson and earned XP!"
  },
  [ActivityType.QUEST_CLAIMED]: {
    icon: "🎯",
    defaultTitle: "Quest Completed",
    defaultDescription: "You claimed a quest reward."
  },
  [ActivityType.ACHIEVEMENT_UNLOCKED]: {
    icon: "🏅",
    defaultTitle: "Achievement Unlocked",
    defaultDescription: "You unlocked a new achievement!"
  },
  [ActivityType.SHOP_PURCHASE]: {
    icon: "🛍️",
    defaultTitle: "Shop Purchase",
    defaultDescription: "You bought an item from the shop."
  },
  [ActivityType.STREAK_MILESTONE]: {
    icon: "🔥",
    defaultTitle: "Streak Milestone",
    defaultDescription: "You hit a new streak milestone!"
  },
  [ActivityType.DOUBLE_XP_ACTIVATED]: {
    icon: "⚡",
    defaultTitle: "Double XP Activated",
    defaultDescription: "You activated a 30-minute Double XP boost!"
  }
}
