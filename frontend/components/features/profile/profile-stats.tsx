import { Flame, Zap, Calendar } from "lucide-react"
import { StatisticsGrid } from "./statistics-grid"

interface ProfileStatsProps {
  streak: number
  longestStreak?: number
  daysActive?: number
  totalXp: number
  hearts: number
  gems: number
  completedLessons: number
  completedUnits: number
}

export function ProfileStats({
  streak,
  longestStreak = streak,
  daysActive = streak,
  totalXp,
  hearts,
  gems,
  completedLessons,
  completedUnits
}: ProfileStatsProps) {
  const stats = [
    {
      label: "Day streak",
      value: streak,
      icon: <Flame className="size-6 fill-duo-gold text-duo-gold" strokeWidth={0} />,
      color: "text-duo-gold"
    },
    {
      label: "Longest streak",
      value: longestStreak,
      icon: <Flame className="size-6 text-duo-gold" strokeWidth={2.5} />,
      color: "text-duo-gold"
    },
    {
      label: "Total XP",
      value: totalXp,
      icon: <Zap className="size-6 fill-duo-gold text-duo-gold" strokeWidth={0} />,
      color: "text-duo-gold"
    },
    {
      label: "Days active",
      value: daysActive,
      icon: <Calendar className="size-6 text-duo-blue" strokeWidth={2.5} />,
      color: "text-duo-blue"
    },
    {
      label: "Hearts",
      value: hearts,
      icon: <div className="text-xl">❤️</div>,
      color: "text-red-500"
    },
    {
      label: "Gems",
      value: gems,
      icon: <div className="text-xl">💎</div>,
      color: "text-sky-500"
    },
    {
      label: "Lessons completed",
      value: completedLessons,
      icon: <div className="text-xl">📚</div>,
      color: "text-emerald-500"
    },
    {
      label: "Units completed",
      value: completedUnits,
      icon: <div className="text-xl">🏆</div>,
      color: "text-yellow-500"
    }
  ]

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-extrabold text-foreground">Statistics</h2>
      <StatisticsGrid stats={stats} />
    </div>
  )
}
