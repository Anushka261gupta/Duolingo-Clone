"use client"

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface DoubleXPData {
  active: boolean
  activeInstanceId: string | null
  activatedAt: string | null
  expiresAt: string | null
}

interface DoubleXPContextValue {
  isDoubleXPActive: boolean
  remainingTime: string | null
  activateDoubleXP: (instanceId: string) => void
  deactivateDoubleXP: () => void
}

const DoubleXPContext = createContext<DoubleXPContextValue | null>(null)
const DURATION_MS = 30 * 60 * 1000 // 30 minutes

export function DoubleXPProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DoubleXPData>({ active: false, activeInstanceId: null, activatedAt: null, expiresAt: null })
  const [remainingTime, setRemainingTime] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { notify } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("double_xp")
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as DoubleXPData
        if (parsed.active && parsed.expiresAt) {
          const expiresAt = new Date(parsed.expiresAt).getTime()
          if (Date.now() >= expiresAt) {
            // Expired while offline
            if (parsed.activeInstanceId) {
               // Update inventory directly
               const inv = localStorage.getItem("shop_inventory")
               if (inv) {
                 const invParsed = JSON.parse(inv)
                 const updated = invParsed.map((i: any) => i.instanceId === parsed.activeInstanceId ? { ...i, status: "expired", expiresAt: new Date().toISOString() } : i)
                 localStorage.setItem("shop_inventory", JSON.stringify(updated))
                 window.dispatchEvent(new Event("inventory-updated"))
               }
            }
            parsed.active = false
            parsed.activeInstanceId = null
            parsed.activatedAt = null
            parsed.expiresAt = null
            localStorage.setItem("double_xp", JSON.stringify(parsed))
          }
        }
        setData(parsed)
      } catch (e) {}
    }
  }, [])

  const save = useCallback((newData: DoubleXPData) => {
    setData(newData)
    localStorage.setItem("double_xp", JSON.stringify(newData))
  }, [])

  const deactivateDoubleXP = useCallback(() => {
    if (data.activeInstanceId) {
      const inv = localStorage.getItem("shop_inventory")
      if (inv) {
        try {
          const invParsed = JSON.parse(inv)
          const updated = invParsed.map((i: any) => i.instanceId === data.activeInstanceId ? { ...i, status: "expired", expiresAt: new Date().toISOString() } : i)
          localStorage.setItem("shop_inventory", JSON.stringify(updated))
          window.dispatchEvent(new Event("inventory-updated"))
        } catch(e) {}
      }
    }
    save({ active: false, activeInstanceId: null, activatedAt: null, expiresAt: null })
    if (timerRef.current) clearInterval(timerRef.current)
    setRemainingTime(null)
    window.dispatchEvent(new CustomEvent("doublexp-ended"))
    notify({ title: "Double XP Expired", description: "Your 30 minute boost has ended.", icon: "⚡" })
  }, [data.activeInstanceId, save, notify])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    if (data.active && data.expiresAt) {
      const expiresAt = new Date(data.expiresAt).getTime()
      
      timerRef.current = setInterval(() => {
        const now = Date.now()
        const diff = expiresAt - now
        
        if (diff <= 0) {
          deactivateDoubleXP()
        } else {
          const minutes = Math.floor(diff / 1000 / 60)
          const seconds = Math.floor((diff / 1000) % 60)
          setRemainingTime(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
        }
      }, 1000)
    } else {
      setRemainingTime(null)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [data.active, data.expiresAt, deactivateDoubleXP])

  const activateDoubleXP = (instanceId: string) => {
    if (data.active) return
    const now = Date.now()
    save({
      active: true,
      activeInstanceId: instanceId,
      activatedAt: new Date(now).toISOString(),
      expiresAt: new Date(now + DURATION_MS).toISOString()
    })
    window.dispatchEvent(new CustomEvent("doublexp-started"))
    
    window.dispatchEvent(
      new CustomEvent("log-activity", {
        detail: {
          type: "DOUBLE_XP_ACTIVATED"
        }
      })
    )
    
    notify({ title: "Double XP Activated", description: "Earn 2x XP for the next 30 minutes!", icon: "⚡", type: "info" })
  }

  const value: DoubleXPContextValue = {
    isDoubleXPActive: data.active,
    remainingTime,
    activateDoubleXP,
    deactivateDoubleXP
  }

  return <DoubleXPContext.Provider value={value}>{children}</DoubleXPContext.Provider>
}

export function useDoubleXP() {
  const context = useContext(DoubleXPContext)
  if (!context) {
    throw new Error("useDoubleXP must be used within a DoubleXPProvider")
  }
  return context
}
