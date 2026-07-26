"use client"

import { cn } from "@/lib/utils"
import type { AnswerOption, AnswerState } from "@/domain/types/lesson-question"

interface AnswerOptionsProps {
  options: AnswerOption[]
  selectedId: string | null
  correctAnswerId: string
  answerState: AnswerState
  onSelect: (id: string) => void
}

function optionStyles(
  optionId: string,
  selectedId: string | null,
  correctAnswerId: string,
  answerState: AnswerState,
) {
  const isSelected = selectedId === optionId
  const isChecked = answerState === "correct" || answerState === "incorrect"
  const isCorrect = optionId === correctAnswerId
  const isWrongSelection = isSelected && answerState === "incorrect"

  if (isChecked && isCorrect) {
    return "border-duo-green bg-duo-green-soft text-duo-green-dark shadow-[0_4px_0_0_#58a700]"
  }

  if (isWrongSelection) {
    return "border-duo-red bg-[#ffdfe0] text-duo-red shadow-[0_4px_0_0_#e63f3f]"
  }

  if (isSelected && !isChecked) {
    return "border-duo-blue bg-duo-blue/10 text-duo-blue shadow-[0_4px_0_0_#1899d6]"
  }

  return "border-duo-gray-light bg-background text-duo-ink shadow-[0_4px_0_0_#e5e5e5] hover:bg-duo-gray-lighter"
}

export function AnswerOptions({
  options,
  selectedId,
  correctAnswerId,
  answerState,
  onSelect,
}: AnswerOptionsProps) {
  const isLocked = answerState === "correct" || answerState === "incorrect"

  return (
    <div className="flex flex-col gap-3">
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          disabled={isLocked}
          onClick={() => onSelect(option.id)}
          className={cn(
            "animate-lesson-fade-in w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition-all duration-200 active:translate-y-1 active:shadow-none disabled:cursor-default",
            optionStyles(option.id, selectedId, correctAnswerId, answerState),
          )}
          style={{ animationDelay: `${index * 60}ms` }}
          aria-pressed={selectedId === option.id}
        >
          {option.text}
        </button>
      ))}
    </div>
  )
}
