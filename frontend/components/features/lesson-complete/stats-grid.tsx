import { Flame, Heart, Target } from "lucide-react"

import { DuoCard, ProgressBar } from "@/components/shared"
import type { StreakProgress } from "@/domain/types/lesson-complete"

interface StatsGridProps {
  accuracy: number
  heartsRemaining: number
  maxHearts: number
  correctAnswers: number
  incorrectAnswers: number
}

export function StatsGrid({ accuracy, heartsRemaining, maxHearts, correctAnswers, incorrectAnswers }: StatsGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      <DuoCard className="flex flex-col items-center gap-2 py-5 text-center">
        <div className="flex size-11 items-center justify-center rounded-xl bg-duo-blue/10">
          <Target className="size-6 text-duo-blue" strokeWidth={2.5} />
        </div>
        <p className="text-sm font-bold uppercase tracking-wide text-duo-gray">Accuracy</p>
        <p className="text-2xl font-extrabold text-duo-ink">{accuracy}%</p>
      </DuoCard>

      <DuoCard className="flex flex-col items-center gap-2 py-5 text-center">
        <div className="flex items-center gap-0.5" aria-label={`${heartsRemaining} hearts remaining`}>
          {Array.from({ length: maxHearts }).map((_, i) => (
            <Heart
              key={i}
              className={`size-5 ${
                i < heartsRemaining
                  ? "fill-duo-red text-duo-red"
                  : "fill-duo-gray-light text-duo-gray-light"
              }`}
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-sm font-bold uppercase tracking-wide text-duo-gray">Hearts left</p>
        <p className="text-2xl font-extrabold text-duo-ink">
          {heartsRemaining}/{maxHearts}
        </p>
      </DuoCard>

      <DuoCard className="flex flex-col items-center gap-2 py-5 text-center">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-duo-green/15 text-duo-green font-bold">
            {correctAnswers}
          </div>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-duo-red/15 text-duo-red font-bold">
            {incorrectAnswers}
          </div>
        </div>
        <p className="text-sm font-bold uppercase tracking-wide text-duo-gray">Answers</p>
        <p className="text-lg font-extrabold text-duo-ink text-center flex gap-1">
          <span className="text-duo-green">Correct</span> / <span className="text-duo-red">Incorrect</span>
        </p>
      </DuoCard>
    </div>
  )
}
