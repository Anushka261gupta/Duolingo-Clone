"use client"

import { DailyQuests } from "./daily-quests"
import { LeaderboardPreview } from "./leaderboard-preview"
import { SuperCard } from "./super-card"
import { XpGoal } from "./xp-goal"

export function RightSidebar() {
  return (
    <aside className="flex w-full flex-col gap-4">
      <SuperCard />
      <DailyQuests />
      <XpGoal />
      <LeaderboardPreview />
    </aside>
  )
}
