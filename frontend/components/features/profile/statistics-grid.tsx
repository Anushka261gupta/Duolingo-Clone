import { Flame, Zap, Heart, Gem, CheckCircle, Target } from "lucide-react"
import { StatBadge } from "@/components/shared"
import type { UserProfile } from "@/domain/types/profile"

interface StatisticsGridProps {
  streak: number
  totalXp: number
  hearts: number
  gems: number
  completedLessons: number
  completedUnits: number
}

export function StatisticsGrid({
  streak,
  totalXp,
  hearts,
  gems,
  completedLessons,
  completedUnits,
}: StatisticsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl border-2 border-duo-gray-light p-4">
        <StatBadge
          icon={<Flame className="size-6 fill-duo-gold text-duo-gold" strokeWidth={0} />}
          value={streak}
          color="text-foreground"
          label="Day streak"
        />
      </div>
      <div className="rounded-2xl border-2 border-duo-gray-light p-4">
        <StatBadge
          icon={<Zap className="size-6 fill-duo-gold text-duo-gold" strokeWidth={0} />}
          value={totalXp}
          color="text-foreground"
          label="Total XP"
        />
      </div>
      <div className="rounded-2xl border-2 border-duo-gray-light p-4">
        <StatBadge
          icon={<Heart className="size-6 fill-duo-red text-duo-red" strokeWidth={0} />}
          value={hearts}
          color="text-foreground"
          label="Hearts"
        />
      </div>
      <div className="rounded-2xl border-2 border-duo-gray-light p-4">
        <StatBadge
          icon={<Gem className="size-6 fill-duo-blue text-duo-blue" strokeWidth={0} />}
          value={gems}
          color="text-foreground"
          label="Gems"
        />
      </div>
      <div className="rounded-2xl border-2 border-duo-gray-light p-4">
        <StatBadge
          icon={<CheckCircle className="size-6 text-duo-green" strokeWidth={2.5} />}
          value={completedLessons}
          color="text-foreground"
          label="Lessons"
        />
      </div>
      <div className="rounded-2xl border-2 border-duo-gray-light p-4">
        <StatBadge
          icon={<Target className="size-6 text-duo-purple" strokeWidth={2.5} />}
          value={completedUnits}
          color="text-foreground"
          label="Units"
        />
      </div>
    </div>
  )
}
