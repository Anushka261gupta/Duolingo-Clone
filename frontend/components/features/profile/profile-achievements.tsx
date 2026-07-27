import Link from "next/link"
import { DuoCard, ProgressBar } from "@/components/shared"
import { useAchievementEngine } from "@/hooks/use-achievement-engine"

export function ProfileAchievements() {
  const { achievements } = useAchievementEngine()

  return (
    <DuoCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-extrabold text-foreground">Achievements</h3>
        <Link href="/profile" className="text-sm font-bold text-duo-gray hover:text-duo-blue">
          View all
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {achievements.slice(0, 3).map((achievement) => {
          const Icon = achievement.icon
          return (
            <div key={achievement.id} className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-duo-gray-light text-3xl ${
                  achievement.status !== "locked" ? "bg-black/5" : "opacity-40 grayscale"
                }`}
              >
                {Icon && <Icon className="size-8 text-duo-gold" strokeWidth={2.5} />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-foreground">{achievement.title}</h4>
                <p className="mb-2 text-sm text-duo-gray">{achievement.description}</p>
                <ProgressBar
                  current={achievement.current}
                  target={achievement.total}
                  fillClassName="bg-duo-gold"
                  label={achievement.status === "completed" ? "Completed ✓" : `${achievement.current} / ${achievement.total}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </DuoCard>
  )
}
