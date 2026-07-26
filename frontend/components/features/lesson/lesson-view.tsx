"use client"

import { useState } from "react"
import Link from "next/link"

import { MOCK_LESSON_QUESTIONS } from "@/data/lesson-questions"
import type { AnswerState } from "@/domain/types/lesson-question"

import { AnswerOptions } from "./answer-options"
import { ContinueButton } from "./continue-button"
import { FeedbackBar } from "./feedback-bar"
import { LessonHeader } from "./lesson-header"

const MAX_HEARTS = 5

export function LessonView() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>("idle")
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [heartAnimating, setHeartAnimating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const question = MOCK_LESSON_QUESTIONS[questionIndex]
  const isChecked = answerState === "correct" || answerState === "incorrect"
  const isCorrect = answerState === "correct"

  function handleSelect(id: string) {
    if (isChecked) return
    setSelectedId(id)
    setAnswerState("selected")
  }

  function handleCheck() {
    if (!selectedId || isChecked) return

    const correct = selectedId === question.correctAnswerId
    setAnswerState(correct ? "correct" : "incorrect")

    if (!correct) {
      setHeartAnimating(true)
      setHearts((prev) => Math.max(0, prev - 1))
      window.setTimeout(() => setHeartAnimating(false), 450)
    }
  }

  function handleContinue() {
    const nextIndex = questionIndex + 1

    if (nextIndex >= MOCK_LESSON_QUESTIONS.length) {
      setIsComplete(true)
      return
    }

    setQuestionIndex(nextIndex)
    setSelectedId(null)
    setAnswerState("idle")
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <LessonHeader
          currentQuestion={MOCK_LESSON_QUESTIONS.length}
          totalQuestions={MOCK_LESSON_QUESTIONS.length}
          hearts={hearts}
          maxHearts={MAX_HEARTS}
        />
        <div className="animate-lesson-fade-in flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-24 text-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-duo-gold shadow-[0_6px_0_0_#e6a600]">
            <span className="text-5xl">🎉</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-duo-ink">Lesson complete!</h1>
            <p className="mt-2 text-base font-semibold text-duo-gray">
              You finished all {MOCK_LESSON_QUESTIONS.length} questions.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-2xl bg-duo-green px-10 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#58a700] transition-transform active:translate-y-1 active:shadow-none"
          >
            Continue
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LessonHeader
        currentQuestion={questionIndex + 1}
        totalQuestions={MOCK_LESSON_QUESTIONS.length}
        hearts={hearts}
        maxHearts={MAX_HEARTS}
        heartAnimating={heartAnimating}
      />

      <div
        key={question.id}
        className="animate-lesson-fade-in mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 pb-32 md:px-6"
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-duo-gray">
          {question.prompt}
        </p>
        <h1 className="mb-10 text-3xl font-extrabold text-duo-ink md:text-4xl">
          {question.question}
        </h1>

        <AnswerOptions
          options={question.options}
          selectedId={selectedId}
          correctAnswerId={question.correctAnswerId}
          answerState={answerState}
          onSelect={handleSelect}
        />
      </div>

      {!isChecked && <ContinueButton disabled={!selectedId} onClick={handleCheck} />}

      {isChecked && (
        <FeedbackBar
          isCorrect={isCorrect}
          message={isCorrect ? question.correctFeedback : question.incorrectFeedback}
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}
