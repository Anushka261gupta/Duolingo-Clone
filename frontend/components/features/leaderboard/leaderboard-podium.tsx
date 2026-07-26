import type { LeaderboardEntry } from "@/domain/types"
import Image from "next/image"

interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardPodium({ entries }: LeaderboardPodiumProps) {
  // Sort entries to [2, 1, 3] layout
  const top3 = entries.slice(0, 3)
  if (top3.length < 3) return null

  const podium = [top3[1], top3[0], top3[2]]

  return (
    <div className="flex items-end justify-center gap-2 pt-8 pb-4">
      {podium.map((entry) => {
        const isFirst = entry.rank === 1
        const height = isFirst ? "h-32" : entry.rank === 2 ? "h-24" : "h-20"
        
        return (
          <div key={entry.id || entry.rank} className="flex w-24 flex-col items-center">
            {/* Avatar */}
            <div className={`relative z-10 mb-[-16px] size-16 overflow-hidden rounded-full border-4 border-background bg-duo-gray-light ${isFirst ? 'size-20 mb-[-20px]' : ''}`}>
              {entry.avatarUrl ? (
                <Image src={entry.avatarUrl} alt={entry.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-duo-gray uppercase">
                  {entry.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Podium Block */}
            <div className={`w-full rounded-t-lg flex flex-col items-center justify-center gap-1 ${height} ${entry.medal}`}>
              <span className={`text-xl font-extrabold ${entry.rank === 1 ? 'text-white' : 'text-white/80'}`}>
                {entry.rank}
              </span>
            </div>
            
            {/* Name/XP */}
            <div className="mt-2 text-center">
              <div className={`font-extrabold truncate w-24 ${entry.you ? 'text-[#cd7f32]' : 'text-foreground'}`}>
                {entry.name}
              </div>
              <div className="text-xs font-bold text-duo-gray">{entry.xp} XP</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
