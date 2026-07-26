import type { LeaderboardEntry } from "@/domain/types"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import Image from "next/image"

interface LeaderboardRowProps {
  entry: LeaderboardEntry
}

export function LeaderboardRow({ entry }: LeaderboardRowProps) {
  const isYou = entry.you
  
  return (
    <div className={`flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-duo-gray-light/50 ${isYou ? "bg-duo-gray-light/30 border-2 border-[#cd7f32]/20" : ""}`}>
      {/* Rank */}
      <div className={`w-8 text-center font-bold ${entry.color}`}>
        {entry.rank}
      </div>

      {/* Avatar */}
      <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-duo-gray-light">
        {entry.avatarUrl ? (
          <Image src={entry.avatarUrl} alt={entry.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-bold text-duo-gray uppercase">
            {entry.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Name */}
      <div className={`flex-1 font-extrabold ${isYou ? "text-[#cd7f32]" : "text-foreground"}`}>
        {entry.name}
      </div>

      {/* XP */}
      <div className="font-bold text-duo-gray">
        {entry.xp} XP
      </div>

      {/* Trend */}
      <div className="flex w-6 justify-end">
        {entry.trend === "up" && <ArrowUp className="size-4 text-duo-green" />}
        {entry.trend === "down" && <ArrowDown className="size-4 text-rose-500" />}
        {entry.trend === "same" && <Minus className="size-4 text-duo-gray" />}
      </div>
    </div>
  )
}
