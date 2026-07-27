"use client"

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react"
import { HEART_REGEN_INTERVAL } from "@/domain/constants/hearts"

export interface HeartsData {
  hearts: number
  maxHearts: number
  nextHeartAt: string | null
  lastUpdated: string
}

interface HeartsContextValue {
  hearts: number
  maxHearts: number
  hasHearts: boolean
  isOutOfHearts: boolean
  isRegenerating: boolean
  timeUntilNextHeart: string | null
  loseHeart: () => void
  restoreHeart: () => void
  restoreAllHearts: () => void
}

const HeartsContext = createContext<HeartsContextValue | null>(null)

export function HeartsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<HeartsData | null>(null)
  const [timeUntilNextHeart, setTimeUntilNextHeart] = useState<string | null>(null)
  const regenTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialization and offline progression
  useEffect(() => {
    let initialData: HeartsData = { 
      hearts: 5, 
      maxHearts: 5, 
      nextHeartAt: null, 
      lastUpdated: new Date().toISOString() 
    }

    const saved = localStorage.getItem("hearts")
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as HeartsData
        
        // Handle offline progression
        if (parsed.nextHeartAt && parsed.hearts < parsed.maxHearts) {
          const now = Date.now()
          const nextAt = new Date(parsed.nextHeartAt).getTime()
          
          if (now >= nextAt) {
            const timePassed = now - nextAt
            const intervalsPassed = Math.floor(timePassed / HEART_REGEN_INTERVAL) + 1
            const newHearts = Math.min(parsed.maxHearts, parsed.hearts + intervalsPassed)
            
            if (newHearts >= parsed.maxHearts) {
              parsed.hearts = parsed.maxHearts
              parsed.nextHeartAt = null
            } else {
              parsed.hearts = newHearts
              // Preserve the exact sub-interval timing
              const remainder = timePassed % HEART_REGEN_INTERVAL
              parsed.nextHeartAt = new Date(now + HEART_REGEN_INTERVAL - remainder).toISOString()
            }
          }
        }
        initialData = parsed
      } catch (e) {
        // use default
      }
    }
    
    setData(initialData)
  }, [])

  const save = useCallback((newData: HeartsData) => {
    setData(newData)
    localStorage.setItem("hearts", JSON.stringify(newData))
  }, [])

  // Regeneration Timeout logic
  useEffect(() => {
    if (!data) return
    if (regenTimeoutRef.current) clearTimeout(regenTimeoutRef.current)

    if (data.hearts < data.maxHearts && data.nextHeartAt) {
      const now = Date.now()
      const nextAt = new Date(data.nextHeartAt).getTime()
      const delay = Math.max(0, nextAt - now)

      regenTimeoutRef.current = setTimeout(() => {
        const newHearts = Math.min(data.maxHearts, data.hearts + 1)
        const isMax = newHearts >= data.maxHearts
        
        window.dispatchEvent(new CustomEvent("heart-regenerated"))
        if (isMax) {
          window.dispatchEvent(new CustomEvent("hearts-full"))
        }

        save({
          ...data,
          hearts: newHearts,
          nextHeartAt: isMax ? null : new Date(Date.now() + HEART_REGEN_INTERVAL).toISOString(),
          lastUpdated: new Date().toISOString()
        })
      }, delay)
    }

    return () => {
      if (regenTimeoutRef.current) clearTimeout(regenTimeoutRef.current)
    }
  }, [data, save])

  // UI Countdown Interval logic
  useEffect(() => {
    if (!data || !data.nextHeartAt || data.hearts >= data.maxHearts) {
      setTimeUntilNextHeart(null)
      return
    }

    const interval = setInterval(() => {
      const now = Date.now()
      const nextAt = new Date(data.nextHeartAt!).getTime()
      const diff = Math.max(0, nextAt - now)

      if (diff <= 0) {
        setTimeUntilNextHeart("00:00")
        return
      }

      const minutes = Math.floor(diff / 1000 / 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTimeUntilNextHeart(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [data])

  const loseHeart = () => {
    if (!data) return
    if (data.hearts > 0) {
      const newHearts = data.hearts - 1
      const isStart = newHearts === data.maxHearts - 1
      save({ 
        ...data, 
        hearts: newHearts,
        nextHeartAt: isStart ? new Date(Date.now() + HEART_REGEN_INTERVAL).toISOString() : data.nextHeartAt,
        lastUpdated: new Date().toISOString() 
      })
    }
  }

  const restoreHeart = () => {
    if (!data) return
    if (data.hearts < data.maxHearts) {
      const newHearts = data.hearts + 1
      const isMax = newHearts >= data.maxHearts
      save({ 
        ...data, 
        hearts: newHearts,
        nextHeartAt: isMax ? null : data.nextHeartAt,
        lastUpdated: new Date().toISOString() 
      })
    }
  }

  const restoreAllHearts = () => {
    if (!data) return
    save({ 
      ...data, 
      hearts: data.maxHearts, 
      nextHeartAt: null,
      lastUpdated: new Date().toISOString() 
    })
  }

  const hearts = data?.hearts ?? 5
  const maxHearts = data?.maxHearts ?? 5
  const isRegenerating = hearts < maxHearts

  const value: HeartsContextValue = {
    hearts,
    maxHearts,
    hasHearts: hearts > 0,
    isOutOfHearts: data !== null && hearts === 0,
    isRegenerating,
    timeUntilNextHeart,
    loseHeart,
    restoreHeart,
    restoreAllHearts
  }

  return <HeartsContext.Provider value={value}>{children}</HeartsContext.Provider>
}

export function useHearts() {
  const context = useContext(HeartsContext)
  if (!context) {
    throw new Error("useHearts must be used within a HeartsProvider")
  }
  return context
}
