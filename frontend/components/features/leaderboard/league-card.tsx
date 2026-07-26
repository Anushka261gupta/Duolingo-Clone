import type { LeagueInfo } from "@/domain/types"

interface LeagueCardProps {
  league: LeagueInfo
}

export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className={`mb-4 flex size-24 items-center justify-center rounded-2xl bg-white shadow-sm border-2 ${league.color} opacity-90 text-4xl`}>
        {league.icon}
      </div>
      <h2 className={`text-2xl font-extrabold ${league.color}`}>{league.name}</h2>
      <p className="mt-2 text-duo-gray font-medium">Top 7 advance to the next league</p>
    </div>
  )
}
