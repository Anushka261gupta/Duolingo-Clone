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
        const entries = users.map((u, i) => ({
          id: u.id,
          name: u.username,
          avatar: u.avatar || `https://i.pravatar.cc/150?u=${u.id}`,
          xp: u.weekly_xp,
          you: u.username === "demo",
          rank: i + 1,
          trend: i % 2 === 0 ? "up" : "down" // Mock trend since not in DB
        }))
        
        setData({
          league: "Sapphire League",
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
