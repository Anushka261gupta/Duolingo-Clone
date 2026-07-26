"use client"

import { MainContent } from "@/components/layout"
import { useQuests } from "@/hooks/use-quests"
import {
  QuestsLoading,
  QuestsEmptyState,
  QuestsHeader,
  DailyQuests,
  WeeklyChallenge,
  MonthlyChallenge,
  AchievementProgress
} from "@/components/features/quests"

export default function QuestsPage() {
  const { data, isLoading, isEmpty } = useQuests()

  if (isLoading) {
    return (
      <MainContent>
        <QuestsLoading />
      </MainContent>
    )
  }

  if (isEmpty || !data) {
    return (
      <MainContent>
        <QuestsEmptyState />
      </MainContent>
    )
  }

  return (
    <MainContent>
      <div className="flex flex-col gap-6 pb-24">
        <QuestsHeader />
        
        <DailyQuests quests={data.dailyQuests} />
        
        <WeeklyChallenge challenge={data.weeklyChallenge} />
        
        <MonthlyChallenge challenge={data.monthlyChallenge} />
        
        <AchievementProgress achievements={data.achievements} />
      </div>
    </MainContent>
  )
}
