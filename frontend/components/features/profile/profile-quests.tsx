import Link from "next/link"
import { DuoCard, ProgressBar } from "@/components/shared"
import { useQuestEngine } from "@/hooks/use-quest-engine"

export function ProfileQuests() {
  const { dailyQuest, weeklyChallenge } = useQuestEngine()

  const DailyIcon = dailyQuest.icon
  const WeeklyIcon = weeklyChallenge.reward.icon

  return (
    <DuoCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-extrabold text-foreground">Daily Quests</h3>
        <Link href="/quests" className="text-sm font-bold text-duo-gray hover:text-duo-blue">
          View all
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-duo-gray-light bg-black/5 text-2xl">
            {DailyIcon && <DailyIcon className={`size-6 ${dailyQuest.tint}`} />}
          </div>
          <div className="flex-1">
            <h4 className="mb-1 text-sm font-bold text-foreground">{dailyQuest.label}</h4>
            <ProgressBar
              current={dailyQuest.current}
              target={dailyQuest.target}
              fillClassName={dailyQuest.fill}
              label={`${dailyQuest.current} / ${dailyQuest.target} XP`}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 border-t-2 border-duo-gray-light pt-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-duo-gray-light bg-black/5 text-2xl">
            {WeeklyIcon && <WeeklyIcon className="size-6 text-duo-blue" />}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground">{weeklyChallenge.title}</h4>
            {weeklyChallenge.description && (
              <p className="mb-2 text-sm text-duo-gray">{weeklyChallenge.description}</p>
            )}
            <ProgressBar
              current={weeklyChallenge.current}
              target={weeklyChallenge.target}
              fillClassName="bg-duo-gold"
              label={`${weeklyChallenge.current} / ${weeklyChallenge.target} XP`}
            />
          </div>
        </div>
      </div>
    </DuoCard>
  )
}
