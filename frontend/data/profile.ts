import type { UserProfile } from "@/domain/types/profile"

export const mockUserProfile: UserProfile = {
  id: "user_123",
  username: "duo_learner_99",
  displayName: "Alex",
  avatarUrl: "https://github.com/shadcn.png", // Using a placeholder for now
  joinDate: "August 2023",
  streak: 14,
  totalXp: 12500,
  hearts: 5,
  gems: 350,
  completedLessons: 120,
  completedUnits: 15,
  dailyGoal: {
    current: 35,
    target: 50,
  },
  currentLanguage: {
    code: "es",
    name: "Spanish",
    flagIcon: "🇪🇸",
  },
  achievements: [
    {
      id: "ach_1",
      title: "Wildfire",
      description: "Reach a 14 day streak",
      icon: "🔥",
      isUnlocked: true,
      progress: 14,
      total: 14,
    },
    {
      id: "ach_2",
      title: "Sage",
      description: "Earn 15000 XP",
      icon: "🦉",
      isUnlocked: false,
      progress: 12500,
      total: 15000,
    },
    {
      id: "ach_3",
      title: "Scholar",
      description: "Learn 500 new words",
      icon: "📚",
      isUnlocked: true,
      progress: 500,
      total: 500,
    },
  ],
  recentActivity: [
    {
      id: "act_1",
      title: "Completed a lesson in Spanish",
      timestamp: "2 hours ago",
      icon: "✅",
    },
    {
      id: "act_2",
      title: "Earned the Wildfire achievement!",
      timestamp: "Yesterday",
      icon: "🏆",
    },
    {
      id: "act_3",
      title: "Advanced to Unit 16",
      timestamp: "3 days ago",
      icon: "🚀",
    },
  ],
}
