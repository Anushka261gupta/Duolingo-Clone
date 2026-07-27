"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const loadProgress = useCallback(() => {
    try {
      const savedLessons = localStorage.getItem("completedLessons")
      if (savedLessons) {
        const parsed = JSON.parse(savedLessons)
        if (Array.isArray(parsed)) {
          setCompletedLessons(parsed)
        }
      }
      
      const savedStats = localStorage.getItem("practice_stats")
      if (savedStats) {
        const parsed = JSON.parse(savedStats)
        if (typeof parsed.practiceCompleted === "number") {
          setPracticeCompleted(parsed.practiceCompleted)
        }
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    loadProgress()
    
    const handleProgressUpdate = () => {
      loadProgress()
    }
    window.addEventListener("progress-updated", handleProgressUpdate)
    return () => window.removeEventListener("progress-updated", handleProgressUpdate)
  }, [loadProgress])

  const markLessonCompleted = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev
      const updated = [...prev, lessonId]
      localStorage.setItem("completedLessons", JSON.stringify(updated))
      window.dispatchEvent(new Event("progress-updated"))
      return updated
    })
  }, [])

  const markPracticeCompleted = useCallback(() => {
    setPracticeCompleted(prev => {
      const updated = prev + 1
      try {
        const storedStats = localStorage.getItem("practice_stats")
        const stats = storedStats ? JSON.parse(storedStats) : { practiceCompleted: 0 }
        stats.practiceCompleted = updated
        localStorage.setItem("practice_stats", JSON.stringify(stats))
        window.dispatchEvent(new Event("progress-updated"))
      } catch (e) {}
      return updated
    })
  }, [])

  const completedLessonCount = useMemo(() => completedLessons.length, [completedLessons])
  const completedUnitCount = useMemo(() => {
    return Math.floor(completedLessons.length / 5)
  }, [completedLessons])
  const totalExercisesCompleted = useMemo(() => {
    return completedLessons.length + practiceCompleted
  }, [completedLessons.length, practiceCompleted])

  return {
    isLoaded,
    completedLessons,
    completedLessonCount,
    completedUnits: [],
    completedUnitCount,
    practiceCompleted,
    totalExercisesCompleted,
    markLessonCompleted,
    markPracticeCompleted
  }
}
