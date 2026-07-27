"use client"

import { MainContent } from "@/components/layout"
import { useQuestEngine } from "@/hooks/use-quest-engine"
import { useAchievementEngine } from "@/hooks/use-achievement-engine"
import {
  QuestsLoading,
  QuestsHeader,
  DailyQuests,
  WeeklyChallenge,
  MonthlyChallenge,
  AchievementProgress
} from "@/components/features/quests"

export default function QuestsPage() {
  const { 
    isLoaded: questsLoaded, 
    dailyQuest, 
    weeklyChallenge, 
    monthlyChallenge, 
    claimReward: claimQuest 
  } = useQuestEngine()
  
  const { 
    isLoaded: achievementsLoaded, 
    achievements, 
    claimReward: claimAchievement 
  } = useAchievementEngine()

  if (!questsLoaded || !achievementsLoaded) {
    return (
      <MainContent>
        <QuestsLoading />
      </MainContent>
    )
  }

  // We are mapping the single dailyQuest to an array since DailyQuests expects Quest[]
  const dailyQuestsList = [dailyQuest]

  return (
    <MainContent>
      <div className="flex flex-col gap-6 pb-24">
        <QuestsHeader />
        
        <DailyQuests quests={dailyQuestsList} onClaim={(id) => claimQuest(id, dailyQuest.reward?.amount || 10)} />
        
        <WeeklyChallenge challenge={weeklyChallenge} onClaim={(id) => claimQuest(id, weeklyChallenge.reward?.amount || 50)} />
        
        <MonthlyChallenge challenge={monthlyChallenge} onClaim={(id) => claimQuest(id, monthlyChallenge.reward?.amount || 100)} />
        
        <AchievementProgress achievements={achievements} onClaim={(id, amount) => claimAchievement(id, amount)} />
      </div>
    </MainContent>
  )
}
