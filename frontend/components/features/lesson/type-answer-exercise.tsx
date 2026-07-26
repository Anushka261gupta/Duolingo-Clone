import { TypeAnswerPayload, UserAnswer } from "@/domain/types/lesson-engine"

interface Props {
  payload: TypeAnswerPayload
  selectedAnswer: UserAnswer
  answerState: "idle" | "selected" | "correct" | "incorrect"
  onSelect: (answer: UserAnswer) => void
}

export function TypeAnswerExercise({ payload, selectedAnswer, answerState, onSelect }: Props) {
  const value = typeof selectedAnswer === "string" ? selectedAnswer : ""
  
  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      <input 
        type="text" 
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        disabled={answerState === "correct" || answerState === "incorrect"}
        placeholder="Type in Spanish"
        className="w-full p-4 bg-duo-gray-light/30 border-2 border-duo-gray-light rounded-xl font-bold text-duo-ink text-lg focus:outline-none focus:border-duo-blue focus:bg-white transition-all disabled:opacity-50"
      />
    </div>
  )
}
