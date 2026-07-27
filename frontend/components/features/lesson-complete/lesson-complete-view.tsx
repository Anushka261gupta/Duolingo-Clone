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
            <h1 className="text-3xl font-extrabold text-duo-ink sm:text-4xl">
              {metadata.mode === "practice" ? "Practice Complete!" : "Lesson Complete!"}
            </h1>
            <p className="mt-2 text-base font-semibold text-duo-gray">
              {metadata.mode === "practice" 
                ? "Great practice! You're solidifying your skills."
                : "Great work! You're one step closer to fluency."}
            </p>
          </div>
        </div>

        {metadata.restoredHeart && (
          <div className="mb-6 mx-auto flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border-2 border-[#ff4b4b] bg-[#ff4b4b]/10 py-4 px-6 text-[#ff4b4b]">
            <span className="text-2xl">❤️</span>
            <span className="text-xl font-extrabold">+1 Heart Restored</span>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <XpAwardCard xpEarned={metadata.xpEarned} breakdown={metadata.xpBreakdown} />
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
