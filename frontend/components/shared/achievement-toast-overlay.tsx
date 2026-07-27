"use client"
import { useEffect, useState } from "react"

interface AchievementEventDetail {
  title: string
  description: string
}

export function AchievementToastOverlay() {
  const [toast, setToast] = useState<AchievementEventDetail | null>(null)

  useEffect(() => {
    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<AchievementEventDetail>
      setToast(customEvent.detail)

      setTimeout(() => {
        setToast(null)
      }, 4000)
    }

    window.addEventListener("achievement-unlocked", handleEvent)
    return () => window.removeEventListener("achievement-unlocked", handleEvent)
  }, [])

  if (!toast) return null

  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-[100] flex justify-center animate-duo-bounce">
      <div className="flex items-center gap-4 rounded-2xl border-2 border-duo-gold bg-duo-gold/10 px-6 py-4 shadow-xl backdrop-blur-md">
        <div className="flex size-12 items-center justify-center rounded-xl bg-duo-gold text-2xl text-white">
          🏆
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-duo-gold">Achievement Unlocked!</p>
          <h4 className="text-lg font-extrabold text-duo-ink">{toast.title}</h4>
          <p className="text-sm font-bold text-duo-gray">{toast.description}</p>
        </div>
      </div>
    </div>
  )
}
