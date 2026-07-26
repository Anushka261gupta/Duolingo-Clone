import { Zap } from "lucide-react"

import { DuoCard } from "@/components/shared"

interface XpAwardCardProps {
  xpEarned: number
}

export function XpAwardCard({ xpEarned }: XpAwardCardProps) {
  return (
    <DuoCard className="flex flex-col items-center justify-center gap-2 py-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-duo-gold/15">
        <Zap className="size-7 fill-duo-gold text-duo-gold" strokeWidth={0} />
      </div>
      <p className="text-sm font-bold uppercase tracking-wide text-duo-gray">Total XP</p>
      <p className="text-3xl font-extrabold text-duo-gold">+{xpEarned} XP</p>
    </DuoCard>
  )
}
