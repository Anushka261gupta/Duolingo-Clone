import { DuoCard } from "@/components/shared"
import type { Quest } from "@/domain/types"
import { QuestCard } from "./quest-card"
import { Fragment } from "react"

interface DailyQuestsProps {
  quests: Quest[]
  onClaim?: (id: string) => void
}

export function DailyQuests({ quests, onClaim }: DailyQuestsProps) {
  return (
    <DuoCard>
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-foreground">Daily Quests</h2>
        <p className="text-sm font-bold text-duo-gray">New quests every day!</p>
      </div>

      <div className="flex flex-col">
        {quests.map((quest, index) => (
          <Fragment key={quest.id || index}>
            <QuestCard
              id={quest.id || `dq-${index}`}
              title={quest.label}
              current={quest.current}
              target={quest.target}
              icon={quest.icon}
              status={quest.status || 'in_progress'}
              tint={quest.tint}
              fill={quest.fill}
              rewardText={quest.reward ? `+${quest.reward.amount} ${quest.reward.type}` : undefined}
              onClaim={onClaim}
            />
            {index < quests.length - 1 && (
              <div className="mx-2 my-2 h-[2px] bg-duo-gray-lighter" />
            )}
          </Fragment>
        ))}
      </div>
    </DuoCard>
  )
}
