import { useState, useEffect } from "react"
import { WeeklyLeaderboard } from "@/domain/types"
import { MOCK_WEEKLY_LEADERBOARD } from "@/data/leaderboard"

export function useLeaderboard() {
  const [data, setData] = useState<WeeklyLeaderboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // TODO: FUTURE API INTEGRATION
    // Replace this setTimeout with an actual fetch call:
    // fetch('/api/leaderboard')
    //   .then(res => res.json())
    //   .then(setData)
    //   .catch(setError)
    //   .finally(() => setIsLoading(false))

    const timer = setTimeout(() => {
      setData(MOCK_WEEKLY_LEADERBOARD)
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
