"use client"

import { useEffect, useState } from "react"
import { LessonMetadata } from "@/domain/types/lesson-engine"
import { useHearts } from "@/providers/hearts-provider"

import { AchievementSection } from "./achievement-section"
import { ConfettiPlaceholder } from "./confetti-placeholder"
import { ContinueFooter } from "./continue-footer"
import { IllustrationPlaceholder } from "./illustration-placeholder"
import { StatsGrid } from "./stats-grid"
import { XpAwardCard } from "./xp-award-card"

export function LessonCompleteView() {
  const { maxHearts } = useHearts()
  const [metadata, setMetadata] = useState<LessonMetadata | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("lessonMetadata")
    if (stored) {
      try {
        const dict = JSON.parse(stored) as Record<string, LessonMetadata>
        const latest = Object.values(dict).sort((a, b) => 
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        )[0]
        if (latest) setMetadata(latest)
      } catch (e) {
        console.error("Failed to parse lesson metadata")
      }
    }
  }, [])

  if (!metadata) return null

  const isPerfect = metadata.incorrectAnswers === 0
  const displayAccuracy = Math.round(metadata.accuracy * 100)

  return (
    <div className="relative flex min-h-screen flex-col">
      <ConfettiPlaceholder />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-28 pt-10 md:px-6 md:pt-14">
        <div className="mb-8 flex flex-col items-center gap-6 text-center">
          <IllustrationPlaceholder />
          <div>
            <h1 className="text-3xl font-extrabold text-duo-ink sm:text-4xl">Lesson Complete!</h1>
            <p className="mt-2 text-base font-semibold text-duo-gray">
              Great work! You&apos;re one step closer to fluency.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <XpAwardCard xpEarned={metadata.xpEarned} />
          <StatsGrid
            accuracy={displayAccuracy}
            heartsRemaining={metadata.heartsRemaining}
            maxHearts={maxHearts}
            correctAnswers={metadata.correctAnswers}
            incorrectAnswers={metadata.incorrectAnswers}
          />
          <AchievementSection 
            achievement={isPerfect ? {
              title: "Perfect Lesson",
              description: "You made no mistakes!",
              icon: "✨",
              unlocked: true
            } : { unlocked: false, title: "", description: "", icon: "" }} 
          />
        </div>
      </div>

      <ContinueFooter />
    </div>
  )
}
