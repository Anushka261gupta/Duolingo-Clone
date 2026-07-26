"use client"

import Link from "next/link"
import { Heart, X } from "lucide-react"

import { ProgressBar } from "@/components/shared"

interface LessonHeaderProps {
  currentQuestion: number
  totalQuestions: number
  hearts: number
  maxHearts?: number
  heartAnimating?: boolean
}

export function LessonHeader({
  currentQuestion,
  totalQuestions,
  hearts,
  maxHearts = 5,
  heartAnimating = false,
}: LessonHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-duo-gray-light bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4 md:px-6">
        <Link
          href="/"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-duo-gray transition-colors hover:bg-black/5 hover:text-duo-ink"
          aria-label="Close lesson"
        >
          <X className="size-6" strokeWidth={2.5} />
        </Link>

        <div className="min-w-0 flex-1 animate-lesson-progress-pulse">
          <ProgressBar
            current={currentQuestion}
            target={totalQuestions}
            fillClassName="bg-duo-green transition-all duration-500 ease-out"
            showLabel={false}
          />
        </div>

        <div
          className={`flex shrink-0 items-center gap-0.5 ${heartAnimating ? "animate-lesson-shake" : ""}`}
          aria-label={`${hearts} hearts remaining`}
        >
          {Array.from({ length: maxHearts }).map((_, i) => {
            const filled = i < hearts
            return (
              <Heart
                key={i}
                className={`size-6 transition-all duration-300 ${
                  filled
                    ? "fill-duo-red text-duo-red"
                    : "fill-duo-gray-light text-duo-gray-light"
                } ${heartAnimating && i === hearts ? "animate-lesson-heart-pop" : ""}`}
                strokeWidth={0}
              />
            )
          })}
        </div>
      </div>
    </header>
  )
}
