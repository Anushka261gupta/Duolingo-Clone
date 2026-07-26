export type ExerciseType = "MULTIPLE_CHOICE" | "WORD_BANK" | "MATCH_PAIRS" | "FILL_BLANK" | "TYPE_ANSWER"

export type QuestionStatus = "idle" | "selected" | "submitted"

export interface AnswerOption {
  id: string
  text: string
}

export interface MultipleChoicePayload {
  options: AnswerOption[]
  correctAnswerId: string
  correctFeedback: string
  incorrectFeedback: string
}

// In the future, payload can be a union of multiple interface types depending on the ExerciseType
export interface LessonQuestion {
  id: string
  type: ExerciseType
  prompt: string
  question: string
  payload: MultipleChoicePayload 
}

export interface LessonData {
  id: string
  questions: LessonQuestion[]
}
