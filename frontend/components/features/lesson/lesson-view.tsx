"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLesson } from "@/hooks/use-lesson"

import { ExerciseRenderer } from "./exercise-renderer"
import { ContinueButton } from "./continue-button"
import { FeedbackBar } from "./feedback-bar"
import { LessonHeader } from "./lesson-header"
import { OutOfHearts } from "./out-of-hearts"
import { useHearts } from "@/providers/hearts-provider"

interface LessonViewProps {
  lessonId: string
}

export function LessonView({ lessonId }: LessonViewProps) {
  const router = useRouter()
  const {
    currentQuestion,
    currentIndex,
    selectedAnswer,
    questionStatus,
    isCorrect,
    lessonCompleted,
    gameOver,
    totalQuestions,
    selectAnswer,
    submitAnswer,
    nextQuestion,
  } = useLesson(lessonId)

  useEffect(() => {
    if (lessonCompleted) {
      router.push("/lesson-complete")
    }
  }, [lessonCompleted, router])

  const { hearts, maxHearts, isOutOfHearts } = useHearts()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!currentQuestion) return null
  if (lessonCompleted) return null
  if (gameOver || (hasMounted && isOutOfHearts && currentIndex === 0 && questionStatus === "idle")) {
    return <OutOfHearts />
  }
  let answerState: "idle" | "selected" | "correct" | "incorrect" = "idle"
  if (questionStatus === "selected") answerState = "selected"
  if (questionStatus === "submitted") {
    answerState = isCorrect ? "correct" : "incorrect"
  }

  const heartAnimating = false

  return (
    <div className="flex min-h-screen flex-col">
      <LessonHeader
        currentQuestion={currentIndex + 1}
        totalQuestions={totalQuestions}
        hearts={hearts}
        maxHearts={maxHearts}
        heartAnimating={heartAnimating}
      />

      <div
        key={currentQuestion.id}
        className="animate-lesson-fade-in mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 pb-32 md:px-6"
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-duo-gray">
          {currentQuestion.prompt}
        </p>
        <h1 className="mb-10 text-3xl font-extrabold text-duo-ink md:text-4xl">
          {currentQuestion.question}
        </h1>

        <ExerciseRenderer
          exercise={currentQuestion}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
          onSelect={selectAnswer}
        />
      </div>

      {questionStatus !== "submitted" && (
        <ContinueButton
          disabled={selectedAnswer === null || selectedAnswer === "" || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
          onClick={submitAnswer}
        />
      )}

      {questionStatus === "submitted" && (
        <FeedbackBar
          isCorrect={!!isCorrect}
          message={
            isCorrect
              ? currentQuestion.payload.correctFeedback
              : currentQuestion.payload.incorrectFeedback
          }
          onContinue={nextQuestion}
        />
      )}
    </div>
  )
}
