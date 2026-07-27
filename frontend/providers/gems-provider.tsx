"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface GemsContextValue {
  gems: number
  addGems: (amount: number) => void
  spendGems: (amount: number) => void
  hasEnoughGems: (amount: number) => boolean
}

const GemsContext = createContext<GemsContextValue | null>(null)

export function GemsProvider({ children }: { children: React.ReactNode }) {
  const [gems, setGems] = useState<number>(0)

  useEffect(() => {
    const saved = localStorage.getItem("gems_data")
    if (saved !== null) {
      try {
        const parsed = parseInt(saved, 10)
        setGems(!isNaN(parsed) && Number.isFinite(parsed) ? parsed : 500)
      } catch (e) {
        setGems(500)
      }
    } else {
      setGems(500) // Starting balance
      localStorage.setItem("gems_data", "500")
    }
  }, [])

  const save = (newAmount: number) => {
    if (!Number.isFinite(newAmount) || isNaN(newAmount)) {
      console.error("[GemsProvider] Attempted to save invalid gems amount:", newAmount)
      return
    }
    setGems(newAmount)
    localStorage.setItem("gems_data", newAmount.toString())
  }

  const addGems = (amount: number) => {
    const validAmount = Number(amount) || 0
    save(gems + validAmount)
  }

  const spendGems = (amount: number) => {
    const validAmount = Number(amount) || 0
    if (gems >= validAmount) {
      save(gems - validAmount)
    }
  }

  const hasEnoughGems = (amount: number) => {
    return gems >= amount
  }

  const value: GemsContextValue = {
    gems,
    addGems,
    spendGems,
    hasEnoughGems
  }

  return <GemsContext.Provider value={value}>{children}</GemsContext.Provider>
}

export function useGems() {
  const context = useContext(GemsContext)
  if (!context) {
    throw new Error("useGems must be used within a GemsProvider")
  }
  return context
}
