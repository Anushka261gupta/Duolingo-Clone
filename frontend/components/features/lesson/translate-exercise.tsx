import { TranslatePayload, UserAnswer } from "@/domain/types/lesson-engine"

interface Props {
  payload: TranslatePayload
  selectedAnswer: UserAnswer
  answerState: "idle" | "selected" | "correct" | "incorrect"
  onSelect: (answer: UserAnswer) => void
}

export function TranslateExercise({ payload, selectedAnswer, answerState, onSelect }: Props) {
  const value = typeof selectedAnswer === "string" ? selectedAnswer : ""
  
  return (
    <div className="flex flex-col gap-6 w-full mt-4">
      <div className="flex items-center gap-4">
        {/* Simple avatar placeholder to look like Duolingo */}
        <div className="w-16 h-16 rounded-full bg-duo-blue/20 flex items-center justify-center text-3xl">
          🐻
        </div>
        <div className="relative bg-white border-2 border-duo-gray-light p-4 rounded-xl rounded-tl-none font-bold text-duo-ink text-lg max-w-[80%]">
          {payload.sentence}
          <div className="absolute -left-2.5 top-0 w-4 h-4 bg-white border-l-2 border-b-2 border-duo-gray-light transform rotate-45 rounded-sm"></div>
        </div>
      </div>
      
      <input 
        type="text" 
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        disabled={answerState === "correct" || answerState === "incorrect"}
        placeholder="Type in English"
        className="w-full p-4 bg-duo-gray-light/30 border-2 border-duo-gray-light rounded-xl font-bold text-duo-ink text-lg focus:outline-none focus:border-duo-blue focus:bg-white transition-all disabled:opacity-50"
      />
    </div>
  )
}
