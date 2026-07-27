import { DuoCard } from "@/components/shared"
import type { Challenge } from "@/domain/types"
import { QuestCard } from "./quest-card"
import { Star } from "lucide-react"

interface WeeklyChallengeProps {
  challenge: Challenge
  onClaim?: (id: string) => void
}

export function WeeklyChallenge({ challenge, onClaim }: WeeklyChallengeProps) {
  const Icon = challenge.reward?.icon || Star
  
  return (
    <DuoCard>
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-foreground">Weekly Challenge</h2>
      </div>

      <QuestCard
        id={challenge.id}
        title={challenge.title}
        description={challenge.description}
        current={challenge.current}
        target={challenge.target}
        icon={Icon}
        status={challenge.status}
        tint="text-duo-purple"
        fill="bg-duo-purple"
        rewardText={challenge.reward?.amount ? `+${challenge.reward.amount} ${challenge.reward.type}` : challenge.reward?.type}
        timeRemaining={challenge.timeRemaining}
        onClaim={onClaim}
      />
    </DuoCard>
  )
}
