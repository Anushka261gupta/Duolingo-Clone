"use client"

import { createContext, useContext, useEffect, useState } from "react"

export interface XPData {
  totalXP: number
  dailyXP: number
  weeklyXP: number
  monthlyXP: number
  currentLessonXP: number
  lastUpdated: string
}

export interface LessonRewards {
  base: number
  perfectBonus?: number
}

interface XPContextValue {
  totalXP: number
  dailyXP: number
  weeklyXP: number
  monthlyXP: number
  currentLessonXP: number
  addXP: (amount: number) => void
  resetLessonXP: () => void
  commitLessonRewards: (rewards: LessonRewards) => void
}

const XPContext = createContext<XPContextValue | null>(null)

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<XPData | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("xp_data")
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as XPData
        const now = new Date()
        const lastUpdated = new Date(parsed.lastUpdated)
        
        let resetDaily = false
        let resetWeekly = false
        let resetMonthly = false
        
        if (now.toDateString() !== lastUpdated.toDateString()) {
          resetDaily = true
        }
        
        const getMonday = (d: Date) => {
          const dt = new Date(d)
          const day = dt.getDay()
          const diff = dt.getDate() - day + (day === 0 ? -6 : 1)
          return new Date(dt.setDate(diff))
        }
        
        if (getMonday(now).toDateString() !== getMonday(lastUpdated).toDateString()) {
          resetWeekly = true
        }

        if (now.getMonth() !== lastUpdated.getMonth() || now.getFullYear() !== lastUpdated.getFullYear()) {
          resetMonthly = true
        }

        setData({
          totalXP: parsed.totalXP || 0,
          dailyXP: resetDaily ? 0 : (parsed.dailyXP || 0),
          weeklyXP: resetWeekly ? 0 : (parsed.weeklyXP || 0),
          monthlyXP: resetMonthly ? 0 : (parsed.monthlyXP || 0),
          currentLessonXP: 0,
          lastUpdated: now.toISOString()
        })
      } catch (e) {
        setData({ totalXP: 0, dailyXP: 0, weeklyXP: 0, monthlyXP: 0, currentLessonXP: 0, lastUpdated: new Date().toISOString() })
      }
    } else {
      setData({ totalXP: 0, dailyXP: 0, weeklyXP: 0, monthlyXP: 0, currentLessonXP: 0, lastUpdated: new Date().toISOString() })
    }
  }, [])

  const save = (newData: XPData) => {
    setData(newData)
    localStorage.setItem("xp_data", JSON.stringify(newData))
  }

  const addXP = (amount: number) => {
    if (!data) return
    const now = new Date().toISOString()
    const newTotal = data.totalXP + amount
    
    // Achievement milestones
    const milestones = [100, 250, 500, 1000]
    milestones.forEach((m) => {
      if (data.totalXP < m && newTotal >= m) {
        window.dispatchEvent(
          new CustomEvent("achievement-unlocked", {
            detail: { title: `Reached ${m} XP!`, description: "You're making incredible progress." },
          })
        )
      }
    })

    window.dispatchEvent(new CustomEvent("xp-earned", { detail: { amount } }))

    save({
      ...data,
      totalXP: newTotal,
      dailyXP: data.dailyXP + amount,
      weeklyXP: data.weeklyXP + amount,
      monthlyXP: data.monthlyXP + amount,
      currentLessonXP: data.currentLessonXP + amount,
      lastUpdated: now
    })
  }

  const resetLessonXP = () => {
    if (!data) return
    save({ ...data, currentLessonXP: 0, lastUpdated: new Date().toISOString() })
  }

  const commitLessonRewards = (rewards: LessonRewards) => {
    if (!data) return
    const totalBonus = rewards.base + (rewards.perfectBonus || 0)
    addXP(totalBonus)
  }

  const value: XPContextValue = {
    totalXP: data?.totalXP ?? 0,
    dailyXP: data?.dailyXP ?? 0,
    weeklyXP: data?.weeklyXP ?? 0,
    monthlyXP: data?.monthlyXP ?? 0,
    currentLessonXP: data?.currentLessonXP ?? 0,
    addXP,
    resetLessonXP,
    commitLessonRewards
  }

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>
}

export function useXP() {
  const context = useContext(XPContext)
  if (!context) {
    throw new Error("useXP must be used within an XPProvider")
  }
  return context
}
