"use client"

import { Check, X } from "lucide-react"

interface FeedbackBarProps {
  isCorrect: boolean
  message: string
  onContinue: () => void
}

export function FeedbackBar({ isCorrect, message, onContinue }: FeedbackBarProps) {
  return (
    <div
      className={`animate-lesson-slide-up fixed inset-x-0 bottom-0 z-50 border-t-2 px-4 py-5 md:px-6 ${
        isCorrect
          ? "border-duo-green/30 bg-duo-green-soft"
          : "border-duo-red/30 bg-[#ffdfe0]"
      }`}
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
              isCorrect ? "bg-duo-green text-white" : "bg-duo-red text-white"
            }`}
          >
            {isCorrect ? (
              <Check className="size-6" strokeWidth={3} />
            ) : (
              <X className="size-6" strokeWidth={3} />
            )}
          </div>
          <div>
            <p
              className={`text-lg font-extrabold ${
                isCorrect ? "text-duo-green-dark" : "text-duo-red"
              }`}
            >
              {isCorrect ? "Nice!" : "Correct solution:"}
            </p>
            <p className="text-sm font-semibold text-duo-ink">{message}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className={`w-full shrink-0 rounded-2xl px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-transform active:translate-y-1 active:shadow-none sm:w-auto ${
            isCorrect
              ? "bg-duo-green shadow-[0_4px_0_0_#58a700]"
              : "bg-duo-red shadow-[0_4px_0_0_#e63f3f]"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
