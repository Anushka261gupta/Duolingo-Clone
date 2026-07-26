import { ListeningPayload, UserAnswer } from "@/domain/types/lesson-engine"
import { AudioService } from "@/domain/utils/audio-service"
import { Play } from "lucide-react"

interface Props {
  payload: ListeningPayload
  selectedAnswer: UserAnswer
  answerState: "idle" | "selected" | "correct" | "incorrect"
  onSelect: (answer: UserAnswer) => void
}

export function ListeningExercise({ payload, selectedAnswer, answerState, onSelect }: Props) {
  const value = typeof selectedAnswer === "string" ? selectedAnswer : ""
  
  const handlePlay = () => {
    AudioService.play(payload.audioUrl, payload.audioText)
  }
  
  return (
    <div className="flex flex-col gap-8 w-full mt-4 items-center">
      <button 
        onClick={handlePlay}
        className="w-24 h-24 bg-[#1cb0f6] rounded-2xl flex items-center justify-center text-white hover:bg-[#1899d6] active:translate-y-1 shadow-[0_4px_0_#1899d6] active:shadow-none transition-all"
      >
        <Play size={48} fill="currentColor" className="ml-2" />
      </button>
      
      <input 
        type="text" 
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        disabled={answerState === "correct" || answerState === "incorrect"}
        placeholder="Type what you hear"
        className="w-full p-4 bg-duo-gray-light/30 border-2 border-duo-gray-light rounded-xl font-bold text-duo-ink text-lg focus:outline-none focus:border-duo-blue focus:bg-white transition-all disabled:opacity-50"
      />
    </div>
  )
}
