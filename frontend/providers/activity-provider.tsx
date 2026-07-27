"use client"

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react"
import { Activity, ActivityType, ActivityMetadata } from "@/domain/types/activity"
import { ACTIVITY_CONFIG } from "@/domain/constants/activity"

interface ActivityContextValue {
  activities: Activity[]
  logActivity: (type: ActivityType, metadata?: ActivityMetadata) => void
}

const ActivityContext = createContext<ActivityContextValue | null>(null)

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem("activity_history")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setActivities(parsed)
        }
      }
    } catch (e) {
      console.error("Failed to load activity history")
    }
  }, [])

  const saveActivities = useCallback((newActivities: Activity[]) => {
    setActivities(newActivities)
    localStorage.setItem("activity_history", JSON.stringify(newActivities))
  }, [])

  const logActivity = useCallback((type: ActivityType, metadata?: ActivityMetadata) => {
    const now = new Date().toISOString()
    const config = ACTIVITY_CONFIG[type]

    setActivities(prev => {
      // Deduplication: prevent same type within 5 seconds
      if (prev.length > 0) {
        const latest = prev[0]
        if (latest.type === type) {
          const latestTime = new Date(latest.timestamp).getTime()
          const currentTime = new Date(now).getTime()
          if (currentTime - latestTime < 5000) {
            // Ignore duplicate rapid event
            return prev
          }
        }
      }

      const newActivity: Activity = {
        id: Math.random().toString(36).substring(2, 15),
        type,
        title: config.defaultTitle,
        description: config.defaultDescription,
        timestamp: now,
        metadata
      }

      const updated = [newActivity, ...prev].slice(0, 20)
      localStorage.setItem("activity_history", JSON.stringify(updated))
      return updated
    })
  }, [])

  useEffect(() => {
    const handleLogActivity = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: ActivityType, metadata?: ActivityMetadata }>
      if (customEvent.detail && customEvent.detail.type) {
        logActivity(customEvent.detail.type, customEvent.detail.metadata)
      }
    }

    const handleAchievementUnlocked = (e: Event) => {
      const customEvent = e as CustomEvent<{ title: string, description: string }>
      logActivity(ActivityType.ACHIEVEMENT_UNLOCKED, { achievementId: customEvent.detail?.title })
    }

    const handleStreakUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ streak: number }>
      const streak = customEvent.detail?.streak
      if (streak && streak > 0 && streak % 7 === 0) {
        logActivity(ActivityType.STREAK_MILESTONE)
      }
    }

    window.addEventListener("log-activity", handleLogActivity)
    window.addEventListener("achievement-unlocked", handleAchievementUnlocked)
    window.addEventListener("streak-updated", handleStreakUpdated)

    return () => {
      window.removeEventListener("log-activity", handleLogActivity)
      window.removeEventListener("achievement-unlocked", handleAchievementUnlocked)
      window.removeEventListener("streak-updated", handleStreakUpdated)
    }
  }, [logActivity])

  const memoizedActivities = useMemo(() => activities, [activities])

  return (
    <ActivityContext.Provider value={{ activities: memoizedActivities, logActivity }}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  const context = useContext(ActivityContext)
  if (!context) {
    throw new Error("useActivity must be used within ActivityProvider")
  }
  return context
}
