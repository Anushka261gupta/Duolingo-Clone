import { Zap } from "lucide-react"

import { AnimatedCounter, DuoCard } from "@/components/shared"

interface XpAwardCardProps {
  xpEarned: number
}

export function XpAwardCard({ xpEarned }: XpAwardCardProps) {
  return (
    <DuoCard className="flex flex-col items-center justify-center gap-2 py-8 text-center bg-duo-gold/5 border-duo-gold/30">
      <div className="flex items-baseline justify-center gap-2">
        <span className="text-xl font-extrabold text-duo-gold">+</span>
        <AnimatedCounter 
          value={xpEarned} 
          durationMs={1200}
          startFromZero={true}
          className="text-6xl font-extrabold tracking-tighter text-duo-gold animate-duo-pop" 
        />
        <span className="text-2xl font-extrabold text-duo-gold">XP</span>
      </div>
      <p className="text-sm font-bold uppercase tracking-wide text-duo-gold/80 mt-2">
        Lesson Complete
      </p>
    </DuoCard>
  )
}
