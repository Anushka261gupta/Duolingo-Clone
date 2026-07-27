import { Zap } from "lucide-react"

import { AnimatedCounter, DuoCard } from "@/components/shared"

interface XpAwardCardProps {
  xpEarned: number
  breakdown?: any // accepting any to gracefully handle legacy payloads and new payloads
}

export function XpAwardCard({ xpEarned, breakdown }: XpAwardCardProps) {
  // Graceful handling of both legacy and new breakdown structures
  const isLegacy = breakdown && 'multiplier' in breakdown
  const baseLesson = isLegacy ? 10 : (breakdown?.baseLesson || 0)
  const exercise = isLegacy ? (breakdown?.base - 10) : (breakdown?.exercise || 0)
  const doubleXpBonus = isLegacy ? breakdown?.bonus : (breakdown?.doubleXpBonus || 0)
  
  const hasMultipleSources = (baseLesson > 0 ? 1 : 0) + (exercise > 0 ? 1 : 0) + (doubleXpBonus > 0 ? 1 : 0) > 1

  return (
    <DuoCard className="flex flex-col items-center justify-center gap-0 py-8 text-center bg-duo-gold/5 border-duo-gold/30">
      <div className="flex flex-col items-center gap-0 w-full">
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
        
        <p className="text-sm font-bold uppercase tracking-wide text-duo-gold/80 mb-6 mt-1">
          Total Earned
        </p>
        
        {breakdown && hasMultipleSources && (
          <div className="flex flex-col gap-2 w-full max-w-[260px] border-t-2 border-duo-gold/20 pt-4 text-left">
            {baseLesson > 0 && (
              <div className="flex justify-between text-sm font-bold text-duo-gold/70 border-b border-duo-gold/10 pb-2 border-dashed">
                <span>Base Lesson XP</span>
                <span>+{baseLesson} XP</span>
              </div>
            )}
            {exercise > 0 && (
              <div className="flex justify-between text-sm font-bold text-duo-gold/70 border-b border-duo-gold/10 pb-2 border-dashed">
                <span>Exercise XP</span>
                <span>+{exercise} XP</span>
              </div>
            )}
            {doubleXpBonus > 0 && (
              <div className="flex justify-between text-sm font-bold text-duo-gold/70 border-b border-duo-gold/10 pb-2 border-dashed">
                <span>Double XP Bonus</span>
                <span>+{doubleXpBonus} XP</span>
              </div>
            )}
          </div>
        )}
      </div>
    </DuoCard>
  )
}
