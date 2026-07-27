"use client"
import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  durationMs?: number
  className?: string
  startFromZero?: boolean
}

export function AnimatedCounter({ value, durationMs = 1000, className, startFromZero = false }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(startFromZero ? 0 : value)
  
  const hasMounted = useRef(false)
  const displayValueRef = useRef(startFromZero ? 0 : value)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      if (!startFromZero) return
    }

    if (displayValueRef.current === value) return

    let startTimestamp: number | null = null
    const startValue = displayValueRef.current
    let animationFrameId: number
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(startValue + (value - startValue) * easeOutQuart)
      
      setDisplayValue(current)
      displayValueRef.current = current
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      } else {
        setDisplayValue(value)
        displayValueRef.current = value
      }
    }
    
    animationFrameId = window.requestAnimationFrame(step)

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
    }
  }, [value, durationMs, startFromZero])

  return <span className={className}>{displayValue}</span>
}
