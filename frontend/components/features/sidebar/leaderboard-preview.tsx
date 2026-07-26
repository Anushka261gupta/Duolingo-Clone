"use client"

import { ChevronRight, Trophy } from "lucide-react"

import { DuoCard } from "@/components/shared"
import { MOCK_LEADERBOARD } from "@/data/leaderboard"

export function LeaderboardPreview() {
  return (
    <DuoCard>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="size-5 fill-duo-gold text-duo-gold" strokeWidth={0} />
          <h3 className="text-lg font-extrabold text-duo-ink">Gold League</h3>
        </div>
        <button
          className="flex items-center text-sm font-bold uppercase tracking-wide text-duo-blue hover:opacity-80"
          aria-label="View leaderboard"
        >
          View <ChevronRight className="size-4" strokeWidth={3} />
        </button>
      </div>
      <ul className="flex flex-col gap-1">
        {MOCK_LEADERBOARD.map((l) => (
          <li
            key={l.rank}
            className={`flex items-center gap-3 rounded-xl px-2 py-2 ${l.you ? "bg-duo-blue/10" : ""}`}
          >
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ${l.medal}`}
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
    </DuoCard>
  )
}
