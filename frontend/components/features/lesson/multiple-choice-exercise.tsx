import { MultipleChoicePayload, UserAnswer } from "@/domain/types/lesson-engine"
import { AnswerOptions } from "./answer-options"

interface Props {
  payload: MultipleChoicePayload
  selectedAnswer: UserAnswer
  answerState: "idle" | "selected" | "correct" | "incorrect"
  onSelect: (answer: UserAnswer) => void
}

export function MultipleChoiceExercise({ payload, selectedAnswer, answerState, onSelect }: Props) {
  return (
    <AnswerOptions
      options={payload.options}
      selectedId={typeof selectedAnswer === "string" ? selectedAnswer : undefined}
      correctAnswerId={payload.correctAnswerId}
      answerState={answerState}
      onSelect={onSelect as (id: string) => void}
    />
  )
}
