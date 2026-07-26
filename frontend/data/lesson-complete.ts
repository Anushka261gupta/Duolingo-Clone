import type { LessonCompleteSummary } from "@/domain/types/lesson-complete"

export const MOCK_LESSON_COMPLETE: LessonCompleteSummary = {
  xpEarned: 30,
  accuracy: 92,
  heartsRemaining: 4,
  maxHearts: 5,
  streak: {
    current: 7,
    target: 7,
    label: "Day streak",
  },
  achievement: {
    unlocked: true,
    title: "Sharpshooter",
    description: "Reach 90% accuracy in a lesson",
    icon: "🎯",
  },
}
