import type { LeagueInfo } from "@/domain/types"
import { LeagueCard } from "./league-card"
import { CountdownCard } from "./countdown-card"

interface LeaderboardHeaderProps {
  league: LeagueInfo
  resetDate: string
}

export function LeaderboardHeader({ league, resetDate }: LeaderboardHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-6">
      <LeagueCard league={league} />
      <CountdownCard resetDate={resetDate} />
    </div>
  )
}
