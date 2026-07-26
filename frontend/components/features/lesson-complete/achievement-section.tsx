import { Trophy } from "lucide-react"

import { DuoCard } from "@/components/shared"
import type { Achievement } from "@/domain/types/lesson-complete"

interface AchievementSectionProps {
  achievement: Achievement
}

export function AchievementSection({ achievement }: AchievementSectionProps) {
  if (!achievement.unlocked) return null

  return (
    <DuoCard className="border-duo-gold/40 bg-duo-gold/5">
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-duo-gold/20 text-3xl">
          {achievement.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Trophy className="size-5 fill-duo-gold text-duo-gold" strokeWidth={0} />
            <p className="text-xs font-bold uppercase tracking-widest text-duo-gold">New achievement</p>
          </div>
          <h3 className="text-lg font-extrabold text-duo-ink">{achievement.title}</h3>
          <p className="mt-1 text-sm font-semibold text-duo-gray">{achievement.description}</p>
        </div>
      </div>
    </DuoCard>
  )
}
