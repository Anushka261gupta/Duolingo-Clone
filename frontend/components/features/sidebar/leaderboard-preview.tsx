"use client"

import { ChevronRight, Trophy, Loader2 } from "lucide-react"
import Link from "next/link"

import { DuoCard } from "@/components/shared"
import { useLeaderboard } from "@/hooks/use-leaderboard"

export function LeaderboardPreview() {
  const { data, isLoading } = useLeaderboard()

  return (
    <DuoCard>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="size-5 fill-duo-gold text-duo-gold" strokeWidth={0} />
          <h3 className="text-lg font-extrabold text-duo-ink">Gold League</h3>
        </div>
        <Link
          href="/leaderboards"
          className="flex items-center text-sm font-bold uppercase tracking-wide text-duo-blue hover:opacity-80"
          aria-label="View leaderboard"
        >
          View <ChevronRight className="size-4" strokeWidth={3} />
        </Link>
      </div>
      
      {isLoading || !data ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-duo-gray" />
        </div>
      ) : (
        <ul className="flex flex-col gap-1">
          {data.entries.slice(0, 5).map((l) => (
            <li
              key={l.id}
              className={`flex items-center gap-3 rounded-xl px-2 py-2 ${l.you ? "bg-duo-blue/10" : ""}`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ${l.you ? "bg-duo-blue" : "bg-duo-gray"}`}
              >
                {l.rank}
              </span>
              <span className={`flex-1 text-sm font-bold ${l.you ? "text-duo-blue" : "text-duo-ink"}`}>
                {l.name}
              </span>
              <span className="text-sm font-bold text-duo-gray">{l.xp} XP</span>
            </li>
          ))}
        </ul>
      )}
    </DuoCard>
  )
}
