"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { isToday, isYesterday, toDateString } from "@/domain/utils/date"

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastLessonDate: string | null
  todayCompleted: boolean
  completedDates: string[]
}

interface StreakContextValue extends StreakData {
  completeLesson: () => void
  resetStreak: () => void
  repairStreak: () => void
  hasCompletedToday: boolean
}

const StreakContext = createContext<StreakContextValue | null>(null)

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<StreakData | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("streak_data")
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StreakData
        const now = new Date()
        
        let resetStreak = false
        let todayCompleted = parsed.todayCompleted
        
        if (parsed.lastLessonDate) {
          if (!isToday(parsed.lastLessonDate)) {
            todayCompleted = false
          }
          if (!isToday(parsed.lastLessonDate) && !isYesterday(parsed.lastLessonDate)) {
            resetStreak = true
          }
        }

        setData({
          currentStreak: resetStreak ? 0 : (parsed.currentStreak || 0),
          longestStreak: parsed.longestStreak || 0,
          lastLessonDate: parsed.lastLessonDate || null,
          todayCompleted: todayCompleted,
          completedDates: parsed.completedDates || []
        })
      } catch (e) {
        initDefault()
      }
    } else {
      initDefault()
    }
  }, [])

  const initDefault = () => {
    setData({
      currentStreak: 0,
      longestStreak: 0,
      lastLessonDate: null,
      todayCompleted: false,
      completedDates: []
    })
  }

  const save = (newData: StreakData) => {
    setData(newData)
    localStorage.setItem("streak_data", JSON.stringify(newData))
  }

  const completeLesson = () => {
    if (!data) return
    const nowStr = toDateString(new Date())

    // Case B: Already completed today
    if (data.todayCompleted && data.lastLessonDate === nowStr) {
      return
    }

    let newStreak = data.currentStreak
    let newDates = [...data.completedDates]
    
    if (data.lastLessonDate) {
      // Case C: Completed yesterday -> increment
      if (isYesterday(data.lastLessonDate)) {
        newStreak += 1
      }
      // Case D: Missed one or more days -> reset to 1
      else if (!isToday(data.lastLessonDate)) {
        newStreak = 1
      }
    } else {
      // First ever lesson
      newStreak = 1
    }
    
    const newLongest = Math.max(data.longestStreak, newStreak)

    // Add today to completedDates if not present
    if (!newDates.includes(nowStr)) {
      newDates.push(nowStr)
    }

    // Dispatch events
    if (newStreak > data.currentStreak) {
      window.dispatchEvent(
        new CustomEvent("streak-updated", { detail: { currentStreak: newStreak } })
      )
    }
    
    if (newLongest > data.longestStreak) {
      window.dispatchEvent(
        new CustomEvent("longest-streak-updated", { detail: { longestStreak: newLongest } })
      )
    }

    save({
      ...data,
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastLessonDate: nowStr,
      todayCompleted: true,
      completedDates: newDates
    })
  }

  const resetStreak = () => {
    if (!data) return
    save({
      ...data,
      currentStreak: 0,
      todayCompleted: false
    })
  }

  const repairStreak = () => {
    if (!data) return
    if (data.currentStreak > 0) return // Already active, no need to repair
    
    // Simulate repairing the streak to what it was right before it reset
    // Wait, the logic for finding previous streak isn't cached here.
    // For now, repairing will just set it to 1, or ideally it would read from a history.
    // A future StreakFreeze module would keep track of freeze usage.
    save({
      ...data,
      currentStreak: 1, // Just a placeholder for repair
      todayCompleted: true,
      lastLessonDate: toDateString(new Date())
    })
  }

  const value: StreakContextValue = {
    currentStreak: data?.currentStreak ?? 0,
    longestStreak: data?.longestStreak ?? 0,
    lastLessonDate: data?.lastLessonDate ?? null,
    todayCompleted: data?.todayCompleted ?? false,
    completedDates: data?.completedDates ?? [],
    hasCompletedToday: data?.todayCompleted ?? false,
    completeLesson,
    resetStreak,
    repairStreak
  }

  return <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
}

export function useStreak() {
  const context = useContext(StreakContext)
  if (!context) {
    throw new Error("useStreak must be used within a StreakProvider")
  }
  return context
}
