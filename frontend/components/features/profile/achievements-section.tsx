import { DuoCard, ProgressBar } from "@/components/shared"
import type { Achievement } from "@/domain/types/profile"

interface AchievementsSectionProps {
  achievements: Achievement[]
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <DuoCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-extrabold text-foreground">Achievements</h3>
        <span className="text-sm font-bold text-duo-gray hover:text-duo-blue cursor-pointer">View all</span>
      </div>
      <div className="flex flex-col gap-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-duo-gray-light text-3xl ${
                achievement.isUnlocked ? "bg-black/5" : "opacity-40 grayscale"
              }`}
            >
              {achievement.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground">{achievement.title}</h4>
              <p className="mb-2 text-sm text-duo-gray">{achievement.description}</p>
              <ProgressBar
                current={achievement.progress}
                target={achievement.total}
                fillClassName="bg-duo-gold"
              />
            </div>
          </div>
        ))}
      </div>
    </DuoCard>
  )
}
