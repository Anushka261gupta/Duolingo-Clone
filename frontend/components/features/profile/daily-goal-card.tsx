import { DuoCard, ProgressBar } from "@/components/shared"
import type { DailyGoal } from "@/domain/types/profile"

interface DailyGoalCardProps {
  goal: DailyGoal
}

export function DailyGoalCard({ goal }: DailyGoalCardProps) {
  return (
    <DuoCard>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-foreground">Daily Quests</h3>
        <span className="text-sm font-bold text-duo-gray hover:text-duo-blue cursor-pointer">View all</span>
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-duo-gray-light bg-black/5 text-2xl">
            🏆
          </div>
          <div className="flex-1">
            <h4 className="mb-1 text-sm font-bold text-foreground">Earn {goal.target} XP</h4>
            <ProgressBar
              current={goal.current}
              target={goal.target}
              fillClassName="bg-duo-gold"
            />
          </div>
        </div>
      </div>
    </DuoCard>
  )
}
