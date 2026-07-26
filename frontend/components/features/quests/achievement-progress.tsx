import { DuoCard } from "@/components/shared"
import type { Challenge } from "@/domain/types"
import { QuestCard } from "./quest-card"
import { Trophy } from "lucide-react"
import { Fragment } from "react"

interface AchievementProgressProps {
  achievements: Challenge[]
}

export function AchievementProgress({ achievements }: AchievementProgressProps) {
  return (
    <DuoCard>
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-foreground">Achievements</h2>
      </div>

      <div className="flex flex-col">
        {achievements.map((achievement, index) => {
          const Icon = achievement.reward.icon || Trophy
          
          return (
            <Fragment key={achievement.id}>
              <QuestCard
                id={achievement.id}
                title={achievement.title}
                description={achievement.description}
                current={achievement.current}
                target={achievement.target}
                icon={Icon}
                status={achievement.status}
                tint="text-duo-gold"
                fill="bg-duo-gold"
                rewardText={achievement.reward.amount ? `+${achievement.reward.amount}` : undefined}
              />
              {index < achievements.length - 1 && (
                <div className="mx-2 my-2 h-[2px] bg-duo-gray-lighter" />
              )}
            </Fragment>
          )
        })}
      </div>
    </DuoCard>
  )
}
