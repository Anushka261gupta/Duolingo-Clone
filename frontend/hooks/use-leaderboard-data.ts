import { useState, useEffect } from "react"
import { LeaderboardService } from "@/services/leaderboard-service"
import { MOCK_WEEKLY_LEADERBOARD } from "@/data/leaderboard"

export function useLeaderboardData() {
  const [data, setData] = useState<any>(MOCK_WEEKLY_LEADERBOARD)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    
    async function loadData() {
      try {
        setIsLoading(true)
        const users = await LeaderboardService.getLeaderboard(15, 0)
        
        if (!mounted) return
        
        // Map backend users to frontend leaderboard entries format
        const entries = users.map((u, i) => {
          const rank = i + 1;
          const isYou = u.username === "demo";
          
          let zone: "promotion" | "demotion" | "safe" = "safe";
          if (rank <= 7) zone = "promotion";
          else if (rank >= 25) zone = "demotion";
          
          return {
            id: u.id,
            name: isYou ? "You" : u.username,
            avatarUrl: isYou ? "https://github.com/shadcn.png" : (u.avatar || undefined),
            xp: u.weekly_xp,
            you: isYou,
            rank,
            trend: i % 2 === 0 ? "up" : "down", // Mock trend since not in DB
            zone,
            color: rank === 1 ? "text-[#ffc800]" : rank <= 3 ? "text-[#afafaf]" : isYou ? "text-[#cd7f32]" : "text-foreground",
            medal: rank === 1 ? "bg-[#ffc800]" : rank === 2 ? "bg-[#afafaf]" : rank === 3 ? "bg-[#cd7f32]" : "bg-transparent",
          }
        })
        
        setData({
          league: {
            name: "Gold League",
            icon: "🏆",
            color: "text-duo-gold",
          },
          resetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          entries,
          promotionCutoff: 10,
          demotionCutoff: 25
        })
        setError(null)
      } catch (err) {
        console.error("Failed to load leaderboard, using mock", err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setData(MOCK_WEEKLY_LEADERBOARD)
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    
    loadData()
    return () => { mounted = false }
  }, [])

  return { data, isLoading, error }
}
