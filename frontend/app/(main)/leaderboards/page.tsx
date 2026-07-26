"use client"

import { MainContent } from "@/components/layout"
import { useLeaderboard } from "@/hooks/use-leaderboard"
import { DuoCard } from "@/components/shared"
import {
  LeaderboardLoading,
  LeaderboardEmptyState,
  LeaderboardHeader,
  LeaderboardPodium,
  LeaderboardList
} from "@/components/features/leaderboard"

export default function LeaderboardsPage() {
  const { data, isLoading, isEmpty } = useLeaderboard()

  if (isLoading) {
    return (
      <MainContent>
        <LeaderboardLoading />
      </MainContent>
    )
  }

  if (isEmpty || !data) {
    return (
      <MainContent>
        <LeaderboardEmptyState />
      </MainContent>
    )
  }

  return (
    <MainContent>
      <div className="flex flex-col gap-6 pb-24">
        <LeaderboardHeader league={data.league} resetDate={data.resetDate} />
        
        <DuoCard className="p-2 sm:p-6">
          <LeaderboardPodium entries={data.entries} />
          <LeaderboardList entries={data.entries} />
        </DuoCard>
      </div>
    </MainContent>
  )
}
