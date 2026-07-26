import { useState, useEffect } from "react"
import { mockUserProfile } from "@/data/profile"
import type { UserProfile } from "@/domain/types/profile"

interface UseProfileResult {
  data: UserProfile | null
  isLoading: boolean
  isEmpty: boolean
}

export function useProfile(): UseProfileResult {
  const [data, setData] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate an API call latency
    const timer = setTimeout(() => {
      setData(mockUserProfile)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return {
    data,
    isLoading,
    isEmpty: !isLoading && !data,
  }
}
