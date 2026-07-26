export interface AnswerOption {
  id: string
  text: string
}

export interface LessonQuestion {
  id: string
  prompt: string
  question: string
  options: AnswerOption[]
  correctAnswerId: string
  correctFeedback: string
  incorrectFeedback: string
}

export type AnswerState = "idle" | "selected" | "correct" | "incorrect"
