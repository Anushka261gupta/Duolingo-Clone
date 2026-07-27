"use client"
import { useEffect, useState } from "react"

interface XPEventDetail {
  amount: number
}

interface FloatingText {
  id: string
  amount: number
}

export function FloatingXPOverlay() {
  const [floats, setFloats] = useState<FloatingText[]>([])

  useEffect(() => {
    const handleXPEvent = (e: Event) => {
      const customEvent = e as CustomEvent<XPEventDetail>
      const amount = customEvent.detail?.amount
      if (!amount) return

      const id = Math.random().toString(36).substring(7)
      setFloats((prev) => [...prev, { id, amount }])

      setTimeout(() => {
        setFloats((prev) => prev.filter((f) => f.id !== id))
      }, 1500)
    }

    window.addEventListener("xp-earned", handleXPEvent)
    return () => window.removeEventListener("xp-earned", handleXPEvent)
  }, [])

  if (floats.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {floats.map((f) => (
        <div
          key={f.id}
          className="absolute text-4xl font-extrabold text-duo-gold animate-float-up drop-shadow-lg"
          style={{
            left: `calc(50% + ${Math.random() * 60 - 30}px)`,
          }}
        >
          +{f.amount} XP
        </div>
      ))}
    </div>
  )
}
