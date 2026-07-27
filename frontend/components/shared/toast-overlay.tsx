"use client"
import { useEffect, useState } from "react"
import type { ToastOptions } from "@/hooks/use-toast"

export function ToastOverlay() {
  const [toast, setToast] = useState<ToastOptions | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastOptions>
      setToast(customEvent.detail)

      clearTimeout(timer)
      timer = setTimeout(() => {
        setToast(null)
      }, 3000)
    }

    window.addEventListener("app-toast", handleEvent)
    return () => {
      window.removeEventListener("app-toast", handleEvent)
      clearTimeout(timer)
    }
  }, [])

  if (!toast) return null

  const bgClasses = {
    success: "border-duo-green bg-duo-green-soft text-duo-green-dark",
    error: "border-duo-red bg-rose-100 text-duo-red-dark",
    info: "border-duo-blue bg-sky-100 text-duo-blue-dark"
  }

  const defaultType = toast.type || "success"
  const classes = bgClasses[defaultType]

  return (
    <div className="pointer-events-none fixed bottom-24 left-0 right-0 z-[100] flex justify-center animate-duo-bounce">
      <div className={`flex items-center gap-3 rounded-2xl border-2 px-6 py-3 shadow-lg backdrop-blur-md ${classes}`}>
        {toast.icon && (
          <div className="flex items-center justify-center text-2xl">
            {toast.icon}
          </div>
        )}
        <div>
          <h4 className="text-sm font-extrabold">{toast.title}</h4>
          {toast.description && (
            <p className="text-xs font-bold opacity-90">{toast.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
