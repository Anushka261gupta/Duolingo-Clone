import { useState, useEffect, useMemo } from "react"
import { useXP } from "@/providers/xp-provider"
import { useLeaderboardData } from "./use-leaderboard-data"

export function useLeaderboard() {
  const { data: fetchedData, isLoading: isFetching, error: fetchError } = useLeaderboardData()
  const { weeklyXP } = useXP()

  const data = useMemo(() => {
    if (!fetchedData) return null
    // Inject live weeklyXP into the current user's entry (demo user has you: true)
    const mergedData = {
      ...fetchedData,
      entries: [...fetchedData.entries].map(entry => 
        entry.you ? { ...entry, xp: weeklyXP } : entry
      ).sort((a: any, b: any) => b.xp - a.xp)
    }
    
    mergedData.entries = mergedData.entries.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }))

    return mergedData
  }, [fetchedData, weeklyXP])

  return {
    data,
    isLoading: isFetching,
    isEmpty: !isFetching && (!data || data.entries.length === 0),
    error: fetchError
  }
}
