import { useState, useEffect, useMemo } from "react"
import { WeeklyLeaderboard } from "@/domain/types"
import { MOCK_WEEKLY_LEADERBOARD } from "@/data/leaderboard"
import { useXP } from "@/providers/xp-provider"

export function useLeaderboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { weeklyXP } = useXP()

  const data = useMemo(() => {
    // Inject live weeklyXP into the current user's entry (mock user has you: true)
    const mergedData = {
      ...MOCK_WEEKLY_LEADERBOARD,
      entries: [...MOCK_WEEKLY_LEADERBOARD.entries].map(entry => 
        entry.you ? { ...entry, xp: weeklyXP } : entry
      ).sort((a, b) => b.xp - a.xp)
    }
    
    mergedData.entries = mergedData.entries.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }))

    return mergedData
  }, [weeklyXP])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return {
    data,
    isLoading,
    isEmpty: !isLoading && (!data || data.entries.length === 0),
    error
  }
}
