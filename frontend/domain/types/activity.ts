export enum ActivityType {
  LESSON_COMPLETED = "LESSON_COMPLETED",
  QUEST_CLAIMED = "QUEST_CLAIMED",
  ACHIEVEMENT_UNLOCKED = "ACHIEVEMENT_UNLOCKED",
  SHOP_PURCHASE = "SHOP_PURCHASE",
  STREAK_MILESTONE = "STREAK_MILESTONE",
  DOUBLE_XP_ACTIVATED = "DOUBLE_XP_ACTIVATED",
}

export interface ActivityMetadata {
  lessonId?: string
  questId?: string
  achievementId?: string
  shopItemId?: string
  xpEarned?: number
}

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  metadata?: ActivityMetadata
}
