"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { offsetFor } from "@/domain/constants/path-offsets"
import { MOCK_LESSONS } from "@/data/lesson-engine"
import { useCourse } from "@/hooks/use-course"

import { LessonNode } from "./lesson-node"
import { UnitBanner } from "./unit-banner"

export function LearningPath() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const pathname = usePathname()
  
  const { data: units, isLoading } = useCourse("course-spanish")

  useEffect(() => {
    const stored = localStorage.getItem("completedLessons")
    if (stored) {
      setCompletedLessons(JSON.parse(stored))
    }
  }, [pathname])

  let firstUncompletedFound = false

  if (isLoading) {
    return <div className="flex justify-center p-8 text-muted-foreground">Loading course...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      {units.map((unit, ui) => (
        <section key={`${unit.unit}-${ui}`} className="flex flex-col gap-2">
          <UnitBanner
            section={unit.section}
            unit={unit.unit}
            title={unit.title}
            color={unit.color}
            edge={unit.edge}
          />

          <div className="relative flex flex-col items-center gap-4 py-6">
            {unit.nodes.map((node, i) => {
              const offset = offsetFor(i)
              
              // Generate a stable lessonId
              const lessonId = `lesson-${unit.unit}-node-${i}`
              
              let state = node.state
              let isCurrent = false

              // Strict sequential unlocking
              if (completedLessons.includes(lessonId)) {
                state = "completed"
              } else if (!firstUncompletedFound) {
                state = "current"
                isCurrent = true
                firstUncompletedFound = true
              } else {
                state = "locked"
              }

              // Only completed and current lessons are playable
              const isPlayable = state === "completed" || state === "current"
              
              if (isPlayable) {
                console.log(`[LearningPath] Node evaluated: lessonId=${lessonId}, state=${state}`)
              }
              
              if (isPlayable && !MOCK_LESSONS[lessonId]) {
                console.warn(`[LearningPath] Playable node has no lesson data: ${lessonId}`)
              }
              
              if (isCurrent) {
                console.log(`[LearningPath] Current unlocked lesson is: ${lessonId}`)
              }
              
              const href = isPlayable ? `/lesson?lessonId=${lessonId}` : undefined

              return (
                <div key={i} className="relative flex w-full items-center justify-center">
                  <LessonNode
                    state={state}
                    kind={node.kind}
                    progress={isCurrent ? node.progress || 0 : 1}
                    offset={offset}
                    showStart={isCurrent}
                    href={href}
                  />
                  {isCurrent && (
                    <div
                      className="animate-duo-pop absolute top-1/2 hidden -translate-y-1/2 sm:block"
                      style={{ left: `calc(50% + ${offset + 96}px)` }}
                    >
                      <Image
                        src="/duo-owl.png"
                        alt="Duo the owl mascot"
                        width={110}
                        height={110}
                        className="drop-shadow-sm"
                        priority
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

