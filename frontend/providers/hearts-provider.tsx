"use client"

import { createContext, useContext, useEffect, useState } from "react"

export interface HeartsData {
  hearts: number
  maxHearts: number
  lastUpdated: string
}

interface HeartsContextValue {
  hearts: number
  maxHearts: number
  hasHearts: boolean
  isOutOfHearts: boolean
  loseHeart: () => void
  restoreHeart: () => void
  restoreAllHearts: () => void
}

const HeartsContext = createContext<HeartsContextValue | null>(null)

export function HeartsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<HeartsData | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("hearts")
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch (e) {
        setData({ hearts: 5, maxHearts: 5, lastUpdated: new Date().toISOString() })
      }
    } else {
      setData({ hearts: 5, maxHearts: 5, lastUpdated: new Date().toISOString() })
    }
  }, [])

  const save = (newData: HeartsData) => {
    setData(newData)
    localStorage.setItem("hearts", JSON.stringify(newData))
  }

  const loseHeart = () => {
    if (!data) return
    if (data.hearts > 0) {
      save({ ...data, hearts: data.hearts - 1, lastUpdated: new Date().toISOString() })
    }
  }

  const restoreHeart = () => {
    if (!data) return
    if (data.hearts < data.maxHearts) {
      save({ ...data, hearts: data.hearts + 1, lastUpdated: new Date().toISOString() })
    }
  }

  const restoreAllHearts = () => {
    if (!data) return
    save({ ...data, hearts: data.maxHearts, lastUpdated: new Date().toISOString() })
  }

  const hearts = data?.hearts ?? 5
  const maxHearts = data?.maxHearts ?? 5

  const value: HeartsContextValue = {
    hearts,
    maxHearts,
    hasHearts: hearts > 0,
    isOutOfHearts: data !== null && hearts === 0, // only true if hydrated
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
