"use client"

import { Zap } from "lucide-react"

import { DuoCard } from "@/components/shared"
import { useXP } from "@/providers/xp-provider"

export function XpGoal() {
  const { dailyXP } = useXP()
  const target = 50
  const pct = Math.min(100, Math.round((dailyXP / target) * 100))

  return (
    <DuoCard>
      <h3 className="mb-4 text-lg font-extrabold text-duo-ink">Daily XP Goal</h3>
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-duo-gold/15">
          <Zap className="size-6 fill-duo-gold text-duo-gold" strokeWidth={0} />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm font-bold text-duo-ink">{dailyXP} XP earned</span>
            <span className="text-xs font-bold text-duo-gray">{target} XP</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-duo-gray-light">
            <div className="h-full rounded-full bg-duo-gold transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </DuoCard>
  )
}
