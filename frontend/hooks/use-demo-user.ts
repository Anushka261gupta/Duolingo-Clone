import { useState, useEffect } from "react"
import { UserService, UserProfileResponse } from "@/services/user-service"
import { mockUserProfile } from "@/data/profile"

export function useDemoUser() {
  const [data, setData] = useState<any>(mockUserProfile)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadUser() {
      try {
        setIsLoading(true)
        const user = await UserService.getDemoUser()
        if (!mounted) return
        
        setData({
          ...mockUserProfile, // Fallback base
          name: user.username,
          username: user.username,
          joinedAt: new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
          // We only replace identity here; stats come from providers as per requirements
        })
        setError(null)
      } catch (err) {
        console.error("Failed to load demo user, using mock", err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setData(mockUserProfile)
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    
    loadUser()
    return () => { mounted = false }
  }, [])

  return { data, isLoading, error }
}
