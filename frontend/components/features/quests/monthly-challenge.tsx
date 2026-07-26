import { DuoCard } from "@/components/shared"
import type { Challenge } from "@/domain/types"
import { QuestCard } from "./quest-card"
import { Medal } from "lucide-react"

interface MonthlyChallengeProps {
  challenge: Challenge
}

export function MonthlyChallenge({ challenge }: MonthlyChallengeProps) {
  const Icon = challenge.reward.icon || Medal
  
  return (
    <DuoCard>
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-foreground">Monthly Challenge</h2>
      </div>

      <QuestCard
        id={challenge.id}
        title={challenge.title}
        description={challenge.description}
        current={challenge.current}
        target={challenge.target}
        icon={Icon}
        status={challenge.status}
        tint="text-duo-blue"
        fill="bg-duo-blue"
        rewardText={challenge.reward.type}
        timeRemaining={challenge.timeRemaining}
      />
    </DuoCard>
  )
}
