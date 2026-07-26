import { LessonQuestion, UserAnswer } from "@/domain/types/lesson-engine"
import { MultipleChoiceExercise } from "./multiple-choice-exercise"
import { WordBankExercise } from "./word-bank-exercise"
import { TypeAnswerExercise } from "./type-answer-exercise"
import { TranslateExercise } from "./translate-exercise"
import { ListeningExercise } from "./listening-exercise"

interface ExerciseRendererProps {
  exercise: LessonQuestion
  selectedAnswer: UserAnswer
  answerState: "idle" | "selected" | "correct" | "incorrect"
  onSelect: (answer: UserAnswer) => void
}

// Component Registry
const registry: Record<string, React.FC<any>> = {
  MULTIPLE_CHOICE: MultipleChoiceExercise,
  WORD_BANK: WordBankExercise,
  TYPE_ANSWER: TypeAnswerExercise,
  TRANSLATE: TranslateExercise,
  LISTENING: ListeningExercise,
}

export function ExerciseRenderer({ exercise, selectedAnswer, answerState, onSelect }: ExerciseRendererProps) {
  const Component = registry[exercise.type]
  
  if (!Component) {
    return <div className="p-4 text-red-500 font-bold border-2 border-red-200 rounded-xl">Unsupported exercise type: {exercise.type}</div>
  }
  
  return (
    <Component 
      payload={exercise.payload} 
      selectedAnswer={selectedAnswer} 
      answerState={answerState} 
      onSelect={onSelect} 
    />
  )
}
