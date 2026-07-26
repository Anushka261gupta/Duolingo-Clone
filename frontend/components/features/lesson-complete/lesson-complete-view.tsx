import { MOCK_LESSON_COMPLETE } from "@/data/lesson-complete"

import { AchievementSection } from "./achievement-section"
import { ConfettiPlaceholder } from "./confetti-placeholder"
import { ContinueFooter } from "./continue-footer"
import { IllustrationPlaceholder } from "./illustration-placeholder"
import { StatsGrid } from "./stats-grid"
import { XpAwardCard } from "./xp-award-card"

export function LessonCompleteView() {
  const { xpEarned, accuracy, heartsRemaining, maxHearts, streak, achievement } =
    MOCK_LESSON_COMPLETE

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
          <XpAwardCard xpEarned={xpEarned} />
          <StatsGrid
            accuracy={accuracy}
            heartsRemaining={heartsRemaining}
            maxHearts={maxHearts}
            streak={streak}
          />
          <AchievementSection achievement={achievement} />
        </div>
      </div>

      <ContinueFooter />
    </div>
  )
}
